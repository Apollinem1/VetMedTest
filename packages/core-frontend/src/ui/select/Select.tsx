import {
  Select as HeroUISelect,
  ListBox,
  Label as HeroUILabel,
  Description,
  FieldError,
} from '@heroui/react'
import type { SelectProps as HeroUISelectProps } from '@heroui/react'
import { cn } from '../../lib'
import type { SelectOption } from './types'

export type SelectProps = Omit<
  HeroUISelectProps<SelectOption, 'single'>,
  'children' | 'onChange'
> & {
  className?: string
  label?: React.ReactNode
  placeholder?: string
  options: SelectOption[]
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  onChange?: (value: string | null) => void
}

export function Select({
  className,
  label,
  placeholder = 'Выберите',
  options,
  description,
  errorMessage,
  onChange,
  ...props
}: SelectProps) {
  return (
    <HeroUISelect<SelectOption, 'single'>
      className={cn(className)}
      placeholder={placeholder}
      items={options as Iterable<SelectOption>}
      onChange={(key) => onChange?.(key != null ? String(key) : null)}
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
