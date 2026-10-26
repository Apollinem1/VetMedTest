import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartPulse, ArrowLeft, Envelope, Smartphone } from '@gravity-ui/icons'
import {
  Modal,
  TextField,
  Input,
  Label,
  Button,
  PasswordInput,
  PhoneInput,
  toast,
} from 'core-frontend'
import { useAuth } from '@/app/providers'
import { useAuthModalStore } from '../model/authModalStore'
import { AuthOAuthButtons } from './auth-oauth-buttons'

type LoginStep = 'choose' | 'email' | 'phone'

export function LoginModal() {
  const navigate = useNavigate()
  const { modal, close, openRegister } = useAuthModalStore()
  const { login } = useAuth()

  const [step, setStep] = useState<LoginStep>('choose')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const isOpen = modal === 'login'

  function handleClose() {
    close()
    setStep('choose')
    setError(null)
    setUsername('')
    setPassword('')
    setPhone('')
  }

  function switchToRegister() {
    openRegister()
    setError(null)
    setStep('choose')
  }

  function goBack() {
    setStep('choose')
    setError(null)
  }

  async function handleSubmitEmail(e: FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password) return
    setError(null)
    setIsPending(true)
    try {
      await login({ username: username.trim(), password })
      toast.success('Добро пожаловать в MedVet!')
      handleClose()
      navigate('/cabinet', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
    } finally {
      setIsPending(false)
    }
  }

  function handleSubmitPhone(e: FormEvent) {
    e.preventDefault()
    toast.info('Вход по номеру телефона — скоро')
  }

  const footer = (
    <p className="text-sm text-center text-neutral-400 w-full">
      Нет аккаунта?{' '}
      <Button
        type="button"
        variant="ghost"
        className="inline h-auto min-w-0 p-0 font-medium text-emerald-600 underline-offset-2 hover:underline"
        onPress={switchToRegister}
      >
        Зарегистрироваться
      </Button>
    </p>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="sm"
      icon={
        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
          <HeartPulse className="size-5 text-emerald-600" />
        </div>
      }
      title={
        step === 'choose'
          ? 'Войти в MedVet'
          : step === 'email'
            ? 'Войти по почте'
            : 'Войти по номеру'
      }
      footer={footer}
    >
      <div className="flex flex-col gap-4 px-1">
        {step !== 'choose' && (
          <Button
            type="button"
            variant="ghost"
            className="-ml-2 h-auto justify-start gap-1.5 px-2 py-1 text-sm text-neutral-500"
            onPress={goBack}
          >
            <ArrowLeft className="size-4" />
            Назад
          </Button>
        )}

        {step === 'choose' && (
          <>
            <AuthOAuthButtons />
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-divider" />
              <span className="text-xs text-muted">или</span>
              <div className="flex-1 h-px bg-divider" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
                onPress={() => setStep('email')}
              >
                <Envelope className="size-4" />
                Войти по почте
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
                onPress={() => setStep('phone')}
              >
                <Smartphone className="size-4" />
                Войти по номеру телефона
              </Button>
            </div>
          </>
        )}

        {step === 'email' && (
          <form onSubmit={handleSubmitEmail} className="flex flex-col gap-4">
            <TextField
              name="username"
              isRequired
              isDisabled={isPending}
              onChange={setUsername}
            >
              <Label>Имя пользователя или email</Label>
              <Input placeholder="admin" value={username} autoComplete="username" />
            </TextField>
            <TextField name="password" isRequired isDisabled={isPending} onChange={setPassword}>
              <Label>Пароль</Label>
              <PasswordInput
                placeholder="••••••••"
                value={password}
                autoComplete="current-password"
              />
            </TextField>
            {error && (
              <p className="text-sm text-danger-500 rounded-lg bg-danger-50 px-3 py-2">{error}</p>
            )}
            <Button
              type="submit"
              variant="primary"
              className="w-full btn-gradient mt-1"
              isDisabled={isPending || !username.trim() || !password}
              isPending={isPending}
            >
              Войти
            </Button>
          </form>
        )}

        {step === 'phone' && (
          <form onSubmit={handleSubmitPhone} className="flex flex-col gap-4">
            <TextField name="phone" isRequired isDisabled={isPending} onChange={setPhone}>
              <Label>Номер телефона</Label>
              <PhoneInput value={phone} placeholder="+7 (___) ___-__-__" />
            </TextField>
            <TextField name="password" isRequired isDisabled={isPending} onChange={setPassword}>
              <Label>Пароль</Label>
              <PasswordInput
                placeholder="••••••••"
                value={password}
                autoComplete="current-password"
              />
            </TextField>
            {error && (
              <p className="text-sm text-danger-500 rounded-lg bg-danger-50 px-3 py-2">{error}</p>
            )}
            <Button
              type="submit"
              variant="primary"
              className="w-full btn-gradient mt-1"
              isDisabled={isPending}
              isPending={isPending}
            >
              Войти
            </Button>
          </form>
        )}
      </div>
    </Modal>
  )
}
