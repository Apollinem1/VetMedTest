import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { today, getLocalTimeZone, CalendarDate, type DateValue } from '@internationalized/date'
import { DatePicker } from './DatePicker'
import { DateRangePicker } from './DateRangePicker'
import type { DateRange } from './DateRangePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Core/UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta

// ─── DatePicker ──────────────────────────────────────────────────────────────

/** По умолчанию */
export const Default: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DatePicker label="Дата" />
    </div>
  ),
}

/** С описанием */
export const WithDescription: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DatePicker
        label="Дата рождения"
        description="В формате дд.мм.гггг"
      />
    </div>
  ),
}

/** Контролируемый */
export const Controlled: StoryObj = {
  render: () => {
    const [value, setValue] = useState<DateValue>(today(getLocalTimeZone()))
    return (
      <div className="flex flex-col gap-2 bg-background p-4">
        <DatePicker label="Дата поездки" value={value} onChange={(v) => v && setValue(v)} />
        <p className="text-sm text-muted">
          Выбрано: <strong>{value.toString()}</strong>
        </p>
      </div>
    )
  },
}

/** С ограничениями по датам */
export const WithMinMax: StoryObj = {
  render: () => {
    const todayDate = today(getLocalTimeZone())
    return (
      <div className="bg-background p-4">
        <DatePicker
          label="Дата встречи"
          description="Только текущий месяц"
          minValue={todayDate.set({ day: 1 })}
          maxValue={todayDate.set({ day: todayDate.calendar.getDaysInMonth(todayDate) })}
          defaultValue={todayDate}
        />
      </div>
    )
  },
}

/** На всю ширину */
export const FullWidth: StoryObj = {
  render: () => (
    <div className="w-full max-w-sm bg-background p-4">
      <DatePicker label="Дата" fullWidth />
    </div>
  ),
}

/** Невалидное состояние */
export const Invalid: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DatePicker
        label="Дата"
        isInvalid
        errorMessage="Выберите корректную дату"
        defaultValue={new CalendarDate(2000, 1, 1)}
      />
    </div>
  ),
}

/** Отключено */
export const Disabled: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DatePicker
        label="Дата (недоступно)"
        isDisabled
        defaultValue={today(getLocalTimeZone())}
      />
    </div>
  ),
}

/** Только для чтения */
export const ReadOnly: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DatePicker
        label="Дата регистрации"
        isReadOnly
        defaultValue={new CalendarDate(2024, 3, 15)}
      />
    </div>
  ),
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

/** Диапазон — по умолчанию */
export const Range: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DateRangePicker label="Период" />
    </div>
  ),
}

/** Диапазон — с описанием */
export const RangeWithDescription: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DateRangePicker
        label="Период отпуска"
        description="Выберите начало и конец отпуска"
      />
    </div>
  ),
}

/** Диапазон — контролируемый */
export const RangeControlled: StoryObj = {
  render: () => {
    const todayDate = today(getLocalTimeZone())
    const [range, setRange] = useState<DateRange>({
      start: todayDate,
      end: todayDate.add({ weeks: 1 }),
    })
    return (
      <div className="flex flex-col gap-2 bg-background p-4">
        <DateRangePicker label="Командировка" value={range} onChange={(r) => r && setRange(r)} />
        <p className="text-sm text-muted">
          С <strong>{range.start.toString()}</strong> по{' '}
          <strong>{range.end.toString()}</strong>
        </p>
      </div>
    )
  },
}

/** Диапазон — на всю ширину */
export const RangeFullWidth: StoryObj = {
  render: () => (
    <div className="w-full max-w-lg bg-background p-4">
      <DateRangePicker label="Период" fullWidth />
    </div>
  ),
}

/** Диапазон — невалидное */
export const RangeInvalid: StoryObj = {
  render: () => (
    <div className="bg-background p-4">
      <DateRangePicker
        label="Период"
        isInvalid
        errorMessage="Дата окончания не может быть раньше даты начала"
      />
    </div>
  ),
}

/** Диапазон — отключено */
export const RangeDisabled: StoryObj = {
  render: () => {
    const todayDate = today(getLocalTimeZone())
    return (
      <div className="bg-background p-4">
        <DateRangePicker
          label="Период (недоступно)"
          isDisabled
          defaultValue={{ start: todayDate, end: todayDate.add({ weeks: 2 }) }}
        />
      </div>
    )
  },
}

// ─── Темы ─────────────────────────────────────────────────────────────────────

/** Тёмная тема */
export const DarkTheme: StoryObj = {
  parameters: { globals: { theme: 'dark' } },
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-6">
      <DatePicker label="Дата" />
      <DatePicker
        label="Дата рождения"
        description="В формате дд.мм.гггг"
        defaultValue={new CalendarDate(1990, 6, 15)}
      />
      <DatePicker label="Дата" isInvalid errorMessage="Выберите корректную дату" />
      <DatePicker label="Дата" isDisabled defaultValue={today(getLocalTimeZone())} />
      <DateRangePicker label="Период" />
      <DateRangePicker
        label="Период отпуска"
        description="Начало и конец"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 1 }),
        }}
      />
    </div>
  ),
}

/** Светлая тема */
export const LightTheme: StoryObj = {
  parameters: { globals: { theme: 'light' } },
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-6">
      <DatePicker label="Дата" />
      <DatePicker
        label="Дата рождения"
        description="В формате дд.мм.гггг"
        defaultValue={new CalendarDate(1990, 6, 15)}
      />
      <DatePicker label="Дата" isInvalid errorMessage="Выберите корректную дату" />
      <DateRangePicker label="Период" />
      <DateRangePicker
        label="Период отпуска"
        description="Начало и конец"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 1 }),
        }}
      />
    </div>
  ),
}
