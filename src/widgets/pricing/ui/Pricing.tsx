import { Check } from '@gravity-ui/icons'
import { Button } from 'core-frontend'

export function Pricing() {
  return (
    <section id="цены" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.15em] mb-3">Тарифы</p>
        <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-4">Начните бесплатно</h2>
        <p className="text-neutral-400 text-lg max-w-lg mx-auto">
          Базовые функции навсегда бесплатны. Платите только за то, что реально нужно.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {[
          {
            name: 'Базовый',
            price: '0 ₽',
            period: 'навсегда',
            highlight: false,
            badge: null,
            desc: 'Для большинства владельцев',
            features: ['До 2 питомцев', 'Полная медкарта', 'История болезней', 'Документы и фото', 'Офлайн-доступ'],
            cta: 'Начать бесплатно',
            ctaVariant: 'secondary' as const,
          },
          {
            name: 'Премиум',
            price: '299 ₽',
            period: 'в месяц',
            highlight: true,
            badge: 'Популярно',
            desc: 'Для активных владельцев',
            features: ['Неограниченно питомцев', 'Всё из Базового', 'Push и SMS-напоминания', 'Онлайн-запись в клинику', 'Выгрузка в PDF', 'Без рекламы'],
            cta: 'Выбрать Премиум',
            ctaVariant: 'primary' as const,
          },
          {
            name: 'B2B',
            price: 'от 1 990 ₽',
            period: 'в месяц',
            highlight: false,
            badge: null,
            desc: 'Питомники и фермы',
            features: ['От 10 животных', 'Аналитика по поголовью', 'Прогнозы и аномалии', 'Команда сотрудников', 'Групповые напоминания', 'Персональный менеджер'],
            cta: 'Обсудить условия',
            ctaVariant: 'secondary' as const,
          },
        ].map(({ name, price, period, highlight, badge, desc, features, cta, ctaVariant }) => (
          <div
            key={name}
            className={`relative rounded-2xl p-6 border transition-all ${
              highlight
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-2xl shadow-emerald-200 md:scale-105'
                : 'bg-white border-neutral-200 hover:shadow-md'
            }`}
          >
            {badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full shadow">
                {badge}
              </span>
            )}

            <p className={`text-xs font-bold uppercase tracking-[0.12em] mb-2 ${highlight ? 'text-emerald-200' : 'text-neutral-400'}`}>
              {name}
            </p>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-3xl font-black">{price}</span>
              <span className={`text-sm ${highlight ? 'text-emerald-200' : 'text-neutral-400'}`}>
                / {period}
              </span>
            </div>
            <p className={`text-sm mb-6 ${highlight ? 'text-emerald-100' : 'text-neutral-400'}`}>{desc}</p>

            <ul className="space-y-2.5 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      highlight ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    <Check className="size-2.5" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={highlight ? 'secondary' : ctaVariant}
              className={`w-full ${highlight ? 'bg-white text-emerald-700 hover:bg-emerald-50' : ''}`}
            >
              {cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
