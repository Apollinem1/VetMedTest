import { Response } from 'miragejs'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'

export function registerClinicsRoutes(server: MirageServer, ctx: MirageContext) {
  const { getCurrentUser, fixtures } = ctx
  const { clinicsFixture, vetBranchesFixture } = fixtures

  server.get('/clinics/my-branch', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    if (user.role !== 'vet') return { branch: null, clinic: null }
    const vb = vetBranchesFixture.find((v) => v.vetId === user.id)
    if (!vb) return { branch: null, clinic: null }
    const branchList = clinicsFixture.flatMap((c) => c.branches)
    const branch = branchList.find((b) => b.id === vb.branchId) ?? null
    const clinic = branch ? clinicsFixture.find((c) => c.branches.some((b) => b.id === branch.id)) ?? null : null
    return { branch, clinic, position: vb.position }
  })

  server.get('/clinics', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    if (user.role !== 'admin') return new Response(403, {}, { message: 'Доступ запрещён' })
    return { items: clinicsFixture }
  })
}
