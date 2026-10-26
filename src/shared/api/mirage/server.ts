import { createServer } from 'miragejs'
import { usersFixture } from './fixtures/users'
import { petsFixture, type Pet } from './fixtures/pets'
import type { StoredUser } from './fixtures/users'
import { createContext } from './context'
import {
  registerAuthRoutes,
  registerCitiesRoutes,
  registerCabinetRoutes,
  registerPetsRoutes,
  registerVisitsRoutes,
  registerCompaniesRoutes,
  registerClinicsRoutes,
  registerAppointmentsRoutes,
  registerUsersRoutes,
} from './routes'

export type { MirageServer } from './types'

export function makeServer({ environment = 'development' }: { environment?: string } = {}) {
  const users: StoredUser[] = [...usersFixture]
  const pets: Pet[] = petsFixture.map((p) => ({ ...p }))
  const ctx = createContext(users, pets)

  return createServer({
    environment,

    routes() {
      this.namespace = 'api'
      this.timing = 300

      registerAuthRoutes(this, ctx)
      registerCitiesRoutes(this)
      registerCabinetRoutes(this, ctx)
      registerPetsRoutes(this, ctx)
      registerVisitsRoutes(this, ctx)
      registerCompaniesRoutes(this, ctx)
      registerClinicsRoutes(this, ctx)
      registerAppointmentsRoutes(this, ctx)
      registerUsersRoutes(this, ctx)
    },
  })
}
