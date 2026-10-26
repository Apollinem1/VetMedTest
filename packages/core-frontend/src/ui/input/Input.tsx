import { forwardRef } from 'react'
import { Input as HeroUIInput } from '@heroui/react'
import type { InputProps as HeroUIInputProps } from '@heroui/react'
import { cn } from '../../lib'

export type InputProps = HeroUIInputProps

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return <HeroUIInput ref={ref} className={cn(className)} {...props} />
})
