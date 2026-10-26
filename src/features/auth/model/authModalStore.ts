import { create } from 'zustand'

export type AuthModalType = 'login' | 'register' | null

interface AuthModalState {
  modal: AuthModalType
  openLogin: () => void
  openRegister: () => void
  close: () => void
}

export const useAuthModalStore = create<AuthModalState>()((set) => ({
  modal: null,
  openLogin: () => set({ modal: 'login' }),
  openRegister: () => set({ modal: 'register' }),
  close: () => set({ modal: null }),
}))
