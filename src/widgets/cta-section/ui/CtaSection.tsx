import React from 'react'
import { HeartPulse, Stethoscope, Pill, ArrowRight, Smartphone } from '@gravity-ui/icons'
import { Button } from 'core-frontend'

export function CtaSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-linear-to-r from-brand-accent to-brand-success rounded-3xl px-8 py-16 text-white text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-4 text-white/40">
            <HeartPulse className="size-6" />
            <Stethoscope className="size-6" />
            <Pill className="size-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ваш питомец заслуживает лучшей заботы
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto">
            Начните прямо сейчас. Первые 2 питомца — навсегда бесплатно.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="gap-2 shadow-lg shadow-black/20"
              style={{
                '--button-bg': 'white',
                '--button-bg-hover': 'color-mix(in oklch, white 94%, var(--brand-accent) 6%)',
                '--button-bg-pressed': 'color-mix(in oklch, white 90%, var(--brand-accent) 10%)',
                '--button-fg': 'var(--brand-accent)',
              } as React.CSSProperties}
            >
              Зарегистрироваться <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="gap-2 text-white"
              style={{
                '--button-bg': 'rgba(255,255,255,0.12)',
                '--button-bg-hover': 'rgba(255,255,255,0.2)',
                '--button-bg-pressed': 'rgba(255,255,255,0.25)',
                '--button-fg': 'white',
              } as React.CSSProperties}
            >
              <Smartphone className="size-4" /> Скачать приложение
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
