import type { PetItem } from '@/shared/api/cabinet'

export type PetOwnerFormValues = {
  name: string
  species: string
  breed: string
  sex: 'male' | 'female' | 'unknown'
  birthDate: string | null | undefined
  birthYear: number | null | undefined
  weightKg: number | null | undefined
  nextVaccinationDate: string | null | undefined
  nextDewormingDate: string | null | undefined
  nextFleaDate: string | null | undefined
  photoUrl: string | null | undefined
}

export function petToFormValues(p: PetItem): PetOwnerFormValues {
  return {
    name: p.name,
    species: p.species ?? '',
    breed: p.breed ?? '',
    sex: (p.sex as PetOwnerFormValues['sex']) ?? 'unknown',
    birthDate: p.birthDate,
    birthYear: p.birthYear,
    weightKg: p.weightKg,
    nextVaccinationDate: p.nextVaccinationDate,
    nextDewormingDate: p.nextDewormingDate,
    nextFleaDate: p.nextFleaDate ?? undefined,
    photoUrl: p.photoUrl,
  }
}

export function emptyPetFormValues(): PetOwnerFormValues {
  return {
    name: '',
    species: '',
    breed: '',
    sex: 'unknown',
    birthDate: undefined,
    birthYear: undefined,
    weightKg: undefined,
    nextVaccinationDate: undefined,
    nextDewormingDate: undefined,
    nextFleaDate: undefined,
    photoUrl: undefined,
  }
}
