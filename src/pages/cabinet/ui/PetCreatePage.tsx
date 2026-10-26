import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HeartPulse, ArrowLeft } from '@gravity-ui/icons'
import { Card } from '@heroui/react'
import { Button } from 'core-frontend'
import { useAuth } from '@/app/providers'
import { createPet } from '@/shared/api/cabinet'
import { PetOwnerForm } from '@/features/cabinet/ui/pet-owner-form/PetOwnerForm'
import { emptyPetFormValues, type PetOwnerFormValues } from '@/features/cabinet/ui/pet-owner-form/types'
import { mapPetFormToCreateBody } from '@/features/cabinet/ui/pet-owner-form/mapToCreateBody'

export function PetCreatePage() {
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuth()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<PetOwnerFormValues>(emptyPetFormValues)

  if (!isAuthenticated || !token) {
    navigate('/cabinet', { replace: true })
    return null
  }

  const patchForm = (p: Partial<PetOwnerFormValues>) => setForm((f) => ({ ...f, ...p }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name?.trim()) return
    setSaving(true)
    setError(null)
    createPet(token, mapPetFormToCreateBody({ ...form, name: form.name.trim() }))
      .then((pet) => navigate(`/cabinet/pet/${pet.id}`, { replace: true }))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Ошибка создания')
        setSaving(false)
      })
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
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Новый питомец</h1>
          <p className="mt-1 text-sm text-neutral-500">Заполните карточку — напоминания и фото можно менять в любой момент</p>
        </div>

        <Card className="overflow-hidden shadow-sm ring-1 ring-neutral-200/60">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {error ? (
              <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100" role="alert">
                {error}
              </p>
            ) : null}
            <PetOwnerForm values={form} onChange={patchForm} nameRequired disabled={saving} />
            <div className="mt-10 flex flex-wrap gap-3 border-t border-neutral-200 pt-8">
              <Button type="submit" variant="primary" isPending={saving} isDisabled={!form.name?.trim()}>
                Сохранить питомца
              </Button>
              <Button type="button" variant="ghost" onPress={() => navigate('/cabinet')} isDisabled={saving}>
                Отмена
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
