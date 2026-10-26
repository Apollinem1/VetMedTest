import { Response } from 'miragejs'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'

export function registerCompaniesRoutes(server: MirageServer, ctx: MirageContext) {
  const { getCurrentUser, fixtures } = ctx
  const { companiesFixture } = fixtures

  server.get('/companies', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    if (user.role !== 'breeder') return { items: [] }
    return { items: companiesFixture.filter((c) => c.ownerUserId === user.id) }
  })
}
