/** Типы ответа GET /api/cabinet/dashboard по ролям */

export interface DashboardOwner {
  role: 'owner'
  userName: string
  petsCount: number
  nextVaccinations: { petId: string; petName: string; date: string | null }[]
  recentVisitsCount: number
}

export interface DashboardBreeder {
  role: 'breeder'
  userName: string
  companyName: string | null
  companyId: string | null
  petsCount: number
  employeesCount: number
  nextVaccinations: { petId: string; petName: string; date: string | null }[]
}

export interface DashboardVet {
  role: 'vet'
  userName: string
  branchId: string | null
  branchName: string | null
  clinicName: string | null
  position: string | null
  petsWithAccessCount: number
  todayAppointments: {
    id: string
    petId: string
    petName: string
    scheduledAt: string
    reason: string | null
    status: string
  }[]
  recentVisits: {
    id: string
    petId: string
    visitDate: string
    diagnosis: string | null
    symptoms: string | null
  }[]
}

export interface DashboardAdmin {
  role: 'admin'
  userName: string
  usersCount: number
  clinicsCount: number
}

export type DashboardResponse =
  | DashboardOwner
  | DashboardBreeder
  | DashboardVet
  | DashboardAdmin

async function apiGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(path, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

async function apiMutate<T>(
  path: string,
  token: string,
  options: { method: 'POST' | 'PATCH'; body: unknown },
): Promise<T> {
  const res = await fetch(path, {
    method: options.method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.body),
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchDashboard(token: string): Promise<DashboardResponse> {
  return apiGet<DashboardResponse>('/api/cabinet/dashboard', token)
}

export interface PetItem {
  id: string
  name: string
  species: string
  breed: string
  sex: string
  birthDate: string | null
  birthYear: number | null
  status: string
  weightKg: number | null
  nextVaccinationDate: string | null
  nextDewormingDate: string | null
  nextFleaDate: string | null
  photoUrl: string | null
  createdAt: string
}

export async function fetchPets(token: string): Promise<{ items: PetItem[] }> {
  return apiGet('/api/pets', token)
}

export async function fetchPet(token: string, id: string): Promise<PetItem> {
  return apiGet(`/api/pets/${id}`, token)
}

export interface CreatePetBody {
  name: string
  species?: string
  breed?: string
  sex?: 'male' | 'female' | 'unknown'
  birthDate?: string | null
  birthYear?: number | null
  weightKg?: number | null
  nextVaccinationDate?: string | null
  nextDewormingDate?: string | null
  nextFleaDate?: string | null
  /** URL или data URL превью до появления загрузки на сервер */
  photoUrl?: string | null
}

export async function createPet(token: string, body: CreatePetBody): Promise<PetItem> {
  return apiMutate('/api/pets', token, { method: 'POST', body })
}

export interface UpdatePetBody {
  name?: string
  species?: string
  breed?: string
  sex?: 'male' | 'female' | 'unknown'
  birthDate?: string | null
  birthYear?: number | null
  weightKg?: number | null
  nextVaccinationDate?: string | null
  nextDewormingDate?: string | null
  nextFleaDate?: string | null
  photoUrl?: string | null
}

export async function updatePet(token: string, id: string, body: UpdatePetBody): Promise<PetItem> {
  return apiMutate(`/api/pets/${id}`, token, { method: 'PATCH', body })
}

export interface VisitItem {
  id: string
  petId: string
  visitDate: string
  weightKg: number | null
  symptoms: string | null
  diagnosis: string | null
  recommendations: string | null
  source: string
  isVerified: boolean
  clinicName?: string | null
  branchName?: string | null
  vetName?: string | null
  petName?: string | null
}

export async function fetchVisits(token: string, petId?: string): Promise<{ items: VisitItem[] }> {
  const q = petId ? `?petId=${encodeURIComponent(petId)}` : ''
  return apiGet(`/api/visits${q}`, token)
}

export interface UserItem {
  id: string
  username: string
  email: string
  name: string
  role: string
}

export async function fetchUsers(token: string): Promise<{ items: UserItem[] }> {
  return apiGet('/api/users', token)
}

export interface ClinicItem {
  id: string
  name: string
  status: string
  branches: { id: string; name: string; address: string; city: string; phone: string | null }[]
}

export async function fetchClinics(token: string): Promise<{ items: ClinicItem[] }> {
  return apiGet('/api/clinics', token)
}

export interface AppointmentItem {
  id: string
  petId: string
  petName: string
  vetId: string
  branchId: string
  scheduledAt: string
  reason: string | null
  status: string
  clinicName?: string | null
  branchName?: string | null
  vetName?: string | null
}

export async function fetchAppointments(token: string): Promise<{ items: AppointmentItem[] }> {
  return apiGet('/api/appointments', token)
}
