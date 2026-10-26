import {
  Radio as HeroUIRadio,
  RadioGroup as HeroUIRadioGroup,
  Description,
  FieldError,
  Label as HeroUILabel,
} from '@heroui/react'
import { cn } from '../../lib'

export type RadioOption = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  isDisabled?: boolean
}

export type RadioGroupProps = {
  className?: string
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  options: RadioOption[]
  value?: string | null
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  name?: string
}

export function RadioGroup({
  className,
  label,
  description,
  errorMessage,
  options,
  value,
  defaultValue,
  onChange,
  ...props
}: RadioGroupProps) {
  return (
    <HeroUIRadioGroup
      className={cn(className)}
      value={value ?? undefined}
      defaultValue={defaultValue}
      onChange={onChange}
      {...props}
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      {description && <Description>{description}</Description>}
      {options.map((opt) => (
        <HeroUIRadio key={opt.value} value={opt.value} isDisabled={opt.isDisabled}>
          <HeroUIRadio.Control>
            <HeroUIRadio.Indicator />
          </HeroUIRadio.Control>
          <HeroUIRadio.Content>
            {opt.description ? (
              <>
                <HeroUILabel>{opt.label}</HeroUILabel>
                <Description>{opt.description}</Description>
              </>
            ) : (
              opt.label
            )}
          </HeroUIRadio.Content>
        </HeroUIRadio>
      ))}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </HeroUIRadioGroup>
  )
}
