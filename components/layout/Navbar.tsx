'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: 'hero', label: 'Home', section: 'hero' },
  { href: 'about', label: 'About Us', section: 'about' },
  { href: 'benefits', label: 'Benefits', section: 'benefits' },
  { href: 'portfolio', label: 'Portfolio', section: 'portfolio' },
  { href: 'services', label: 'Services', section: 'services' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Check which section is currently in view
      const sections = navLinks.map(link => document.getElementById(link.section))
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          const offset = 150 // Offset to trigger slightly before the section reaches top
          
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(navLinks[i].section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
        scrolled ? 'bg-black/5 backdrop-blur-sm' : ''
      }`}>
        <div className="container-custom py-3">
          <div className="bg-black/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button 
                onClick={() => scrollToSection('hero')}
                className="relative z-10 cursor-pointer"
              >
                <div className="relative w-[100px] h-[40px] md:w-[120px] md:h-[45px]">
                  <Image
                    src="/images/logoyourease.svg"
                    alt="Yourease"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.section)}
                    className={`text-base font-medium transition-colors hover:text-neon-lime cursor-pointer ${
                      activeSection === link.section 
                        ? 'text-neon-lime' 
                        : 'text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Let's Talk Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden md:flex items-center gap-2 bg-neon-lime rounded-lg px-4 py-1.5 group hover:bg-white transition-colors cursor-pointer"
              >
                <span className="text-dark font-trailers text-xl uppercase">let's talk</span>
                <div className="relative w-6 h-6 overflow-hidden">
                  <motion.div
                    animate={{ x: [0, 30, -30, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 flex items-center"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden relative z-20 w-12 h-12 flex items-center justify-center bg-neon-lime rounded-lg"
              >
                <div className="w-5 flex flex-col gap-1">
                  <span className={`w-full h-0.5 bg-dark transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`} />
                  <span className={`w-3/4 h-0.5 bg-dark transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`} />
                  <span className={`w-full h-0.5 bg-dark transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[998] bg-white/90 backdrop-blur-lg md:hidden pt-24"
          >
            <div className="container-custom">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className={`text-3xl font-trailers block w-full text-left transition-colors ${
                        activeSection === link.section 
                          ? 'text-neon-lime' 
                          : 'text-dark hover:text-neon-lime'
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => scrollToSection('contact')}
                  className="mt-4 inline-flex items-center gap-2 bg-neon-lime rounded-lg px-6 py-3 w-fit cursor-pointer"
                >
                  <span className="text-dark font-trailers text-xl uppercase">let's talk</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}