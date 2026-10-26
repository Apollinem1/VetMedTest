import type { Meta, StoryObj } from '@storybook/react'
import { toast } from '@heroui/react'
import { Button } from '../button'
import { Toaster } from './Toaster'

const meta: Meta<typeof Toaster> = {
  title: 'Core/UI/Toast',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Toaster placement="bottom end" />
        <Story />
      </>
    ),
  ],
}

export default meta

/** Все варианты уведомлений */
export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2 bg-background p-4">
      <Button variant="secondary" onPress={() => toast('Обычное уведомление')}>
        Default
      </Button>
      <Button variant="secondary" onPress={() => toast.success('Сохранено успешно')}>
        Success
      </Button>
      <Button variant="secondary" onPress={() => toast.info('Доступно обновление')}>
        Info
      </Button>
      <Button variant="secondary" onPress={() => toast.warning('Проверьте настройки')}>
        Warning
      </Button>
      <Button variant="secondary" onPress={() => toast.danger('Что-то пошло не так')}>
        Danger
      </Button>
    </div>
  ),
}

/** С описанием */
export const WithDescription: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2 bg-background p-4">
      <Button
        variant="secondary"
        onPress={() =>
          toast.success('Файл загружен', {
            description: 'document.pdf успешно добавлен',
          })
        }
      >
        С описанием
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.danger('Ошибка загрузки', {
            description: 'Превышен допустимый размер файла (10 МБ)',
          })
        }
      >
        Ошибка с описанием
      </Button>
    </div>
  ),
}

/** С кнопкой действия */
export const WithAction: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2 bg-background p-4">
      <Button
        variant="secondary"
        onPress={() =>
          toast('Запись перемещена в корзину', {
            actionProps: {
              children: 'Отменить',
              onPress: () => toast.success('Отменено'),
            },
          })
        }
      >
        С действием
      </Button>
    </div>
  ),
}

/** Promise — загрузка / успех / ошибка */
export const Promise: StoryObj = {
  render: () => {
    const simulateUpload = (fail: boolean) =>
      new window.Promise<{ name: string }>((resolve, reject) =>
        setTimeout(() => {
          if (fail) reject(new Error('Нет соединения'))
          else resolve({ name: 'report.xlsx' })
        }, 2000),
      )

    return (
      <div className="flex flex-wrap gap-2 bg-background p-4">
        <Button
          variant="secondary"
          onPress={() =>
            toast.promise(simulateUpload(false), {
              loading: 'Загружаем файл...',
              success: (data) => `Файл ${data.name} загружен`,
              error: 'Не удалось загрузить файл',
            })
          }
        >
          Загрузить (успех)
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            toast.promise(simulateUpload(true), {
              loading: 'Загружаем файл...',
              success: (data) => `Файл ${data.name} загружен`,
              error: (err) => `Ошибка: ${err.message}`,
            })
          }
        >
          Загрузить (ошибка)
        </Button>
      </div>
    )
  },
}

/** Позиции на экране */
export const Placements: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2 bg-background p-4">
      {(
        [
          'top',
          'top start',
          'top end',
          'bottom',
          'bottom start',
          'bottom end',
        ] as const
      ).map((p) => (
        <Button
          key={p}
          variant="secondary"
          onPress={() =>
            toast(`Позиция: ${p}`, {
              // @ts-expect-error placement per-toast is supported in some versions
              placement: p,
            })
          }
        >
          {p}
        </Button>
      ))}
    </div>
  ),
}

/** Тёмная тема */
export const DarkTheme: StoryObj = {
  parameters: { globals: { theme: 'dark' } },
  render: () => (
    <div className="flex flex-wrap gap-2 rounded-lg bg-background p-6">
      <Button variant="secondary" onPress={() => toast('Обычное')}>
        Default
      </Button>
      <Button variant="secondary" onPress={() => toast.success('Готово')}>
        Success
      </Button>
      <Button variant="secondary" onPress={() => toast.info('Информация')}>
        Info
      </Button>
      <Button variant="secondary" onPress={() => toast.warning('Внимание')}>
        Warning
      </Button>
      <Button variant="secondary" onPress={() => toast.danger('Ошибка')}>
        Danger
      </Button>
    </div>
  ),
}

/** Светлая тема */
export const LightTheme: StoryObj = {
  parameters: { globals: { theme: 'light' } },
  render: () => (
    <div className="flex flex-wrap gap-2 rounded-lg bg-background p-6">
      <Button variant="secondary" onPress={() => toast('Обычное')}>
        Default
      </Button>
      <Button variant="secondary" onPress={() => toast.success('Готово')}>
        Success
      </Button>
      <Button variant="secondary" onPress={() => toast.info('Информация')}>
        Info
      </Button>
      <Button variant="secondary" onPress={() => toast.warning('Внимание')}>
        Warning
      </Button>
      <Button variant="secondary" onPress={() => toast.danger('Ошибка')}>
        Danger
      </Button>
    </div>
  ),
}
