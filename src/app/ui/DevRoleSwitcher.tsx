import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'core-frontend'
import { useAuth } from '@/app/providers'

const DEV_ROLES = [
  { role: 'admin', label: 'Админ', username: 'admin', password: 'admin' },
  { role: 'owner', label: 'Владелец', username: 'owner', password: 'owner' },
  { role: 'breeder', label: 'Бридер', username: 'agro', password: 'agro' },
  { role: 'vet', label: 'Врач', username: 'vet', password: 'vet' },
] as const

export function DevRoleSwitcher() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  if (!import.meta.env.DEV) return null

  return (
    <div className="fixed bottom-4 right-4 z-9999 flex flex-col items-end gap-1" ref={panelRef}>
      {open && (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-xl overflow-hidden min-w-[160px] dark:border-neutral-700 dark:bg-neutral-900">
          <div className="px-3 py-2 text-xs font-medium text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 dark:text-neutral-400">
            Войти как
          </div>
          {DEV_ROLES.map(({ label, username, password }) => (
            <Button
              key={username}
              type="button"
              variant="ghost"
              className="w-full justify-start rounded-none px-3 py-2 text-sm font-normal text-neutral-900 dark:text-neutral-100"
              onPress={() => {
                login({ username, password })
                  .then(() => {
                    setOpen(false)
                    navigate('/cabinet', { replace: true })
                  })
                  .catch(console.error)
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      )}
      <span title="Тест: быстрый вход под разными ролями">
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="rounded-full bg-neutral-800 px-3 py-2 text-xs shadow-xl hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          onPress={() => setOpen((v) => !v)}
        >
          Тест: роли
        </Button>
      </span>
    </div>
  )
}
