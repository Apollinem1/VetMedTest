import {
  Checkbox as HeroUICheckbox,
  CheckboxGroup as HeroUICheckboxGroup,
  Description,
  FieldError,
  Label as HeroUILabel,
} from '@heroui/react'
import { cn } from '../../lib'

export type CheckboxOption = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  isDisabled?: boolean
}

export type CheckboxGroupProps = {
  className?: string
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  options: CheckboxOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  orientation?: 'horizontal' | 'vertical'
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  name?: string
}

export function CheckboxGroup({
  className,
  label,
  description,
  errorMessage,
  options,
  onChange,
  ...props
}: CheckboxGroupProps) {
  return (
    <HeroUICheckboxGroup className={cn(className)} onChange={onChange} {...props}>
      {label && <HeroUILabel>{label}</HeroUILabel>}
      {description && <Description>{description}</Description>}
      {options.map((opt) => (
        <HeroUICheckbox key={opt.value} value={opt.value} isDisabled={opt.isDisabled}>
          <HeroUICheckbox.Control>
            <HeroUICheckbox.Indicator />
          </HeroUICheckbox.Control>
          <HeroUICheckbox.Content>
            {opt.description ? (
              <>
                <HeroUILabel>{opt.label}</HeroUILabel>
                <Description>{opt.description}</Description>
              </>
            ) : (
              opt.label
            )}
          </HeroUICheckbox.Content>
        </HeroUICheckbox>
      ))}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </HeroUICheckboxGroup>
  )
}
