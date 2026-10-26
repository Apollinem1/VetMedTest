import {
  ArrowRight,
  Smartphone,
  CircleCheckFill,
  ShieldCheck,
  Lock,
} from '@gravity-ui/icons'
import { Button } from 'core-frontend'
import { useAuthModalStore } from '@/features/auth'
import { PHONE_DESIGN_HEIGHT } from '../config/constants'
import { useContainerHeight } from '../model/useContainerHeight'
import { HeroLavaBackground } from './HeroLavaBackground'
import { PhoneMockup } from './PhoneMockup'

const HERO_FEATURES = [
  { Icon: CircleCheckFill, text: 'До 2 питомцев бесплатно' },
  { Icon: ShieldCheck, text: 'Работает офлайн' },
  { Icon: Lock, text: 'Данные защищены' },
] as const

export function Hero() {
  const { openRegister } = useAuthModalStore()
  const [phoneColumnRef, columnHeight] = useContainerHeight()

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-emerald-50/50 to-white flex-1 min-h-0 flex flex-col justify-center py-6 sm:py-8"
      aria-label="Главный экран — медкарта питомца в смартфоне"
    >
      <HeroLavaBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Уже доступно в России
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-neutral-900 leading-[1.1] tracking-tight mb-4 sm:mb-5">
              Вся медкарта<br />
              питомца —<br />
              <span className="text-emerald-600">в смартфоне</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed mb-6 sm:mb-7 max-w-md">
              Прививки, дегельминтизация, история болезней — больше никаких потерянных бумажек. Врач видит историю мгновенно, напоминания приходят сами.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-7">
              <Button
                variant="primary"
                size="lg"
                
                onPress={openRegister}
              >
                Начать бесплатно <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Smartphone className="size-4" /> Скачать приложение
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-sm text-neutral-400">
              {HERO_FEATURES.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="size-4 text-emerald-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone — only on lg+; scales to column height so content always fits */}
          <div ref={phoneColumnRef} className="hidden lg:flex justify-end items-center min-h-0">
            <PhoneMockup containerHeight={columnHeight} designHeight={PHONE_DESIGN_HEIGHT} />
          </div>
        </div>
      </div>
    </section>
  )
}
