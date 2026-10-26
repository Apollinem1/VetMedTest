import { useEffect, useMemo, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style/text-style-kit'
import Youtube from '@tiptap/extension-youtube'
import { cn } from '../../lib'
import {
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_RECENT_COLORS,
  DEFAULT_TEXT_COLOR,
} from './constants'
import { insertAttachmentFiles } from './attachmentUtils'
import { ImagePasteDrop } from './imagePasteDropExtension'
import { isSafeDataUriForAttachment } from './linkUtils'
import { resolveUploadHandlers } from './mockUploadAdapter'
import { RichEditorBubbleMenu } from './RichEditorBubbleMenu'
import { RichEditorImage } from './RichEditorImage'
import { RichEditorLink } from './RichEditorLink'
import { richEditorStyles } from './richEditorStyles'
import type {
  ImageMode,
  RenderAttachment,
  UploadFile,
  UploadImageFile,
  UploadImageUrl,
} from './richEditorTypes'
import { RichEditorToolbar } from './RichEditorToolbar'
import './RichEditor.css'

export type RichEditorProps = {
  className?: string
  value?: string
  defaultContent?: string
  onChange?: (html: string) => void
  onError?: (error: Error, context: { action: string; payload?: unknown }) => void
  uploadImageFile?: UploadImageFile
  uploadImageUrl?: UploadImageUrl
  uploadFile?: UploadFile
  renderAttachment?: RenderAttachment
  imageDefaultMode?: ImageMode
}

export function RichEditor({
  className,
  value,
  defaultContent = '<p></p>',
  onChange,
  onError,
  uploadImageFile,
  uploadImageUrl,
  uploadFile,
  renderAttachment,
  imageDefaultMode = 'blockFullWidth',
}: RichEditorProps) {
  const isControlled = value !== undefined
  const initialContent = isControlled ? value || '<p></p>' : defaultContent
  const lastSyncedValueRef = useRef<string>(initialContent)
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR)
  const [highlightColor, setHighlightColor] = useState(DEFAULT_HIGHLIGHT_COLOR)
  const [recentTextColors, setRecentTextColors] = useState<string[]>(DEFAULT_RECENT_COLORS)
  const [recentHighlightColors, setRecentHighlightColors] =
    useState<string[]>(DEFAULT_RECENT_COLORS)

  const uploadHandlers = useMemo(
    () =>
      resolveUploadHandlers({
        uploadImageFile,
        uploadImageUrl,
        uploadFile,
      }),
    [uploadFile, uploadImageFile, uploadImageUrl],
  )

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: false,
      }),
      RichEditorLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'RichEditor-link',
        },
        isAllowedUri: (url, context) => {
          if (!url) return false
          if (url.startsWith('data:')) return isSafeDataUriForAttachment(url)
          return context.defaultValidate(url)
        },
      }),
      RichEditorImage.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: 'RichEditor-image',
          'data-image-mode': imageDefaultMode,
        },
      }),
      Youtube.configure({
        inline: false,
        width: 640,
        height: 360,
        controls: true,
        nocookie: true,
        allowFullscreen: true,
      }),
      ImagePasteDrop.configure({
        onInsertFiles: async (editorRef, files, insertAt) => {
          try {
            await insertAttachmentFiles({
              editor: editorRef,
              files,
              insertAt,
              imageMode: imageDefaultMode,
              renderAttachment,
              uploadFile: uploadHandlers.uploadFile,
              uploadImageFile: uploadHandlers.uploadImageFile,
            })
          } catch (error) {
            const normalizedError =
              error instanceof Error ? error : new Error('Failed to insert files from clipboard')
            onError?.(normalizedError, {
              action: 'paste-or-drop-files',
              payload: { filesCount: files.length, insertAt },
            })
          }
        },
        onInsertImageFromUrl: async (editorRef, url, insertAt) => {
          try {
            const uploadedImage = await uploadHandlers.uploadImageUrl(url)
            editorRef
              .chain()
              .focus()
              .insertContentAt(insertAt, {
                type: 'image',
                attrs: {
                  src: uploadedImage.url,
                  alt: uploadedImage.alt ?? 'image',
                  title: uploadedImage.title ?? uploadedImage.alt ?? 'image',
                  imageMode: imageDefaultMode,
                },
              })
              .run()
          } catch (error) {
            const normalizedError =
              error instanceof Error ? error : new Error('Failed to insert image from URL')
            onError?.(normalizedError, {
              action: 'paste-image-url',
              payload: { url, insertAt },
            })
          }
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyleKit.configure({
        backgroundColor: false,
        fontFamily: false,
        lineHeight: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
    ],
    content: initialContent,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor: editorRef }) => {
      const html = editorRef.getHTML()
      lastSyncedValueRef.current = html
      onChange?.(html)
    },
    editorProps: {
      attributes: {
        class: richEditorStyles.content,
        style: 'min-height: 12rem; padding: 0.75rem 1rem; outline: none;',
      },
    },
  })

  useEffect(() => {
    if (!isControlled || !editor) return
    const nextValue = value || '<p></p>'
    if (lastSyncedValueRef.current === nextValue) return
    if (editor.getHTML() === nextValue) {
      lastSyncedValueRef.current = nextValue
      return
    }
    editor.commands.setContent(nextValue, { emitUpdate: false })
    lastSyncedValueRef.current = nextValue
  }, [editor, isControlled, value])

  const bubbleMenuOptions = useMemo(
    () =>
      ({
        placement: 'top',
        offset: 8,
      }) as const,
    [],
  )

  if (!editor) {
    return null
  }

  const currentColor = editor.getAttributes('textStyle').color as string | undefined
  const currentFontSize = editor.getAttributes('textStyle').fontSize as string | undefined
  const currentParagraphAlign = editor.getAttributes('paragraph').textAlign as
    | string
    | undefined
  const currentHeadingAlign = editor.getAttributes('heading').textAlign as string | undefined
  const currentImageAlign = editor.getAttributes('image').textAlign as string | undefined
  const currentImageMode = editor.getAttributes('image').imageMode as ImageMode | undefined
  const currentAlign =
    (editor.isActive('image') ? currentImageAlign : undefined) ??
    currentParagraphAlign ??
    currentHeadingAlign ??
    'left'

  const handleInsertFiles = async (files: File[], insertAt: number) => {
    const targetPosition = insertAt > 0 ? insertAt : editor.state.selection.from
    try {
      await insertAttachmentFiles({
        editor,
        files,
        insertAt: targetPosition,
        imageMode: imageDefaultMode,
        renderAttachment,
        uploadFile: uploadHandlers.uploadFile,
        uploadImageFile: uploadHandlers.uploadImageFile,
      })
    } catch (error) {
      const normalizedError =
        error instanceof Error ? error : new Error('Failed to insert files')
      onError?.(normalizedError, {
        action: 'insert-files',
        payload: { filesCount: files.length, insertAt: targetPosition },
      })
    }
  }

  const handleInsertImageByUrl = async (sourceUrl: string) => {
    const insertAt = editor.state.selection.from
    try {
      const uploadedImage = await uploadHandlers.uploadImageUrl(sourceUrl)
      editor
        .chain()
        .focus()
        .insertContentAt(insertAt, {
          type: 'image',
          attrs: {
            src: uploadedImage.url,
            alt: uploadedImage.alt ?? 'image',
            title: uploadedImage.title ?? uploadedImage.alt ?? 'image',
            imageMode: imageDefaultMode,
          },
        })
        .run()
    } catch (error) {
      const normalizedError =
        error instanceof Error ? error : new Error('Failed to insert image by URL')
      onError?.(normalizedError, {
        action: 'insert-image-by-url',
        payload: { sourceUrl, insertAt },
      })
    }
  }

  const handleInsertVideoByUrl = async (sourceUrl: string) => {
    try {
      editor.chain().focus().setYoutubeVideo({ src: sourceUrl }).run()
    } catch (error) {
      const normalizedError =
        error instanceof Error ? error : new Error('Failed to insert YouTube video')
      onError?.(normalizedError, {
        action: 'insert-video-by-url',
        payload: { sourceUrl },
      })
    }
  }

  return (
    <div className={cn(richEditorStyles.root, richEditorStyles.rootFluid, className)}>
      <RichEditorToolbar
        editor={editor}
        currentAlign={currentAlign}
        currentColor={currentColor}
        currentFontSize={currentFontSize}
        currentImageMode={currentImageMode}
        textColor={textColor}
        highlightColor={highlightColor}
        recentTextColors={recentTextColors}
        onRecentTextColorsChange={setRecentTextColors}
        recentHighlightColors={recentHighlightColors}
        onRecentHighlightColorsChange={setRecentHighlightColors}
        onTextColorChange={setTextColor}
        onHighlightColorChange={setHighlightColor}
        onInsertFiles={handleInsertFiles}
        onInsertImageByUrl={handleInsertImageByUrl}
        onInsertVideoByUrl={handleInsertVideoByUrl}
      />
      <div className={richEditorStyles.editorWrap}>
        <RichEditorBubbleMenu
          editor={editor}
          currentAlign={currentAlign}
          currentColor={currentColor}
          currentFontSize={currentFontSize}
          textColor={textColor}
          highlightColor={highlightColor}
          recentTextColors={recentTextColors}
          onRecentTextColorsChange={setRecentTextColors}
          recentHighlightColors={recentHighlightColors}
          onRecentHighlightColorsChange={setRecentHighlightColors}
          onTextColorChange={setTextColor}
          onHighlightColorChange={setHighlightColor}
          options={bubbleMenuOptions}
        />
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
