import { useState } from 'react'
import { HeartPulse, Bars, Xmark } from '@gravity-ui/icons'
import { Button } from 'core-frontend'
import { useAuthModalStore } from '@/features/auth'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openLogin, openRegister } = useAuthModalStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label="На главную"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <HeartPulse className="size-4 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight">MedVet</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Возможности', 'Клиникам', 'Заводчикам', 'Цены'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" onPress={openLogin}>Войти</Button>
          <Button variant="primary" size="sm" onPress={openRegister}>Начать бесплатно</Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          {mobileMenuOpen ? <Xmark className="size-5" /> : <Bars className="size-5" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 px-4 py-4 space-y-1 bg-white">
          {['Возможности', 'Клиникам', 'Заводчикам', 'Цены'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-2.5 px-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-3 space-y-2">
            <Button variant="secondary" className="w-full" onPress={openLogin}>Войти</Button>
              <Button variant="primary" className="w-full" onPress={openRegister}>Начать бесплатно</Button>
          </div>
        </div>
      )}
    </header>
  )
}
