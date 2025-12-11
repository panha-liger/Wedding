
////figma start
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// ============================================================
// HERO SECTION IMAGES
// ============================================================
import bvFrameMiddle from '../public/assets/hero/bvFrameMiddle.png'
import heroBackground from '../public/assets/hero/Hero_background.png'
// NAMES BANNER IMAGES
import foregroundCouple from '../public/assets/names-banner/@foreground-couple.png'
import namesBannerBackground from '../public/assets/names-banner/background.png'
import namesImage from '../public/assets/names-banner/name.png'
// STORY SECTION IMAGES
import storyBackground from '../public/assets/story/background3.png'
import storyDown from '../public/assets/story/down.png'
import storyTop from '../public/assets/story/top.png'
// CALENDAR SECTION IMAGES
import calendarBackground from '../public/assets/calendar/background.png'
import calendarPicker from '../public/assets/calendar/Calendar Picker.png'
import calendarImage188 from '../public/assets/calendar/image 188 (1).png'
// TIMELINE ASSETS
import timelineBgTop from '../public/assets/timeline/ONL01533.png'

// ============================================================
// TODO: Update this with your actual Google Maps embed URL
// ============================================================
const MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7571419428844!2d104.91719931533395!3d11.568160691803972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM0JzA1LjQiTiAxMDTCsDU1JzA4LjQiRQ!5e0!3m2!1sen!2skh!4v1234567890123!5m2!1sen!2skh'

// ============================================================
// TYPE DEFINITIONS
// ============================================================
type Language = 'kh' | 'en'

type TimelineEvent = {
  time: string
  titleKh: string
  titleEn: string
  icon: string
  photo?: string
}

// ============================================================
// TIMELINE DATA
// ============================================================
const day1Events: TimelineEvent[] = [
  {
    time: '09:00',
    titleKh: 'ម្ចាស់ផ្ទះប្រគល់កូនស្រីឲ្យគ្រួសរកូនប្រុស',
    titleEn: 'Bride\'s family hands over daughter',
    icon: '👨‍👩‍👧',
  },
  {
    time: '10:00',
    titleKh: 'ពិធីមងគលឆៃយម',
    titleEn: 'Chhai Yam ceremony',
    icon: '💍',
  },
  {
    time: '14:00',
    titleKh: 'ពិធីស្វាគមន៍ភ្ញៀវអញ្ជើញ',
    titleEn: 'Welcome guests',
    icon: '🎊',
    photo: 'timeline1'
  },
  {
    time: '15:00',
    titleKh: 'ពិធីស្វាគមន៍ភ្ញៀវ ជូនអាហារថ្ងៃត្រង់',
    titleEn: 'Lunch reception',
    icon: '🍽️',
  },
  {
    time: '19:00',
    titleKh: 'ពិធីភ្លេងចម្រៀង អបអរ',
    titleEn: 'Music and entertainment',
    icon: '🎵',
  },
  {
    time: '21:00',
    titleKh: 'អញ្ជើញភ្ញៀវរីករាយនិងលេងល្ខោនតាមចំណង់ចំណូលចិត្ត',
    titleEn: 'Free time for guests to enjoy',
    icon: '🎉',
  },
]

const day2Events: TimelineEvent[] = [
  {
    time: '05:00',
    titleKh: 'ម្ចាស់ផ្ទះរៀបចំសំបុត្រផ្តល់ព្រះសង្ឃ',
    titleEn: 'Morning monk blessing preparation',
    icon: '🙏',
    photo: 'timeline2'
  },
  {
    time: '08:00',
    titleKh: 'ពិធីបុណ្យ (ភោជន៍)',
    titleEn: 'Merit ceremony (meal)',
    icon: '🍚',
  },
  {
    time: '09:00',
    titleKh: 'អញ្ជើញភ្ញៀវបរិភោគអាហារពេលព្រឹកនិងកាហ្វេ',
    titleEn: 'Breakfast and coffee for guests',
    icon: '☕',
    photo: 'timeline3'
  },
  {
    time: '10:00',
    titleKh: 'ពិធីស្លុះទង និងជីកដីសាងសង់ផ្ទះ',
    titleEn: 'House blessing ceremony',
    icon: '🏠',
  },
  {
    time: '11:00',
    titleKh: 'ពិធីកាត់សក់សុភរី',
    titleEn: 'Hair cutting ceremony',
    icon: '✂️',
  },
  {
    time: '10:30',
    titleKh: 'ពិធីសំពះប្រលែង',
    titleEn: 'Traditional blessing',
    icon: '🕯️',
  },
  {
    time: '11:00',
    titleKh: 'ពិធីបិទទ្វារតូង បណ្តាសាកូតាមទំនៀមទំលាប់',
    titleEn: 'Traditional door closing ceremony',
    icon: '🚪',
  },
  {
    time: '14:00',
    titleKh: 'អញ្ជើញភ្ញៀវបរិភោគអាហារតាមកម្រងគោរពប្រពៃ័ណី',
    titleEn: 'Traditional lunch for guests',
    icon: '🍱',
  },
  {
    time: '16:00',
    titleKh: 'អញ្ជើញបន្តរីករាយជាមួយកម្មវិធីបន្ថែម ចាប់ផ្តើម',
    titleEn: 'Additional entertainment begins',
    icon: '🎭',
  },
]

