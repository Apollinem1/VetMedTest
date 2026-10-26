import {
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  Pill,
  Calendar,
  CircleCheckFill,
  BellFill,
  Check,
} from '@gravity-ui/icons'
import { PHONE_DESIGN_HEIGHT } from '../config/constants'

type PhoneMockupProps = {
  containerHeight?: number | null
  designHeight?: number
}

const MEDCARD_ENTRIES = [
  { id: 'vaccine', icon: 'emerald', label: 'Комплексная вакцина', date: '12 апр 2025' },
  { id: 'deworm', icon: 'blue', label: 'Дегельминтизация', date: '3 мар 2025' },
  { id: 'ticks', icon: 'purple', label: 'Обработка от клещей', date: '1 мар 2025' },
] as const

export function PhoneMockup({
  containerHeight,
  designHeight = PHONE_DESIGN_HEIGHT,
}: PhoneMockupProps) {
  const scale =
    containerHeight != null && designHeight > 0
      ? Math.min(1, containerHeight / designHeight)
      : 1

  return (
    <div
      className="relative w-full max-w-lg mx-auto select-none origin-center"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <div
        className="relative mx-auto w-72 bg-white rounded-[2.5rem] shadow-2xl border border-neutral-200 overflow-hidden"
        style={{ height: designHeight }}
      >
        <div className="bg-linear-to-br from-emerald-600 to-teal-600 px-4 pt-3 pb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-[10px] font-medium">9:41</span>
            <div className="flex gap-0.5 items-end">
              {[3, 4, 5, 6].map((h, i) => (
                <div key={i} className="w-0.5 bg-white/70 rounded-sm" style={{ height: h }} />
              ))}
            </div>
          </div>
          <p className="text-white/60 text-[10px] mb-0.5">Добрый день,</p>
          <p className="text-white font-bold text-base">Алексей 👋</p>
        </div>

        <div className="mx-2.5 -mt-3 bg-white rounded-xl shadow-md border border-neutral-100 p-2 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-base shrink-0">
            🐕
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-xs text-neutral-800">Барон</p>
            <p className="text-[10px] text-neutral-400">Лабрадор · 3 года</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-300" />
        </div>

        <div className="mx-2.5 mt-2 space-y-1.5">
          <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
            Напоминания
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Calendar className="size-3" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-neutral-800">Запись к ветеринару</p>
              <p className="text-[10px] text-amber-600 font-medium">Прививка — через 5 дней</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Pill className="size-3" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-neutral-800">Дегельминтизация</p>
              <p className="text-[10px] text-blue-600 font-medium">Пора обработать</p>
            </div>
          </div>
        </div>

        <div className="mx-2.5 mt-2">
          <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mb-1">
            Медкарта
          </p>
          <div className="space-y-1">
            {MEDCARD_ENTRIES.map(({ id, icon, label, date }) => {
              const bgMap = { emerald: 'bg-emerald-50', blue: 'bg-blue-50', purple: 'bg-purple-50' } as const
              const Icon =
                icon === 'emerald' ? CircleCheckFill : icon === 'blue' ? Pill : ShieldCheck
              const colorMap = { emerald: 'text-emerald-500', blue: 'text-blue-500', purple: 'text-purple-500' } as const
              return (
                <div key={id} className={`${bgMap[icon]} rounded-lg p-2 flex items-center gap-1.5`}>
                  <span className="shrink-0">
                    <Icon className={`size-3 ${colorMap[icon]}`} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-neutral-700 truncate">{label}</p>
                    <p className="text-[10px] text-neutral-400">{date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="flex gap-5 text-neutral-200">
            <HeartPulse className="size-4" />
            <Stethoscope className="size-4" />
            <Calendar className="size-4" />
          </div>
        </div>
      </div>

      <div className="absolute -left-4 top-20 bg-white rounded-2xl shadow-xl p-3 border border-neutral-100 w-44 hidden sm:block animate-[fadeInLeft_0.5s_ease_0.3s_both]">
        <p className="text-xs text-neutral-400 mb-1.5">Клиника нашла карту</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Stethoscope className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-800">Лапы и хвосты</p>
            <p className="text-xs text-emerald-600 flex items-center gap-0.5">
              <Check className="size-3" /> Доступ выдан
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -right-2 bottom-36 bg-white rounded-2xl shadow-xl p-3 border border-neutral-100 w-40 hidden sm:block">
        <div className="flex items-center gap-1.5 mb-1">
          <BellFill className="size-3 text-amber-500" />
          <p className="text-xs font-semibold text-neutral-700">Напоминание</p>
        </div>
        <p className="text-xs text-neutral-500">
          Прививка через{' '}
          <span className="font-bold text-neutral-800">5 дней</span>
        </p>
      </div>
    </div>
  )
}
