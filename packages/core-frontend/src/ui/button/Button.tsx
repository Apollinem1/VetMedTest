import { Button as HeroUIButton } from '@heroui/react'
import type { ButtonProps as HeroUIButtonProps } from '@heroui/react'
import { cn } from '../../lib'

export type ButtonProps = HeroUIButtonProps

export function Button({ className, ...props }: ButtonProps) {
  return <HeroUIButton className={cn(className)} {...props} />
}
