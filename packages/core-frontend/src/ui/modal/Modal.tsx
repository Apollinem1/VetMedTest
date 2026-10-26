import { Modal as HeroUIModal, useOverlayState } from '@heroui/react'
import { cn } from '../../lib'

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full'

export type ModalProps = {
  /** Видимость модала */
  isOpen: boolean
  /** Вызывается при закрытии (крестик, клик по оверлею, Escape) */
  onClose: () => void
  /** Заголовок */
  title?: React.ReactNode
  /** Иконка рядом с заголовком */
  icon?: React.ReactNode
  /** Содержимое тела модала */
  children?: React.ReactNode
  /** Содержимое футера (кнопки действий) */
  footer?: React.ReactNode
  /** Размер: xs | sm | md (по умолчанию) | lg | cover | full */
  size?: ModalSize
  /** Закрывать по клику на backdrop (по умолчанию true) */
  isDismissable?: boolean
  /** Показывать кнопку закрытия (по умолчанию true) */
  showCloseButton?: boolean
  className?: string
}

/**
 * Модальное окно с оверлеем.
 *
 * @example
 * const { isOpen, open, close } = useModal()
 *
 * <Button onPress={open}>Открыть</Button>
 * <Modal isOpen={isOpen} onClose={close} title="Подтверждение" footer={<Button slot="close">Ок</Button>}>
 *   Вы уверены?
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  icon,
  children,
  footer,
  size = 'md',
  isDismissable = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  return (
    <HeroUIModal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => { if (!open) onClose() }}
      isDismissable={isDismissable}
    >
      <HeroUIModal.Container size={size}>
        <HeroUIModal.Dialog className={cn(className)}>
          {showCloseButton && <HeroUIModal.CloseTrigger />}
          {(title || icon) && (
            <HeroUIModal.Header>
              {icon && <HeroUIModal.Icon>{icon}</HeroUIModal.Icon>}
              <HeroUIModal.Heading>{title}</HeroUIModal.Heading>
            </HeroUIModal.Header>
          )}
          {children && <HeroUIModal.Body>{children}</HeroUIModal.Body>}
          {footer && <HeroUIModal.Footer>{footer}</HeroUIModal.Footer>}
        </HeroUIModal.Dialog>
      </HeroUIModal.Container>
    </HeroUIModal.Backdrop>
  )
}

/**
 * Хук для управления состоянием модального окна.
 *
 * @example
 * const { isOpen, open, close } = useModal()
 */
export function useModal() {
  return useOverlayState()
}
