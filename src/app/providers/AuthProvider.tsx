import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { useAuthStore } from '@/shared/store'
import type { User } from '@/shared/api/mirage'

// ── Types ─────────────────────────────────────────────────────────────────────

interface LoginCredentials {
  username: string
  password: string
}

interface RegisterData {
  username: string
  email: string
  password: string
  name?: string
}

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  /** true пока идёт восстановление сессии при старте */
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

// ── API helpers ───────────────────────────────────────────────────────────────

async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(url, { ...options, headers })

  if (!res.ok) {
    const error = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(error.message ?? `HTTP ${res.status}`)
  }

  return res.json() as Promise<T>
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, token, isAuthenticated, _setAuth, _clearAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  // Восстановление сессии при старте приложения
  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    apiFetch<{ user: User }>('/api/auth/me', {}, token)
      .then(({ user: me }) => _setAuth(me, token))
      .catch(() => _clearAuth())
      .finally(() => setIsLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { user: me, token: newToken } = await apiFetch<{ user: User; token: string }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify(credentials) },
    )
    _setAuth(me, newToken)
  }, [_setAuth])

  const register = useCallback(async (data: RegisterData) => {
    const { user: me, token: newToken } = await apiFetch<{ user: User; token: string }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify(data) },
    )
    _setAuth(me, newToken)
  }, [_setAuth])

  const logout = useCallback(async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' }, token).catch(() => {})
    _clearAuth()
  }, [token, _clearAuth])

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