// ============================================================
// ANIMATION VARIANTS
// ============================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: [0.42, 0, 0.58, 1] as const
  }
}

// ============================================================
// LANGUAGE TOGGLE COMPONENT
// ============================================================
function LanguageToggle({ 
  language, 
  setLanguage 
}: { 
  language: Language
  setLanguage: (lang: Language) => void 
}) {
  return (
    <motion.div 
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex gap-1.5 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <button
        onClick={() => setLanguage('kh')}
        className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
          language === 'kh' 
            ? 'bg-white text-[#18280f] shadow-md' 
            : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
      >
        KH
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
          language === 'en' 
            ? 'bg-white text-[#18280f] shadow-md' 
            : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
      >
        EN
      </button>
    </motion.div>
  )
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image 
          src={heroBackground} 
          alt="" 
          fill 
          className="object-cover" 
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/35" />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Khmer heading */}
        <h1 className="font-khmer text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-3 sm:mb-4 leading-[1.15] drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] px-2">
          សិរីមង្គលអាពាហ៍ពិពាហ៍
        </h1>

        {/* Script names to mirror Figma title treatment */}
        <p className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white/95 mb-6 sm:mb-8 md:mb-10 tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] px-2">
          Celebrate the union of...
        </p>

        {/* <p className="font-english text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-10 sm:mb-12 md:mb-16 tracking-[0.08em] italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] px-2">
          Celebrate the union of two families
        </p> */}

        {/* Monogram frame with បវ */}
        <motion.div 
          className="relative mx-auto w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] mb-10 sm:mb-12 md:mb-16 px-4"
          variants={scaleIn}
        >
          <Image 
            src={bvFrameMiddle} 
            alt="Wedding Monogram" 
            width={500} 
            height={500}
            className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            priority
          />
        </motion.div>

        {/* Bottom Khmer paragraph */}
 {/* Khmer heading */}
        <h1 className="font-khmer text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-3 sm:mb-4 leading-[1.15] drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] px-2 text-center">
        មានកិត្តិយសសូមគោរពអញ្ជើញ
        </h1>
        <motion.p 
          className="font-kantumruy text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white leading-[1.8] sm:leading-[2] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] px-4"
          variants={fadeInUp}
        >
          សម្តេច ឯកឧត្តម លោកជំទាវ លោកអ្នកឧកញ៉ា អ្នកឧកញ៉ា ឧកញ៉ា លោក លោកស្រី អ្នកនាង កញ្ញា ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2 backdrop-blur-sm shadow-lg">
          <motion.div 
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================
// NAMES BANNER SECTION
// ============================================================
function NamesBanner() {
  return (
    <motion.section 
      className="relative w-full max-w-[430px] mx-auto aspect-[393/852] overflow-hidden my-8 md:my-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      {/* Blurred background with vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={namesBannerBackground}
          alt="Wedding background"
          fill
          className="object-cover blur-[8px]"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#324120_24.16%,rgba(0,0,0,0.5)_36.57%,rgba(0,0,0,0.5)_78.09%,#324120_95.73%)]" />
      </div>

      {/* Names PNG - upper middle */}
      <div className="absolute inset-x-0 top-[22.5%] z-30 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <Image 
            src={namesImage}
            alt="Panharith & Amrithwatey"
            width={400}
            height={250}
            className="w-[72%] min-w-[240px] max-w-[320px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            priority
          />
        </motion.div>
      </div>

      {/* Foreground couple layer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center items-end px-2 sm:px-4">
        <motion.div
          className="relative w-full max-w-[420px] h-[65%]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <Image
            src={foregroundCouple}
            alt="Couple foreground"
            fill
            className="object-contain"
            style={{ objectPosition: '50% 100%' }}
            sizes="(min-width: 768px) 400px, 92vw"
            priority
          />
        </motion.div>
      </div>

      {/* Optional: Flying birds video - top left */}
      <motion.div 
        className="absolute top-3 left-3 sm:top-4 sm:left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 z-10"
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain drop-shadow-lg"
        >
          <source src="/assets/names-banner/birdFlying.mov" type="video/quicktime" />
          <source src="/assets/names-banner/birdFlying.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Optional: Butterfly video - near names */}
      <motion.div 
        className="absolute top-[15%] right-3 sm:right-4 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 z-30"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as const
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain drop-shadow-md"
        >
          <source src="/assets/names-banner/butterfly.mov" type="video/quicktime" />
          <source src="/assets/names-banner/butterfly.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </motion.section>
  )
}

