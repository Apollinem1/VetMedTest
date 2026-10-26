import {
  Select as HeroUISelect,
  ListBox,
  Label as HeroUILabel,
  Description,
  FieldError,
} from '@heroui/react'
import { cn } from '../../lib'
import type { SelectOption } from './types'

export type MultiSelectProps = Omit<
  React.ComponentProps<typeof HeroUISelect<SelectOption, 'multiple'>>,
  'children' | 'onChange'
> & {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  options: SelectOption[]
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  value?: string[] | null
  defaultValue?: string[] | null
  onChange?: (values: string[] | null) => void
}

export function MultiSelect({
  className,
  label,
  placeholder = 'Выберите',
  options,
  description,
  errorMessage,
  value,
  defaultValue,
  onChange,
  ...props
}: MultiSelectProps) {
  return (
    <HeroUISelect<SelectOption, 'multiple'>
      className={cn(className)}
      placeholder={placeholder}
      selectionMode="multiple"
      items={options as Iterable<SelectOption>}
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onChange={(keys) => {
        if (keys == null) onChange?.(null)
        else onChange?.(Array.from(keys).map(String))
      }}
      {...props}
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      <HeroUISelect.Trigger>
        <HeroUISelect.Value />
        <HeroUISelect.Indicator />
      </HeroUISelect.Trigger>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      <HeroUISelect.Popover>
        <ListBox items={options}>
          {(item: SelectOption) => (
            <ListBox.Item id={item.value} textValue={item.label}>
              {item.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          )}
        </ListBox>
      </HeroUISelect.Popover>
    </HeroUISelect>
  )
}
