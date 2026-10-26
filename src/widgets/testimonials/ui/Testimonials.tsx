import { StarFill } from '@gravity-ui/icons'

export function Testimonials() {
  return (
      <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900">Что говорят владельцы</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              text: 'Наконец-то врач не переспрашивает, когда была последняя прививка! Открываю приложение прямо на приёме — всё уже там.',
              name: 'Мария К.',
              sub: 'Москва · Два лабрадора',
              avatar: '🐕',
            },
            {
              text: 'У нас три кошки. Раньше три ветпаспорта и три блокнота. Теперь одно приложение. Напоминания приходят сами — не пропускаем ни одной обработки.',
              name: 'Денис П.',
              sub: 'Санкт-Петербург · Три кошки',
              avatar: '🐈',
            },
            {
              text: 'Как заводчик — просто спасение. Раньше Excel-таблицы, теперь всё в MedVet. Аналитика показала сезонный рост инфекций — успели подготовиться.',
              name: 'Ольга Н.',
              sub: 'Екатеринбург · Питомник хаски',
              avatar: '🐺',
            },
          ].map(({ text, name, sub, avatar }) => (
            <div
              key={name}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarFill key={i} className="size-4 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-5">«{text}»</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-xl shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">{name}</p>
                  <p className="text-xs text-neutral-400">{sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
