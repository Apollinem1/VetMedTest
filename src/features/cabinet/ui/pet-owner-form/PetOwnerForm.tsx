import { DatePicker, Input, Label, Select, TextField } from 'core-frontend'
import { parseIsoToDateValue, dateValueToIsoOptional } from '@/shared/lib'
import { SEX_OPTIONS } from './constants'
import type { PetOwnerFormValues } from './types'
import { PetFormPhoto } from './PetFormPhoto'

type PetOwnerFormProps = {
  values: PetOwnerFormValues
  onChange: (patch: Partial<PetOwnerFormValues>) => void
  /** Поле клички с звёздочкой обязательности */
  nameRequired?: boolean
  disabled?: boolean
}

const currentYear = new Date().getFullYear()

export function PetOwnerForm({ values, onChange, nameRequired, disabled }: PetOwnerFormProps) {
  const hasBirthDate = Boolean(values.birthDate)
  const birthYearDisabled = hasBirthDate || disabled

  return (
    <div className="space-y-10">
      <section aria-labelledby="pet-form-main-heading">
        <div className="mb-5 flex flex-col gap-1">
          <h2 id="pet-form-main-heading" className="text-base font-semibold text-neutral-900">
            Основное
          </h2>
          <p className="text-sm text-neutral-500">Кличка обязательна, остальное можно позже</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <PetFormPhoto
            photoUrl={values.photoUrl}
            onChange={(url) => onChange({ photoUrl: url })}
            disabled={disabled}
          />

          <div className="min-w-0 flex-1 space-y-5">
            <TextField
              name="name"
              isRequired={nameRequired}
              value={values.name}
              onChange={(v) => onChange({ name: v })}
            >
              <Label>Кличка</Label>
              <Input
                placeholder="Как зовут питомца"
                value={values.name}
                onChange={(e) => onChange({ name: e.target.value })}
                disabled={disabled}
              />
            </TextField>

            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="species" value={values.species} onChange={(v) => onChange({ species: v })}>
                <Label>Вид</Label>
                <Input
                  placeholder="Кошка, собака…"
                  value={values.species}
                  onChange={(e) => onChange({ species: e.target.value })}
                  disabled={disabled}
                />
              </TextField>
              <TextField name="breed" value={values.breed} onChange={(v) => onChange({ breed: v })}>
                <Label>Порода</Label>
                <Input
                  placeholder="Если знаете"
                  value={values.breed}
                  onChange={(e) => onChange({ breed: e.target.value })}
                  disabled={disabled}
                />
              </TextField>
              <Select
                label="Пол"
                selectedKey={values.sex}
                onChange={(key) =>
                  onChange({ sex: ((key ?? 'unknown') as PetOwnerFormValues['sex']) || 'unknown' })
                }
                options={[...SEX_OPTIONS]}
                isDisabled={disabled}
              />
              <TextField
                name="weightKg"
                value={values.weightKg != null ? String(values.weightKg) : ''}
                onChange={(v) => onChange({ weightKg: v ? Number(v) : null })}
              >
                <Label>Вес, кг</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.1}
                  placeholder="—"
                  value={values.weightKg != null ? String(values.weightKg) : ''}
                  onChange={(e) =>
                    onChange({ weightKg: e.target.value ? Number(e.target.value) : null })
                  }
                  disabled={disabled}
                />
              </TextField>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DatePicker
                label="Дата рождения"
                description={hasBirthDate ? undefined : 'Если дня нет — укажите только год справа'}
                value={parseIsoToDateValue(values.birthDate)}
                onChange={(v) => {
                  const iso = dateValueToIsoOptional(v)
                  onChange({ birthDate: iso ?? null, birthYear: iso ? null : values.birthYear })
                }}
                fullWidth
                isDisabled={disabled}
              />
              <TextField
                name="birthYear"
                value={values.birthYear != null ? String(values.birthYear) : ''}
                onChange={() => {}}
              >
                <Label>Год рождения</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Например, 2022"
                  min={1980}
                  max={currentYear}
                  value={values.birthYear != null ? String(values.birthYear) : ''}
                  onChange={(e) => {
                    const raw = e.target.value
                    if (!raw) {
                      onChange({ birthYear: null })
                      return
                    }
                    const y = Number(raw)
                    onChange({
                      birthYear: Number.isFinite(y) ? y : null,
                      birthDate: null,
                    })
                  }}
                  disabled={birthYearDisabled}
                />
              </TextField>
            </div>
            {hasBirthDate ? (
              <p className="text-xs text-neutral-500">Год не нужен, если указана полная дата</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-10" aria-labelledby="pet-form-reminders-heading">
        <div className="mb-5 flex flex-col gap-1">
          <h2 id="pet-form-reminders-heading" className="text-base font-semibold text-neutral-900">
            Напоминания
          </h2>
          <p className="text-sm text-neutral-500">Ближайшие плановые даты — необязательно</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <DatePicker
            label="Следующая прививка"
            value={parseIsoToDateValue(values.nextVaccinationDate)}
            onChange={(v) => onChange({ nextVaccinationDate: dateValueToIsoOptional(v) ?? null })}
            fullWidth
            isDisabled={disabled}
          />
          <DatePicker
            label="Дегельминтизация"
            value={parseIsoToDateValue(values.nextDewormingDate)}
            onChange={(v) => onChange({ nextDewormingDate: dateValueToIsoOptional(v) ?? null })}
            fullWidth
            isDisabled={disabled}
          />
          <DatePicker
            label="Обработка от клещей"
            value={parseIsoToDateValue(values.nextFleaDate)}
            onChange={(v) => onChange({ nextFleaDate: dateValueToIsoOptional(v) ?? null })}
            fullWidth
            isDisabled={disabled}
          />
        </div>
      </section>
    </div>
  )
}
