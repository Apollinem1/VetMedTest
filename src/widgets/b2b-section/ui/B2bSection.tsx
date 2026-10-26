import React from 'react'
import {
  ChartMixed,
  ChartLine,
  PersonPlus,
  BellFill,
  Bell,
  Stethoscope,
  ArrowRight,
} from '@gravity-ui/icons'
import { Button } from 'core-frontend'

export function B2bSection() {
  return (
      <section id="заводчикам" data-theme="dark" className="py-24 bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.15em] mb-3">
              Для заводчиков и ферм
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-5">
              Аналитика по всему поголовью
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Когда животных не 2, а 200 — нужна не медкарта, а инструмент управления здоровьем питомника.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                { icon: <ChartMixed className="size-5" />, title: 'Статистика заболеваемости', desc: 'Тренды по породам, возрастам, сезонности' },
                { icon: <PersonPlus className="size-5" />, title: 'Команда сотрудников', desc: 'Роли и права для каждого' },
                { icon: <BellFill className="size-5" />, title: 'Групповые напоминания', desc: 'Плановые обработки всего поголовья' },
                { icon: <ChartLine className="size-5" />, title: 'Прогнозы и аномалии', desc: 'Python-аналитика: риски и тренды' },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="text-emerald-400 mb-2">{icon}</div>
                  <p className="font-semibold text-sm mb-0.5">{title}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" className="btn-gradient gap-2">
                Узнать о тарифах B2B <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                style={{
                  '--button-bg': 'rgba(255,255,255,0.08)',
                  '--button-bg-hover': 'rgba(255,255,255,0.14)',
                  '--button-fg': 'white',
                } as React.CSSProperties}
              >
                Связаться с нами
              </Button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Stethoscope className="size-4 text-emerald-400/70" />
              <p className="text-xs text-emerald-400/70 uppercase tracking-widest font-semibold">
                Питомник «Северная Звезда»
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Животных', value: '148', badge: '+3', color: 'text-emerald-400' },
                { label: 'Осмотров/мес', value: '42', badge: '+8%', color: 'text-emerald-400' },
                { label: 'Вакцинировано', value: '97%', badge: '↑', color: 'text-emerald-400' },
              ].map(({ label, value, badge, color }) => (
                <div key={label} className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">{label}</p>
                  <p className="text-xl font-black">{value}</p>
                  <p className={`text-xs font-medium ${color}`}>{badge}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-1.5 mb-3">
                <ChartMixed className="size-3.5 text-slate-400" />
                <p className="text-xs text-slate-400 font-semibold">Заболеваемость за 6 месяцев</p>
              </div>
              <div className="flex items-end gap-1.5 h-14">
                {[
                  { h: 4, active: false },
                  { h: 7, active: false },
                  { h: 5, active: false },
                  { h: 9, active: true },
                  { h: 6, active: false },
                  { h: 3, active: false },
                ].map(({ h, active }, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all"
                    style={{
                      height: `${(h / 9) * 100}%`,
                      background: active ? '#10b981' : 'rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </div>
              <div className="flex mt-1">
                {['Окт', 'Ноя', 'Дек', 'Янв', 'Фев', 'Мар'].map((m) => (
                  <p key={m} className="flex-1 text-center text-xs text-emerald-300/50">{m}</p>
                ))}
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex gap-2.5">
              <Bell className="size-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-400 mb-0.5">Аномалия обнаружена</p>
                <p className="text-xs text-slate-400">
                  В январе рост ОРВИ у щенков 2–4 мес. на 45% выше нормы. Рекомендуется проверить вентиляцию.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
