// app/services/page.tsx or pages/services.tsx
'use client';

import React, { JSX, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Types
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
}

interface WhyChooseCard {
  title: string;
  description: string;
  variant: 'lime' | 'blue';
}

interface SnapCard {
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  image: string;
  variant: 'dark' | 'light';
}

// Data
const services: Service[] = [
  {
    id: '1',
    title: 'Branding',
    description: 'Branding has never been this personal before',
    icon: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67f9640e386569853f08b764_holographic-icon-folded-circle-no-bg-480x480.avif',
    href: '/service/branding',
  },
  {
    id: '2',
    title: 'Figma UI/UX',
    description: 'Rookies use it as a design tool; we turn it into a brand studio',
    icon: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67fac3821f2a1bae51a2f94c_wmremove-transformed-removebg-preview.webp',
    href: '/service/figma-ui-ux',
  },
  {
    id: '3',
    title: 'Webflow Development',
    description: 'Websites are first impressions; we make them sharp, visually stunning, and unforgettable.',
    icon: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67efae7a9d27bece4efcc50b_sticker%201.avif',
    href: '/service/webflow-development',
  },
  {
    id: '4',
    title: 'CMS Management',
    description: 'We help you control your content so that you can manage your audience',
    icon: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ee2e0193e0d1ee4c78ea2c_4.avif',
    href: '/service/cms-management',
  },
  {
    id: '5',
    title: 'Strategy & Consultation',
    description: 'We consult with you, and we strategize for you',
    icon: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ee2e0142376b9c25fa5eeb_2.avif',
    href: '/service/strategy-consultation',
  },
  {
    id: '6',
    title: 'Drive Traffic & Build Funnels',
    description: 'We help you strategically so you can grow organically',
    icon: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67f9640e386569853f08b764_holographic-icon-folded-circle-no-bg-480x480.avif',
    href: '/service/drive-traffic-build-funnels',
  },
  {
    id: '7',
    title: 'SEO & Performance Optimization',
    description: 'We make you rank, we make you reach. We make you relevant.',
    icon: 'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67fac4ec84b005718d20ce0e_wmremove-transformed__1_-removebg-preview.webp',
    href: '/service/seo-performance-optimization',
  },
];

const clientLogos = [
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8637_Frame%2018608.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8638_deloitte.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8632_Amazon%20logo.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a862e_Frame%2018610.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8635_Frame%2018611.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8631_Frame%2018612.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8633_EY.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8630_toyota.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8636_Frame%2018608.svg',
  'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/68178e4706e3ce73108a8634_airbus.svg',
];

const whyChooseCards: WhyChooseCard[] = [
  {
    title: 'Brand positioning',
    description: "Blushush's team knows that until you resonate and connect with your target audience, you won't succeed in branding, and so we strategize to bring out your story, niche, and everything to position you well.",
    variant: 'lime',
  },
  {
    title: 'Brand voice unity',
    description: 'We never try to sound like all of the things at once; instead, Blushush focuses on creating a consistent brand voice that emphasizes what you do, why it matters, and why people should care.',
    variant: 'blue',
  },
  {
    title: 'Visual makeover',
    description: 'For your identity is our responsibility. We go through each and every detail and element, from design, fonts, logo, colors, and imagery, to make sure they all synchronize to express your personality and deliver a clean message.',
    variant: 'lime',
  },
  {
    title: 'Brand guidelines',
    description: 'For every personal branding project, we design an exhaustive document that contains everything from tones and visuals to photography and social media, and we make sure things are done in the exact manner.',
    variant: 'blue',
  },
];

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

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'LOOM Fashion',
    category: 'Loom pioneers sustainable fashion technology by bridging customers with trusted designers.',
    image: 'https://cdn.prod.website-files.com/67fce3ecde451a83c42218ab/696beb57d96293529da18ccd_Loom-Multiple-Screens.jpeg',
    href: '/projects/loom-fashion',
  },
  {
    id: '2',
    title: 'Eyda homes',
    category: 'Designed a warm, professional brand and site for a modern home builder.',
    image: 'https://cdn.prod.website-files.com/67fce3ecde451a83c42218ab/67fee7ca741c4c8caea2ade3_EHTHR00222_7.webp',
    href: '/projects/eyda-homes',
  },
  {
    id: '3',
    title: 'N1 Payments',
    category: 'Created a sleek, trustworthy brand for a rising fintech startup.',
    image: 'https://cdn.prod.website-files.com/67fce3ecde451a83c42218ab/67fee6fa5d35337ddee186a0_Restaurant-Payment.jpg',
    href: '/projects/n1-payments',
  },
  {
    id: '4',
    title: 'Gunpowder',
    category: 'Built a gritty, standout brand look that matches their edgy, rebellious vibe.',
    image: 'https://cdn.prod.website-files.com/67fce3ecde451a83c42218ab/67fee6812cca1c0ab8e7f8a3_copy-of-0p4a2062a-w1200h600.jpg',
    href: '/projects/gunpowder',
  },
  {
    id: '5',
    title: 'Born clothing',
    category: 'Developed a clean, stylish brand and online presence to elevate their fashion line.',
    image: 'https://cdn.prod.website-files.com/67fce3ecde451a83c42218ab/67fee620111834fa54724ff8_born-menswear.jpg',
    href: '/projects/born-clothing',
  },
  {
    id: '6',
    title: 'Arcc Bikes',
    category: 'Crafted a bold, modern brand identity and website for a premium cycling experience.',
    image: 'https://cdn.prod.website-files.com/67fce3ecde451a83c42218ab/67fee5d0d7ab3afccd659824_The-ultimate-eBike-conversion-system.jpg',
    href: '/projects/arcc-bikes',
  },
];

