'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer ref={ref} className="bg-white pt-16 pb-8 overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-8 md:gap-10 justify-between"
        >
          {/* Navigation */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-dark text-sm font-medium uppercase tracking-wide">Navigation</h4>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('hero')} className="block group">
                  <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                    Home
                  </span>
                </button>
                <button onClick={() => scrollToSection('about')} className="block group">
                  <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                    About Us
                  </span>
                </button>
                <button onClick={() => scrollToSection('benefits')} className="block group">
                  <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                    Benefits
                  </span>
                </button>
                <button onClick={() => scrollToSection('portfolio')} className="block group">
                  <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                    Portfolio
                  </span>
                </button>
                <button onClick={() => scrollToSection('services')} className="block group">
                  <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                    Services
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-dark text-sm font-medium uppercase tracking-wide">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:hello@yourease.com" 
                className="block group"
              >
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                  hello@yourease.com
                </span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="block group"
              >
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                  +1 (234) 567-890
                </span>
              </a>
            </div>
          </motion.div>

          {/* Follow Us */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-dark text-sm font-medium uppercase tracking-wide">Follow Us</h4>
            <div className="space-y-3">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                  Instagram
                </span>
              </a>
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-bold font-trailers hover:text-neon-lime transition-colors">
                  Facebook
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Logo Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mt-16 pt-8 border-t border-gray-200"
        >
          <div className="flex justify-center">
            <div className="relative w-[90vw] max-w-[1400px]">
              <Image
                src="/images/logoyoureaseblack.svg"
                alt="Yourease"
                width={1400}
                height={400}
                className="w-full h-auto"
              />
              <Image
                src="/images/purpleSticker.avif"
                alt="Sticker"
                width={120}
                height={120}
                className="absolute 
                  right-[6%] 
                  bottom-[65%] 
                  w-[8vw] max-w-[90px]"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-6 border-t border-gray-200"
        >
          <p className="text-dark/60 text-sm">
            Copyright ©2025. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-dark/60 text-sm hover:text-neon-lime transition-colors">
              Privacy
            </Link>
            <span className="w-px h-4 bg-gray-300"></span>
            <Link href="/terms-condition" className="text-dark/60 text-sm hover:text-neon-lime transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}