import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'
import type { CheckboxOption } from './CheckboxGroup'

const meta: Meta<typeof Checkbox> = {
  title: 'Core/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta

const skills: CheckboxOption[] = [
  { value: 'coding', label: 'Программирование' },
  { value: 'design', label: 'Дизайн' },
  { value: 'writing', label: 'Копирайтинг' },
  { value: 'marketing', label: 'Маркетинг', isDisabled: true },
]

const deliveryOptions: CheckboxOption[] = [
  { value: 'email', label: 'Email', description: 'Уведомления на почту' },
  { value: 'sms', label: 'SMS', description: 'Уведомления на телефон' },
  { value: 'push', label: 'Push', description: 'Уведомления в браузере' },
]

/** Одиночный чекбокс */
export const Single: StoryObj<typeof Checkbox> = {
  render: () => (
    <div className="bg-background p-4">
      <Checkbox label="Согласен с условиями" />
    </div>
  ),
}

/** С описанием */
export const WithDescription: StoryObj<typeof Checkbox> = {
  render: () => (
    <div className="bg-background p-4">
      <Checkbox
        label="Подписаться на рассылку"
        description="Отправляем не чаще раза в неделю"
      />
    </div>
  ),
}

/** Indeterminate */
export const Indeterminate: StoryObj<typeof Checkbox> = {
  render: () => (
    <div className="bg-background p-4">
      <Checkbox label="Выбрать все" isIndeterminate />
    </div>
  ),
}

/** Отключён */
export const Disabled: StoryObj<typeof Checkbox> = {
  render: () => (
    <div className="bg-background p-4">
      <Checkbox label="Недоступно" isDisabled />
    </div>
  ),
}

/** Группа — вертикальная (по умолчанию) */
export const Group: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <CheckboxGroup label="Навыки" options={skills} defaultValue={['coding']} />
    </div>
  ),
}

/** Группа — горизонтальная */
export const GroupHorizontal: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <CheckboxGroup label="Навыки" options={skills} orientation="horizontal" />
    </div>
  ),
}

/** Группа с описаниями у опций */
export const GroupWithDescriptions: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <CheckboxGroup
        label="Способы уведомлений"
        description="Выберите удобные каналы"
        options={deliveryOptions}
        defaultValue={['email']}
      />
    </div>
  ),
}

/** Группа в невалидном состоянии */
export const GroupInvalid: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <div className="bg-background p-4">
      <CheckboxGroup label="Обязательный выбор" options={skills} isInvalid />
    </div>
  ),
}

/** Все варианты в тёмной теме */
export const DarkTheme: StoryObj<typeof Checkbox> = {
  parameters: { globals: { theme: 'dark' } },
  render: () => (
    <div className="flex flex-col gap-6 rounded-lg bg-background p-6">
      <Checkbox label="Согласен с условиями" />
      <Checkbox
        label="Подписаться на рассылку"
        description="Отправляем не чаще раза в неделю"
      />
      <Checkbox label="Выбрать все" isIndeterminate />
      <Checkbox label="Недоступно" isDisabled />
      <CheckboxGroup label="Навыки" options={skills} defaultValue={['coding']} />
      <CheckboxGroup label="Обязательный выбор" options={skills} isInvalid />
    </div>
  ),
}

/** Все варианты в светлой теме */
export const LightTheme: StoryObj<typeof Checkbox> = {
  parameters: { globals: { theme: 'light' } },
  render: () => (
    <div className="flex flex-col gap-6 rounded-lg bg-background p-6">
      <Checkbox label="Согласен с условиями" />
      <Checkbox
        label="Подписаться на рассылку"
        description="Отправляем не чаще раза в неделю"
      />
      <Checkbox label="Выбрать все" isIndeterminate />
      <Checkbox label="Недоступно" isDisabled />
      <CheckboxGroup label="Навыки" options={skills} defaultValue={['coding']} />
      <CheckboxGroup label="Обязательный выбор" options={skills} isInvalid />
    </div>
  ),
}
