import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/shared/api/mirage'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  /** Устанавливается провайдером при логине / восстановлении сессии */
  _setAuth: (user: User, token: string) => void
  /** Устанавливается провайдером при разлогине */
  _clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      _clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'medvet-auth',
      // Сохраняем только токен; user восстанавливается через /auth/me при старте
      partialize: (state) => ({ token: state.token }),
    },
  ),
)
