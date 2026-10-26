import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useNavigate, Link } from 'react-router-dom'
import {
  HeartPulse,
  ArrowRightFromSquare,
  CardHeart,
  Briefcase,
  Stethoscope,
  Persons,
  EllipsisVertical,
  Heart,
} from '@gravity-ui/icons'
import { Card, Table, Chip, Dropdown } from '@heroui/react'
import { Button } from 'core-frontend'
import { useAuth } from '@/app/providers'
import {
  fetchDashboard,
  fetchPets,
  fetchVisits,
  fetchAppointments,
  fetchUsers,
  fetchClinics,
  type DashboardResponse,
  type PetItem,
  type VisitItem,
  type AppointmentItem,
  type UserItem,
  type ClinicItem,
} from '@/shared/api/cabinet'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const ROLE_LABELS: Record<string, string> = {
  admin: 'Администратор',
  owner: 'Владелец',
  vet: 'Врач',
  breeder: 'Владелец компании',
}

function truncate(str: string | null | undefined, max: number) {
  if (!str) return '—'
  return str.length <= max ? str : str.slice(0, max) + '…'
}

function OwnerCabinet({
  pets,
  visits,
  appointments,
  formatDate,
  formatTime,
}: {
  pets: PetItem[]
  visits: VisitItem[]
  appointments: AppointmentItem[]
  formatDate: (iso: string) => string
  formatTime: (iso: string) => string
}) {
  const navigate = useNavigate()
  const [expandedVisitId, setExpandedVisitId] = useState<string | null>(null)
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    skipSnaps: false,
  })

  return (
    <>
      <Card className="shadow-lg rounded-2xl border border-neutral-200/80 bg-white overflow-hidden">
        <Card.Header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 bg-neutral-50/50">
          <div>
            <Card.Title className="text-neutral-800">Мои питомцы</Card.Title>
            <Card.Description className="text-neutral-500">Вся медкарта в одном месте — прививки, визиты, документы</Card.Description>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="shrink-0"
            onPress={() => navigate('/cabinet/pet/new')}
          >
            Добавить питомца
          </Button>
        </Card.Header>
        <Card.Content>
          {pets.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/80 py-12 text-center">
              <p className="text-sm text-neutral-600 mb-4">Питомцев пока нет. Добавьте первого — медкарта будет всегда под рукой.</p>
              <Button variant="primary" size="sm" onPress={() => navigate('/cabinet/pet/new')}>
                Добавить питомца
              </Button>
            </div>
          ) : (
            <div className="-mx-1 overflow-hidden">
              <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-x select-none px-1">
                <ul className="flex gap-4 pb-2">
                  {pets.map((pet) => (
                    <li
                      key={pet.id}
                      className="min-w-0 shrink-0 basis-[min(100%,320px)]"
                    >
                      <Link
                        to={`/cabinet/pet/${pet.id}`}
                        className="group relative flex rounded-2xl min-h-[140px] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      >
                      {/* Левая часть: фото или градиент с сердечком */}
                      <div className="relative w-[120px] shrink-0">
                        {pet.photoUrl ? (
                          <img
                            src={pet.photoUrl}
                            alt={pet.name}
                            className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-emerald-400 via-emerald-500 to-teal-600" />
                        )}
                        {!pet.photoUrl && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Heart className="size-12 text-white/90 drop-shadow-sm" />
                          </div>
                        )}
                        {/* Лёгкий градиент поверх фото для перехода в правую панель */}
                        <span className="absolute inset-y-0 right-0 w-12 bg-linear-to-r from-transparent to-black/20 pointer-events-none" aria-hidden />
                      </div>
                      {/* Правая часть: градиентная панель с текстом */}
                      <div className="flex flex-1 flex-col justify-center gap-1 bg-linear-to-br from-emerald-700 via-emerald-800 to-teal-900 px-4 py-3">
                        <p className="font-bold text-white text-lg tracking-tight drop-shadow-sm">
                          {pet.name}
                        </p>
                        <p className="text-sm text-emerald-100/90">
                          {pet.species}{pet.breed ? ` · ${pet.breed}` : ''}
                        </p>
                        {pet.weightKg != null && (
                          <span className="mt-1.5 inline-flex w-fit rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/95 backdrop-blur-sm">
                            {pet.weightKg} кг
                          </span>
                        )}
                        <span className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-emerald-200/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          Открыть
                          <ArrowRightFromSquare className="size-3.5" />
                        </span>
                      </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card.Content>
      </Card>

      <Card className="shadow-lg rounded-2xl border border-neutral-200/80 bg-white overflow-hidden">
        <Card.Header className="border-b border-neutral-100 bg-neutral-50/50">
          <Card.Title className="text-neutral-800">Ближайшие записи</Card.Title>
          <Card.Description className="text-neutral-500">Запланированные приёмы у ветеринара</Card.Description>
        </Card.Header>
        <Card.Content>
          {appointments.length === 0 ? (
            <p className="text-sm text-neutral-500">Нет ближайших записей</p>
          ) : (
            <ul className="space-y-3">
              {appointments.map((a) => (
                <li key={a.id} className="rounded-xl border border-neutral-200/80 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md border-l-4 border-l-emerald-500">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-4">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-bold text-neutral-800">{a.petName}</span>
                        {a.reason && (
                          <span className="text-sm text-neutral-500">{a.reason}</span>
                        )}
                      </div>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <div className="flex gap-2 sm:col-span-2">
                          <dt className="text-neutral-500 shrink-0">Когда:</dt>
                          <dd className="text-neutral-800 font-medium">{formatDate(a.scheduledAt)} в {formatTime(a.scheduledAt)}</dd>
                        </div>
                        {a.clinicName && (
                          <div className="flex gap-2 sm:col-span-2">
                            <dt className="text-neutral-500 shrink-0">Клиника:</dt>
                            <dd className="text-neutral-800">{a.clinicName}</dd>
                          </div>
                        )}
                        {a.branchName && (
                          <div className="flex gap-2 sm:col-span-2">
                            <dt className="text-neutral-500 shrink-0">Где:</dt>
                            <dd className="text-neutral-800">{a.branchName}</dd>
                          </div>
                        )}
                        {a.vetName && (
                          <div className="flex gap-2">
                            <dt className="text-neutral-500 shrink-0">Врач:</dt>
                            <dd className="text-neutral-800">{a.vetName}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <Button variant="secondary" size="sm">
                        Подробнее
                      </Button>
                      <Button variant="secondary" size="sm">
                        Перенести запись
                      </Button>
                      <Button variant="secondary" size="sm" className="text-danger hover:bg-danger-50">
                        Отменить запись
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card.Content>
      </Card>

      <Card className="shadow-lg rounded-2xl border border-neutral-200/80 bg-white overflow-hidden">
        <Card.Header className="border-b border-neutral-100 bg-neutral-50/50">
          <Card.Title className="text-neutral-800">Напоминания: вакцинации, дегельминтизация, обработка от блох</Card.Title>
          <Card.Description className="text-neutral-500">
            У разных видов разное число прививок (комплексная, от бешенства и др.) и сроки ревакцинации. Здесь — дата следующей процедуры по каждому типу.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          {pets.length === 0 ? (
            <p className="text-sm text-neutral-500">Нет питомцев</p>
          ) : (
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Напоминания по питомцам">
                  <Table.Header>
                    <Table.Column>Питомец</Table.Column>
                    <Table.Column>Вакцинации</Table.Column>
                    <Table.Column>Дегельминтизация</Table.Column>
                    <Table.Column>Обработка от блох</Table.Column>
                    <Table.Column>Действия</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {pets.map((pet) => (
                      <Table.Row key={pet.id}>
                        <Table.Cell>
                          <Link to={`/cabinet/pet/${pet.id}`} className="text-emerald-600 hover:underline font-medium">
                            {pet.name}
                          </Link>
                        </Table.Cell>
                        <Table.Cell className="text-muted">
                          {pet.nextVaccinationDate ? formatDate(pet.nextVaccinationDate) : '—'}
                        </Table.Cell>
                        <Table.Cell className="text-muted">
                          {pet.nextDewormingDate ? formatDate(pet.nextDewormingDate) : '—'}
                        </Table.Cell>
                        <Table.Cell className="text-muted">
                          {pet.nextFleaDate ? formatDate(pet.nextFleaDate) : '—'}
                        </Table.Cell>
                        <Table.Cell className="text-end">
                          <Dropdown>
                            <Dropdown.Trigger>
                              <Button variant="secondary" size="sm" isIconOnly aria-label="Действия">
                                <EllipsisVertical className="size-5" />
                              </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Popover>
                              <Dropdown.Menu
                                onAction={(key) => {
                                  if (key === 'vaccination') navigate(`/cabinet/pet/${pet.id}`)
                                  else if (key === 'deworming') navigate(`/cabinet/pet/${pet.id}`)
                                  else if (key === 'flea') navigate(`/cabinet/pet/${pet.id}`)
                                  else if (key === 'add') navigate(`/cabinet/pet/${pet.id}`)
                                }}
                              >
                                <Dropdown.Item key="vaccination" id="vaccination">
                                  Редактировать вакцинации
                                </Dropdown.Item>
                                <Dropdown.Item key="deworming" id="deworming">
                                  Редактировать дегельминтизацию
                                </Dropdown.Item>
                                <Dropdown.Item key="flea" id="flea">
                                  Редактировать обработку от блох
                                </Dropdown.Item>
                                <Dropdown.Item key="add" id="add">
                                  Добавить напоминание
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown.Popover>
                          </Dropdown>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          )}
        </Card.Content>
      </Card>

      <Card className="shadow-lg rounded-2xl border border-neutral-200/80 bg-white overflow-hidden">
        <Card.Header className="border-b border-neutral-100 bg-neutral-50/50">
          <Card.Title className="text-neutral-800">Последние визиты</Card.Title>
          <Card.Description className="text-neutral-500">Клиника, врач, питомец, дата — детали по клику</Card.Description>
        </Card.Header>
        <Card.Content>
          {visits.length === 0 ? (
            <p className="text-sm text-neutral-500">Записей пока нет</p>
          ) : (
            <ul className="space-y-2">
              {visits.slice(0, 15).map((v) => {
                const isExpanded = expandedVisitId === v.id
                return (
                  <li key={v.id} className="rounded-xl border border-neutral-200/80 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md border-l-4 border-l-emerald-500">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 bg-white hover:bg-neutral-50/80 transition-colors"
                      onClick={() => setExpandedVisitId(isExpanded ? null : v.id)}
                    >
                      <span className="font-semibold text-neutral-800">{v.petName ?? 'Питомец'}</span>
                      <span className="text-sm text-neutral-500">{v.clinicName ?? '—'}</span>
                      <span className="text-sm text-neutral-500">{v.vetName ?? '—'}</span>
                      <span className="text-sm text-neutral-500">{formatDate(v.visitDate)} {formatTime(v.visitDate)}</span>
                      {!isExpanded && (v.diagnosis ?? v.symptoms) && (
                        <span className="text-sm text-neutral-500 truncate max-w-[200px]">{truncate(v.diagnosis || v.symptoms, 40)}</span>
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-50/50 text-sm space-y-2">
                        <p><span className="text-neutral-500">Симптомы: </span><span className="text-neutral-700">{v.symptoms ?? '—'}</span></p>
                        <p><span className="text-neutral-500">Диагноз: </span><span className="text-neutral-700">{v.diagnosis ?? '—'}</span></p>
                        <p><span className="text-neutral-500">Лечение/рекомендации: </span><span className="text-neutral-700">{v.recommendations ?? '—'}</span></p>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </Card.Content>
      </Card>
    </>
  )
}

export function CabinetPage() {
  const navigate = useNavigate()
  const { user, token, isAuthenticated, logout, isLoading: authLoading } = useAuth()
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)
  const [pets, setPets] = useState<PetItem[]>([])
  const [visits, setVisits] = useState<VisitItem[]>([])
  const [appointments, setAppointments] = useState<AppointmentItem[]>([])
  const [users, setUsers] = useState<UserItem[]>([])
  const [clinics, setClinics] = useState<ClinicItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/', { replace: true })
      return
    }
    setLoading(true)
    setError(null)
    fetchDashboard(token)
      .then((data) => {
        setDashboard(data)
        if (data.role === 'owner' || data.role === 'breeder' || data.role === 'vet') {
          return fetchPets(token).then((r) => setPets(r.items))
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Ошибка загрузки'))
      .finally(() => setLoading(false))
  }, [isAuthenticated, token, navigate])

  useEffect(() => {
    if (!token || !dashboard) return
    if (dashboard.role === 'owner' || dashboard.role === 'vet') {
      fetchVisits(token).then((r) => setVisits(r.items)).catch(() => {})
    }
    if (dashboard.role === 'owner') {
      fetchAppointments(token).then((r) => setAppointments(r.items)).catch(() => {})
    }
    if (dashboard.role === 'admin') {
      fetchUsers(token).then((r) => setUsers(r.items)).catch(() => {})
      fetchClinics(token).then((r) => setClinics(r.items)).catch(() => {})
    }
  }, [token, dashboard?.role])

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  if (authLoading || !user) return null
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-emerald-50/30 text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200/80 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-emerald-600">
            <HeartPulse className="size-7" />
            <span className="font-semibold">MedVet</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">{user.name}</span>
            <Button variant="ghost" size="sm" onPress={handleLogout}>
              <ArrowRightFromSquare className="size-4" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <p className="text-muted">Загрузка личного кабинета…</p>
        )}
        {error && (
          <p className="rounded-lg bg-danger-50 p-4 text-danger-600">{error}</p>
        )}
        {!loading && !error && dashboard && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-800">
              Личный кабинет — {ROLE_LABELS[dashboard.role] ?? dashboard.role}
            </h1>

            {/* ─── Владелец (Owner) ───────────────────────────────────────── */}
            {dashboard.role === 'owner' && (
              <OwnerCabinet
                pets={pets}
                visits={visits}
                appointments={appointments}
                formatDate={formatDate}
                formatTime={formatTime}
              />
            )}

            {/* ─── Владелец компании (Breeder) ────────────────────────────── */}
            {dashboard.role === 'breeder' && (
              <>
                <section className="grid gap-4 sm:grid-cols-3">
                  <Card variant="secondary" className="p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <Briefcase className="size-5" />
                      <span className="text-sm font-medium">Компания</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold">{dashboard.companyName ?? '—'}</p>
                  </Card>
                  <Card variant="secondary" className="p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <CardHeart className="size-5" />
                      <span className="text-sm font-medium">Поголовье</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold">{dashboard.petsCount}</p>
                  </Card>
                  <Card variant="secondary" className="p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <Persons className="size-5" />
                      <span className="text-sm font-medium">Сотрудники</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold">{dashboard.employeesCount}</p>
                  </Card>
                </section>

                <Card>
                  <Card.Header>
                    <Card.Title>Поголовье</Card.Title>
                    <Card.Description>Животные компании — учёт и аналитика</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    {pets.length === 0 ? (
                      <p className="text-sm text-muted">Нет данных</p>
                    ) : (
                      <Table>
                        <Table.ScrollContainer>
                          <Table.Content aria-label="Поголовье" className="min-w-[500px]">
                            <Table.Header>
                              <Table.Column>Кличка</Table.Column>
                              <Table.Column>Вид</Table.Column>
                              <Table.Column>Порода</Table.Column>
                              <Table.Column>Вес</Table.Column>
                              <Table.Column>След. прививка</Table.Column>
                            </Table.Header>
                            <Table.Body>
                              {pets.map((pet) => (
                                <Table.Row key={pet.id}>
                                  <Table.Cell>{pet.name}</Table.Cell>
                                  <Table.Cell>{pet.species}</Table.Cell>
                                  <Table.Cell>{pet.breed}</Table.Cell>
                                  <Table.Cell>{pet.weightKg != null ? `${pet.weightKg} кг` : '—'}</Table.Cell>
                                  <Table.Cell>{pet.nextVaccinationDate ? formatDate(pet.nextVaccinationDate) : '—'}</Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table.Content>
                        </Table.ScrollContainer>
                      </Table>
                    )}
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Ближайшие прививки по поголовью</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    {dashboard.nextVaccinations.length === 0 ? (
                      <p className="text-sm text-muted">Нет запланированных</p>
                    ) : (
                      <ul className="space-y-2">
                        {dashboard.nextVaccinations.map((v) => (
                          <li key={v.petId} className="flex justify-between rounded-lg bg-default-50 px-3 py-2">
                            <span className="font-medium">{v.petName}</span>
                            <span className="text-sm text-muted">{v.date ? formatDate(v.date) : '—'}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card.Content>
                </Card>

                {dashboard.employeesCount > 0 && (
                  <Card>
                    <Card.Header>
                      <Card.Title>Сотрудники</Card.Title>
                      <Card.Description>Доступ к животным компании</Card.Description>
                    </Card.Header>
                    <Card.Content>
                      <p className="text-sm text-muted">
                        В системе {dashboard.employeesCount} сотрудник(ов). Управление правами — в настройках компании.
                      </p>
                    </Card.Content>
                  </Card>
                )}
              </>
            )}

            {/* ─── Врач (Vet) ─────────────────────────────────────────────── */}
            {dashboard.role === 'vet' && (
              <>
                <section className="grid gap-4 sm:grid-cols-2">
                  <Card variant="secondary" className="p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <Stethoscope className="size-5" />
                      <span className="text-sm font-medium">Точка приёма</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold">{dashboard.clinicName ?? '—'}</p>
                    <p className="text-sm text-muted">{dashboard.branchName ?? ''}</p>
                    <p className="text-xs text-muted">{dashboard.position ?? ''}</p>
                  </Card>
                  <Card variant="secondary" className="p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <CardHeart className="size-5" />
                      <span className="text-sm font-medium">Карты с доступом</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold">{dashboard.petsWithAccessCount}</p>
                  </Card>
                </section>

                <Card>
                  <Card.Header>
                    <Card.Title>Записи на сегодня</Card.Title>
                    <Card.Description>Расписание приёма</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    {dashboard.todayAppointments.length === 0 ? (
                      <p className="text-sm text-muted">Нет записей</p>
                    ) : (
                      <ul className="space-y-2">
                        {dashboard.todayAppointments.map((a) => (
                          <li key={a.id} className="flex items-center justify-between rounded-xl border border-divider bg-default-50 px-4 py-3">
                            <span className="font-medium">{a.petName}</span>
                            <span className="text-sm text-muted">
                              {formatTime(a.scheduledAt)}
                              {a.reason && ` — ${a.reason}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Питомцы с выданным доступом</Card.Title>
                    <Card.Description>Карты, к которым у вас есть доступ в этой точке</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    {pets.length === 0 ? (
                      <p className="text-sm text-muted">Нет питомцев с доступом</p>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {pets.map((pet) => (
                          <Card key={pet.id} variant="transparent" className="border border-divider p-3">
                            <p className="font-medium">{pet.name}</p>
                            <p className="text-sm text-muted">{pet.species}, {pet.breed}</p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Последние визиты</Card.Title>
                    <Card.Description>Проведённые приёмы</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    {dashboard.recentVisits.length === 0 ? (
                      <p className="text-sm text-muted">Нет визитов</p>
                    ) : (
                      <ul className="space-y-2">
                        {dashboard.recentVisits.map((v) => (
                          <li key={v.id} className="rounded-lg bg-default-50 px-3 py-2 text-sm">
                            <span className="text-muted">{formatDate(v.visitDate)}</span>
                            {v.diagnosis && <span className="ml-2 font-medium">{v.diagnosis}</span>}
                            {v.symptoms && <span className="ml-2 text-muted">({v.symptoms})</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card.Content>
                </Card>
              </>
            )}

            {/* ─── Администратор (Admin) ─────────────────────────────────── */}
            {dashboard.role === 'admin' && (
              <>
                <section className="grid gap-4 sm:grid-cols-2">
                  <Card variant="secondary" className="p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <Persons className="size-5" />
                      <span className="text-sm font-medium">Пользователи</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold">{dashboard.usersCount}</p>
                  </Card>
                  <Card variant="secondary" className="p-4">
                    <div className="flex items-center gap-2 text-muted">
                      <Briefcase className="size-5" />
                      <span className="text-sm font-medium">Клиники</span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold">{dashboard.clinicsCount}</p>
                  </Card>
                </section>

                <Card>
                  <Card.Header>
                    <Card.Title>Пользователи</Card.Title>
                    <Card.Description>Модерация, редактирование, бан</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    {users.length === 0 ? (
                      <p className="text-sm text-muted">Загрузка…</p>
                    ) : (
                      <Table>
                        <Table.ScrollContainer>
                          <Table.Content aria-label="Пользователи" className="min-w-[500px]">
                            <Table.Header>
                              <Table.Column>Имя</Table.Column>
                              <Table.Column>Логин</Table.Column>
                              <Table.Column>Email</Table.Column>
                              <Table.Column>Роль</Table.Column>
                            </Table.Header>
                            <Table.Body>
                              {users.map((u) => (
                                <Table.Row key={u.id}>
                                  <Table.Cell>{u.name}</Table.Cell>
                                  <Table.Cell>{u.username}</Table.Cell>
                                  <Table.Cell>{u.email}</Table.Cell>
                                  <Table.Cell>
                                    <Chip size="sm" variant="soft">
                                      {ROLE_LABELS[u.role] ?? u.role}
                                    </Chip>
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table.Content>
                        </Table.ScrollContainer>
                      </Table>
                    )}
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Клиники</Card.Title>
                    <Card.Description>Модерация и активация</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    {clinics.length === 0 ? (
                      <p className="text-sm text-muted">Загрузка…</p>
                    ) : (
                      <Table>
                        <Table.ScrollContainer>
                          <Table.Content aria-label="Клиники" className="min-w-[500px]">
                            <Table.Header>
                              <Table.Column>Название</Table.Column>
                              <Table.Column>Статус</Table.Column>
                              <Table.Column>Точки</Table.Column>
                            </Table.Header>
                            <Table.Body>
                              {clinics.map((c) => (
                                <Table.Row key={c.id}>
                                  <Table.Cell>{c.name}</Table.Cell>
                                  <Table.Cell>
                                    <Chip size="sm" variant="soft" color={c.status === 'active' ? 'success' : 'warning'}>
                                      {c.status === 'active' ? 'Активна' : c.status === 'pending' ? 'На модерации' : c.status}
                                    </Chip>
                                  </Table.Cell>
                                  <Table.Cell>{c.branches?.length ?? 0}</Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table.Content>
                        </Table.ScrollContainer>
                      </Table>
                    )}
                  </Card.Content>
                </Card>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
