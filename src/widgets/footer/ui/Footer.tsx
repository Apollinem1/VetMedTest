import { HeartPulse, Shield, Smartphone } from '@gravity-ui/icons'
import { Link } from '@heroui/react'

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                <HeartPulse className="size-3.5 text-white" />
              </div>
              <span className="font-black text-neutral-900">MedVet</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Цифровая медкарта для питомца. Россия, 2025.
            </p>
          </div>

          {[
            {
              title: 'Продукт',
              links: ['Возможности', 'Для клиник', 'Для заводчиков', 'Тарифы', 'Скачать приложение'],
            },
            {
              title: 'Компания',
              links: ['О нас', 'Блог', 'Для партнёров', 'Карьера', 'Контакты'],
            },
            {
              title: 'Правовое',
              links: ['Пользовательское соглашение', 'Политика конфиденциальности', 'Персональные данные'],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="font-bold text-sm text-neutral-900 mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-neutral-400 no-underline transition-colors hover:text-neutral-700"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-neutral-400">© 2025 MedVet. Все права защищены.</p>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Shield className="size-3" /> Данные защищены
            </span>
            <span className="text-neutral-200">|</span>
            <span>🇷🇺 Только Россия</span>
            <span className="text-neutral-200">|</span>
            <span className="flex items-center gap-1">
              <Smartphone className="size-3" /> Web · iOS · Android
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