// Components
const MarqueeLogos: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-marquee">
        {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
          >
            <Image
              src={logo}
              alt="Client logo"
              width={120}
              height={40}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

const TextMarquee: React.FC = () => {
  return (
    <div className="bg-[#3665fb] py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee-text">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-white text-3xl md:text-5xl font-bold mx-8 font-['TT_Trailers']"
          >
            // Unleashing the power of BRANDING
          </span>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee-text {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-text {
          animation: marquee-text 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

const WhyChooseCard: React.FC<WhyChooseCard & { index: number }> = ({ title, description, variant, index }) => {
  const isLime = variant === 'lime';
  const baseClasses = "rounded-full w-[280px] h-[280px] md:w-[330px] md:h-[330px] flex flex-col items-center justify-center p-8 text-center transition-transform hover:scale-105";
  const colorClasses = isLime 
    ? "bg-[#d1fd68] text-gray-900" 
    : "bg-[#3665fb] text-white";
  
  return (
    <div 
      className={`${baseClasses} ${colorClasses} ${index > 0 ? '-ml-10 md:-ml-12' : ''} z-${index * 10} relative shadow-lg`}
      style={{ zIndex: index }}
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['GeneralSans'] leading-tight">
        {title.split(' ').map((word, i) => (
          <React.Fragment key={i}>
            {word}
            {i < title.split(' ').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>
      <p className={`text-sm md:text-base leading-relaxed ${isLime ? 'text-gray-700' : 'text-gray-200'}`}>
        {description}
      </p>
    </div>
  );
};

const SnapScrollCard: React.FC<SnapCard & { index: number }> = ({ title, description, stats, image, variant, index }) => {
  const isDark = variant === 'dark';
  
  return (
    <div className={`min-h-screen flex items-center justify-center sticky top-0 ${index === 0 ? '' : '-mt-[100vh]'}`}>
      <div className={`w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'bg-[#3665fb]' : 'bg-[#d1fd68]'}`}>
        {/* Content Side */}
        <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-['TT_Trailers'] uppercase leading-tight">
            {title}
          </h2>
          <p className={`text-base md:text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {description}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className={`text-4xl md:text-5xl font-bold mb-2 font-['GeneralSans'] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
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
            <span className="font-['TT_Trailers'] text-xl">let&apos;s talk</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>
        
        {/* Image Side */}
        <div className="relative h-[400px] md:h-auto min-h-[400px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<Service> = ({ title, description, icon, href }) => {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-xl p-6 md:p-8 border-t-8 border-[#d1fd68] hover:shadow-xl transition-all duration-300 h-full">
        <div className="flex items-start gap-4 mb-4">
          <Image
            src={icon}
            alt={title}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <h3 className="text-xl md:text-2xl font-bold font-['TT_Trailers'] uppercase">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm md:text-base font-['GeneralSans']">
          <strong>{description}</strong>
        </p>
        <div className="flex items-center gap-2 text-gray-900 font-semibold group-hover:gap-4 transition-all">
          <span className="font-['TT_Trailers'] text-lg">See more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

const PortfolioCard: React.FC<PortfolioItem> = ({ title, category, image, href }) => {
  return (
    <Link href={href} className="group block break-inside-avoid mb-6">
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <div className="aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-[#d1fd68] rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-gray-900 font-semibold text-sm uppercase tracking-wider">View</span>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold uppercase font-['TT_Trailers'] mb-2">{title}</h3>
      <p className="text-gray-500 text-sm font-['GeneralSans']">{category}</p>
    </Link>
  );
};

// Main Page Component
export default function ServicesPage(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const snapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Services | Blushush - Branding Agency</title>
        <meta name="description" content="Transform your business into a brand with Blushush. We offer branding, UI/UX design, Webflow development, and more." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main className="min-h-screen bg-white font-['GeneralSans'] overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold uppercase leading-[0.85] font-['TT_Trailers'] text-gray-900">
                    Branding
                  </h1>
                  <div className="absolute -top-8 -left-4 md:-top-12 md:-left-8">
                    <Image
                      src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed24da08dca9785567f9a7_hero-small-banner.avif"
                      alt="Decorative"
                      width={100}
                      height={100}
                      className="w-16 md:w-24 h-auto animate-pulse"
                    />
                  </div>
                </div>
                <p className="mt-8 text-xl md:text-2xl text-gray-700 font-semibold max-w-xl font-['GeneralSans']">
                  Branding has never been this personal before
                </p>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-[#d1fd68] text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 group"
                >
                  <span className="font-['TT_Trailers'] text-xl tracking-wide">LET&apos;S TALK</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Service Images Stack */}
              <div className="relative hidden lg:block">
                <div className="relative h-[500px]">
                  <Image
                    src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2b9fc2a936d8eab325_Office-Group.png"
                    alt="Team collaboration"
                    width={296}
                    height={283}
                    className="absolute top-0 right-0 rounded-2xl shadow-2xl animate-float"
                  />
                  <Image
                    src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2ba8e98e10d8b6559b_Office-Group.png"
                    alt="Creative work"
                    width={260}
                    height={171}
                    className="absolute top-20 right-48 rounded-2xl shadow-2xl animate-float-delayed"
                  />
                  <Image
                    src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2b2804d87d2ff52f9f_Office-Group.png"
                    alt="Brand strategy"
                    width={334}
                    height={559}
                    className="absolute bottom-0 right-24 rounded-2xl shadow-2xl animate-float"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes float-delayed {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animate-float-delayed {
              animation: float-delayed 6s ease-in-out infinite;
              animation-delay: 1s;
            }
          `}</style>
        </section>

        {/* Clients Marquee */}
        <section className="py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-gray-900" />
              <span className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Our Clients</span>
            </div>
          </div>
          <MarqueeLogos />
        </section>

        {/* About Service Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['TT_Trailers'] leading-tight">
                  Let&apos;s turn your business into a brand.
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed font-['GeneralSans']">
                  Blushush will craft your brand into an unforgettable narrative. Something unforgettable, something brilliant, and something that just clicks. Through refined{' '}
                  <Link href="/service/strategy-consultation" className="text-[#3665fb] hover:underline">strategy consultation</Link>,{' '}
                  <Link href="/service/drive-traffic-build-funnels" className="text-[#3665fb] hover:underline">performance optimization</Link>, and an elevated{' '}
                  <Link href="/blogs/how-blushush-turns-brand-strategy-into-scalable-high-converting-webflow-websites" className="text-[#3665fb] hover:underline">brand strategy</Link>, we turn ideas into lasting impressions.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed4938e594d0c21b216133_strategy.svg"
                        alt="Strategy"
                        width={85}
                        height={70}
                        className="w-16 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 font-['GeneralSans']">Niche integrated personality</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        You can be a business coach, founder, speaker, consultant, author or a creative figure. We strive to bring your attributes together to represent your niche.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed492b26df0fc1a0cd8f29_cms.svg"
                        alt="CMS"
                        width={85}
                        height={70}
                        className="w-16 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 font-['GeneralSans']">Maximize your presence</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We work to make you bold, clear, confident and most importantly, consistent with your voice, personality, and visual identity.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-[#d1fd68] text-gray-900 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 group"
                >
                  <span className="font-['TT_Trailers'] text-xl tracking-wide">BOOK A STRATEGY CALL</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Stacked Images */}
              <div className="relative h-[600px] hidden lg:block">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <Image
                      src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2b9fc2a936d8eab325_Office-Group.png"
                      alt="Office"
                      width={296}
                      height={283}
                      className="absolute top-0 right-0 rounded-2xl shadow-xl"
                    />
                    <Image
                      src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2ba8e98e10d8b6559b_Office-Group.png"
                      alt="Team"
                      width={260}
                      height={171}
                      className="absolute top-32 right-32 rounded-2xl shadow-xl"
                    />
                    <Image
                      src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2b2804d87d2ff52f9f_Office-Group.png"
                      alt="Work"
                      width={334}
                      height={559}
                      className="absolute bottom-0 right-16 rounded-2xl shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Text Marquee */}
        <TextMarquee />

        {/* Why Choose Us */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-['TT_Trailers'] leading-tight">
                Blushush&apos;s strives on branding guidelines
              </h2>
              <p className="text-gray-600 text-lg font-['GeneralSans']">
                We focus on giving your business the visual and verbal identity it needs.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start -space-x-8 md:-space-x-12 py-8">
              {whyChooseCards.map((card, index) => (
                <WhyChooseCard key={index} {...card} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Snap Scroll Section */}
        <section ref={snapContainerRef} className="relative bg-white">
          <div className="text-center mb-12 px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-['TT_Trailers']">
              Let us help you redefine yourself
            </h2>
            <p className="text-gray-600 text-lg font-['GeneralSans']">
              We&apos;ll set your narrative to make sure your brand story sells
            </p>
          </div>
          
          <div className="relative">
            {snapCards.map((card, index) => (
              <SnapScrollCard key={index} {...card} index={index} />
            ))}
          </div>
        </section>

        {/* All Services Grid */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#d1fd68]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <Image
                  src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed246cbafe502f6f639010_blushush-small-banner.avif"
                  alt="Blushush"
                  width={50}
                  height={50}
                  className="w-12 h-12 mb-6 rounded-lg"
                />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-['TT_Trailers'] uppercase">
                  Here&apos;s our all services
                </h2>
                <p className="text-gray-700 text-lg font-['GeneralSans']">
                  We are the one stop solution for all your needs
                </p>
              </div>
              <div className="flex items-end justify-start lg:justify-end">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-all duration-300 group"
                >
                  <span className="font-['TT_Trailers'] text-xl tracking-wide">let&apos;s talk</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-['TT_Trailers']">
                Example of Strategy & Consultation
              </h2>
              <p className="text-gray-600 text-lg font-['GeneralSans']">
                Make unclear design milestones and missed deadlines a thing of the past.
              </p>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {portfolioItems.map((item) => (
                <PortfolioCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#d1fd68] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ee272aecd37707d23742ac_Frame-1261155061.avif')] bg-cover bg-center" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-['GeneralSans']">
                  Ready to Rescue Your Businesses?
                </h2>
                
                {/* Avatar Stack */}
                <div className="flex justify-center mb-8">
                  <div className="flex -space-x-4">
                    {[
                      'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ee2e01735362331d035765_f8fc6816d38f37f1e03af93bb8c7eab9_1.avif',
                      'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ee2e0142376b9c25fa5eeb_2.avif',
                      'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ee2e01c86ccb850deb980b_8736888965998b4fafa36e9a1caae01e_3.avif',
                      'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ee2e0193e0d1ee4c78ea2c_4.avif',
                      'https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67fe603d45694eda635a36ba_74d92adedf34226d1defd283b2bd1919_blushush%20team.avif',
                    ].map((src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt="Team member"
                        width={60}
                        height={60}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-8 max-w-md mx-auto font-['GeneralSans']">
                  Look at these cool guys once again! If you want to work with them and get unforgettable website - hit the button and get on the quick call!
                </p>
                
                <Link
                  href="https://form.typeform.com/to/frvHh03C"
                  target="_blank"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-[#d1fd68] rounded-lg font-bold hover:bg-gray-800 transition-all duration-300 group"
                >
                  <span className="font-['TT_Trailers'] text-xl tracking-wide">Let&apos;s book a call</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-['GeneralSans']">
              Let&apos;s get you <span className="text-[#d1fd68] font-['TT_Trailers'] text-5xl md:text-6xl">Started!</span>
            </h2>
            <Link
              href="https://form.typeform.com/to/frvHh03C"
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#d1fd68] text-gray-900 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 group"
            >
              <span className="font-['TT_Trailers'] text-xl tracking-wide">Start</span>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-gray-500 text-sm">Takes 4 minutes</p>
          </div>
        </section>
      </main>
    </>
  );
}