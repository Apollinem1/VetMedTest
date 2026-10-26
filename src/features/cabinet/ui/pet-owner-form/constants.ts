export const SEX_OPTIONS = [
  { value: 'male', label: 'Самец' },
  { value: 'female', label: 'Самка' },
  { value: 'unknown', label: 'Не указан' },
] as const

/** Лимит для data URL в Mirage / черновой загрузке */
export const MAX_PET_PHOTO_BYTES = 2.5 * 1024 * 1024
