export interface Branch {
  id: string
  clinicId: string
  name: string
  address: string
  city: string
  phone: string | null
  isActive: boolean
}

export interface Clinic {
  id: string
  name: string
  status: 'pending' | 'active' | 'suspended'
  branches: Branch[]
}

export const clinicsFixture: Clinic[] = [
  {
    id: 'cl1',
    name: 'Ветклиника Зоодоктор',
    status: 'active',
    branches: [
      {
        id: 'br1',
        clinicId: 'cl1',
        name: 'ул. Ленина, 10',
        address: 'г. Москва, ул. Ленина, д. 10',
        city: 'Москва',
        phone: '+7 (495) 123-45-67',
        isActive: true,
      },
    ],
  },
]

export const vetBranchesFixture: { vetId: string; branchId: string; position: string }[] = [
  { vetId: '4', branchId: 'br1', position: 'Врач-терапевт' },
]
