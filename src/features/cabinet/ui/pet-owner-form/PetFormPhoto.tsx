import { useCallback, useRef, useState, type ChangeEvent } from 'react'
import { Camera } from '@gravity-ui/icons'
import { Button } from 'core-frontend'
import { MAX_PET_PHOTO_BYTES } from './constants'

type PetFormPhotoProps = {
  photoUrl: string | null | undefined
  onChange: (url: string | null) => void
  disabled?: boolean
}

export function PetFormPhoto({ photoUrl, onChange, disabled }: PetFormPhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const openPicker = useCallback(() => {
    setError(null)
    inputRef.current?.click()
  }, [])

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Нужен файл изображения')
      return
    }
    if (file.size > MAX_PET_PHOTO_BYTES) {
      setError('Не больше 2,5 МБ')
      return
    }
    setError(null)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') onChange(result)
    }
    reader.readAsDataURL(file)
  }

  const hasPhoto = Boolean(photoUrl)

  return (
    <div className="flex flex-col items-center gap-3 sm:items-start">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={handleFile}
        disabled={disabled}
        aria-label="Выбрать фото питомца"
      />
      <button
        type="button"
        onClick={openPicker}
        disabled={disabled}
        className="group relative size-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-neutral-200/80 transition hover:ring-emerald-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50"
      >
        {hasPhoto ? (
          <img src={photoUrl!} alt="" className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-emerald-400 via-emerald-500 to-teal-600">
            <Camera className="size-11 text-white/90 drop-shadow-sm" />
          </div>
        )}
        <span className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/55 via-black/20 to-transparent pb-2 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          {hasPhoto ? 'Заменить' : 'Добавить'}
        </span>
      </button>
      <div className="flex max-w-44 flex-col gap-1.5 text-center sm:text-left">
        {hasPhoto ? (
          <Button type="button" variant="ghost" size="sm" className="min-h-8 px-2 text-neutral-600" onPress={() => onChange(null)} isDisabled={disabled}>
            Убрать фото
          </Button>
        ) : (
          <Button type="button" variant="ghost" size="sm" className="min-h-8 px-2 text-emerald-700" onPress={openPicker} isDisabled={disabled}>
            Загрузить фото
          </Button>
        )}
        <p className="text-xs leading-snug text-neutral-500">JPG, PNG или WebP · до 2,5 МБ</p>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    </div>
  )
}
