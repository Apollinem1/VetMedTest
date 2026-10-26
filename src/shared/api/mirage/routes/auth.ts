import { Response } from 'miragejs'
import type { StoredUser } from '../fixtures/users'
import type { MirageServer } from '../types'
import type { MirageContext } from '../context'
import { generateToken } from '../helpers'

export function registerAuthRoutes(server: MirageServer, ctx: MirageContext) {
  const { users, toPublicUser } = ctx

  server.post('/auth/login', (_schema, request) => {
    const { username, password } = JSON.parse(request.requestBody) as {
      username: string
      password: string
    }
    const found = users.find((u) => u.username === username && u.password === password)
    if (!found) return new Response(401, {}, { message: 'Неверный логин или пароль' })
    return { user: toPublicUser(found), token: generateToken(found.id) }
  })

  server.post('/auth/register', (_schema, request) => {
    const body = JSON.parse(request.requestBody) as {
      username: string
      email: string
      password: string
      name?: string
    }
    if (users.some((u) => u.username === body.username)) {
      return new Response(422, {}, { message: 'Пользователь с таким именем уже существует' })
    }
    if (users.some((u) => u.email === body.email)) {
      return new Response(422, {}, { message: 'Email уже используется' })
    }
    const newUser: StoredUser = {
      id: String(users.length + 1),
      username: body.username,
      email: body.email,
      name: body.name ?? body.username,
      password: body.password,
      role: 'owner',
    }
    users.push(newUser)
    return new Response(201, {}, { user: toPublicUser(newUser), token: generateToken(newUser.id) })
  })

  server.get('/auth/me', (_schema, request) => {
    const user = ctx.getCurrentUser(request)
    if (!user) return new Response(401, {}, { message: 'Не авторизован' })
    return { user: toPublicUser(user) }
  })

  server.post('/auth/logout', () => new Response(200, {}, {}))
}
