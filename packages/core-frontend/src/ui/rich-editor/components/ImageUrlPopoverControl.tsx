import { useEffect, useId, useState } from 'react'
import { Camera } from '@gravity-ui/icons'
import { Button, Input, Popover } from '@heroui/react'
import { normalizeImageSrc } from '../imageUtils'
import { richEditorStyles } from '../richEditorStyles'

type ImageUrlPopoverControlProps = {
  onInsertImageUrl: (url: string) => Promise<void>
  isImageActive: boolean
}

export function ImageUrlPopoverControl({
  onInsertImageUrl,
  isImageActive,
}: ImageUrlPopoverControlProps) {
  const inputId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!isOpen) {
      return
    }
    setDraft('https://')
  }, [isOpen])

  const apply = async () => {
    const value = draft.trim()
    if (!value) {
      setIsOpen(false)
      return
    }
    const sourceUrl = normalizeImageSrc(value)
    if (sourceUrl) {
      await onInsertImageUrl(sourceUrl)
    }
    setIsOpen(false)
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(next) => {
        setIsOpen(next)
      }}
    >
      <Popover.Trigger aria-label="Изображение по URL">
        <Button
          size="sm"
          variant={isImageActive ? 'secondary' : 'tertiary'}
          isIconOnly
          aria-label="Изображение по URL"
          aria-pressed={isImageActive}
          className={`${richEditorStyles.button} ${richEditorStyles.buttonIcon}`}
        >
          <Camera />
        </Button>
      </Popover.Trigger>
      <Popover.Content className={richEditorStyles.linkPopover}>
        <Popover.Dialog>
          <Popover.Arrow />
          <div className={richEditorStyles.linkPopoverBody}>
            <label className={richEditorStyles.linkLabel} htmlFor={inputId}>
              URL изображения
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
                  void apply()
                }
                if (event.key === 'Escape') {
                  event.preventDefault()
                  setIsOpen(false)
                }
              }}
            />
            <div className="RichEditor-popoverActions">
              <Button size="sm" variant="secondary" onPress={() => void apply()}>
                Вставить
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
