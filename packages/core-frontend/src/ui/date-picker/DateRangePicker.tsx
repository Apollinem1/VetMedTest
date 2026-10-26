import {
  DateRangePicker as HeroUIDateRangePicker,
  DateField,
  RangeCalendar,
  Description,
  FieldError,
  Label as HeroUILabel,
} from '@heroui/react'
import type { DateValue } from '@internationalized/date'
import { cn } from '../../lib'

export type DateRange = {
  start: DateValue
  end: DateValue
}

export type DateRangePickerProps = {
  /** Дополнительный CSS-класс на корневом элементе */
  className?: string
  /** Подпись над полем */
  label?: React.ReactNode
  /** Пояснение под полем */
  description?: React.ReactNode
  /** Сообщение об ошибке */
  errorMessage?: React.ReactNode
  value?: DateRange | null
  defaultValue?: DateRange
  onChange?: (range: DateRange | null) => void
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
}

/**
 * Поле выбора диапазона дат с выпадающим календарём.
 *
 * @example
 * <DateRangePicker label="Период отпуска" />
 * <DateRangePicker label="Период" value={range} onChange={setRange} />
 */
export function DateRangePicker({
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
}: DateRangePickerProps) {
  return (
    <HeroUIDateRangePicker
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
    >
      {label && <HeroUILabel>{label}</HeroUILabel>}
      <DateField.Group fullWidth={fullWidth}>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <HeroUIDateRangePicker.RangeSeparator />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <HeroUIDateRangePicker.Trigger>
            <HeroUIDateRangePicker.TriggerIndicator />
          </HeroUIDateRangePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      <HeroUIDateRangePicker.Popover
        style={{
          minWidth: '17.5rem',
          maxWidth: 'min(calc(100vw - 1.5rem), 24rem)',
        }}
      >
        <RangeCalendar aria-label={typeof label === 'string' ? label : 'Выберите диапазон'}>
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.YearPickerTrigger>
              <RangeCalendar.YearPickerTriggerHeading />
              <RangeCalendar.YearPickerTriggerIndicator />
            </RangeCalendar.YearPickerTrigger>
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
          <RangeCalendar.YearPickerGrid>
            <RangeCalendar.YearPickerGridBody>
              {({ year }) => <RangeCalendar.YearPickerCell year={year} />}
            </RangeCalendar.YearPickerGridBody>
          </RangeCalendar.YearPickerGrid>
        </RangeCalendar>
      </HeroUIDateRangePicker.Popover>
    </HeroUIDateRangePicker>
  )
}
