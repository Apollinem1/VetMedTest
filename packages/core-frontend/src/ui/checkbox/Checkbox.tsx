import {
  Checkbox as HeroUICheckbox,
  Description,
  Label as HeroUILabel,
} from '@heroui/react'
import type { CheckboxProps as HeroUICheckboxProps } from '@heroui/react'
import { cn } from '../../lib'

export type CheckboxProps = Omit<HeroUICheckboxProps, 'children'> & {
  className?: string
  label?: React.ReactNode
  description?: React.ReactNode
}

export function Checkbox({ className, label, description, ...props }: CheckboxProps) {
  return (
    <HeroUICheckbox className={cn(className)} {...props}>
      <HeroUICheckbox.Control>
        <HeroUICheckbox.Indicator />
      </HeroUICheckbox.Control>
      {(label || description) && (
        <HeroUICheckbox.Content>
          {description ? (
            <>
              <HeroUILabel>{label}</HeroUILabel>
              <Description>{description}</Description>
            </>
          ) : (
            label
          )}
        </HeroUICheckbox.Content>
      )}
    </HeroUICheckbox>
  )
}
