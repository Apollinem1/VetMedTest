import { HeartPulse, Stethoscope, StarFill, CircleCheck } from '@gravity-ui/icons'

export function StatsBar() {
  return (
    <section className="border-y border-emerald-100/70 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '50 000+', label: 'питомцев в системе', icon: <HeartPulse className="size-5" /> },
            { value: '300+', label: 'ветклиник-партнёров', icon: <Stethoscope className="size-5" /> },
            { value: '4.9', label: 'рейтинг в App Store', icon: <StarFill className="size-5 text-amber-400" /> },
            { value: '< 30 сек', label: 'на поиск карты у врача', icon: <CircleCheck className="size-5" /> },
          ].map(({ value, label, icon }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="text-emerald-600 mb-1">{icon}</div>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900">{value}</p>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
