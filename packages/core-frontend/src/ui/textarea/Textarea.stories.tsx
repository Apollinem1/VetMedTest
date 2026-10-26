import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Core/UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Textarea>

/** По умолчанию */
export const Default: Story = {
  render: () => (
    <div className="w-80 bg-background p-4">
      <Textarea label="Комментарий" placeholder="Введите текст..." />
    </div>
  ),
}

/** С описанием */
export const WithDescription: Story = {
  render: () => (
    <div className="w-80 bg-background p-4">
      <Textarea
        label="Отзыв"
        description="Не более 500 символов"
        placeholder="Поделитесь впечатлениями..."
        rows={4}
      />
    </div>
  ),
}

/** На всю ширину */
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-lg bg-background p-4">
      <Textarea
        label="Сообщение"
        placeholder="Введите сообщение..."
        rows={5}
        fullWidth
      />
    </div>
  ),
}

/** Невалидное состояние */
export const Invalid: Story = {
  render: () => (
    <div className="w-80 bg-background p-4">
      <Textarea
        label="Описание"
        placeholder="Обязательное поле"
        isInvalid
        errorMessage="Поле не может быть пустым"
      />
    </div>
  ),
}

/** Только для чтения */
export const ReadOnly: Story = {
  render: () => (
    <div className="w-80 bg-background p-4">
      <Textarea
        label="Условия использования"
        defaultValue="Используя данный сервис, вы соглашаетесь с условиями..."
        rows={4}
        isReadOnly
      />
    </div>
  ),
}

/** Отключено */
export const Disabled: Story = {
  render: () => (
    <div className="w-80 bg-background p-4">
      <Textarea
        label="Комментарий"
        placeholder="Недоступно"
        isDisabled
      />
    </div>
  ),
}

/** Все варианты в тёмной теме */
export const DarkTheme: Story = {
  parameters: { globals: { theme: 'dark' } },
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-background p-6">
      <Textarea label="Комментарий" placeholder="Введите текст..." />
      <Textarea
        label="Отзыв"
        description="Не более 500 символов"
        placeholder="Поделитесь впечатлениями..."
        rows={4}
      />
      <Textarea
        label="Описание"
        isInvalid
        errorMessage="Поле не может быть пустым"
      />
      <Textarea label="Комментарий" placeholder="Недоступно" isDisabled />
    </div>
  ),
}

/** Все варианты в светлой теме */
export const LightTheme: Story = {
  parameters: { globals: { theme: 'light' } },
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-background p-6">
      <Textarea label="Комментарий" placeholder="Введите текст..." />
      <Textarea
        label="Отзыв"
        description="Не более 500 символов"
        placeholder="Поделитесь впечатлениями..."
        rows={4}
      />
      <Textarea
        label="Описание"
        isInvalid
        errorMessage="Поле не может быть пустым"
      />
      <Textarea label="Комментарий" placeholder="Недоступно" isDisabled />
    </div>
  ),
}
