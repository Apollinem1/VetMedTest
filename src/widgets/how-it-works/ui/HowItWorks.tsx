import { PersonPlus, HeartPulse, Stethoscope } from '@gravity-ui/icons'

export function HowItWorks() {
  return (
    <section className="bg-emerald-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.15em] mb-3">
            Как это работает
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900">Начните за 3 минуты</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          <div
            className="hidden md:block absolute top-8 h-px bg-linear-to-r from-transparent via-emerald-200 to-transparent"
            style={{ left: '20%', right: '20%' }}
          />

          {[
            {
              step: 1,
              icon: <PersonPlus className="size-7 text-emerald-600" />,
              title: 'Создайте аккаунт',
              desc: 'Регистрация по email или телефону. Добавьте данные и фото питомца — порода, возраст, пол.',
            },
            {
              step: 2,
              icon: <HeartPulse className="size-7 text-emerald-600" />,
              title: 'Заведите медкарту',
              desc: 'Внесите историю прививок и болезней вручную или загрузите фото ветпаспорта — OCR распознает данные.',
            },
            {
              step: 3,
              icon: <Stethoscope className="size-7 text-emerald-600" />,
              title: 'Приходите к врачу',
              desc: 'Выдайте врачу доступ за секунду прямо на приёме. Врач видит всю историю и добавляет записи.',
            },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 bg-white border-2 border-emerald-100 rounded-2xl flex items-center justify-center shadow-sm mx-auto">
                  {icon}
                </div>
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-emerald-600 text-white text-xs font-black rounded-full flex items-center justify-center shadow">
                  {step}
                </div>
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">{title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
