import { Response } from 'miragejs'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'

export function registerCabinetRoutes(server: MirageServer, ctx: MirageContext) {
  const { users, pets, getCurrentUser, fixtures } = ctx
  const { visitsFixture, companiesFixture, clinicsFixture, vetBranchesFixture, petAccessFixture, appointmentsFixture } = fixtures

  server.get('/cabinet/dashboard', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })

    if (user.role === 'owner') {
      const myPets = pets.filter((p) => p.ownerUserId === user.id)
      const nextVacc = myPets
        .filter((p) => p.nextVaccinationDate)
        .map((p) => ({ petId: p.id, petName: p.name, date: p.nextVaccinationDate }))
        .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))
        .slice(0, 3)
      return {
        role: 'owner',
        userName: user.name,
        petsCount: myPets.length,
        nextVaccinations: nextVacc,
        recentVisitsCount: visitsFixture.filter((v) => myPets.some((p) => p.id === v.petId)).length,
      }
    }

    if (user.role === 'breeder') {
      const company = companiesFixture.find((c) => c.ownerUserId === user.id)
      const companyPets = company ? pets.filter((p) => p.ownerCompanyId === company.id) : []
      return {
        role: 'breeder',
        userName: user.name,
        companyName: company?.name ?? null,
        companyId: company?.id ?? null,
        petsCount: companyPets.length,
        employeesCount: company?.employeesCount ?? 0,
        nextVaccinations: companyPets
          .filter((p) => p.nextVaccinationDate)
          .map((p) => ({ petId: p.id, petName: p.name, date: p.nextVaccinationDate }))
          .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))
          .slice(0, 5),
      }
    }

    if (user.role === 'vet') {
      const vetBranch = vetBranchesFixture.find((vb) => vb.vetId === user.id)
      const branchId = vetBranch?.branchId ?? null
      const accessPetIds =
        branchId
          ? petAccessFixture
              .filter((pa) => pa.grantedToId === user.id && pa.branchId === branchId && !pa.revokedAt)
              .map((pa) => pa.petId)
          : []
      const branch = branchId ? clinicsFixture.flatMap((c) => c.branches).find((b) => b.id === branchId) : null
      const clinic = branch ? clinicsFixture.find((c) => c.branches.some((b) => b.id === branch.id)) ?? null : null
      const today = new Date().toISOString().slice(0, 10)
      const todayAppointments = appointmentsFixture.filter(
        (a) => a.vetId === user.id && a.scheduledAt.startsWith(today) && a.status === 'scheduled',
      )
      const recentVisits = visitsFixture
        .filter((v) => v.vetId === user.id && accessPetIds.includes(v.petId))
        .sort((a, b) => b.visitDate.localeCompare(a.visitDate))
        .slice(0, 5)
      return {
        role: 'vet',
        userName: user.name,
        branchId,
        branchName: branch?.name ?? null,
        clinicName: clinic?.name ?? null,
        position: vetBranch?.position ?? null,
        petsWithAccessCount: accessPetIds.length,
        todayAppointments,
        recentVisits,
      }
    }

    if (user.role === 'admin') {
      return {
        role: 'admin',
        userName: user.name,
        usersCount: users.length,
        clinicsCount: clinicsFixture.length,
      }
    }

    return { role: user.role, userName: user.name }
  })
}
