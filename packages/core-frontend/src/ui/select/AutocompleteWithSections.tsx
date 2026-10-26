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
import { useMemo, useState } from 'react'
import { cn } from '../../lib'
import type { SelectOption, SelectSection } from './types'
import { AutocompleteSearchField, renderListBoxOption } from './parts'

type SelectionMode = 'single' | 'multiple'
type ModeValue<M extends SelectionMode> = M extends 'multiple' ? string[] | null : string | null

type SectionHeader = { value: string; label: string; isSectionHeader: true }
type OptionOrHeader = SelectOption | SectionHeader

function isSectionHeader(item: OptionOrHeader): item is SectionHeader {
  return 'isSectionHeader' in item && (item as SectionHeader).isSectionHeader === true
}

export type AutocompleteWithSectionsProps<M extends SelectionMode = 'single'> = {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  searchPlaceholder?: string
  sections: SelectSection[]
  selectionMode?: M
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  value?: ModeValue<M>
  defaultValue?: ModeValue<M>
  onChange?: (value: ModeValue<M>) => void
  emptyText?: string
  name?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
}

export function AutocompleteWithSections<M extends SelectionMode = 'single'>({
  className,
  label,
  placeholder = 'Выберите',
  searchPlaceholder = 'Поиск...',
  sections,
  selectionMode = 'single' as M,
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
}: AutocompleteWithSectionsProps<M>) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [searchText, setSearchText] = useState('')
  const isMulti = selectionMode === 'multiple'

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    () => (defaultValue as string | string[] | null) ?? null,
  )

  const allOptions = useMemo(() => sections.flatMap((s) => s.options), [sections])

  const filteredWithHeaders: OptionOrHeader[] = useMemo(() => {
    if (!searchText.trim()) {
      return sections.flatMap((s) => [
        { value: `__section_${s.key}`, label: s.title, isSectionHeader: true as const },
        ...s.options,
      ])
    }
    return sections.flatMap((s) => {
      const opts = s.options.filter((o) => contains(o.label, searchText))
      if (opts.length === 0) return []
      return [
        { value: `__section_${s.key}`, label: s.title, isSectionHeader: true as const },
        ...opts,
      ]
    })
  }, [sections, searchText, contains])

  const disabledKeys = useMemo(
    () => new Set(filteredWithHeaders.filter(isSectionHeader).map((i) => i.value)),
    [filteredWithHeaders],
  )

  const handleChange = (keys: Key | Key[] | null) => {
    if (keys == null) {
      if (!isControlled) setInternalValue(null)
      onChange?.(null as ModeValue<M>)
      return
    }
    const arr = (Array.isArray(keys) ? keys : [keys])
      .map(String)
      .filter((k) => !k.startsWith('__section_'))
    if (arr.length === 0) {
      if (!isControlled) setInternalValue(null)
      onChange?.(null as ModeValue<M>)
      return
    }
    const result = isMulti ? arr : arr[0] ?? null
    if (!isControlled) setInternalValue(result)
    onChange?.(result as ModeValue<M>)
  }

  const currentValue = (isControlled ? value : internalValue) as string | string[] | null
  const selectedKeysMulti: string[] = Array.isArray(currentValue)
    ? currentValue
    : currentValue != null ? [currentValue] : []
  const selectedKeysSingle: string | null = Array.isArray(currentValue)
    ? (currentValue[0] ?? null)
    : currentValue ?? null

  return (
    <Autocomplete<OptionOrHeader, 'single' | 'multiple'>
      className={cn(className)}
      placeholder={placeholder}
      selectionMode={selectionMode}
      items={allOptions as Iterable<OptionOrHeader>}
      allowsEmptyCollection
      disabledKeys={disabledKeys}
      value={isMulti ? selectedKeysMulti : selectedKeysSingle}
      onChange={handleChange}
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
            items={filteredWithHeaders}
            disabledKeys={disabledKeys}
            renderEmptyState={() => <EmptyState>{emptyText}</EmptyState>}
          >
            {(item: OptionOrHeader) =>
              isSectionHeader(item) ? (
                <ListBox.Item
                  id={item.value}
                  textValue={item.label}
                  isDisabled
                  className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted"
                >
                  {item.label}
                </ListBox.Item>
              ) : (
                renderListBoxOption(item)
              )
            }
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  )
}
