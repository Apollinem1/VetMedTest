import {
  DatePicker as HeroUIDatePicker,
  DateField,
  Calendar,
  Description,
  FieldError,
  Label as HeroUILabel,
} from '@heroui/react'
import type { DateValue } from '@internationalized/date'
import { cn } from '../../lib'

export type DatePickerProps = {
  /** Дополнительный CSS-класс на корневом элементе */
  className?: string
  /** Подпись над полем */
  label?: React.ReactNode
  /** Пояснение под полем */
  description?: React.ReactNode
  /** Сообщение об ошибке */
  errorMessage?: React.ReactNode
  value?: DateValue | null
  defaultValue?: DateValue
  onChange?: (value: DateValue | null) => void
  /** Минимальная допустимая дата */
  minValue?: DateValue
  /** Максимальная допустимая дата */
  maxValue?: DateValue
  /** Растянуть поле на всю ширину */
  fullWidth?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  /** Точность выбора: day | hour | minute | second */
  granularity?: 'day' | 'hour' | 'minute' | 'second'
}

/**
 * Поле выбора одной даты с выпадающим календарём.
 *
 * @example
 * <DatePicker label="Дата рождения" />
 * <DatePicker label="Дата" value={date} onChange={setDate} isInvalid errorMessage="Обязательное поле" />
 */
export function DatePicker({
  className,
  label,
  description,
  errorMessage,
  value,
  defaultValue,
  onChange,
  minValue,
  maxValue,
  fullWidth,
  isDisabled,
  isRequired,
  isReadOnly,
  isInvalid,
  granularity,
}: DatePickerProps) {
  return (
    <HeroUIDatePicker
      className={cn(className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value={value as any}
      defaultValue={defaultValue}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={onChange as any}
      minValue={minValue}
      maxValue={maxValue}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      isInvalid={isInvalid}
      granularity={granularity}
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      <DateField.Group fullWidth={fullWidth}>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <HeroUIDatePicker.Trigger>
            <HeroUIDatePicker.TriggerIndicator />
          </HeroUIDatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      {/* max-width триггера в HeroUI ломает сетку; min/max — инлайн (Tailwind из dist не попадает в CSS приложения) */}
      <HeroUIDatePicker.Popover
        style={{
          minWidth: '17.5rem',
          maxWidth: 'min(calc(100vw - 1.5rem), 24rem)',
        }}
      >
        <Calendar aria-label={typeof label === 'string' ? label : 'Выберите дату'}>
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({ year }) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </HeroUIDatePicker.Popover>
    </HeroUIDatePicker>
  )
}
