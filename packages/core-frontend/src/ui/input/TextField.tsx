import { TextField as HeroUITextField } from '@heroui/react'
import type { TextFieldProps as HeroUITextFieldProps } from '@heroui/react'
import { cn } from '../../lib'

export type TextFieldProps = HeroUITextFieldProps

export function TextField({ className, ...props }: TextFieldProps) {
  return <HeroUITextField className={cn(className)} {...props} />
}
