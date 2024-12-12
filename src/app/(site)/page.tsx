import { AppSection } from '@/components/site/app-section'
import ClientsSection from '@/components/site/clients-section'
import ContactSection from '@/components/site/contact-section'
import FooterSection from '@/components/site/footer-section'
import { HeroSectionTwo } from '@/components/site/hero-section-two'
import IconSection from '@/components/site/icon-section'
import IntegrationsSection from '@/components/site/integrations-section'
import ShowcaseSection from '@/components/site/showcase-section'
import { TestimonialsSection } from '@/components/site/testimonials-section'
import { Particles } from '@/components/ui/particles'
import React from 'react'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <section className="h-full max-w-screen relative flex items-center justify-center flex-col bg-zinc-950 ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
       {/*  <Particles className="absolute inset-0 z-10" />
        <div className="absolute inset-x-0 top-2 z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">

        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#3E8F89] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        }}
        />
        </div> */}
        <HeroSectionTwo/>
      </section>
      
      <AppSection/>
      {/* <ClientsSection/> */}
      {/* <IconSection/> */}
      <IntegrationsSection/>
      {/* <ShowcaseSection/> */}
      <TestimonialsSection/>
      <ContactSection/>
      <FooterSection/>
    </div>
  )
}
export default HomePage