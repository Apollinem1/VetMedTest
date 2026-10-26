import type { Key } from '@heroui/react'
import {
  Autocomplete,
  Description,
  EmptyState,
  FieldError,
  Label as HeroUILabel,
  ListBox,
  useFilter,
} from '@heroui/react'
import { cn } from '../../lib'
import type { SelectOption } from './types'
import { AutocompleteSearchField, renderListBoxOption } from './parts'

export type AutocompleteSingleProps = {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  searchPlaceholder?: string
  options: SelectOption[]
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  value?: string | null
  defaultValue?: string | null
  onChange?: (value: string | null) => void
  emptyText?: string
  name?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
}

export function AutocompleteSingle({
  className,
  label,
  placeholder = 'Выберите',
  searchPlaceholder = 'Поиск...',
  options,
  description,
  errorMessage,
  value,
  defaultValue,
  onChange,
  emptyText = 'Ничего не найдено',
  name,
  isDisabled,
  isRequired,
  isInvalid,
}: AutocompleteSingleProps) {
  const { contains } = useFilter({ sensitivity: 'base' })

  return (
    <Autocomplete<SelectOption, 'single'>
      className={cn(className)}
      placeholder={placeholder}
      items={options as Iterable<SelectOption>}
      allowsEmptyCollection
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onChange={(key: Key | Key[] | null) =>
        onChange?.(key != null ? String(Array.isArray(key) ? key[0] : key) : null)
      }
      name={name}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <AutocompleteSearchField placeholder={searchPlaceholder} />
          <ListBox
            items={options}
            renderEmptyState={() => <EmptyState>{emptyText}</EmptyState>}
          >
            {(item: SelectOption) => renderListBoxOption(item)}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  )
}
