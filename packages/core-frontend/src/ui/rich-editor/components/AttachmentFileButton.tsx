import { useRef } from 'react'
import { FolderOpen } from '@gravity-ui/icons'
import { Button, Tooltip } from '@heroui/react'
import { RICH_EDITOR_FILE_ACCEPT } from '../attachmentUtils'
import { richEditorStyles } from '../richEditorStyles'

type AttachmentFileButtonProps = {
  onPickFiles: (files: File[], insertAt: number) => Promise<void>
  getInsertPosition: () => number
}

export function AttachmentFileButton({
  onPickFiles,
  getInsertPosition,
}: AttachmentFileButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const insertAtRef = useRef<number>(-1)

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={RICH_EDITOR_FILE_ACCEPT}
        multiple
        tabIndex={-1}
        className={richEditorStyles.fileInputHidden}
        onChange={(event) => {
          const selectedFiles = Array.from(event.target.files ?? [])
          event.target.value = ''
          if (!selectedFiles.length) return
          const insertAt = insertAtRef.current > 0 ? insertAtRef.current : getInsertPosition()
          void onPickFiles(selectedFiles, insertAt).catch((error) => {
            console.error('RichEditor: failed to insert files from picker', error)
          })
          insertAtRef.current = -1
        }}
      />
      <Tooltip delay={0}>
        <Tooltip.Trigger>
          <Button
            size="sm"
            variant="tertiary"
            isIconOnly
            aria-label="Вставить файл с компьютера"
            className={`${richEditorStyles.button} ${richEditorStyles.buttonIcon}`}
            onClick={() => {
              insertAtRef.current = getInsertPosition()
              inputRef.current?.click()
            }}
          >
            <FolderOpen />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          Вставить файл с компьютера
        </Tooltip.Content>
      </Tooltip>
    </>
  )
}
