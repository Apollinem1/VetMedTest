import { citiesFixture } from '../fixtures/cities'
import type { MirageServer } from '../types'

export function registerCitiesRoutes(server: MirageServer) {
  server.get('/cities', (_schema, request) => {
    const cursorRaw = request.queryParams.cursor
    const limitRaw = request.queryParams.limit
    const cursor = parseInt(Array.isArray(cursorRaw) ? cursorRaw[0] ?? '0' : cursorRaw ?? '0', 10)
    const limit = parseInt(Array.isArray(limitRaw) ? limitRaw[0] ?? '5' : limitRaw ?? '5', 10)
    const start = Math.max(0, cursor)
    const end = Math.min(citiesFixture.length, start + limit)
    const items = citiesFixture.slice(start, end)
    const nextCursor = end < citiesFixture.length ? String(end) : undefined
    return { items, cursor: nextCursor }
  })

  server.get('/cities/all', () => ({ items: citiesFixture }))
}
