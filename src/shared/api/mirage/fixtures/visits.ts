export interface Visit {
  id: string
  petId: string
  vetId: string
  branchId: string
  visitDate: string
  weightKg: number | null
  symptoms: string | null
  diagnosis: string | null
  recommendations: string | null
  source: 'vet_system' | 'owner_reported' | 'ocr_auto' | 'imported'
  isVerified: boolean
}

export const visitsFixture: Visit[] = [
  {
    id: 'v1',
    petId: 'p1',
    vetId: '4',
    branchId: 'br1',
    visitDate: '2025-02-15T10:00:00Z',
    weightKg: 5.1,
    symptoms: 'Вялость, снижение аппетита',
    diagnosis: 'Острая респираторная инфекция',
    recommendations: 'Покой, тёплое питьё, контроль температуры',
    source: 'vet_system',
    isVerified: true,
  },
  {
    id: 'v2',
    petId: 'p2',
    vetId: '4',
    branchId: 'br1',
    visitDate: '2025-02-20T14:30:00Z',
    weightKg: 28,
    symptoms: null,
    diagnosis: 'Плановый осмотр, ревакцинация',
    recommendations: 'Повторная прививка через год',
    source: 'vet_system',
    isVerified: true,
  },
  {
    id: 'v3',
    petId: 'p1',
    vetId: '4',
    branchId: 'br1',
    visitDate: '2025-03-01T09:00:00Z',
    weightKg: 5.2,
    symptoms: null,
    diagnosis: 'Здоров',
    recommendations: null,
    source: 'vet_system',
    isVerified: true,
  },
]
