import { InputMask } from '@react-input/mask'
import { Input } from './Input'
import type { InputProps } from './Input'
import { cn } from '../../lib'

const PHONE_MASK = '+7 (___) ___-__-__'
const PHONE_REPLACEMENT = { _: /\d/ } as const

export type PhoneInputProps = Omit<InputProps, 'type'> & {
  /** Маска ввода. По умолчанию: +7 (___) ___-__-__ */
  mask?: string
  /** Показывать маску при пустом значении */
  showMask?: boolean
}

export function PhoneInput({
  mask = PHONE_MASK,
  showMask = true,
  className,
  placeholder = PHONE_MASK,
  ...props
}: PhoneInputProps) {
  return (
    <InputMask
      component={Input}
      mask={mask}
      replacement={PHONE_REPLACEMENT}
      showMask={showMask}
      placeholder={placeholder}
      className={cn(className)}
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      {...props}
    />
  )
}
