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
  useFilter,
} from '@heroui/react'
import { Collection } from 'react-aria-components'
import { useMemo, useState } from 'react'
import { cn } from '../../lib'
import type { SelectOption } from './types'
import type { SelectAsyncLoadParams, SelectAsyncLoadResult } from './SelectAsync'
import { AutocompleteSearchField, renderListBoxOption } from './parts'

export type AutocompleteAsyncSingleProps = {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  searchPlaceholder?: string
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  load: (params: SelectAsyncLoadParams) => Promise<SelectAsyncLoadResult>
  value?: string | null
  defaultValue?: string | null
  onChange?: (value: string | null) => void
  emptyText?: string
  name?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
}

export function AutocompleteAsyncSingle({
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
}: AutocompleteAsyncSingleProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [searchText, setSearchText] = useState('')

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

  return (
    <Autocomplete<SelectOption, 'single'>
      className={cn(className)}
      placeholder={placeholder}
      items={list.items as Iterable<SelectOption>}
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
