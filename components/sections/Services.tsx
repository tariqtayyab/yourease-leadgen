// components/sections/Services.tsx

'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const services = [
  {
    id: 1,
    title: "Branding",
    description: "Branding has never been this personal before",
    icon: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed444c3b8e7faa2eceedf0_Frame-1261154932.svg",
    link: "/service/branding",
    linkText: "Explore Branding",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "We don't just design interfaces; we craft experiences that users love and remember.",
    icon: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed47d45d639e93d935dbc4_figma.svg",
    link: "/service/ui-ux-design",
    linkText: "See the Process",
  },
  {
    id: 3,
    title: "Web & App Development",
    description: "Clean code, scalable architecture, and seamless performance across all devices.",
    icon: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed4913a37def23028e1357_webflow.svg",
    link: "/service/web-app-development",
    linkText: "Build with Us",
  },
  {
    id: 4,
    title: "CMS Management",
    description: "We help you control your content so that you can manage your audience",
    icon: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed4913a37def23028e1357_webflow.svg",
    link: "/service/cms-management",
    linkText: "Take Control",
  },
  {
    id: 5,
    title: "Strategy & Consultation",
    description: "We consult with you, and we strategize for you",
    icon: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed4938e594d0c21b216133_strategy.svg",
    link: "/service/strategy-consultation",
    linkText: "Get a Strategy",
  },
  {
    id: 6,
    title: "Drive Traffic & Build Funnels",
    description: "We help you strategically so you can grow organically",
    icon: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed494c3cfb34d52b493dfa_trafic.svg",
    link: "/service/drive-traffic-build-funnels",
    linkText: "Boost Visibility",
  },
  {
    id: 7,
    title: "SEO & Performance Optimization",
    description: "We make you rank, we make you reach. We make you relevant.",
    icon: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed47d45d639e93d935dbc4_figma.svg",
    link: "/service/seo-performance-optimization",
    linkText: "See the Process",
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[50px]">

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

          {/* LEFT */}
         <div className="lg:w-[45%] lg:sticky lg:top-[120px] h-fit">

  <div className="flex items-center gap-2 mb-4 bg-[#f6ffe1] px-4 py-2 rounded-lg w-fit">
    <Image
      src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed1c138e786e01ae05e207_Group-1321314133.svg"
      alt=""
      width={12}
      height={16}
    />
    <span className="text-xs lg:text-sm font-medium">Services</span>
  </div>

  {/* TITLE 1 */}
  <h2 className="text-[33px] sm:text-[32px] md:text-[46px] font-bold leading-[1.2] lg:whitespace-nowrap">
    Much more than just a <br className="block lg:hidden" />
    site
  </h2>

  {/* TITLE 2 */}
 <h2 className="text-[32px] sm:text-[34px] md:text-[46px] font-bold leading-[1.1] mt-3 lg:mt-4">
  We give you a{" "}
  <span className="font-trailers font-bold text-[46px] sm:text-[40px] md:text-[65px]">
    ready-to-use
  </span>{" "}
  {/* <br className="block lg:hidden" /> */}
  product.
</h2>

</div>
          {/* RIGHT */}
          <div className="lg:w-[55%]">

            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}

          </div>

        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: any) {
  return (
    <div className="bg-[#d1fd68] rounded-[15px] mb-4 lg:mb-6">

      <div className="p-4 lg:p-8">

        {/* ICON + TITLE */}
        <div className="flex gap-4 lg:gap-6 items-center mb-2 lg:mb-2">
          <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 mt-1">
            <Image src={service.icon} alt="" width={48} height={48} />
          </div>

          <h3 className="text-[32px] lg:text-[48px] font-bold text-black font-trailers">
            {service.title}
          </h3>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[16px] lg:text-[20px] mb-3 lg:mb-4 text-black">
          {service.description}
        </p>

        {/* LINK */}
        <Link
          href={service.link}
          className="flex items-center gap-2 text-black font-trailers text-[24px] lg:text-[25px]"
        >
          {service.linkText}
          <Image
            src="/images/service.svg"
            alt=""
            width={12}
            height={16}
            className="ml-2"
          />
        </Link>

      </div>
    </div>
  )
}