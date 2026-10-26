import { Response } from 'miragejs'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'
import { companiesFixture } from '../fixtures/companies'

export function registerVisitsRoutes(server: MirageServer, ctx: MirageContext) {
  const { pets, getCurrentUser, enrichVisit, fixtures } = ctx
  const { visitsFixture, petAccessFixture } = fixtures

  server.get('/visits', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })

    const petId = request.queryParams.petId

    if (user.role === 'owner') {
      const myPetIds = pets.filter((p) => p.ownerUserId === user.id).map((p) => p.id)
      let list = visitsFixture.filter((v) => myPetIds.includes(v.petId))
      if (petId) list = list.filter((v) => v.petId === petId)
      return { items: list.sort((a, b) => b.visitDate.localeCompare(a.visitDate)).map(enrichVisit) }
    }

    if (user.role === 'breeder') {
      const company = companiesFixture.find((c) => c.ownerUserId === user.id)
      const companyPetIds = company ? pets.filter((p) => p.ownerCompanyId === company.id).map((p) => p.id) : []
      let list = visitsFixture.filter((v) => companyPetIds.includes(v.petId))
      if (petId) list = list.filter((v) => v.petId === petId)
      return { items: list.sort((a, b) => b.visitDate.localeCompare(a.visitDate)).map(enrichVisit) }
    }

    if (user.role === 'vet') {
      const accessPetIds = petAccessFixture.filter((pa) => pa.grantedToId === user.id && !pa.revokedAt).map((pa) => pa.petId)
      let list = visitsFixture.filter((v) => v.vetId === user.id && accessPetIds.includes(v.petId))
      if (petId) list = list.filter((v) => v.petId === petId)
      return { items: list.sort((a, b) => b.visitDate.localeCompare(a.visitDate)).map(enrichVisit) }
    }

    return { items: [] }
  })
}
