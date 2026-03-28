import Hero from '@/components/sections/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import Benefits from '@/components/sections/Benefits'
import Portfolio from '@/components/sections/Portfolio'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <WhatWeDo />
      </section>
      <section id="benefits">
        <Benefits />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  )
}