import type { Meta, StoryObj } from '@storybook/react'
import { Input, TextField, Label, PasswordInput, PhoneInput } from './index'

const meta: Meta<typeof Input> = {
  title: 'Core/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    fullWidth: { control: 'boolean' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'Email',
    defaultValue: 'user@example.com',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Input variant="primary" placeholder="Primary" />
      <Input variant="secondary" placeholder="Secondary" />
    </div>
  ),
}

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width input',
    fullWidth: true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
  },
}

export const WithCustomClass: Story = {
  args: {
    placeholder: 'Custom width',
    className: 'max-w-xs',
  },
}

/** Поле с подписью (TextField + Label + Input). */
export const FormField: StoryObj<typeof TextField> = {
  render: () => (
    <TextField name="email" className="max-w-sm">
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
    </TextField>
  ),
}

/** Несколько полей формы. */
export const FormFields: StoryObj<typeof TextField> = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextField name="name">
        <Label>Имя</Label>
        <Input placeholder="Введите имя" />
      </TextField>
      <TextField name="email" type="email">
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </TextField>
      <TextField name="bio">
        <Label>О себе</Label>
        <Input placeholder="Кратко о себе" />
      </TextField>
    </div>
  ),
}

/** Поле пароля с переключателем видимости. */
export const Password: StoryObj<typeof PasswordInput> = {
  render: () => (
    <TextField name="password" className="max-w-sm">
      <Label>Пароль</Label>
      <PasswordInput placeholder="Введите пароль" />
    </TextField>
  ),
}

/** Поле телефона с маской +7 (___) ___-__-__. */
export const Phone: StoryObj<typeof PhoneInput> = {
  render: () => (
    <TextField name="phone" className="max-w-sm">
      <Label>Телефон</Label>
      <PhoneInput />
    </TextField>
  ),
}
