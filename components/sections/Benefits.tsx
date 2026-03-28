'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const benefits = [
  {
    id: 1,
    title: "Custom-Crafted Solutions",
    description: "No templates, no shortcuts. Every project is built from the ground up to match your brand's unique identity and business goals—delivering a digital experience that truly stands out.",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea3eaa6d27b9ba153465_Soluscent_mp4.mp4",
    color: "green",
  },
  {
    id: 2,
    title: "Engaging User Experiences",
    description: "From smooth transitions to intuitive interactions, we create digital experiences that captivate users and keep them engaged. Every animation, every movement is crafted with purpose.",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea5f073ea72439ecf222_Loom_mp4.mp4",
    color: "blue",
  },
  {
    id: 3,
    title: "Scalable & Maintainable Code",
    description: "Built to grow with your business. Clean, well-documented code that makes updates effortless—so you can focus on running your business while we handle the technical heavy lifting.",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997e1182af7658f0da9ca6b_Sumedh_mp4.mp4"  ,
    color: "green",
  },
  {
    id: 4,
    title: "Performance & Visibility",
    description: "Fast loading, search-optimized, and built with best practices. We ensure your digital products are discoverable, accessible, and deliver the performance your users expect.",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea4829437da58db6f9e6_Ohhmybrand_mp4.mp4",
    color: "blue",
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="bg-white py-20">

      <div className="max-w-[1440px] mx-auto px-4 lg:px-[50px]">

        {/* HEADER (now goes behind cards) */}
        <div className="sticky top-[100px] mb-12">
          
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="https://cdn.prod.website-files.com/69b12e7599844149c96e777b/69b12e7599844149c96e778c_Group-1321314133.svg"
              alt=""
              width={12}
              height={16}
            />
            <span className="text-sm font-medium">Benefits</span>
          </div>

          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] max-w-[750px]">
            Modern web & app solutions.<br />
            Built for{' '}
<span className="text-[#d1fd68]">scale,</span> designed for <span className="text-[#d1fd68]">impact.</span>
          </h2>

          {/* <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] max-w-[750px]">
            digital experiences.<br />
            Where innovation meets <span className="text-[#d1fd68]">execution.</span>
          </h2> */}

        </div>

        {/* STACK (now above text) */}
        <div className="flex flex-col gap-6 relative z-30">

          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}

        </div>

      </div>
    </section>
  )
}

function BenefitCard({ benefit, index }: any) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  const isBlue = benefit.color === 'blue'

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, zIndex: 50 + index }}
      className={`
        rounded-[14px] overflow-hidden
        ${isBlue ? 'bg-[#3665fb]' : 'bg-[#d1fd68]'}
        sticky top-[100px]
      `}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-5 py-6 lg:px-6 lg:py-7">

        {/* TEXT */}
        <div className="flex flex-col justify-start max-w-[600px]">
          <h3 className={`text-[26px] lg:text-[34px] font-bold mb-2 ${
            isBlue ? 'text-white' : 'text-[#222]'
          }`}>
            {benefit.title}
          </h3>

          <p className={`text-[16px] lg:text-[23px] leading-[1.4] ${
            isBlue ? 'text-white' : 'text-[#222]'
          }`}>
            {benefit.description}
          </p>
        </div>

        {/* VIDEO */}
        <div className="relative bg-black rounded-[12px] overflow-hidden h-[220px] lg:h-[260px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={benefit.video} type="video/mp4" />
          </video>
        </div>

      </div>
    </motion.div>
  )
}