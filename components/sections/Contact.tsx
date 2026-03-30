'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, Variants } from 'framer-motion'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setFormStatus('submitting')
  
  // FIX: Store form reference before async operations
  const form = e.currentTarget
  
  const formData = new FormData(form)
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email') || '',
    message: formData.get('message') || '',
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (response.ok) {
      const result = await response.json()
      if (result.success === true) {
        setFormStatus('success')
        form.reset() // Use the stored reference instead of e.currentTarget
        setTimeout(() => setFormStatus('idle'), 3000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 3000)
      }
    } else {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  } catch (error) {
    console.error('Submit error:', error)
    setFormStatus('error')
    setTimeout(() => setFormStatus('idle'), 3000)
  }
}

  return (
    <section id="contact" ref={ref} className="bg-white section">
      <div className="container-custom">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Hero Title Area */}
          <div className="relative overflow-hidden mb-12">
            <div className="relative">
              <h1 className="text-dark text-8xl md:text-[280px] font-trailers font-bold leading-[1] text-center">
                Contact
              </h1>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mt-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name - Required */}
              <div>
                <label htmlFor="name" className="block text-dark text-sm font-medium mb-2 uppercase tracking-wide opacity-60">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-400 focus:border-neon-lime outline-none transition-colors text-dark text-lg"
                  placeholder="Your name"
                />
              </div>

              {/* Phone - Required */}
              <div>
                <label htmlFor="phone" className="block text-dark text-sm font-medium mb-2 uppercase tracking-wide opacity-60">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-400 focus:border-neon-lime outline-none transition-colors text-dark text-lg"
                  placeholder="+92 300 1234567"
                />
              </div>

              {/* Email - Optional */}
              <div>
                <label htmlFor="email" className="block text-dark text-sm font-medium mb-2 uppercase tracking-wide opacity-60">
                  Email <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-400 focus:border-neon-lime outline-none transition-colors text-dark text-lg"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message - Optional */}
              <div>
                <label htmlFor="message" className="block text-dark text-sm font-medium mb-2 uppercase tracking-wide opacity-60">
                  Message <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-400 focus:border-neon-lime outline-none transition-colors text-dark text-lg resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="inline-flex items-center gap-2 bg-neon-lime text-dark font-medium rounded-lg px-8 py-3 hover:bg-dark hover:text-neon-lime transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                   <Image
                              src="/images/service.svg"
                              alt=""
                              width={10}
                              height={14}
                              className="ml-1"
                            />
                </button>
              </div>

              {formStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center">
                  Thanks! We'll get back to you soon.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}