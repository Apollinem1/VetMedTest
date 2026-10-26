import { Navbar } from '@/widgets/navbar'
import { Hero } from '@/widgets/hero'
import { StatsBar } from '@/widgets/stats-bar'
import { OwnerFeatures } from '@/widgets/owner-features'
import { HowItWorks } from '@/widgets/how-it-works'
import { ClinicSection } from '@/widgets/clinic-section'
import { B2bSection } from '@/widgets/b2b-section'
import { Pricing } from '@/widgets/pricing'
import { Testimonials } from '@/widgets/testimonials'
import { CtaSection } from '@/widgets/cta-section'
import { Footer } from '@/widgets/footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar />
      <div className="flex flex-col min-h-dvh pt-16">
        <div className="flex-1 min-h-0 flex flex-col">
          <Hero />
        </div>
        <StatsBar />
      </div>
      <section id="возможности" aria-label="Возможности" className="scroll-mt-16">
        <OwnerFeatures />
      </section>
      <HowItWorks />
      <section id="клиникам" aria-label="Клиникам" className="scroll-mt-16">
        <ClinicSection />
      </section>
      <section id="заводчикам" aria-label="Заводчикам" className="scroll-mt-16">
        <B2bSection />
      </section>
      <section id="цены" aria-label="Цены" className="scroll-mt-16">
        <Pricing />
      </section>
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  )
}
