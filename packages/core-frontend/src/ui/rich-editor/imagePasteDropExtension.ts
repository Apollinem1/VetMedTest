import { Extension } from '@tiptap/core'
import type { Editor } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { isAllowedAttachmentFile } from './attachmentUtils'

type ImagePasteDropOptions = {
  onInsertFiles: (editor: Editor, files: File[], insertAt: number) => Promise<void>
  onInsertImageFromUrl: (
    editor: Editor,
    url: string,
    insertAt: number,
  ) => Promise<void>
}

function clipboardFiles(event: ClipboardEvent): File[] {
  const clipboard = event.clipboardData
  if (!clipboard) return []
  const filesFromList = Array.from(clipboard.files ?? []).filter(isAllowedAttachmentFile)
  if (filesFromList.length) return filesFromList

  const filesFromItems: File[] = []
  for (const item of Array.from(clipboard.items ?? [])) {
    if (item.kind !== 'file') continue
    const file = item.getAsFile()
    if (file && isAllowedAttachmentFile(file)) {
      filesFromItems.push(file)
    }
  }
  return filesFromItems
}

function firstImageUrlFromHtml(html: string): string | null {
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  const imageNode = parsed.querySelector('img')
  const source = imageNode?.getAttribute('src')?.trim()
  return source || null
}

function imageUrlFromPlainText(text: string): string | null {
  const candidate = text.trim()
  if (!candidate) return null
  try {
    const parsed = new URL(candidate)
    if (!/^https?:$/i.test(parsed.protocol)) return null
    const path = parsed.pathname.toLowerCase()
    if (/\.(png|jpe?g|gif|webp|svg|bmp|avif)$/.test(path)) return candidate
    return null
  } catch {
    return null
  }
}

export const ImagePasteDrop = Extension.create<ImagePasteDropOptions>({
  name: 'imagePasteDrop',

  addOptions() {
    return {
      onInsertFiles: async () => {},
      onInsertImageFromUrl: async () => {},
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('richEditorImagePasteDrop'),
        props: {
          handlePaste: (view, event) => {
            const pasteEvent = event as ClipboardEvent
            const files = clipboardFiles(pasteEvent)
            if (files.length) {
              event.preventDefault()
              const insertPosition = view.state.selection.from
              void this.options.onInsertFiles(this.editor, files, insertPosition)
              return true
            }

            const html = pasteEvent.clipboardData?.getData('text/html')
            const sourceUrlFromHtml = html ? firstImageUrlFromHtml(html) : null
            const sourceUrlFromText = imageUrlFromPlainText(
              pasteEvent.clipboardData?.getData('text/plain') || '',
            )
            const sourceUrl = sourceUrlFromHtml || sourceUrlFromText
            if (!sourceUrl) return false

            event.preventDefault()
            const insertPosition = view.state.selection.from
            void this.options.onInsertImageFromUrl(this.editor, sourceUrl, insertPosition)
            return true
          },

          handleDrop: (view, event, _slice, moved) => {
            if (moved) return false
            const files = Array.from(event.dataTransfer?.files ?? []).filter(isAllowedAttachmentFile)
            if (!files.length) return false

            event.preventDefault()
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            })
            const insertPosition = coordinates?.pos ?? view.state.selection.from
            void this.options.onInsertFiles(this.editor, files, insertPosition)
            return true
          },
        },
      }),
    ]
  },
})
