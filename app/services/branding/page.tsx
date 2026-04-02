'use client';

import React, { JSX, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import { motion } from 'framer-motion';

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

const TextMarquee: React.FC = () => {
  return (
    <div className="bg-[#3665fb] py-3 md:py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee-text">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mx-4 md:mx-8 font-['TT_Trailers']"
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
  const baseClasses = "rounded-full flex flex-col items-center justify-center p-6 md:p-8 text-center transition-transform hover:scale-105";
  const mobileSizeClasses = "w-[260px] h-[260px]";
  const mdSizeClasses = "md:w-[300px] md:h-[300px]";
  const lgSizeClasses = "lg:w-[350px] lg:h-[350px]";
  const colorClasses = isLime 
    ? "bg-[#d1fd68] text-gray-900" 
    : "bg-[#3665fb] text-white";
  
  // Higher index = higher z-index (card 0 at bottom, card 3 on top)
  const zIndex = whyChooseCards.length - index;
  
  return (
    <div 
      className={`${baseClasses} ${mobileSizeClasses} ${mdSizeClasses} ${lgSizeClasses} ${colorClasses} relative shadow-lg`}
      style={{ 
        zIndex: zIndex,
        marginLeft: index > 0 ? '-30px' : '0px'
      }}
    >
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 font-['GeneralSans'] leading-tight">
        {title.split(' ').map((word, i) => (
          <React.Fragment key={i}>
            {word}
            {i < title.split(' ').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>
      <p className={`text-xs md:text-sm lg:text-base leading-relaxed ${isLime ? 'text-gray-700' : 'text-gray-200'}`}>
        {description}
      </p>
    </div>
  );
};

const ServiceCard: React.FC<Service> = ({ title, description, icon, href }) => {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 border-t-8 border-[#d1fd68] hover:shadow-xl transition-all duration-300 h-full">
        <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
          <Image
            src={icon}
            alt={title}
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 object-contain flex-shrink-0"
          />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-['TT_Trailers'] uppercase leading-tight">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base font-['GeneralSans']">
          <strong>{description}</strong>
        </p>
        <div className="flex items-center gap-2 text-gray-900 font-semibold group-hover:gap-4 transition-all">
          <span className="font-['TT_Trailers'] text-base md:text-lg">See more</span>
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
    <Link href={href} className="group block break-inside-avoid mb-4 md:mb-6">
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-3 md:mb-4">
        <div className="aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-[#d1fd68] rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <span className="text-gray-900 font-semibold text-xs md:text-sm uppercase tracking-wider">View</span>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold uppercase font-['TT_Trailers'] mb-1 md:mb-2">{title}</h3>
      <p className="text-gray-500 text-xs md:text-sm font-['GeneralSans'] leading-relaxed">{category}</p>
    </Link>
  );
};

// Main Page Component
export default function BrandingPage(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);
const [progress, setProgress] = useState(0);
const snapContainerRef = useRef<HTMLDivElement>(null);

const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

useEffect(() => {
  const handleSnapScroll = () => {
    const el = snapContainerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable <= 0) {
      setProgress(0);
      setActiveIndex(0);
      return;
    }

    const rawProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
    setProgress(rawProgress);

    // 0, 1, 2 for 3 cards
    const index = Math.min(
      snapCards.length - 1,
      Math.floor(rawProgress * snapCards.length)
    );
    setActiveIndex(index);
  };

  window.addEventListener("scroll", handleSnapScroll, { passive: true });
  window.addEventListener("resize", handleSnapScroll);
  handleSnapScroll();

  return () => {
    window.removeEventListener("scroll", handleSnapScroll);
    window.removeEventListener("resize", handleSnapScroll);
  };
}, []);

  return (
    <>
      <Head>
        <title>Services | Yourease - Branding Agency</title>
        <meta name="description" content="Transform your business into a brand with ease. We offer branding, UI/UX design, Webflow development, and more." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main className="min-h-screen bg-white font-['GeneralSans']">
        <button
  onClick={() => window.history.back()}
  className="group inline-flex items-center transition-transform hover:scale-105 p-2 md:p-0"
>
  <Image
    src="/images/service.svg"
    alt="Go back"
    width={14}
    height={18}
    className="scale-x-[-1] mt-4 md:mt-7 ml-4 md:ml-7 transition-transform group-hover:translate-x-[-2px] w-3 h-4 md:w-[18px] md:h-[24px]"
  />
</button>
        {/* Hero Section */}
        <section className="relative mt-2 md:mt-3 pb-12 md:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="relative">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[10rem] font-bold uppercase leading-[0.85] font-['TT_Trailers'] text-gray-900">
                    Branding
                  </h1>
                  <div className="absolute -top-4 -left-2 md:-top-8 md:-left-4 lg:-top-12 lg:-left-8">
                  </div>
                </div>
                <p className="mt-4 md:mt-8 text-lg sm:text-xl md:text-2xl lg:text-4xl whitespace-normal md:whitespace-nowrap text-[#303030] font-['GeneralSans']">
                  Branding has never been this personal before
                </p>
                <button
  onClick={scrollToContact}
  className="inline-flex items-center gap-2 md:gap-3 mt-6 md:mt-8 px-6 md:px-8 py-2 md:py-2 bg-[#d1fd68] text-gray-900 rounded-lg font-bold text-base md:text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 group"
>
  <span className="font-['TT_Trailers'] text-xl md:text-3xl tracking-wide">LET&apos;S TALK</span>
  <Image src="/images/service.svg" alt="" width={12} height={16} className="mb-1 w-3 h-4 md:w-3 md:h-4" />
</button>
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

        {/* About Service Section */}
        <section className=" px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
          <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-5 font-['TT_Trailers'] text-[#000000] leading-tight">
                  Let&apos;s turn your business into a brand.
                </h2>
                <p className="text-[#474747] text-base md:text-lg mb-6 md:mb-8 leading-relaxed font-['GeneralSans']">
                  Blushush will craft your brand into an unforgettable narrative. Something unforgettable, something brilliant, and something that just clicks. Through refined{' '}
                  <Link href="/service/strategy-consultation" className="text-[#3665fb] hover:underline">strategy consultation</Link>,{' '}
                  <Link href="/service/drive-traffic-build-funnels" className="text-[#3665fb] hover:underline">performance optimization</Link>, and an elevated{' '}
                  <Link href="/blogs/how-blushush-turns-brand-strategy-into-scalable-high-converting-webflow-websites" className="text-[#3665fb] hover:underline">brand strategy</Link>, we turn ideas into lasting impressions.
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed4938e594d0c21b216133_strategy.svg"
                        alt="Strategy"
                        width={85}
                        height={70}
                        className="w-16 h-14 md:w-20 md:h-16 lg:w-25 lg:h-20 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-['GeneralSans']">Niche integrated personality</h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        You can be a business coach, founder, speaker, consultant, author or a creative figure. We strive to bring your attributes together to represent your niche.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://cdn.prod.website-files.com/67ece9bf9a58e5528ea1455d/67ed492b26df0fc1a0cd8f29_cms.svg"
                        alt="CMS"
                        width={85}
                        height={70}
                        className="w-16 h-14 md:w-20 md:h-16 lg:w-25 lg:h-20 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-['GeneralSans']">Maximize your presence</h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        We work to make you bold, clear, confident and most importantly, consistent with your voice, personality, and visual identity.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
  onClick={scrollToContact}
  className="inline-flex items-center gap-2 md:gap-3 mt-6 md:mt-8 ml-0 md:ml-5 px-6 md:px-8 py-3 md:py-4 bg-[#d1fd68] text-gray-900 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 group"
>
  <span className="font-['TT_Trailers'] text-xl md:text-3xl tracking-wide">BOOK A STRATEGY CALL</span>
  <Image src="/images/service.svg" alt="" width={12} height={16} className="mb-1 w-3 h-4 md:w-3 md:h-4" />
</button>
              </div>
              
              {/* Stacked Images - Hidden on mobile, visible on lg */}
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] hidden lg:block">
                <div className="absolute top-140 inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <Image
                      src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2b9fc2a936d8eab325_Office-Group.png"
                      alt="Office"
                      width={296}
                      height={283}
                      className="absolute bottom-50 right-60 rounded-2xl shadow-xl"
                    />
                    <Image
                      src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2ba8e98e10d8b6559b_Office-Group.png"
                      alt="Team"
                      width={260}
                      height={171}
                      className="absolute bottom-2 right-60 rounded-2xl shadow-xl"
                    />
                    <Image
                      src="https://cdn.prod.website-files.com/67815f02ac652143e462bf00/68175d2b2804d87d2ff52f9f_Office-Group.png"
                      alt="Work"
                      width={334}
                      height={559}
                      className="absolute bottom-0 left-60 rounded-2xl shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Text Marquee */}
        <div className='mt-7'>
 <TextMarquee />
        </div>
       

{/* Why Choose Us - Animated with Proper Stacking */}
<section className="py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white overflow-hidden">
  <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 xl:px-20">
    <div className="max-w-2xl mb-8 md:mb-16">
      <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 font-['TT_Trailers'] text-[#000000] leading-tight">
        Blushush&apos;s strives on branding guidelines
      </h2>
      <p className="text-gray-600 text-base md:text-lg font-['GeneralSans']">
        We focus on giving your business the visual and verbal identity it needs.
      </p>
    </div>
    
    {/* Desktop View - Cards with proper overlap order */}
    <div className="hidden md:flex flex-wrap justify-center md:justify-start gap-4 py-8 relative">
      {whyChooseCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: "easeOut"
          }}
          // Higher index cards appear on top
          style={{ zIndex: whyChooseCards.length - index }}
        >
          <WhyChooseCard {...card} index={index} />
        </motion.div>
      ))}
    </div>
    
    {/* Mobile View - No overlap, stacked vertically with smaller cards */}
    <div className="flex md:hidden flex-col items-center gap-4 py-4">
      {whyChooseCards.map((card, index) => (
        <div
          key={index}
          className={`rounded-full w-[240px] h-[240px] flex flex-col items-center justify-center p-6 text-center shadow-lg ${
            card.variant === 'lime' 
              ? "bg-[#d1fd68] text-gray-900" 
              : "bg-[#3665fb] text-white"
          }`}
        >
          <h3 className="text-xl font-bold mb-3 font-['GeneralSans'] leading-tight">
            {card.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word}
                {i < card.title.split(' ').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
          <p className={`text-xs leading-relaxed ${card.variant === 'lime' ? 'text-gray-700' : 'text-gray-200'}`}>
            {card.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Snap Scroll Section */}
<section
  ref={snapContainerRef}
  className="relative bg-white"
  style={{ height: `${snapCards.length * 100}vh` }}
>
  {/* HEADER (stays visible) */}
 

  {/* STICKY AREA */}
  <div className="sticky top-0 h-screen w-full">

     <div className="text-center px-4 pt-8 md:pt-13 pb-4 md:pb-8 bg-white">
    <h2 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-['TT_Trailers'] ">
      Let us help you redefine yourself
    </h2>
    <p className="text-gray-60 text-md md:text-base lg:text-lg font-['GeneralSans'] mt-2">
      We&apos;ll set your narrative to make sure your brand story sells
    </p>
  </div>
    
    {/* CENTER WRAPPER */}
    <div className="h-full flex items-start justify-center px-4 sm:px-6">
      
      {/* CARD - Full width on mobile, constrained on larger screens */}
      <div className="w-full max-w-7xl h-[520px] sm:h-[580px] md:h-[620px] grid grid-cols-1 md:grid-cols-2 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">

        {/* LEFT SIDE - Content */}
        <div className="relative h-full overflow-hidden">
          {snapCards.map((card, index) => {
            const isDark = card.variant === 'dark';
            const offset = (index - activeIndex) * 100;

            return (
              <div
                key={card.title}
                className={`absolute inset-0 w-full h-full flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-12 xl:p-16 transition-transform duration-500 ease-out ${
                  isDark
                    ? 'bg-[#3665fb] text-white'
                    : 'bg-[#d1fd68] text-gray-900'
                }`}
                style={{
                  transform: `translateY(${offset}%)`,
                }}
              >
                <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 uppercase leading-tight font-['TT_Trailers']">
                  {card.title}
                </h2>

                <p
                  className={`text-base md:text-lg mb-6 md:mb-8 leading-relaxed ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  {card.description}
                </p>

                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  {card.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-4xl sm:text-5xl md:text-5xl font-bold mb-1 md:mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm md:text-sm uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

              <div className='w-full sm:w-[220px] md:w-[250px]'>
                <button
  onClick={scrollToContact}
  className={`inline-flex items-center gap-2 md:gap-3 mt-2 md:mt-8 px-5 md:px-8 py-3 md:py-2 bg-white text-gray-900 rounded-lg font-bold text-base md:text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 group`}
>
  <span className="font-['TT_Trailers'] text-2xl md:text-3xl tracking-wide">LET&apos;S TALK</span>
  <Image src="/images/service.svg" alt="" width={12} height={16} className="mb-1 w-3 h-4 md:w-3 md:h-4" />
</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE - Images (Hidden on mobile, visible on md+) */}
        <div className="relative h-full overflow-hidden hidden md:block">
          {snapCards.map((card, index) => {
            const offset = (activeIndex - index) * 100;

            return (
              <div
                key={card.title}
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
                />
              </div>
            );
          })}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {snapCards.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === activeIndex
                  ? 'w-6 md:w-8 bg-white/80'
                  : 'w-1.5 md:w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  </div>
</section>



        {/* Portfolio Section */}
        {/* <section className="py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-8 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 font-['TT_Trailers'] leading-tight">
                Example of Strategy & Consultation
              </h2>
              <p className="text-gray-600 text-base md:text-lg font-['GeneralSans']">
                Make unclear design milestones and missed deadlines a thing of the past.
              </p>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
              {portfolioItems.map((item) => (
                <PortfolioCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section> */}

        <Services excludeId={1} />
        <Contact/>

      </main>
    </>
  );
}