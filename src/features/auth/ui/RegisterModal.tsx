import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonPlus, ArrowLeft, Envelope, Smartphone } from '@gravity-ui/icons'
import { Description, FieldError } from '@heroui/react'
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

type RegisterStep = 'choose' | 'email' | 'phone'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function RegisterModal() {
  const navigate = useNavigate()
  const { modal, close, openLogin } = useAuthModalStore()
  const { register } = useAuth()

  const [step, setStep] = useState<RegisterStep>('choose')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const isOpen = modal === 'register'

  const isUsernameInvalid = username.length > 0 && username.trim().length < 3
  const isEmailInvalid = email.length > 0 && !isValidEmail(email)
  const isConfirmInvalid = confirmPassword.length > 0 && confirmPassword !== password

  function handleClose() {
    close()
    setStep('choose')
    setError(null)
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setPhone('')
  }

  function switchToLogin() {
    openLogin()
    setError(null)
    setStep('choose')
  }

  function goBack() {
    setStep('choose')
    setError(null)
  }

  function validateEmail(): string | null {
    if (!username.trim()) return 'Укажите имя пользователя'
    if (username.trim().length < 3) return 'Имя пользователя — минимум 3 символа'
    if (!email.trim()) return 'Укажите email'
    if (!isValidEmail(email.trim())) return 'Введите корректный email'
    if (!password) return 'Введите пароль'
    if (password.length < 6) return 'Пароль — минимум 6 символов'
    if (password !== confirmPassword) return 'Пароли не совпадают'
    return null
  }

  async function handleSubmitEmail(e: FormEvent) {
    e.preventDefault()
    const validationError = validateEmail()
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    setIsPending(true)
    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
        name: name.trim() || undefined,
      })
      toast.success('Аккаунт создан! Добро пожаловать в MedVet 🎉')
      handleClose()
      navigate('/cabinet', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
    } finally {
      setIsPending(false)
    }
  }

  function handleSubmitPhone(e: FormEvent) {
    e.preventDefault()
    toast.info('Регистрация по номеру телефона — скоро')
  }

  const canSubmitEmail =
    username.trim().length >= 3 &&
    isValidEmail(email.trim()) &&
    password.length >= 6 &&
    confirmPassword === password

  const footer = (
    <p className="text-sm text-center text-neutral-400 w-full">
      Уже есть аккаунт?{' '}
      <Button
        type="button"
        variant="ghost"
        className="inline h-auto min-w-0 p-0 font-medium text-emerald-600 underline-offset-2 hover:underline"
        onPress={switchToLogin}
      >
        Войти
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
          <PersonPlus className="size-5 text-emerald-600" />
        </div>
      }
      title={
        step === 'choose'
          ? 'Создать аккаунт'
          : step === 'email'
            ? 'Регистрация по почте'
            : 'Регистрация по номеру'
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
                Зарегистрироваться по почте
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
                onPress={() => setStep('phone')}
              >
                <Smartphone className="size-4" />
                Зарегистрироваться по номеру
              </Button>
            </div>
          </>
        )}

        {step === 'email' && (
          <form onSubmit={handleSubmitEmail} className="flex flex-col gap-3.5">
            <TextField name="name" isDisabled={isPending} onChange={setName}>
              <Label>Имя</Label>
              <Input placeholder="Алексей Иванов" value={name} autoComplete="name" />
              <Description>Необязательно</Description>
            </TextField>

            <TextField
              name="username"
              isRequired
              isDisabled={isPending}
              isInvalid={isUsernameInvalid}
              onChange={setUsername}
            >
              <Label>Имя пользователя</Label>
              <Input placeholder="alexeyivanov" value={username} autoComplete="username" />
              {isUsernameInvalid && <FieldError>Минимум 3 символа</FieldError>}
            </TextField>

            <TextField
              name="email"
              isRequired
              isDisabled={isPending}
              isInvalid={isEmailInvalid}
              onChange={setEmail}
              type="email"
            >
              <Label>Email</Label>
              <Input placeholder="alex@example.com" value={email} autoComplete="email" />
              {isEmailInvalid && <FieldError>Введите корректный email</FieldError>}
            </TextField>

            <TextField name="password" isRequired isDisabled={isPending} onChange={setPassword}>
              <Label>Пароль</Label>
              <PasswordInput
                placeholder="Минимум 6 символов"
                value={password}
                autoComplete="new-password"
              />
            </TextField>

            <TextField
              name="confirmPassword"
              isRequired
              isDisabled={isPending}
              isInvalid={isConfirmInvalid}
              onChange={setConfirmPassword}
            >
              <Label>Подтвердить пароль</Label>
              <PasswordInput
                placeholder="••••••••"
                value={confirmPassword}
                autoComplete="new-password"
              />
              {isConfirmInvalid && <FieldError>Пароли не совпадают</FieldError>}
            </TextField>

            {error && (
              <p className="text-sm text-danger-500 rounded-lg bg-danger-50 px-3 py-2">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full btn-gradient mt-1"
              isDisabled={isPending || !canSubmitEmail}
              isPending={isPending}
            >
              Зарегистрироваться
            </Button>
          </form>
        )}

        {step === 'phone' && (
          <form onSubmit={handleSubmitPhone} className="flex flex-col gap-4">
            <TextField name="phone" isRequired isDisabled={isPending} onChange={setPhone}>
              <Label>Номер телефона</Label>
              <PhoneInput value={phone} placeholder="+7 (___) ___-__-__" />
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
              Зарегистрироваться
            </Button>
          </form>
        )}
      </div>
    </Modal>
  )
}
