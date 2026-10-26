import { Response } from 'miragejs'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'

export function registerAppointmentsRoutes(server: MirageServer, ctx: MirageContext) {
  const { users, pets, getCurrentUser, fixtures } = ctx
  const { appointmentsFixture, clinicsFixture } = fixtures

  server.get('/appointments/today', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    const today = new Date().toISOString().slice(0, 10)
    const list = appointmentsFixture.filter(
      (a) => a.vetId === user.id && a.scheduledAt.startsWith(today) && a.status === 'scheduled',
    )
    return { items: list }
  })

  server.get('/appointments', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    if (user.role !== 'owner') return { items: [] }

    const myPetIds = pets.filter((p) => p.ownerUserId === user.id).map((p) => p.id)
    const todayStart = new Date().toISOString().slice(0, 10) + 'T00:00:00.000Z'
    const list = appointmentsFixture.filter(
      (a) => myPetIds.includes(a.petId) && a.status === 'scheduled' && a.scheduledAt >= todayStart,
    )
    const sorted = list.sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
    const branches = clinicsFixture.flatMap((c) => c.branches)
    const enriched = sorted.map((a) => {
      const branch = branches.find((b) => b.id === a.branchId)
      const clinic = branch ? clinicsFixture.find((c) => c.branches.some((b) => b.id === branch.id)) ?? null : null
      const vet = users.find((u) => u.id === a.vetId)
      return {
        ...a,
        clinicName: clinic?.name ?? null,
        branchName: branch?.name ?? null,
        vetName: vet?.name ?? null,
      }
    })
    return { items: enriched }
  })
}
