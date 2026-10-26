import { CalendarDate, parseDate } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'

export function parseIsoToDateValue(iso: string | null | undefined): DateValue | null {
  if (!iso) return null
  const d = iso.slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null
  try {
    return parseDate(d)
  } catch {
    return null
  }
}

export function dateValueToIso(v: DateValue | null): string | null {
  if (!v) return null
  if (v instanceof CalendarDate) return v.toString()
  return `${v.year}-${String(v.month).padStart(2, '0')}-${String(v.day).padStart(2, '0')}`
}

export function dateValueToIsoOptional(v: DateValue | null): string | undefined {
  const s = dateValueToIso(v)
  return s ?? undefined
}
