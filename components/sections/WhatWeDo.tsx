'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Videos data - 12 videos total (4 per column, 3 columns)
const leftColumnVideos = [
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997e110d6e84cca5778a113_Zetrashia_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997e1182af7658f0da9ca6b_Sumedh_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997e2936a9be2e01d2d41aa_Born_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997e29b7a5769b86ae4e9b3_ARCC%20Bikes_mp4.mp4',
]

const centerColumnVideos = [
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea3eaa6d27b9ba153465_Soluscent_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea4829437da58db6f9e6_Ohhmybrand_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea5f073ea72439ecf222_Loom_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea8eaea9c8c0fbabc443_Dr%20Patni_mp4.mp4',
]

const rightColumnVideos = [
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea6b3e67e9e904e93f1f_Kirsti_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea740a7d41d0001a70dd_Free%20Free%20World_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea84db87e2f337509401_Eyda%20Homes_mp4.mp4',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/6997ea8eaea9c8c0fbabc443_Dr%20Patni_mp4.mp4',
]

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Stage transforms - 3D rotation effect
  const stageRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [55, 0, 0])
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.8, 1.13, 1])
  const stageTranslateY = useTransform(scrollYProgress, [0, 0.5, 1], [65, 2, 2])
  
  // Column movements - left/right move DOWN (negative), center moves UP (positive to negative)
  const leftColumnY = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], ['0%', '-25%', '-40%', '-50%'])
  const rightColumnY = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], ['0%', '-25%', '-40%', '-50%'])
  
  // CENTER: Starts at -50% (hidden content above), moves to 0% (fully revealed)
  const centerColumnY = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], ['-50%', '-25%', '-10%', '0%'])
  
  // Intro section fades out
  const introOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0])
  const introScale = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 0.85, 0.85])
  const introY = useTransform(scrollYProgress, [0, 0.35, 0.5], [0, -10, -10])
  
  // Smooth springs
  const springConfig = { damping: 30, stiffness: 150, mass: 0.8 }
  const smoothStageRotateX = useSpring(stageRotateX, springConfig)
  const smoothStageScale = useSpring(stageScale, springConfig)
  const smoothStageTranslateY = useSpring(stageTranslateY, springConfig)
  const smoothLeftY = useSpring(leftColumnY, springConfig)
  const smoothCenterY = useSpring(centerColumnY, springConfig)
  const smoothRightY = useSpring(rightColumnY, springConfig)
  const smoothIntroOpacity = useSpring(introOpacity, springConfig)
  const smoothIntroScale = useSpring(introScale, springConfig)
  const smoothIntroY = useSpring(introY, springConfig)

  return (
    <>
      {/* MOBILE VERSION */}
      <section className="lg:hidden relative bg-black w-full py-20">
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[790px]">
              <div className="small-title inline-flex mb-6">
                <Image
                  src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed1c138e786e01ae05e207_Group-1321314133.svg"
                  alt="Star"
                  width={12}
                  height={16}
                />
                <span className="text-black text-sm font-medium ml-2">What we do</span>
              </div>
              
              <h2 className="text-white text-[33px] lg:text-[60px] font-bold mb-6 leading-[1.2]">
                <span className="text-neon-lime font-trailers text-[46px] lg:text-[80px]">High-performance</span>{' '}
                web solutions for brands ready to stand out.
              </h2>
              
              <div className="flex flex-col gap-4">
                <p className="text-[#ffff] text-base leading-relaxed font-generalsans">
                  Most websites look fine for about five seconds. Then you forget them. 
                  We build Webflow sites that hold attention a little longer and say what 
                  matters without trying too hard.
                </p>
                <p className="text-[#ffff] text-base leading-relaxed font-generalsans">
                  This is for teams who want their website handled properly. Thought through. 
                  Designed with care. Built to last.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 mt-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 gap-[2px] bg-black">
                {[
                  leftColumnVideos[0], centerColumnVideos[0], rightColumnVideos[0],
                  leftColumnVideos[1], centerColumnVideos[1], rightColumnVideos[1],
                  leftColumnVideos[2], centerColumnVideos[2], rightColumnVideos[2],
                ].map((video, idx) => (
                  <div key={idx} className="aspect-[3/4] overflow-hidden bg-black">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESKTOP VERSION */}
      <section ref={containerRef} className="hidden lg:block relative bg-black w-full" style={{ height: '250vh' }}>
        {/* Intro Section - FIXED: Proper container structure */}
        <motion.div
          style={{
            opacity: smoothIntroOpacity,
            scale: smoothIntroScale,
            y: smoothIntroY,
          }}
          className="relative z-10 pt-8 pb-12"
        >
          <div className="max-w-[1440px] mx-auto px-12 xl:px-[50px]">
            {/* FIXED: Use the same max-width as Webflow (773px/790px) and proper alignment */}
            <div className="max-w-[790px]">
              <div className="small-title inline-flex mb-6">
                <Image
                  src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed1c138e786e01ae05e207_Group-1321314133.svg"
                  alt="Star"
                  width={12}
                  height={16}
                />
                <span className="text-black text-sm font-medium ml-2">What we do</span>
              </div>
              
              <h2 className="text-white text-5xl lg:text-[60px] font-bold mb-8 leading-[1.2]">
                <span className="text-neon-lime font-trailers text-[80px] leading-[0.9]">High-performance</span>{' '}
                web solutions for brands ready to stand out.
              </h2>
              
              {/* FIXED: Two column layout for description matching Webflow */}
              <div className="flex flex-col md:flex-row gap-10">
                <p className="text-white/70 text-lg leading-[1.3] font-generalsans max-w-[547px]">
                  Most websites are forgettable within seconds. We build digital experiences that command attention and communicate with clarity—without the noise.
                </p>
                <p className="text-white/70 text-lg leading-[1.3] font-generalsans max-w-[547px]">
                  For teams who value quality over shortcuts. Thoughtfully crafted, meticulously developed, and built to scale. A website that reflects your brand, supports your goals, and delivers from the first click.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: '60em' }}>
          <motion.div
            style={{
              rotateX: smoothStageRotateX,
              scale: smoothStageScale,
              y: smoothStageTranslateY,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
            }}
            className="w-full h-full flex items-center justify-center px-4"
          >
            <div 
              className="w-full max-w-[1400px] mx-auto h-[80vh] rounded-2xl overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex gap-[2px] justify-between h-full bg-black">
                
                {/* LEFT COLUMN */}
                <motion.div
                  style={{ y: smoothLeftY }}
                  className="w-1/3 flex flex-col gap-[2px] h-auto bg-black"
                >
                  {leftColumnVideos.map((video, idx) => (
                    <div 
                      key={idx} 
                      className="w-full overflow-hidden flex-shrink-0 bg-black"
                      style={{ height: '39%', minHeight: '39%' }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={video} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </motion.div>

                {/* CENTER COLUMN */}
                <motion.div
                  style={{ y: smoothCenterY }}
                  className="w-1/3 flex flex-col gap-[2px] h-auto bg-black"
                >
                  {centerColumnVideos.map((video, idx) => (
                    <div 
                      key={idx} 
                      className="w-full overflow-hidden flex-shrink-0 bg-black"
                      style={{ height: '39%', minHeight: '39%' }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={video} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </motion.div>

                {/* RIGHT COLUMN */}
                <motion.div
                  style={{ y: smoothRightY }}
                  className="w-1/3 flex flex-col gap-[2px] h-auto bg-black"
                >
                  {rightColumnVideos.map((video, idx) => (
                    <div 
                      key={idx} 
                      className="w-full overflow-hidden flex-shrink-0 bg-black"
                      style={{ height: '39%', minHeight: '39%' }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={video} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </motion.div>
                
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}