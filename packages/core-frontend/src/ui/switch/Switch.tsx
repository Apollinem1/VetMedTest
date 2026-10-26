import {
  Switch as HeroUISwitch,
  Description,
  Label as HeroUILabel,
} from '@heroui/react'
import type { SwitchProps as HeroUISwitchProps } from '@heroui/react'
import { cn } from '../../lib'

export type SwitchProps = Omit<HeroUISwitchProps, 'children'> & {
  /** Дополнительный CSS-класс на корневом элементе */
  className?: string
  /** Подпись справа от переключателя */
  label?: React.ReactNode
  /** Пояснение под подписью */
  description?: React.ReactNode
}

/**
 * Переключатель вкл/выкл.
 *
 * @example
 * <Switch label="Тёмная тема" defaultSelected />
 * <Switch label="Уведомления" description="Push и email" isSelected={on} onChange={setOn} />
 */
export function Switch({ className, label, description, ...props }: SwitchProps) {
  return (
    <HeroUISwitch className={cn(className)} {...props}>
      <HeroUISwitch.Control>
        <HeroUISwitch.Thumb />
      </HeroUISwitch.Control>
      {(label || description) && (
        <HeroUISwitch.Content>
          {description ? (
            <>
              <HeroUILabel>{label}</HeroUILabel>
              <Description>{description}</Description>
            </>
          ) : (
            label
          )}
        </HeroUISwitch.Content>
      )}
    </HeroUISwitch>
  )
}
