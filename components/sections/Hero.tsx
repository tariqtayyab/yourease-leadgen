'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimation, useInView, Variants } from 'framer-motion'
import Link from 'next/link'

// Local images
const heroImages = ['1.avif', '2.avif', '3.avif', '4.avif']
const heroImagesReverse = ['5.avif', '6.avif', '7.avif', '8.avif']
const clientTexts = ['Finance', 'Tech', 'Health', 'E-commerce', 'AI']

// Define variants with proper types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  // Pulse animation for the tag (matching original)
  useEffect(() => {
    const pulseElement = pulseRef.current
    if (pulseElement) {
      const animatePulse = () => {
        const scaleElement = pulseElement.querySelector('.pulse-scale')
        if (scaleElement) {
          scaleElement.classList.add('animate-pulse-scale')
          setTimeout(() => {
            scaleElement.classList.remove('animate-pulse-scale')
          }, 1000)
        }
      }
      animatePulse()
      const interval = setInterval(animatePulse, 3000)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <section className="relative bg-black min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Gradient - matching original */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col lg:flex-row justify-between items-center gap-8"
        >
          {/* Left Content - Reduced width on desktop */}
          <div className="w-full lg:w-[40%] space-y-6">
            {/* Tags - with pulse animation */}
            <motion.div variants={itemVariants} className="flex gap-5 flex-wrap justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
                <Image
                  src="/images/star-icon.svg"
                  alt="Star"
                  width={16}
                  height={16}
                />
                <span className="text-white text-sm">Chosen by Founders</span>
              </div>
            </motion.div>

            {/* Heading - CENTERED ON MOBILE */}
            <motion.h1
              variants={itemVariants}
              className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] text-center lg:text-left"
            >
              Digital solutions,{' '}
              <span className="font-trailers text-neon-lime inline-block text-[46px] lg:text-[80px]">
                designed to 
              </span>{' '}
              scale
            </motion.h1>

            {/* Description - CENTERED ON MOBILE */}
            <motion.p 
              variants={itemVariants} 
              className="text-white text-base leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0"
            >
              Built with clarity, structure, and performance in mind. Our websites & apps remove friction, 
              support decision-making, and help your brand move forward smoothly.
            </motion.p>

            {/* CTA Button - CENTERED ON MOBILE */}
            <motion.div 
              variants={itemVariants} 
              className="flex justify-center lg:justify-start"
            >
              <Link
                href="https://form.typeform.com/to/frvHh03C"
                target="_blank"
                className="inline-flex items-center gap-2 bg-neon-lime rounded-lg px-8 py-1.5 group hover:bg-white transition-all hover:scale-105"
              >
                <span className="text-[#222222] font-medium text-[26px] lg:text-[32px] font-trailers">Book A Call</span>
                <Image
                  src="/images/service.svg"
                  alt=""
                  width={10}
                  height={14}
                  className="ml-1"
                />
              </Link>
            </motion.div>

            {/* Client Text Animation - CENTERED ON MOBILE */}
            <motion.div 
              variants={itemVariants} 
              className="space-y-2 text-center lg:text-left"
            >
              <p className="text-white text-base">Worked with clients</p>
              <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
                {clientTexts.map((text, index) => (
                  <motion.span
                    key={text}
                    initial={{ opacity: 0.5, color: '#ffff' }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      color: ['#ffff', '#d1fd68', '#ffff'],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="text-white font-trailers text-4xl md:text-4xl cursor-default inline-block"
                  >
                    {text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Image Slider - EXPANDED WIDTH on desktop */}
          <div className="w-full lg:w-[55%] relative">
            {/* Forward Slider - scrolling left to right */}
            <div className="relative overflow-hidden mb-6">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="flex gap-6 w-max"
              >
                {[...heroImages, ...heroImages].map((src, index) => (
                  <div 
                    key={index} 
                    className="w-[280px] md:w-[390px] h-[180px] md:h-[240px] rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={`/images/hero/${src}`}
                      alt={`Portfolio ${index + 1}`}
                      width={390}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Reverse Slider - scrolling right to left */}
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="flex gap-6 w-max"
              >
                {[...heroImagesReverse, ...heroImagesReverse].map((src, index) => (
                  <div 
                    key={index} 
                    className="w-[280px] md:w-[390px] h-[180px] md:h-[240px] rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={`/images/hero/${src}`}
                      alt={`Portfolio ${index + 1}`}
                      width={390}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Gradient Overlays - matching original */}
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}