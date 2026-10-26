import type { CreatePetBody } from '@/shared/api/cabinet'
import type { PetOwnerFormValues } from './types'

export function mapPetFormToCreateBody(v: PetOwnerFormValues): CreatePetBody {
  return {
    name: v.name.trim(),
    species: v.species.trim() || undefined,
    breed: v.breed.trim() || undefined,
    sex: v.sex,
    birthDate: v.birthDate ?? undefined,
    birthYear: v.birthDate ? null : (v.birthYear ?? undefined),
    weightKg: v.weightKg ?? undefined,
    nextVaccinationDate: v.nextVaccinationDate ?? undefined,
    nextDewormingDate: v.nextDewormingDate ?? undefined,
    nextFleaDate: v.nextFleaDate ?? undefined,
    photoUrl: v.photoUrl ?? undefined,
  }
}
