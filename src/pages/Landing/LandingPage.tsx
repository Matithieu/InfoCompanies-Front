import './globals.css'

import ShadCNThemeProvider from '@/containers/ShadCN'
import { cn } from '@/lib/utils'
import { DemoVideo } from '@/pages/Landing/components/sections/VideoDialog.tsx'
import { FC } from 'react'

import LandingTableCompany from './components/LandingTableCompany/LandingTableCompany'
import { BenefitsSection } from './components/sections/Benefits'
import { FAQSection } from './components/sections/Faq'
import { FeaturesSection } from './components/sections/Features'
import { FooterSection } from './components/sections/Footer'
import { HeroSection } from './components/sections/Hero'
import { PricingSection } from './components/sections/Pricing'
import { TestimonialSection } from './components/sections/Testimonial'
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
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <DemoVideo />
            <TestimonialSection />
            {/* <TeamSection /> */}
            <PricingSection />
            <FAQSection />
            <FooterSection />
          </ShadCNThemeProvider>
        </div>
      </div>
    </>
  )
}

export default LandingPage
