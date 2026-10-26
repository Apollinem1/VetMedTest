import {
  CircleCheckFill,
  HeartPulse,
  Bell,
  FileArrowDown,
  Lock,
  MapPin,
} from '@gravity-ui/icons'

export function OwnerFeatures() {
  return (
    <section id="возможности" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.15em] mb-3">
          Для владельцев
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-4">
          Всё о питомце — в одном месте
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-lg">
          Больше не нужно помнить дату прививки или искать ветпаспорт. Вся история — в телефоне.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            icon: <CircleCheckFill className="size-6" />,
            color: 'bg-emerald-50 text-emerald-600',
            border: 'hover:border-emerald-200',
            title: 'Прививки и обработки',
            desc: 'Полная история вакцинаций, дегельминтизации, обработок от клещей. Следующие даты — всегда под рукой.',
          },
          {
            icon: <HeartPulse className="size-6" />,
            color: 'bg-rose-50 text-rose-500',
            border: 'hover:border-rose-200',
            title: 'История болезней',
            desc: 'Каждый визит: температура, вес, симптомы, диагноз, назначения — в хронологии.',
          },
          {
            icon: <Bell className="size-6" />,
            color: 'bg-amber-50 text-amber-500',
            border: 'hover:border-amber-200',
            title: 'Умные напоминания',
            desc: 'Push и SMS за несколько дней до прививки или осмотра. Ни один срок не пропустите.',
          },
          {
            icon: <FileArrowDown className="size-6" />,
            color: 'bg-blue-50 text-blue-500',
            border: 'hover:border-blue-200',
            title: 'Документы и анализы',
            desc: 'Ветпаспорт, родословная, результаты анализов — загружайте файлы и фото.',
          },
          {
            icon: <Lock className="size-6" />,
            color: 'bg-violet-50 text-violet-500',
            border: 'hover:border-violet-200',
            title: 'Контроль доступа',
            desc: 'Сами выдаёте врачу доступ к карте перед приёмом и отзываете когда угодно.',
          },
          {
            icon: <MapPin className="size-6" />,
            color: 'bg-teal-50 text-teal-500',
            border: 'hover:border-teal-200',
            title: 'Поиск клиник',
            desc: 'Ветклиники на карте по 2ГИС. Партнёры MedVet отмечены отдельно.',
          },
        ].map(({ icon, color, border, title, desc }) => (
          <div
            key={title}
            className={`group p-6 rounded-2xl bg-white border border-neutral-100 ${border} hover:shadow-lg transition-all duration-200`}
          >
            <div
              className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
            >
              {icon}
            </div>
            <h3 className="font-bold text-neutral-900 mb-2">{title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
