import { Label as HeroUILabel } from '@heroui/react'
import type { LabelProps as HeroUILabelProps } from '@heroui/react'
import { cn } from '../../lib'

export type LabelProps = HeroUILabelProps

export function Label({ className, ...props }: LabelProps) {
  return <HeroUILabel className={cn(className)} {...props} />
}
