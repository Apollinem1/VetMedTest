import {
  TextField as HeroUITextField,
  TextArea as HeroUITextArea,
  Description,
  FieldError,
  Label as HeroUILabel,
} from '@heroui/react'
import { cn } from '../../lib'

export type TextareaProps = {
  /** Дополнительный CSS-класс на корневом элементе */
  className?: string
  /** Подпись над полем */
  label?: React.ReactNode
  /** Пояснение под полем */
  description?: React.ReactNode
  /** Текст ошибки валидации */
  errorMessage?: React.ReactNode
  placeholder?: string
  /** Количество видимых строк */
  rows?: number
  /** Растянуть на всю ширину контейнера */
  fullWidth?: boolean
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
}

/**
 * Многострочное текстовое поле с подписью, описанием и сообщением об ошибке.
 *
 * @example
 * <Textarea label="Комментарий" placeholder="Введите текст..." rows={4} />
 * <Textarea label="Отзыв" isInvalid errorMessage="Обязательное поле" />
 */
export function Textarea({
  className,
  label,
  description,
  errorMessage,
  placeholder,
  rows,
  fullWidth,
  name,
  value,
  defaultValue,
  onChange,
  isDisabled,
  isRequired,
  isReadOnly,
  isInvalid,
}: TextareaProps) {
  return (
    <HeroUITextField
      className={cn(className)}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      isInvalid={isInvalid}
      fullWidth={fullWidth}
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      <HeroUITextArea placeholder={placeholder} rows={rows} />
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </HeroUITextField>
  )
}
