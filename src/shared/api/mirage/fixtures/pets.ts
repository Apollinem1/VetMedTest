export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  sex: 'male' | 'female' | 'unknown'
  birthDate: string | null
  birthYear: number | null
  status: 'active' | 'deceased' | 'transferred' | 'archived'
  ownerUserId: string | null
  ownerCompanyId: string | null
  weightKg: number | null
  nextVaccinationDate: string | null
  nextDewormingDate: string | null
  nextFleaDate: string | null
  photoUrl: string | null
  createdAt: string
}

export const petsFixture: Pet[] = [
  {
    id: 'p1',
    name: 'Тася',
    species: 'Кошка',
    breed: 'Сибирская',
    sex: 'female',
    birthDate: '2021-05-15',
    birthYear: null,
    status: 'active',
    ownerUserId: '2',
    ownerCompanyId: null,
    weightKg: 5.2,
    nextVaccinationDate: '2025-06-01',
    nextDewormingDate: '2025-04-10',
    nextFleaDate: '2025-05-01',
    photoUrl: '/photo_2025-11-05_22-46-43.jpg',
    createdAt: '2023-01-10T10:00:00Z',
  },
  {
    id: 'p2',
    name: 'Шарик',
    species: 'Собака',
    breed: 'Лабрадор',
    sex: 'male',
    birthDate: '2020-03-20',
    birthYear: null,
    status: 'active',
    ownerUserId: '2',
    ownerCompanyId: null,
    weightKg: 28,
    nextVaccinationDate: '2025-05-15',
    nextDewormingDate: '2025-04-01',
    nextFleaDate: null,
    photoUrl: '/photo_2025-07-09_18-32-43.jpg',
    createdAt: '2023-02-01T10:00:00Z',
  },
  {
    id: 'p2b',
    name: 'Мурзик',
    species: 'Кошка',
    breed: 'Британская',
    sex: 'male',
    birthDate: '2022-08-10',
    birthYear: null,
    status: 'active',
    ownerUserId: '2',
    ownerCompanyId: null,
    weightKg: 4.5,
    nextVaccinationDate: '2025-07-01',
    nextDewormingDate: '2025-05-15',
    nextFleaDate: '2025-06-01',
    photoUrl: null,
    createdAt: '2023-06-01T10:00:00Z',
  },
  {
    id: 'p3',
    name: 'Зорька',
    species: 'Корова',
    breed: 'Голштинская',
    sex: 'female',
    birthDate: null,
    birthYear: 2022,
    status: 'active',
    ownerUserId: null,
    ownerCompanyId: 'c1',
    weightKg: 520,
    nextVaccinationDate: '2025-05-01',
    nextDewormingDate: '2025-04-20',
    nextFleaDate: null,
    photoUrl: null,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'p4',
    name: 'Бурёнка-2',
    species: 'Корова',
    breed: 'Симментальская',
    sex: 'female',
    birthDate: null,
    birthYear: 2021,
    status: 'active',
    ownerUserId: null,
    ownerCompanyId: 'c1',
    weightKg: 480,
    nextVaccinationDate: '2025-06-10',
    nextDewormingDate: null,
    nextFleaDate: null,
    photoUrl: null,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'p5',
    name: 'Телёнок №12',
    species: 'КРС',
    breed: 'Голштинская',
    sex: 'male',
    birthDate: '2024-09-01',
    birthYear: null,
    status: 'active',
    ownerUserId: null,
    ownerCompanyId: 'c1',
    weightKg: 95,
    nextVaccinationDate: '2025-03-15',
    nextDewormingDate: '2025-03-01',
    nextFleaDate: null,
    photoUrl: null,
    createdAt: '2024-09-05T10:00:00Z',
  },
]
