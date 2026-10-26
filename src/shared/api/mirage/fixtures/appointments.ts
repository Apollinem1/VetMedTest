export interface Appointment {
  id: string
  petId: string
  petName: string
  vetId: string
  branchId: string
  scheduledAt: string
  reason: string | null
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
}

/** Моковые записи на сегодня и ближайшие дни */
export const appointmentsFixture: Appointment[] = [
  {
    id: 'a1',
    petId: 'p1',
    petName: 'Барсик',
    vetId: '4',
    branchId: 'br1',
    scheduledAt: new Date().toISOString().slice(0, 10) + 'T10:00:00Z',
    reason: 'Повторный осмотр',
    status: 'scheduled',
  },
  {
    id: 'a2',
    petId: 'p2',
    petName: 'Шарик',
    vetId: '4',
    branchId: 'br1',
    scheduledAt: new Date().toISOString().slice(0, 10) + 'T11:30:00Z',
    reason: 'Вакцинация',
    status: 'scheduled',
  },
]
