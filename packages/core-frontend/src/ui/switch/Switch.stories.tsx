import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Core/UI/Switch',
  component: Switch,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Switch>

/** По умолчанию */
export const Default: Story = {
  render: () => (
    <div className="bg-background p-4">
      <Switch label="Тёмная тема" />
    </div>
  ),
}

/** Включён по умолчанию */
export const DefaultSelected: Story = {
  render: () => (
    <div className="bg-background p-4">
      <Switch label="Уведомления" defaultSelected />
    </div>
  ),
}

/** С описанием */
export const WithDescription: Story = {
  render: () => (
    <div className="bg-background p-4">
      <Switch
        label="Email-рассылка"
        description="Получать новости и обновления"
        defaultSelected
      />
    </div>
  ),
}

/** Отключён */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3 bg-background p-4">
      <Switch label="Отключён (выкл)" isDisabled />
      <Switch label="Отключён (вкл)" isDisabled defaultSelected />
    </div>
  ),
}

/** Несколько переключателей */
export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3 bg-background p-4">
      <Switch label="Push-уведомления" defaultSelected />
      <Switch
        label="Email-рассылка"
        description="Получать новости и обновления"
        defaultSelected
      />
      <Switch label="SMS" />
      <Switch label="Маркетинг" isDisabled />
    </div>
  ),
}

/** Все варианты в тёмной теме */
export const DarkTheme: Story = {
  parameters: { globals: { theme: 'dark' } },
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-6">
      <Switch label="Тёмная тема" />
      <Switch label="Уведомления" defaultSelected />
      <Switch
        label="Email-рассылка"
        description="Получать новости и обновления"
        defaultSelected
      />
      <Switch label="Отключён" isDisabled />
      <Switch label="Отключён (вкл)" isDisabled defaultSelected />
    </div>
  ),
}

/** Все варианты в светлой теме */
export const LightTheme: Story = {
  parameters: { globals: { theme: 'light' } },
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-6">
      <Switch label="Тёмная тема" />
      <Switch label="Уведомления" defaultSelected />
      <Switch
        label="Email-рассылка"
        description="Получать новости и обновления"
        defaultSelected
      />
      <Switch label="Отключён" isDisabled />
      <Switch label="Отключён (вкл)" isDisabled defaultSelected />
    </div>
  ),
}
