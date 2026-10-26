import { useAsyncList } from '@react-stately/data'
import {
  Select as HeroUISelect,
  ListBox,
  Label as HeroUILabel,
  Description,
  FieldError,
  Spinner,
  ListBoxLoadMoreItem,
} from '@heroui/react'
import { Collection } from 'react-aria-components'
import { cn } from '../../lib'
import type { SelectOption } from './types'
import type { SelectAsyncLoadParams, SelectAsyncLoadResult } from './SelectAsync'

export type SelectAsyncMultiProps = {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  load: (params: SelectAsyncLoadParams) => Promise<SelectAsyncLoadResult>
  value?: string[] | null
  defaultValue?: string[] | null
  onChange?: (values: string[] | null) => void
  name?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
}

export function SelectAsyncMulti({
  className,
  label,
  placeholder = 'Выберите',
  description,
  errorMessage,
  load,
  value,
  defaultValue,
  onChange,
  name,
  isDisabled,
  isRequired,
  isInvalid,
}: SelectAsyncMultiProps) {
  const list = useAsyncList<SelectOption, string>({
    getKey: (item) => item.value,
    load: async ({ signal, cursor }) => {
      const result = await load({ signal, cursor })
      return { items: result.items, cursor: result.cursor }
    },
  })

  return (
    <HeroUISelect<SelectOption, 'multiple'>
      className={cn(className)}
      placeholder={placeholder}
      selectionMode="multiple"
      items={list.items as Iterable<SelectOption>}
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onChange={(keys) => {
        if (keys == null) onChange?.(null)
        else onChange?.(Array.from(keys).map(String))
      }}
      name={name}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      <HeroUISelect.Trigger>
        <HeroUISelect.Value />
        <HeroUISelect.Indicator />
      </HeroUISelect.Trigger>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      <HeroUISelect.Popover>
        <ListBox className="max-h-48 overflow-y-auto">
          <Collection items={list.items}>
            {(item: SelectOption) => (
              <ListBox.Item key={item.value} id={item.value} textValue={item.label}>
                {item.label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
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
      </HeroUISelect.Popover>
    </HeroUISelect>
  )
}
