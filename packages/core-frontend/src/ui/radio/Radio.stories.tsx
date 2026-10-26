import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'
import type { RadioOption } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Core/UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta

const plans: RadioOption[] = [
  { value: 'free', label: 'Бесплатный' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'legacy', label: 'Устаревший', isDisabled: true },
]

const delivery: RadioOption[] = [
  { value: 'standard', label: 'Стандартная доставка', description: 'Доставка за 5-7 рабочих дней' },
  { value: 'express', label: 'Экспресс', description: 'Доставка за 2-3 рабочих дня' },
  { value: 'overnight', label: 'Overnight', description: 'Доставка на следующий рабочий день' },
]

/** Вертикальная группа (по умолчанию) */
export const Default: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <RadioGroup label="Тариф" options={plans} defaultValue="pro" />
    </div>
  ),
}

/** Горизонтальная */
export const Horizontal: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <RadioGroup label="Тариф" options={plans} orientation="horizontal" defaultValue="free" />
    </div>
  ),
}

/** С описаниями у опций */
export const WithDescriptions: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <RadioGroup
        label="Способ доставки"
        description="Выберите удобный вариант"
        options={delivery}
        defaultValue="standard"
      />
    </div>
  ),
}

/** Отключена */
export const Disabled: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <RadioGroup label="Тариф" options={plans} defaultValue="pro" isDisabled />
    </div>
  ),
}

/** Невалидное состояние */
export const Invalid: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <RadioGroup label="Обязательный выбор" options={plans} isInvalid />
    </div>
  ),
}

/** Все варианты в тёмной теме */
export const DarkTheme: StoryObj<typeof RadioGroup> = {
  parameters: { globals: { theme: 'dark' } },
  render: () => (
    <div className="flex flex-col gap-6 rounded-lg bg-background p-6">
      <RadioGroup label="Тариф" options={plans} defaultValue="pro" />
      <RadioGroup label="Тариф" options={plans} orientation="horizontal" defaultValue="free" />
      <RadioGroup
        label="Способ доставки"
        description="Выберите удобный вариант"
        options={delivery}
        defaultValue="standard"
      />
      <RadioGroup label="Тариф" options={plans} defaultValue="pro" isDisabled />
      <RadioGroup label="Обязательный выбор" options={plans} isInvalid />
    </div>
  ),
}

/** Все варианты в светлой теме */
export const LightTheme: StoryObj<typeof RadioGroup> = {
  parameters: { globals: { theme: 'light' } },
  render: () => (
    <div className="flex flex-col gap-6 rounded-lg bg-background p-6">
      <RadioGroup label="Тариф" options={plans} defaultValue="pro" />
      <RadioGroup label="Тариф" options={plans} orientation="horizontal" defaultValue="free" />
      <RadioGroup
        label="Способ доставки"
        description="Выберите удобный вариант"
        options={delivery}
        defaultValue="standard"
      />
      <RadioGroup label="Тариф" options={plans} defaultValue="pro" isDisabled />
      <RadioGroup label="Обязательный выбор" options={plans} isInvalid />
    </div>
  ),
}
