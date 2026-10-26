import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { HeartPulse, ArrowLeft, Pencil, Heart } from '@gravity-ui/icons'
import { Card } from '@heroui/react'
import { Button } from 'core-frontend'
import { useAuth } from '@/app/providers'
import { fetchPet, updatePet, type PetItem, type UpdatePetBody } from '@/shared/api/cabinet'
import { PetOwnerForm } from '@/features/cabinet/ui/pet-owner-form/PetOwnerForm'
import { petToFormValues, type PetOwnerFormValues } from '@/features/cabinet/ui/pet-owner-form/types'
import { SEX_OPTIONS } from '@/features/cabinet/ui/pet-owner-form/constants'

function formatDate(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'
}

function formValuesToUpdateBody(v: PetOwnerFormValues): UpdatePetBody {
  return {
    name: v.name.trim(),
    species: v.species.trim() || undefined,
    breed: v.breed.trim() || undefined,
    sex: v.sex,
    birthDate: v.birthDate ?? null,
    birthYear: v.birthDate ? null : (v.birthYear ?? null),
    weightKg: v.weightKg ?? null,
    nextVaccinationDate: v.nextVaccinationDate ?? null,
    nextDewormingDate: v.nextDewormingDate ?? null,
    nextFleaDate: v.nextFleaDate ?? null,
    photoUrl: v.photoUrl ?? null,
  }
}

export function PetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuth()
  const [pet, setPet] = useState<PetItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<PetOwnerFormValues | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/cabinet', { replace: true })
      return
    }
    if (!id) {
      navigate('/cabinet', { replace: true })
      return
    }
    setLoading(true)
    setLoadError(null)
    fetchPet(token, id)
      .then((p) => {
        setPet(p)
        setForm(petToFormValues(p))
      })
      .catch((e) => setLoadError(e instanceof Error ? e.message : 'Ошибка'))
      .finally(() => setLoading(false))
  }, [id, token, isAuthenticated, navigate])

  const patchForm = (p: Partial<PetOwnerFormValues>) => setForm((f) => (f ? { ...f, ...p } : f))

  const handleSave = () => {
    if (!token || !id || !form) return
    setSaving(true)
    setSaveError(null)
    updatePet(token, id, formValuesToUpdateBody(form))
      .then((updated) => {
        setPet(updated)
        setForm(petToFormValues(updated))
        setEditing(false)
      })
      .catch((e) => setSaveError(e instanceof Error ? e.message : 'Ошибка сохранения'))
      .finally(() => setSaving(false))
  }

  const handleCancel = () => {
    if (pet) setForm(petToFormValues(pet))
    setSaveError(null)
    setEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 px-4 py-16 text-center text-neutral-500">
        Загрузка…
      </div>
    )
  }
  if (loadError || !pet || !form) {
    return (
      <div className="min-h-screen bg-neutral-50 px-4 py-16 text-center text-red-600">
        {loadError ?? 'Питомец не найден'}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/cabinet" className="flex items-center gap-2 text-emerald-600">
            <HeartPulse className="size-7" />
            <span className="font-semibold">MedVet</span>
          </Link>
          <Link to="/cabinet" className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700">
            <ArrowLeft className="size-4" /> В кабинет
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        {!editing ? (
          <>
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-5">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl shadow-md ring-2 ring-white ring-offset-2 ring-offset-neutral-50">
                  {pet.photoUrl ? (
                    <img src={pet.photoUrl} alt="" className="size-full object-cover" />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-linear-to-br from-emerald-400 via-emerald-500 to-teal-600">
                      <Heart className="size-11 text-white/90 drop-shadow-sm" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl font-semibold tracking-tight">{pet.name}</h1>
                  <p className="mt-0.5 text-sm text-neutral-500">
                    {[pet.species, pet.breed].filter(Boolean).join(' · ') || 'Порода и вид не указаны'}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0 self-start sm:self-center" onPress={() => setEditing(true)}>
                <Pencil className="size-4" /> Редактировать
              </Button>
            </div>

            <Card className="overflow-hidden p-6 shadow-sm ring-1 ring-neutral-200/60 sm:p-8">
              <h2 className="mb-4 text-sm font-semibold text-neutral-900">Карточка</h2>
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-neutral-500">Пол</dt>
                  <dd className="mt-0.5 font-medium">{SEX_OPTIONS.find((o) => o.value === pet.sex)?.label ?? pet.sex}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Дата рождения</dt>
                  <dd className="mt-0.5 font-medium">{formatDate(pet.birthDate)}</dd>
                </div>
                {pet.birthYear != null && (
                  <div>
                    <dt className="text-neutral-500">Год рождения</dt>
                    <dd className="mt-0.5 font-medium">{pet.birthYear}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-neutral-500">Вес</dt>
                  <dd className="mt-0.5 font-medium">{pet.weightKg != null ? `${pet.weightKg} кг` : '—'}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">След. прививка</dt>
                  <dd className="mt-0.5 font-medium">{formatDate(pet.nextVaccinationDate)}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Дегельминтизация</dt>
                  <dd className="mt-0.5 font-medium">{formatDate(pet.nextDewormingDate)}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Обработка от клещей</dt>
                  <dd className="mt-0.5 font-medium">{formatDate(pet.nextFleaDate)}</dd>
                </div>
              </dl>
            </Card>
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl font-semibold">Редактирование</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onPress={handleCancel} isDisabled={saving}>
                  Отмена
                </Button>
                <Button variant="primary" size="sm" onPress={handleSave} isPending={saving} isDisabled={!form.name?.trim()}>
                  Сохранить
                </Button>
              </div>
            </div>
            <Card className="overflow-hidden shadow-sm ring-1 ring-neutral-200/60">
              <div className="p-6 sm:p-8">
                {saveError ? (
                  <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100" role="alert">
                    {saveError}
                  </p>
                ) : null}
                <PetOwnerForm values={form} onChange={patchForm} disabled={saving} />
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
