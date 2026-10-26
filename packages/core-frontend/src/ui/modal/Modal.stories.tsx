import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Modal, useModal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Core/UI/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta

/** Базовый — с заголовком и текстом */
export const Default: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button onPress={() => setIsOpen(true)}>Открыть модал</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Заголовок"
          footer={
            <Button slot="close" variant="primary">
              Ок
            </Button>
          }
        >
          Содержимое модального окна.
        </Modal>
      </div>
    )
  },
}

/** С подтверждением опасного действия */
export const Confirm: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button variant="danger" onPress={() => setIsOpen(true)}>
          Удалить запись
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Удалить запись?"
          footer={
            <div className="flex gap-2">
              <Button slot="close" variant="ghost">
                Отмена
              </Button>
              <Button
                variant="danger"
                onPress={() => setIsOpen(false)}
              >
                Удалить
              </Button>
            </div>
          }
        >
          Это действие нельзя отменить. Запись будет удалена безвозвратно.
        </Modal>
      </div>
    )
  },
}

/** С хуком useModal */
export const WithUseModal: StoryObj = {
  render: () => {
    const { isOpen, open, close } = useModal()
    return (
      <div className="bg-background p-4">
        <Button onPress={open}>Открыть (useModal)</Button>
        <Modal
          isOpen={isOpen}
          onClose={close}
          title="useModal хук"
          footer={
            <Button slot="close" variant="primary">
              Закрыть
            </Button>
          }
        >
          Состоянием управляет <code>useModal()</code>.
        </Modal>
      </div>
    )
  },
}

const sizeBody = (size: string) => (
  <div className="space-y-2 text-sm text-muted">
    <p>
      Текущий размер: <strong className="text-foreground">{size}</strong>
    </p>
    <p>
      xs — 320px · sm — 384px · md — 448px · lg — 512px · cover — почти весь экран · full — весь
      экран
    </p>
  </div>
)

/** Размер xs (320px) */
export const SizeXs: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button variant="secondary" onPress={() => setIsOpen(true)}>
          xs
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Размер: xs"
          size="xs"
          footer={<Button slot="close" variant="primary">Ок</Button>}
        >
          {sizeBody('xs')}
        </Modal>
      </div>
    )
  },
}

/** Размер sm (384px) */
export const SizeSm: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button variant="secondary" onPress={() => setIsOpen(true)}>
          sm
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Размер: sm"
          size="sm"
          footer={<Button slot="close" variant="primary">Ок</Button>}
        >
          {sizeBody('sm')}
        </Modal>
      </div>
    )
  },
}

/** Размер md — по умолчанию (448px) */
export const SizeMd: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button variant="secondary" onPress={() => setIsOpen(true)}>
          md (по умолчанию)
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Размер: md"
          size="md"
          footer={<Button slot="close" variant="primary">Ок</Button>}
        >
          {sizeBody('md')}
        </Modal>
      </div>
    )
  },
}

/** Размер lg (512px) */
export const SizeLg: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button variant="secondary" onPress={() => setIsOpen(true)}>
          lg
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Размер: lg"
          size="lg"
          footer={<Button slot="close" variant="primary">Ок</Button>}
        >
          {sizeBody('lg')}
        </Modal>
      </div>
    )
  },
}

/** Размер cover — почти весь экран */
export const SizeCover: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button variant="secondary" onPress={() => setIsOpen(true)}>
          cover
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Размер: cover"
          size="cover"
          footer={<Button slot="close" variant="primary">Ок</Button>}
        >
          {sizeBody('cover')}
        </Modal>
      </div>
    )
  },
}

/** Размер full — полный экран, без скруглений */
export const SizeFull: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button variant="secondary" onPress={() => setIsOpen(true)}>
          full
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Размер: full"
          size="full"
          footer={<Button slot="close" variant="primary">Ок</Button>}
        >
          {sizeBody('full')}
        </Modal>
      </div>
    )
  },
}

/** Без закрытия по клику на backdrop */
export const NonDismissable: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="bg-background p-4">
        <Button onPress={() => setIsOpen(true)}>Открыть (не закрывается по клику)</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Требует действия"
          isDismissable={false}
          footer={
            <div className="flex gap-2">
              <Button slot="close" variant="ghost">
                Отмена
              </Button>
              <Button variant="primary" slot="close">
                Принять
              </Button>
            </div>
          }
        >
          Кликните за пределами — модал не закроется. Только кнопки.
        </Modal>
      </div>
    )
  },
}

/** Тёмная тема */
export const DarkTheme: StoryObj = {
  parameters: { globals: { theme: 'dark' } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="rounded-lg bg-background p-6">
        <Button onPress={() => setIsOpen(true)}>Открыть модал</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Тёмная тема"
          footer={
            <div className="flex gap-2">
              <Button slot="close" variant="ghost">
                Отмена
              </Button>
              <Button slot="close" variant="primary">
                Подтвердить
              </Button>
            </div>
          }
        >
          Модальное окно в тёмной теме.
        </Modal>
      </div>
    )
  },
}

/** Светлая тема */
export const LightTheme: StoryObj = {
  parameters: { globals: { theme: 'light' } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="rounded-lg bg-background p-6">
        <Button onPress={() => setIsOpen(true)}>Открыть модал</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Светлая тема"
          footer={
            <div className="flex gap-2">
              <Button slot="close" variant="ghost">
                Отмена
              </Button>
              <Button slot="close" variant="primary">
                Подтвердить
              </Button>
            </div>
          }
        >
          Модальное окно в светлой теме.
        </Modal>
      </div>
    )
  },
}
