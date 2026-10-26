import { Response } from 'miragejs'
import type { Pet } from '../fixtures/pets'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'
import { companiesFixture } from '../fixtures/companies'
import { petAccessFixture } from '../fixtures/pet-access'
import { vetBranchesFixture } from '../fixtures/clinics'

export function registerPetsRoutes(server: MirageServer, ctx: MirageContext) {
  const { pets, getCurrentUser } = ctx

  server.get('/pets', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })

    if (user.role === 'owner') {
      return { items: pets.filter((p) => p.ownerUserId === user.id && p.status === 'active') }
    }
    if (user.role === 'breeder') {
      const company = companiesFixture.find((c) => c.ownerUserId === user.id)
      const list = company ? pets.filter((p) => p.ownerCompanyId === company.id && p.status === 'active') : []
      return { items: list }
    }
    if (user.role === 'vet') {
      const vetBranch = vetBranchesFixture.find((vb) => vb.vetId === user.id)
      const branchId = vetBranch?.branchId
      const accessPetIds = branchId
        ? petAccessFixture
            .filter((pa) => pa.grantedToId === user.id && pa.branchId === branchId && !pa.revokedAt)
            .map((pa) => pa.petId)
        : []
      return { items: pets.filter((p) => accessPetIds.includes(p.id)) }
    }
    return { items: [] }
  })

  server.get('/pets/:id', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    const id = request.params.id
    const pet = pets.find((p) => p.id === id)
    if (!pet) return new Response(404, {}, { message: 'Питомец не найден' })

    if (user.role === 'owner') {
      if (pet.ownerUserId !== user.id) return new Response(404, {}, { message: 'Питомец не найден' })
      return pet
    }
    if (user.role === 'breeder') {
      const company = companiesFixture.find((c) => c.ownerUserId === user.id)
      if (!company || pet.ownerCompanyId !== company.id) return new Response(404, {}, { message: 'Питомец не найден' })
      return pet
    }
    if (user.role === 'vet') {
      const accessPetIds = petAccessFixture.filter((pa) => pa.grantedToId === user.id && !pa.revokedAt).map((pa) => pa.petId)
      if (!accessPetIds.includes(pet.id)) return new Response(404, {}, { message: 'Питомец не найден' })
      return pet
    }
    return new Response(404, {}, { message: 'Питомец не найден' })
  })

  server.post('/pets', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    if (user.role !== 'owner') return new Response(403, {}, { message: 'Доступ запрещён' })

    const body = JSON.parse(request.requestBody) as Partial<Pet>
    const id = String(Date.now())
    const newPet: Pet = {
      id,
      name: body.name ?? 'Без имени',
      species: body.species ?? 'Не указан',
      breed: body.breed ?? '',
      sex: body.sex ?? 'unknown',
      birthDate: body.birthDate ?? null,
      birthYear: body.birthYear ?? null,
      status: 'active',
      ownerUserId: user.id,
      ownerCompanyId: null,
      weightKg: body.weightKg ?? null,
      nextVaccinationDate: body.nextVaccinationDate ?? null,
      nextDewormingDate: body.nextDewormingDate ?? null,
      nextFleaDate: body.nextFleaDate ?? null,
      photoUrl: body.photoUrl ?? null,
      createdAt: new Date().toISOString(),
    }
    pets.push(newPet)
    return new Response(201, {}, newPet)
  })

  server.patch('/pets/:id', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    if (user.role !== 'owner') return new Response(403, {}, { message: 'Доступ запрещён' })

    const id = request.params.id
    const pet = pets.find((p) => p.id === id)
    if (!pet || pet.ownerUserId !== user.id) return new Response(404, {}, { message: 'Питомец не найден' })

    const body = JSON.parse(request.requestBody) as Partial<Pet>
    const allowed: (keyof Pet)[] = [
      'name', 'species', 'breed', 'sex', 'birthDate', 'birthYear', 'status',
      'weightKg', 'nextVaccinationDate', 'nextDewormingDate', 'nextFleaDate', 'photoUrl',
    ]
    allowed.forEach((key) => {
      if (body[key] !== undefined) (pet as unknown as Record<string, unknown>)[key] = body[key]
    })
    return pet
  })
}
