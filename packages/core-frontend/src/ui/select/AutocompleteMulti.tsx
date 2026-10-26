import type { Key } from '@heroui/react'
import {
  Autocomplete,
  Description,
  EmptyState,
  FieldError,
  Label as HeroUILabel,
  ListBox,
  Tag,
  TagGroup,
  useFilter,
} from '@heroui/react'
import { useState } from 'react'
import { cn } from '../../lib'
import type { SelectOption } from './types'
import { AutocompleteSearchField, renderListBoxOption } from './parts'

export type AutocompleteMultiProps = {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  searchPlaceholder?: string
  options: SelectOption[]
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  value?: string[] | null
  defaultValue?: string[] | null
  onChange?: (values: string[] | null) => void
  emptyText?: string
  name?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
}

export function AutocompleteMulti({
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
}: AutocompleteMultiProps) {
  const { contains } = useFilter({ sensitivity: 'base' })

  const isControlled = value !== undefined
  const [internalKeys, setInternalKeys] = useState<string[]>(() => defaultValue ?? [])
  const activeKeys = isControlled ? (value ?? []) : internalKeys

  const handleChange = (keys: Key | Key[] | null) => {
    const arr = keys == null ? [] : Array.from(Array.isArray(keys) ? keys : [keys]).map(String)
    if (!isControlled) setInternalKeys(arr)
    onChange?.(arr.length > 0 ? arr : null)
  }

  const onRemoveTags = (keys: Set<Key>) => {
    handleChange(activeKeys.filter((k) => !keys.has(k)) as Key[])
  }

  return (
    <Autocomplete<SelectOption, 'multiple'>
      className={cn(className)}
      placeholder={placeholder}
      selectionMode="multiple"
      items={options as Iterable<SelectOption>}
      allowsEmptyCollection
      value={activeKeys}
      onChange={handleChange}
      name={name}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      <Autocomplete.Trigger>
        <Autocomplete.Value>
          {({
            defaultChildren,
            isPlaceholder,
            state,
          }: {
            defaultChildren: React.ReactNode
            isPlaceholder: boolean
            state: { selectedItems: { key: Key }[] }
          }) => {
            if (isPlaceholder || state.selectedItems.length === 0) return defaultChildren
            return (
              <TagGroup size="sm" onRemove={onRemoveTags}>
                <TagGroup.List>
                  {state.selectedItems.map(({ key }) => {
                    const item = options.find((s) => s.value === key)
                    if (!item) return null
                    return <Tag key={item.value} id={item.value}>{item.label}</Tag>
                  })}
                </TagGroup.List>
              </TagGroup>
            )
          }}
        </Autocomplete.Value>
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <AutocompleteSearchField placeholder={searchPlaceholder} autoFocus />
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
