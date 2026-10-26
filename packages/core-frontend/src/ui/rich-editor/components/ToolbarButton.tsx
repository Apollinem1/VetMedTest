import type { ReactNode } from 'react'
import { Button, Tooltip } from '@heroui/react'
import { cn } from '../../../lib'
import { richEditorStyles } from '../richEditorStyles'

type ToolbarButtonProps = {
  label: string
  onPress: () => void
  children: ReactNode
  active?: boolean
  disabled?: boolean
  iconOnly?: boolean
}

export function ToolbarButton({
  label,
  onPress,
  children,
  active,
  disabled,
  iconOnly,
}: ToolbarButtonProps) {
  const trigger = (
    <Button
      size="sm"
      variant={active ? 'secondary' : 'tertiary'}
      isIconOnly={iconOnly}
      aria-label={label}
      isDisabled={disabled}
      onPress={onPress}
      className={cn(richEditorStyles.button, iconOnly && richEditorStyles.buttonIcon)}
    >
      {children}
    </Button>
  )

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        {label}
      </Tooltip.Content>
    </Tooltip>
  )
}
