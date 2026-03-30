'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SnapCard {
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  image: string;
  variant: 'dark' | 'light';
}

const snapCards: SnapCard[] = [
  {
    title: 'Working on customer perception',
    description: 'Our creative team at Blushush is interested in redefining how people see you. For us, you are the brand, and that\'s the initial thought with which we move ahead.',
    stats: [
      { value: '25%', label: 'increase sales' },
      { value: '76%', label: 'Trust boost' },
    ],
    image: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/681789816b73f738faec9457_mo-uEsjoCzALaU-unsplash.avif',
    variant: 'dark',
  },
  {
    title: 'Branding is an art, we are the artist',
    description: 'We don\'t want to show you templates, ready to use models, and suggest strategies that have worked for someone else. We sit with you to understand your vision.',
    stats: [
      { value: '500M', label: 'reach' },
      { value: '30+', label: 'Investment' },
    ],
    image: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/681789816b73f738faec944d_pexels-francesco-ungaro-1326999.avif',
    variant: 'light',
  },
  {
    title: 'We collaborate so we could customize',
    description: 'At Blushush, we firmly believe that branding is personal, it is not something you do at random without any thought or perspective.',
    stats: [
      { value: '200%', label: 'increase sales' },
      { value: '76k', label: 'Trust boost' },
    ],
    image: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/681789816b73f738faec9444_pexels-mo-8347499.avif',
    variant: 'dark',
  },
];

export default function SnapScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress through the section (0 to 1)
      // Section is 300vh tall (3 slides * 100vh each)
      const scrollProgress = Math.max(0, Math.min(1, 
        (-sectionTop) / (sectionHeight - windowHeight)
      ));
      
      setProgress(scrollProgress);
      
      // Determine active slide (0, 1, or 2)
      const slideIndex = Math.min(
        snapCards.length - 1,
        Math.floor(scrollProgress * snapCards.length)
      );
      setActiveIndex(slideIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${snapCards.length * 100}vh` }} // 300vh for 3 slides
    >
      {/* Header - Outside sticky area so it scrolls away */}
      <div className="text-center mb-0 px-4 pt-20 pb-8 bg-white">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-['TT_Trailers']">
          Let us help you redefine yourself
        </h2>
        <p className="text-gray-600 text-lg font-['GeneralSans']">
          We'll set your narrative to make sure your brand story sells
        </p>
      </div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* LEFT SIDE - Content (Slides UP on scroll) */}
            <div className="relative h-full overflow-hidden">
              {snapCards.map((card, index) => {
                const isDark = card.variant === 'dark';
                // Left side moves UP as activeIndex increases
                const offset = (index - activeIndex) * 100;
                const slideProgress = (progress * snapCards.length) % 1;
                const isTransitioning = Math.floor(progress * snapCards.length) === index;
                
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-out flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
                      isDark ? 'bg-[#3665fb] text-white' : 'bg-[#d1fd68] text-gray-900'
                    }`}
                    style={{
                      transform: `translateY(${offset}%)`,
                    }}
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-['TT_Trailers'] uppercase leading-tight">
                      {card.title}
                    </h2>
                    <p className={`text-base md:text-lg mb-8 leading-relaxed ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {card.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {card.stats.map((stat, i) => (
                        <div key={i}>
                          <div className={`text-4xl md:text-5xl font-bold mb-2 font-['GeneralSans'] ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {stat.value}
                          </div>
                          <div className={`text-sm uppercase tracking-wider ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      href="#contact"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all w-fit ${
                        isDark 
                          ? 'bg-white text-gray-900 hover:bg-gray-100' 
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      <span className="font-['TT_Trailers'] text-xl">let's talk</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* RIGHT SIDE - Images (Slides DOWN on scroll - opposite direction) */}
            <div className="relative h-full overflow-hidden">
              {snapCards.map((card, index) => {
                // Right side moves DOWN as activeIndex increases (opposite to left)
                const offset = (activeIndex - index) * 100;
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateY(${offset}%)`,
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                );
              })}
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {snapCards.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-white/80' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}