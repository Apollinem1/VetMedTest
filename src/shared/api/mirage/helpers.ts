import type { StoredUser, User } from './fixtures/users'

export function generateToken(userId: string): string {
  return btoa(`${userId}:${Date.now()}`)
}

export function getUserIdFromToken(token: string): string | null {
  try {
    return atob(token).split(':')[0] ?? null
  } catch {
    return null
  }
}

export function toPublicUser(user: StoredUser): User {
  const { password: _pw, ...rest } = user
  void _pw
  return rest
}

export function extractToken(request: { requestHeaders: Record<string, string> }): string | null {
  const auth = request.requestHeaders['Authorization'] ?? request.requestHeaders['authorization']
  if (!auth?.startsWith('Bearer ')) return null
  return auth.slice(7)
}
