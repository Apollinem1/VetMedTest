import type { Meta, StoryObj } from '@storybook/react'
import { AuthProvider } from '@/app/providers'
import { Button, Toaster } from 'core-frontend'
import { useAuthModalStore } from '../model/authModalStore'
import { LoginModal } from './LoginModal'
import { RegisterModal } from './RegisterModal'

function RegisterModalDemo() {
  const { openRegister } = useAuthModalStore()
  return (
    <div className="bg-background p-4">
      <Button variant="primary" onPress={openRegister}>
        Создать аккаунт
      </Button>
      <LoginModal />
      <RegisterModal />
    </div>
  )
}

const meta: Meta<typeof RegisterModal> = {
  title: 'Features/Auth/RegisterModal',
  component: RegisterModal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
        <Toaster placement="bottom end" />
      </AuthProvider>
    ),
  ],
}

export default meta

/** Экран выбора способа регистрации: OAuth и по почте / по номеру */
export const Default: StoryObj = {
  render: () => <RegisterModalDemo />,
}

/** Светлая тема */
export const LightTheme: StoryObj = {
  parameters: { globals: { theme: 'light' } },
  render: () => <RegisterModalDemo />,
}

/** Тёмная тема */
export const DarkTheme: StoryObj = {
  parameters: { globals: { theme: 'dark' } },
  render: () => <RegisterModalDemo />,
}
