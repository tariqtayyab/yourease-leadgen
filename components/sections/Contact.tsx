'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')

    setTimeout(() => {
      setFormStatus('success')
      e.currentTarget.reset()
      setTimeout(() => setFormStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="bg-white py-20 lg:py-32">

      <div className="max-w-[1200px] mx-auto px-4 lg:px-0">

        {/* BIG TITLE */}
        <div className="mb-16 lg:mb-24 text-center">
          <h1 className="font-trailers font-bold text-[80px] sm:text-[120px] md:text-[180px] lg:text-[260px] leading-[0.9] tracking-tight">
            CONTACT
          </h1>
        </div>

        {/* FORM (CENTERED) */}
        <div className="max-w-[600px] mx-auto">

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* NAME */}
            <div>
              <label className="text-xs uppercase tracking-wider text-black/50 mb-2 block">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full bg-transparent border-b border-black/30 py-3 text-[18px] outline-none focus:border-[#d1fd68] transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs uppercase tracking-wider text-black/50 mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-black/30 py-3 text-[18px] outline-none focus:border-[#d1fd68] transition"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-xs uppercase tracking-wider text-black/50 mb-2 block">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your project..."
                className="w-full bg-transparent border-b border-black/30 py-3 text-[18px] outline-none resize-none focus:border-[#d1fd68] transition"
              />
            </div>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 w-5 h-5 border border-black"
              />
              <p className="text-sm text-black/60">
                I consent to having this website store my submitted information.
              </p>
            </div>

            {/* BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="flex items-center gap-3 text-black font-medium group"
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}

                <Image
                  src="/images/service.svg"
                  alt=""
                  width={12}
                  height={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>

            {/* SUCCESS */}
            {formStatus === 'success' && (
              <p className="text-green-600 text-sm">
                Thanks! We'll get back to you soon.
              </p>
            )}

          </form>

        </div>

      </div>
    </section>
  )
}