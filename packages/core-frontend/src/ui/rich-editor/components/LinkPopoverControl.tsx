import { useEffect, useId, useState } from 'react'
import type { Editor } from '@tiptap/core'
import { Link } from '@gravity-ui/icons'
import { Button, Input, Popover } from '@heroui/react'
import { normalizeRichEditorHref } from '../linkUtils'
import { richEditorStyles } from '../richEditorStyles'

type LinkPopoverControlProps = {
  editor: Editor
}

export function LinkPopoverControl({ editor }: LinkPopoverControlProps) {
  const inputId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!isOpen) return
    const href = editor.getAttributes('link').href as string | undefined
    setDraft(href ?? 'https://')
  }, [isOpen, editor])

  const apply = () => {
    const value = draft.trim()
    const chain = editor.chain().focus().extendMarkRange('link')
    if (!value) {
      chain.unsetLink().run()
    } else {
      const href = normalizeRichEditorHref(value)
      if (!href) {
        chain.unsetLink().run()
      } else {
        chain.setLink({ href }).run()
      }
    }
    setIsOpen(false)
  }

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setIsOpen(false)
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(next) => {
        setIsOpen(next)
      }}
    >
      <Popover.Trigger aria-label="Ссылка">
        <Button
          size="sm"
          variant={editor.isActive('link') ? 'secondary' : 'tertiary'}
          isIconOnly
          aria-label="Ссылка"
          aria-pressed={editor.isActive('link')}
          className={`${richEditorStyles.button} ${richEditorStyles.buttonIcon}`}
        >
          <Link />
        </Button>
      </Popover.Trigger>
      <Popover.Content className={richEditorStyles.linkPopover}>
        <Popover.Dialog>
          <Popover.Arrow />
          <div className={richEditorStyles.linkPopoverBody}>
            <label className={richEditorStyles.linkLabel} htmlFor={inputId}>
              Адрес ссылки
            </label>
            <Input
              id={inputId}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="https://"
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
              <Button size="sm" variant="tertiary" onPress={removeLink}>
                Убрать ссылку
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
