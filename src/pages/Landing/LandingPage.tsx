import './globals.css'

import ShadCNThemeProvider from '@/containers/ShadCN'
import { cn } from '@/lib/utils'
import { FC } from 'react'

import LandingTableCompany from './components/LandingTableCompany/LandingTableCompany'
import { BenefitsSection } from './components/sections/Benefits'
import { FAQSection } from './components/sections/Faq'
import { FeaturesSection } from './components/sections/Features'
import { FooterSection } from './components/sections/Footer'
import { HeroSection } from './components/sections/Hero'
import { PricingSection } from './components/sections/Pricing'
import { TestimonialSection } from './components/sections/Testimonial'
import Tutorial from './components/sections/Tutorial'
import { Navbar } from './Navbar'

const LandingPage: FC = () => {
  return (
    <>
      {/* Inspired by https://github.com/nobruf/shadcn-landing-page/ */}

      <div suppressHydrationWarning lang="fr">
        <div
          className={cn('min-h-screen bg-background')}
          style={{ fontFamily: 'Poppins' }}
        >
          <ShadCNThemeProvider>
            <Navbar />

            <HeroSection />
            <LandingTableCompany />
            <BenefitsSection />
            <FeaturesSection />
            <TestimonialSection />
            <Tutorial />
            {/* <TeamSection /> */}
            <PricingSection />
            <FAQSection />
            <FooterSection />
            {/* <CookieConsent /> */}
          </ShadCNThemeProvider>
        </div>
      </div>
    </>
  )
}

export default LandingPage
