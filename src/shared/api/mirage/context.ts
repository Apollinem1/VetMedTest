import type { StoredUser } from './fixtures/users'
import type { Pet } from './fixtures/pets'
import type { Visit } from './fixtures/visits'
import { clinicsFixture } from './fixtures/clinics'
import { companiesFixture } from './fixtures/companies'
import { vetBranchesFixture } from './fixtures/clinics'
import { visitsFixture } from './fixtures/visits'
import { petAccessFixture } from './fixtures/pet-access'
import { appointmentsFixture } from './fixtures/appointments'
import { extractToken, getUserIdFromToken, toPublicUser } from './helpers'

export interface MirageContext {
  users: StoredUser[]
  pets: Pet[]
  getCurrentUser: (request: { requestHeaders: Record<string, string> }) => StoredUser | null
  enrichVisit: (visit: Visit) => Visit & { clinicName: string | null; branchName: string | null; vetName: string | null; petName: string | null }
  toPublicUser: (user: StoredUser) => ReturnType<typeof toPublicUser>
  fixtures: {
    companiesFixture: typeof companiesFixture
    clinicsFixture: typeof clinicsFixture
    vetBranchesFixture: typeof vetBranchesFixture
    visitsFixture: typeof visitsFixture
    petAccessFixture: typeof petAccessFixture
    appointmentsFixture: typeof appointmentsFixture
  }
}

export function createContext(users: StoredUser[], pets: Pet[]): MirageContext {
  return {
    users,
    pets,
    getCurrentUser(request) {
      const token = extractToken(request)
      if (!token) return null
      const userId = getUserIdFromToken(token)
      const found = users.find((u) => u.id === userId)
      return found ?? null
    },
    enrichVisit(visit) {
      const branch = clinicsFixture.flatMap((c) => c.branches).find((b) => b.id === visit.branchId)
      const clinic = branch ? clinicsFixture.find((c) => c.branches.some((b) => b.id === branch.id)) ?? null : null
      const vet = users.find((u) => u.id === visit.vetId)
      const pet = pets.find((p) => p.id === visit.petId)
      return {
        ...visit,
        clinicName: clinic?.name ?? null,
        branchName: branch?.name ?? null,
        vetName: vet?.name ?? null,
        petName: pet?.name ?? null,
      }
    },
    toPublicUser,
    fixtures: {
      companiesFixture,
      clinicsFixture,
      vetBranchesFixture,
      visitsFixture,
      petAccessFixture,
      appointmentsFixture,
    },
  }
}
