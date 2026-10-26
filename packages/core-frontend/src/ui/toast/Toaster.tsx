import { Toast } from '@heroui/react'

export type ToasterPlacement =
  | 'top'
  | 'top start'
  | 'top end'
  | 'bottom'
  | 'bottom start'
  | 'bottom end'

export type ToasterProps = {
  /** Позиция на экране (по умолчанию — bottom end) */
  placement?: ToasterPlacement
  className?: string
}

/**
 * Провайдер уведомлений. Размещается один раз в корне приложения.
 *
 * @example
 * // В корне приложения:
 * <Toaster />
 *
 * // В любом месте приложения:
 * import { toast } from 'core-frontend'
 * toast.success('Сохранено')
 * toast.danger('Ошибка сервера')
 */
export function Toaster({ placement = 'bottom end', className }: ToasterProps) {
  return <Toast.Provider placement={placement} className={className} />
}
