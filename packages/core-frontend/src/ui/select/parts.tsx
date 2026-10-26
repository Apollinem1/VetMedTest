import { ListBox, SearchField } from '@heroui/react'
import type { SelectOption } from './types'

export function renderListBoxOption(item: SelectOption) {
  return (
    <ListBox.Item key={item.value} id={item.value} textValue={item.label}>
      {item.label}
      <ListBox.ItemIndicator />
    </ListBox.Item>
  )
}

type AutocompleteSearchFieldProps = {
  placeholder?: string
  autoFocus?: boolean
  name?: string
  variant?: 'primary' | 'secondary'
  showClearButton?: boolean
}

export function AutocompleteSearchField({
  placeholder = 'Поиск...',
  autoFocus,
  name = 'search',
  variant = 'secondary',
  showClearButton = true,
}: AutocompleteSearchFieldProps) {
  return (
    <SearchField autoFocus={autoFocus} name={name} variant={variant}>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder={placeholder} />
        {showClearButton && <SearchField.ClearButton />}
      </SearchField.Group>
    </SearchField>
  )
}
