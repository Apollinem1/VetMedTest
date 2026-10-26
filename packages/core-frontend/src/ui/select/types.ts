export type SelectOption = {
  value: string
  label: string
}

/** Секция для группировки опций */
export type SelectSection = {
  key: string
  title: string
  options: SelectOption[]
}
