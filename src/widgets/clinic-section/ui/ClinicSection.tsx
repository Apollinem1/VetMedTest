import { Lock, HeartPulse, Bell, Stethoscope, CirclePlus, ArrowRight } from '@gravity-ui/icons'
import { Button } from 'core-frontend'

export function ClinicSection() {
  return (
    <section id="клиникам" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div data-theme="dark" className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-7 text-white">
          <div className="flex items-center gap-2 mb-6">
            <Stethoscope className="size-4 text-slate-400" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Интерфейс ветврача
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-lg shrink-0">
                  🐕
                </div>
                <div>
                  <p className="font-semibold text-sm">Барон · Лабрадор</p>
                  <p className="text-xs text-slate-400">Владелец: Иванов А.</p>
                </div>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                Доступ активен
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Вес', value: '28 кг' },
                { label: 'Возраст', value: '3 г' },
                { label: 'Визитов', value: '8' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-bold mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-1.5 mb-2.5">
              <HeartPulse className="size-3.5 text-slate-400" />
              <p className="text-xs text-slate-400 font-semibold">Последние визиты</p>
            </div>
            {[
              { date: '12 апр', text: 'Плановый осмотр · Д-р Петрова' },
              { date: '3 мар', text: 'Отит · Д-р Сидоров' },
              { date: '15 янв', text: 'Вакцинация · Д-р Петрова' },
            ].map(({ date, text }) => (
              <div key={date} className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0">
                <span className="text-xs text-slate-500 w-12 shrink-0">{date}</span>
                <span className="text-xs text-slate-300">{text}</span>
              </div>
            ))}
          </div>

          <Button variant="primary" className="w-full gap-2">
            <CirclePlus className="size-4" /> Добавить запись приёма
          </Button>
        </div>

        <div>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.15em] mb-3">
            Для клиник
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-5">
            Клиент приходит с цифровой картой — вы уже всё знаете
          </h2>
          <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
            Никаких бумажных ветпаспортов и пересказов истории болезней. Врач видит всё нужное мгновенно.
          </p>

          <div className="space-y-5 mb-10">
            {[
              {
                icon: <Lock className="size-5 text-emerald-600" />,
                title: 'Мгновенный доступ к анамнезу',
                desc: 'Владелец выдаёт доступ на стойке или заранее. Один тап — и вся история болезней перед вами.',
              },
              {
                icon: <HeartPulse className="size-5 text-emerald-600" />,
                title: 'Ведите записи прямо в системе',
                desc: 'Добавляйте визиты, прививки, рецепты. Владелец видит всё в реальном времени.',
              },
              {
                icon: <Bell className="size-5 text-emerald-600" />,
                title: 'Онлайн-запись и уведомления',
                desc: 'Клиенты записываются сами, напоминания — автоматически. Меньше пропущенных визитов.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <p className="font-bold text-neutral-900 mb-0.5">{title}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="secondary" size="lg" className="gap-2">
            Подключить клинику <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
