import { useState } from 'react'
import { InputGroup, Button } from '@heroui/react'
import type { InputGroupRootProps } from '@heroui/react'
import type { InputGroupInputProps } from '@heroui/react'
import { cn } from '../../lib'

export interface PasswordInputProps extends Omit<InputGroupInputProps, 'type'> {
  className?: string
  inputClassName?: string
  variant?: InputGroupRootProps['variant']
}

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeSlashIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
)

export function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { className, inputClassName, variant, ...inputProps } = props

  return (
    <InputGroup className={cn(className)} variant={variant ?? 'primary'}>
      <InputGroup.Input
        type={isVisible ? 'text' : 'password'}
        className={cn(inputClassName)}
        autoComplete="current-password"
        {...inputProps}
      />
      <InputGroup.Suffix>
        <Button
          type="button"
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
          onPress={() => setIsVisible((v) => !v)}
        >
          {isVisible ? (
            <EyeSlashIcon className="text-default-500" />
          ) : (
            <EyeIcon className="text-default-500" />
          )}
        </Button>
      </InputGroup.Suffix>
    </InputGroup>
  )
}
