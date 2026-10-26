import { Response } from 'miragejs'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'

export function registerUsersRoutes(server: MirageServer, ctx: MirageContext) {
  const { users, getCurrentUser, toPublicUser } = ctx

  server.get('/users', (_schema, request) => {
    const user = getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    if (user.role !== 'admin') return new Response(403, {}, { message: 'Доступ запрещён' })
    return { items: users.map((u) => toPublicUser(u)) }
  })
}