// ============================================================
// STORY SECTION
// ============================================================
function StorySection() {
  return (
    <motion.section
      className="relative w-full max-w-[430px] md:max-w-[480px] mx-auto aspect-[9/16] overflow-hidden my-8 md:my-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={storyBackground}
          alt="Story background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Top decorative image (tilted, top-left) */}
      <motion.div
        className="absolute top-3 sm:top-5 left-1 sm:left-3 z-20"
        initial={{ opacity: 0, y: -20, rotate: -12 }}
        whileInView={{ opacity: 1, y: 0, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <Image
          src={storyTop}
          alt="Story top"
          width={300}
          height={200}
          className="w-[62%] sm:w-[56%] max-w-sm object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        />
      </motion.div>

      {/* Center text block */}
      <motion.div
        className="absolute inset-x-8 top-[30%] z-30 text-center text-white space-y-4 sm:space-y-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <h3 className="font-english text-3xl sm:text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
          When Did We Meet?
        </h3>
        <p className="font-english text-sm sm:text-base leading-[1.7] text-white/90 max-w-[260px] sm:max-w-xs mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          Sagittis adipiscing posuere id adipiscing aliquam posuere. Aliquet faucibus duis accumsan aliquet tempor diam dignissim suscipit. Nibh urna ut diam fames.
        </p>
      </motion.div>

      {/* Bottom decorative image (tilted, bottom-right) */}
      <motion.div
        className="absolute bottom-5 sm:bottom-8 right-[-10%] sm:right-5 z-20"
        initial={{ opacity: 0, y: 20, rotate: 5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 10 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <Image
          src={storyDown}
          alt="Story bottom"
          width={240}
          height={300}
          className="w-[52%] sm:w-[46%] max-w-sm object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] translate-x-[60%]"
        />
      </motion.div>
    </motion.section>
  )
}

// ============================================================
// CALENDAR SECTION
// ============================================================
function CalendarSection() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#18280f] to-[#102010] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image 
          src={calendarBackground} 
          alt="" 
          fill 
          className="object-cover opacity-30" 
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h3 className="font-khmer text-2xl md:text-3xl text-white mb-4 md:mb-6 leading-relaxed">
        កាលបរិច្ឆេទនៃកម្មវិធី
        </h3>
        <p className="font-kantumruy text-base md:text-lg text-white/90 mb-3 md:mb-4">
        កម្មវិធីនឹងត្រូវធ្វើឡើងរយៈពេល ២ថ្ងៃ
        </p>
      

        <p className="font-script text-3xl md:text-4xl lg:text-[2.75rem] text-white/95 mb-6 md:mb-8 tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          {/* December */}
        </p>

        {/* Calendar image */}
        <motion.div 
          className="relative max-w-sm md:max-w-md mx-auto mb-6 md:mb-8"
          variants={scaleIn}
        >
          <Image 
            src={calendarPicker} 
            alt="December Calendar" 
            width={400} 
            height={500}
            className="w-full h-auto drop-shadow-2xl" 
            priority
          />
        </motion.div>

        {/* Below calendar text */}
        <p className="font-kantumruy text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-2">
          កម្មវិធីនឹងត្រូវធ្វើឡើងរយៈពេល ២ថ្ងៃ
        </p>
        <p className="font-script text-2xl md:text-3xl lg:text-[2.75rem] text-white/95 mb-6 md:mb-8 tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          Enjoy Your Day Off Tomorrow
        </p>
      </motion.div>

      {/* Decorative image at bottom */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 opacity-60"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.6, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Image 
          src={calendarImage188} 
          alt="" 
          fill
          className="object-contain"
        />
      </motion.div>
    </section>
  )
}

// ============================================================
// TIMELINE ITEM COMPONENT
// ============================================================
function TimelineItem({ 
  event, 
  index, 
  side = 'left' 
}: { 
  event: TimelineEvent
  index: number
  side?: 'left' | 'right' 
}) {
  const isLeft = side === 'left'
  
  return (
    <motion.div 
      className={`relative flex items-center gap-3 md:gap-4 mb-6 md:mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'text-right pr-3 md:pr-4' : 'text-left pl-3 md:pl-4'}`}>
        <p className="font-english text-base md:text-lg lg:text-xl text-white/90 font-semibold mb-1 md:mb-1.5">
          {event.time}
        </p>
        <p className="font-khmer text-xs md:text-sm lg:text-base text-white/70 leading-[1.6] md:leading-relaxed">
          {event.titleKh}
        </p>
      </div>

      {/* Connector dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm shadow-lg">
          <span className="text-base md:text-lg">{event.icon}</span>
        </div>
      </div>

      {/* Photo (if exists) */}
      <div className={`flex-1 ${!event.photo ? 'hidden md:block' : ''}`}>
        {event.photo && (
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden shadow-lg border border-white/10">
            <div className="w-full h-full bg-gradient-to-br from-[#2d4a1a]/80 to-[#1a2f0f]/80" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ============================================================
// PROGRAM SECTION (Timeline)
// ============================================================
function ProgramSection() {
  return (
    <section className="relative bg-[#233014] overflow-hidden py-12 sm:py-16">
      <div className="relative mx-auto max-w-[430px] aspect-[393/1818] bg-[#233014]">
        {/* Base layer only */}
        <Image src={timelineBgTop} alt="Timeline base" fill className="object-cover" priority sizes="430px" />
        <div className="absolute inset-0 bg-[linear-gradient(179.84deg,rgba(35,48,20,0.41)_0.14%,rgba(0,0,0,0)_37.54%,rgba(0,0,0,0.41)_99.86%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-[-65px] h-[267px] bg-[linear-gradient(180deg,#233014_0%,rgba(35,48,20,0)_16.45%,rgba(35,48,20,0.27)_60.93%,#233014_98.88%)] pointer-events-none" />
      </div>
    </section>
  )
}

// ============================================================
// MAP SECTION
// ============================================================
function MapSection() {
  return (
    <section className="relative py-16 md:py-20 pb-24 md:pb-32 bg-gradient-to-b from-[#102010] to-[#0a1508]">
      <motion.div 
        className="max-w-3xl mx-auto px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* Heading */}
        <div className="text-center mb-6 md:mb-8">
          <h3 className="font-khmer text-2xl md:text-3xl lg:text-4xl text-white mb-3 md:mb-4 leading-relaxed">
            សមិទ្ធិមេគង្ហរភាវន័យអេវិថ្យ
          </h3>
          <p className="font-khmer text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            សំណុំ ជាអណ្តៅងារម្លានដែល លោកថ្នងអន្លើសមង លោកបែកពីមែ ផេងណា គីងពេជេងំ អង្កាវមំាន នៅពេជ្រង៍ជូមាក និងអេយៀងបែបំលីសំពោគជេង
          </p>
        </div>

        {/* Map container */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-1.5 md:p-2 mb-6 md:mb-8">
          <iframe
            src={MAP_URL}
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg md:rounded-xl w-full"
          />
        </div>

        {/* Map subtitle */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-english text-xl md:text-2xl lg:text-3xl text-white/90 mb-2 italic tracking-wide">
            Map Details
          </p>
          <p className="font-english text-base md:text-lg text-white/70 tracking-wide">
            Enjoy Your Day Off Tomorrow
          </p>
        </div>
      </motion.div>

      {/* Bottom decoration with CTA */}
      <div className="relative">
        {/* Cloud decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 opacity-30">
          <div className="w-full h-full bg-gradient-to-t from-white/5 via-white/3 to-transparent" />
        </div>

        {/* CTA Button */}
        <motion.div 
          className="relative z-10 text-center pt-16 md:pt-24 pb-8 md:pb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <Link href="/gallery">
            <button className="group relative px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 rounded-full text-white font-english text-lg md:text-xl font-medium tracking-wide hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <span className="relative z-10">Go To Gallery</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </Link>
          <p className="mt-3 md:mt-4 text-white/50 text-xs md:text-sm">
            View our photo gallery
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function MainPage() {
  const [language, setLanguage] = useState<Language>('kh')

  return (
    <main className="relative bg-[#18280f] text-white overflow-x-hidden antialiased">
      <LanguageToggle language={language} setLanguage={setLanguage} />
      
      <HeroSection />
      <NamesBanner />
      <StorySection />
      <CalendarSection />
      <ProgramSection />
      <MapSection />
    </main>
  )
}


///Figma End