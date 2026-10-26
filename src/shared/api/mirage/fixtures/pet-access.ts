/** Доступ врача к питомцу (vet видит только питомцев из этого списка по своей точке) */
export interface PetAccess {
  id: string
  petId: string
  grantedToId: string
  branchId: string
  accessType: 'vet' | 'family'
  expiresAt: string | null
  revokedAt: string | null
}

export const petAccessFixture: PetAccess[] = [
  { id: 'pa1', petId: 'p1', grantedToId: '4', branchId: 'br1', accessType: 'vet', expiresAt: null, revokedAt: null },
  { id: 'pa2', petId: 'p2', grantedToId: '4', branchId: 'br1', accessType: 'vet', expiresAt: null, revokedAt: null },
]
