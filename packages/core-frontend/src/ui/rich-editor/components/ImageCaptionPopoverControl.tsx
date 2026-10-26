import { useEffect, useId, useState } from 'react'
import type { Editor } from '@tiptap/core'
import { Button, Input, Popover } from '@heroui/react'
import { richEditorStyles } from '../richEditorStyles'

type ImageCaptionPopoverControlProps = {
  editor: Editor
}

function findSelectedImagePos(editor: Editor): number | null {
  const { selection, doc } = editor.state
  const nodeAtSelection = doc.nodeAt(selection.from)
  if (nodeAtSelection?.type.name === 'image') return selection.from

  const nodeBefore = selection.$from.nodeBefore
  if (nodeBefore?.type.name === 'image') {
    return selection.from - nodeBefore.nodeSize
  }

  const nodeAfter = selection.$from.nodeAfter
  if (nodeAfter?.type.name === 'image') {
    return selection.from
  }

  return null
}

function updateImageCaptionAtPos(editor: Editor, pos: number, caption: string | null) {
  const imageNode = editor.state.doc.nodeAt(pos)
  if (!imageNode || imageNode.type.name !== 'image') return

  const transaction = editor.state.tr.setNodeMarkup(pos, undefined, {
    ...imageNode.attrs,
    caption,
  })
  editor.view.dispatch(transaction)
}

export function ImageCaptionPopoverControl({ editor }: ImageCaptionPopoverControlProps) {
  const inputId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [selectedImagePos, setSelectedImagePos] = useState<number | null>(null)
  const isImageActive = editor.isActive('image')

  useEffect(() => {
    if (!isOpen) return
    const currentCaption = editor.getAttributes('image').caption as string | undefined
    setDraft(currentCaption ?? '')
    setSelectedImagePos(findSelectedImagePos(editor))
  }, [isOpen, editor])

  const apply = () => {
    const value = draft.trim()
    if (selectedImagePos !== null) {
      updateImageCaptionAtPos(editor, selectedImagePos, value || null)
      editor.commands.focus()
    }
    setIsOpen(false)
  }

  const clear = () => {
    if (selectedImagePos !== null) {
      updateImageCaptionAtPos(editor, selectedImagePos, null)
      editor.commands.focus()
    }
    setIsOpen(false)
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger aria-label="Подпись изображения">
        <Button
          size="sm"
          variant={editor.getAttributes('image').caption ? 'secondary' : 'tertiary'}
          aria-label="Подпись изображения"
          isDisabled={!isImageActive}
          className={richEditorStyles.button}
        >
          Подпись
        </Button>
      </Popover.Trigger>
      <Popover.Content className={richEditorStyles.linkPopover}>
        <Popover.Dialog>
          <Popover.Arrow />
          <div className={richEditorStyles.linkPopoverBody}>
            <label className={richEditorStyles.linkLabel} htmlFor={inputId}>
              Подпись к фото
            </label>
            <Input
              id={inputId}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Введите подпись"
              className={richEditorStyles.linkInput}
              autoFocus
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  apply()
                }
                if (event.key === 'Escape') {
                  event.preventDefault()
                  setIsOpen(false)
                }
              }}
            />
            <div className="RichEditor-popoverActions">
              <Button size="sm" variant="secondary" onPress={apply}>
                Применить
              </Button>
              <Button size="sm" variant="tertiary" onPress={clear}>
                Очистить
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
