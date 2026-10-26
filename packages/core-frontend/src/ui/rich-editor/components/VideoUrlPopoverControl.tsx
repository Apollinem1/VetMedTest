import { useEffect, useId, useState } from 'react'
import { Button, Input, Popover } from '@heroui/react'
import { normalizeYouTubeUrl } from '../linkUtils'
import { richEditorStyles } from '../richEditorStyles'

type VideoUrlPopoverControlProps = {
  onInsertVideoUrl: (url: string) => Promise<void>
  isVideoActive: boolean
}

export function VideoUrlPopoverControl({
  onInsertVideoUrl,
  isVideoActive,
}: VideoUrlPopoverControlProps) {
  const inputId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!isOpen) return
    setDraft('https://www.youtube.com/watch?v=')
  }, [isOpen])

  const apply = async () => {
    const value = normalizeYouTubeUrl(draft)
    if (!value) {
      setIsOpen(false)
      return
    }
    await onInsertVideoUrl(value)
    setIsOpen(false)
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger aria-label="Видео YouTube">
        <Button
          size="sm"
          variant={isVideoActive ? 'secondary' : 'tertiary'}
          aria-label="Видео YouTube"
          aria-pressed={isVideoActive}
          className={richEditorStyles.button}
        >
          YouTube
        </Button>
      </Popover.Trigger>
      <Popover.Content className={richEditorStyles.linkPopover}>
        <Popover.Dialog>
          <Popover.Arrow />
          <div className={richEditorStyles.linkPopoverBody}>
            <label className={richEditorStyles.linkLabel} htmlFor={inputId}>
              Ссылка на видео YouTube
            </label>
            <Input
              id={inputId}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
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
