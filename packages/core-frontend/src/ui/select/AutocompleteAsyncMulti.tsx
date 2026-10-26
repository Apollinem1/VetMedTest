import { useAsyncList } from '@react-stately/data'
import type { Key } from '@heroui/react'
import {
  Autocomplete,
  Description,
  EmptyState,
  FieldError,
  Label as HeroUILabel,
  ListBox,
  ListBoxLoadMoreItem,
  Spinner,
  Tag,
  TagGroup,
  useFilter,
} from '@heroui/react'
import { Collection } from 'react-aria-components'
import { useMemo, useState } from 'react'
import { cn } from '../../lib'
import type { SelectOption } from './types'
import type { SelectAsyncLoadParams, SelectAsyncLoadResult } from './SelectAsync'
import { AutocompleteSearchField, renderListBoxOption } from './parts'

export type AutocompleteAsyncMultiProps = {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  searchPlaceholder?: string
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  load: (params: SelectAsyncLoadParams) => Promise<SelectAsyncLoadResult>
  value?: string[] | null
  defaultValue?: string[] | null
  onChange?: (values: string[] | null) => void
  emptyText?: string
  name?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
}

export function AutocompleteAsyncMulti({
  className,
  label,
  placeholder = 'Выберите',
  searchPlaceholder = 'Поиск...',
  description,
  errorMessage,
  load,
  value,
  defaultValue,
  onChange,
  emptyText = 'Ничего не найдено',
  name,
  isDisabled,
  isRequired,
  isInvalid,
}: AutocompleteAsyncMultiProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [searchText, setSearchText] = useState('')

  const isControlled = value !== undefined
  const [internalKeys, setInternalKeys] = useState<string[]>(() => defaultValue ?? [])
  const activeKeys = isControlled ? (value ?? []) : internalKeys

  const list = useAsyncList<SelectOption, string>({
    getKey: (item) => item.value,
    load: async ({ signal, cursor }) => {
      const result = await load({ signal, cursor })
      return { items: result.items, cursor: result.cursor }
    },
  })

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return Array.from(list.items)
    return Array.from(list.items).filter((item) => contains(item.label, searchText))
  }, [list.items, searchText, contains])

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
      items={list.items as Iterable<SelectOption>}
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
            const loadedItems = Array.from(list.items)
            return (
              <TagGroup size="sm" onRemove={onRemoveTags}>
                <TagGroup.List>
                  {state.selectedItems.map(({ key }) => {
                    const item = loadedItems.find((s) => s.value === key)
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
        <Autocomplete.Filter filter={() => true} inputValue={searchText} onInputChange={setSearchText}>
          <AutocompleteSearchField placeholder={searchPlaceholder} autoFocus />
          <ListBox
            className="max-h-48 overflow-y-auto"
            renderEmptyState={() => <EmptyState>{emptyText}</EmptyState>}
          >
            <Collection items={filteredItems}>
              {(item: SelectOption) => renderListBoxOption(item)}
            </Collection>
            <ListBoxLoadMoreItem
              isLoading={list.loadingState === 'loadingMore'}
              onLoadMore={list.loadMore}
            >
              <div className="flex items-center justify-center py-2">
                <Spinner size="sm" />
              </div>
            </ListBoxLoadMoreItem>
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  )
}
