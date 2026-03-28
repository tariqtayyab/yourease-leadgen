'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const portfolioItems = [
  {
    id: 1,
    title: "Arcc Bikes",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67feaf8a44c02b6ce1ae8071_videoplayback%20%286%29%20%28online-video-cuttercom%29-transcode.mp4",
    link: "/projects/arcc-bikes",
  },
  {
    id: 2,
    title: "PINI PARMA",
    video: "https://res.cloudinary.com/dhxydnzrx/video/upload/v1774708505/88a413ec3adafc63b030cc3473e09bed_inscog.mp4",
    link: "/projects/born-clothing",
  },
  {
    id: 3,
    title: "Gunpowder",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/69988ed4acc4ac3753c036a3_Gun%20Powder%20Video_mp4.mp4",
    link: "/projects/gunpowder",
  },
  {
    id: 4,
    title: "N1 Payments",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67feae7eb815aac26f44a7ef_n1payments-transcode.mp4",
    link: "/projects/n1-payments",
  },
  {
    id: 5,
    title: "Eyda Homes",
    video: "https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67fead618b253ede93b0ac43_dylan-transcode.mp4",
    link: "/projects/eyda-homes",
  },
]

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(1000)
  
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    ["#ffffff", "#d1fd68", "#d1fd68"]
  )

  const itemWidth = windowWidth < 768 ? 320 : 500
  const gap = 31
  const totalItemsWidth = portfolioItems.length * (itemWidth + gap) + 300
  
  const scrollDistance = Math.max(0, totalItemsWidth - windowWidth + 50)
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])

  return (
    <motion.section 
      id="portfolio" 
      className="relative"
      style={{ 
        backgroundColor,
        marginTop: 0, 
        paddingTop: 0, 
        paddingBottom: 0 
      }}
    >
      <div 
        ref={containerRef} 
        className="relative"
        style={{ height: scrollDistance > 0 ? `${windowWidth + scrollDistance}px` : '100vh' }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          <div className="container-custom relative z-10 mb-8 px-8">
            <div className="flex justify-between items-start">
              <div className="small-title inline-flex items-center gap-2 mb-6 bg-[#f6ffe1] rounded-lg px-5 py-2.5">
                <Image
                  src="/images/group.svg"
                  alt="Star"
                  width={12}
                  height={16}
                />
                <span className="text-black text-sm font-medium tracking-tight">Portfolio</span>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative mt-5 mb-6"
            >
              {/* STICKER: Smaller and better positioned on mobile */}
              <Image
                src="/images/emojee.avif"
                alt="Sticker"
                width={72}
                height={72}
                className="absolute -top-2 -left-4 w-10 md:-top-8 md:-left-12 md:w-16 lg:w-20"
              />
              <h2 className="text-[#222] text-4xl md:text-5xl lg:text-[60px] font-bold leading-[1.2] font-['Generalsans']">
                <strong>Proof That </strong>
                <span className="text-[#222] font-['TT_Trailers'] font-bold text-[46px] lg:text-[80px]">
                  Good Design
                </span>
                <br />
                <strong>Means Good Business.</strong>
              </h2>
            </motion.div>
          </div>

          <motion.div 
            style={{ x }}
            className="flex gap-[31px] px-8 will-change-transform"
          >
            {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 group"
                style={{ width: `${itemWidth}px` }}
              >
                <div 
                  className="relative rounded-xl overflow-hidden bg-[#222]"
                  style={{ height: windowWidth < 768 ? '200px' : '310px' }}
                >
                  {/* VIDEOS: Autoplay on both desktop and mobile */}
                  <video
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
                
                <div className="flex justify-between items-center mt-2.5 w-full max-w-[660px]">
                  <h3 className="text-[#222] text-[25px] font-bold leading-[120%] font-['Generalsans']">
                    {item.title}
                  </h3>
                  <Link
                    href={item.link}
                    className="flex items-center gap-3 group/link"
                  >
                    <span className="text-[#222] text-2xl font-bold font-['TT_Trailers'] leading-none">
                      See more
                    </span>
                     <Image
                                                src="/images/service.svg"
                                                alt=""
                                                width={10}
                                                height={14}
                                              
                                              />
                  </Link>
                </div>
              </div>
            ))}
            
            <div className="flex-shrink-0 flex items-center justify-center w-[300px] ">
              <Link
                href="/portfolio"
                className="group flex items-center gap-4 border-1 bg-[#ffff] border-[#222] rounded-full px-2 py-1 hover:bg-transparent transition-colors duration-300"
              >
                <span className="text-[#000000] text-[32px] font-bold font-['TT_Trailers'] leading-nonetransition-colors ">
                  see all
                </span>
                {/* <div className='w-[40px] h-[2px] bg-[#2222]'></div> */}
                <Image
                src="/images/service.svg"
                alt=""
                 width={10}
                height={14}             
              />
              </Link>
            </div>
          </motion.div>
        
        </div>
      </div>
    </motion.section>
  )
}