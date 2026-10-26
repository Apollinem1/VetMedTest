export interface Company {
  id: string
  name: string
  legalName: string | null
  type: 'breeder' | 'farm' | 'enterprise' | 'other'
  ownerUserId: string
  petsCount: number
  employeesCount: number
}

export const companiesFixture: Company[] = [
  {
    id: 'c1',
    name: 'ООО Агрохолдинг',
    legalName: 'ООО "Агрохолдинг"',
    type: 'breeder',
    ownerUserId: '3',
    petsCount: 3,
    employeesCount: 2,
  },
]
