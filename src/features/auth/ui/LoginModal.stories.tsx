import type { Meta, StoryObj } from '@storybook/react'
import { AuthProvider } from '@/app/providers'
import { Button, Toaster } from 'core-frontend'
import { useAuthModalStore } from '../model/authModalStore'
import { LoginModal } from './LoginModal'
import { RegisterModal } from './RegisterModal'

function LoginModalDemo() {
  const { openLogin } = useAuthModalStore()
  return (
    <div className="bg-background p-4">
      <Button variant="primary" onPress={openLogin}>
        Войти в MedVet
      </Button>
      <LoginModal />
      <RegisterModal />
    </div>
  )
}

const meta: Meta<typeof LoginModal> = {
  title: 'Features/Auth/LoginModal',
  component: LoginModal,
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

/** Экран выбора способа входа: OAuth (Google, Mail.ru, ГосУслуги, VK, Яндекс) и по почте / по номеру */
export const Default: StoryObj = {
  render: () => <LoginModalDemo />,
}

/** Светлая тема */
export const LightTheme: StoryObj = {
  parameters: { globals: { theme: 'light' } },
  render: () => <LoginModalDemo />,
}

/** Тёмная тема */
export const DarkTheme: StoryObj = {
  parameters: { globals: { theme: 'dark' } },
  render: () => <LoginModalDemo />,
}
