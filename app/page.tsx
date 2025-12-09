'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ============================================================
// HERO SECTION IMAGES
// ============================================================
import heroBackground from '../public/assets/hero/Hero_background.png'
import bvFrameMiddle from '../public/assets/hero/bvFrameMiddle.png'
// import coupleWideImage from '@/public/wedding/couple-wide.jpg'
// import butterflyImage from '@/public/wedding/butterfly.png'
// import storyPhoto1 from '@/public/wedding/story-photo-1.jpg'
// import storyPhoto2 from '@/public/wedding/story-photo-2.jpg'
// import calendarImage from '@/public/wedding/calendar-december.png'
// import swanLeft from '@/public/wedding/swan-left.png'
// import swanRight from '@/public/wedding/swan-right.png'
// import cupidImage from '@/public/wedding/cupid.png'
// import timelinePhoto1 from '@/public/wedding/timeline-photo-1.jpg'
// import timelinePhoto2 from '@/public/wedding/timeline-photo-2.jpg'
// import timelinePhoto3 from '@/public/wedding/timeline-photo-3.jpg'
// import coupleWalkingImage from '@/public/wedding/couple-walking.jpg'
// import cloudDecor from '@/public/wedding/cloud-watercolor.png'

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
    transition: { duration: 0.8, ease: 'easeOut' }
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
    transition: { duration: 0.8 }
  }
}

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut'
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
    <div className="fixed top-6 right-6 z-50 flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
      <button
        onClick={() => setLanguage('kh')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'kh' 
            ? 'bg-white text-green-900' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        KH
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'en' 
            ? 'bg-white text-green-900' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
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
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Khmer title */}
        <h1 className="font-khmer text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight drop-shadow-lg">
          សំពះមង្គលការសំពេជ្យ
        </h1>
        
        <p className="font-english text-xl md:text-2xl text-white/95 mb-12 tracking-wide italic drop-shadow-md">
          Celebrate the union of...
        </p>

        {/* Monogram frame with បវ */}
        <motion.div 
          className="relative mx-auto w-80 md:w-96 mb-12"
          variants={scaleIn}
        >
          <Image 
            src={bvFrameMiddle} 
            alt="Wedding Monogram" 
            width={400} 
            height={400}
            className="w-full h-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Bottom Khmer paragraph */}
        <motion.p 
          className="font-khmer text-sm md:text-base lg:text-lg text-white leading-relaxed max-w-lg mx-auto drop-shadow-lg"
          variants={fadeInUp}
        >
          អាណិតិថិយសស្ត្រឃ្លោងម្លោងព្រីយូ
          <br />
          សំណុំ និកខុផណ លោកង្សាៗ លោកមឹ៉កពហ្មា
          <br />
          អ្នកណគ្មោ ពុញ្ញា លោក លោកស័ស អ្នកគំង កន្លា
          <br />
          ចំណូលមាងឹទី នឹងម៉ាត្រូវៀនូស
          <br />
          ដំរ៉ូវលឹទ្រនោ សំុសព និយមិល
          <br />
          គុងកិនៃក្នាកណាភ្លកវរ គុនៀស គុនស
          <br />
          រពសវផាគិនី
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Couple wide image - TODO: Replace with actual photo */}
      <div className="absolute inset-0">
        {/* <Image src={coupleWideImage} alt="Panharith & Amrithwatey" fill className="object-cover" /> */}
        <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600" />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Names */}
      <motion.div 
        className="relative z-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="font-english text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-wide drop-shadow-lg">
          Panharith
        </h2>
        
        <motion.div 
          className="relative my-8"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* Butterfly decoration - TODO: Replace with actual image */}
          <div className="absolute -top-8 -right-16 w-12 h-12">
            {/* <Image src={butterflyImage} alt="" width={48} height={48} /> */}
            <div className="w-full h-full bg-white/20 rounded-full" />
          </div>
          
          <span className="font-english text-4xl md:text-5xl text-white/90 drop-shadow-lg">
            &
          </span>
        </motion.div>
        
        <h2 className="font-english text-5xl md:text-6xl lg:text-7xl text-white mt-4 tracking-wide drop-shadow-lg">
          Amrithwatey
        </h2>
      </motion.div>
    </section>
  )
}

// ============================================================
// STORY SECTION
// ============================================================
function StorySection({ language }: { language: Language }) {
  return (
    <section className="relative py-20 bg-[#18280f] overflow-hidden">
      {/* Background cloud shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Top-left photo card */}
        <motion.div 
          className="relative w-48 md:w-64 h-64 md:h-80 mb-12 -ml-4"
          initial={{ opacity: 0, rotate: -12, x: -50 }}
          whileInView={{ opacity: 1, rotate: -6, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-white p-3 shadow-2xl transform rotate-[-6deg]">
            {/* TODO: <Image src={storyPhoto1} alt="" fill className="object-cover" /> */}
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600" />
          </div>
        </motion.div>

        {/* Story content */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="font-english text-4xl md:text-5xl text-white mb-8">
            When Did We Meet?
          </h3>
          
          {/* TODO: Replace with actual story text in both languages */}
          <p className="font-english text-base md:text-lg text-white/80 leading-relaxed max-w-md mx-auto">
            {language === 'kh' ? (
              'សូមអញ្ជើញ ឱកាសឲ្យពួកយើងបានជួបជុំ មានរោគរាយ។ អ្នកគ្រប់គ្នាអាចរីករាយជាមួយយើង នៅក្នុងថ្ងៃពិសេសនេះ។ សូមអរគុណចំពោះការចូលរួម និងការគាំទ្ររបស់អ្នក។'
            ) : (
              'Sagittis adipiscing posuere id adipiscing aliquam posuere. Aliquet faucibus duis accumsan aliquet tempor diam dignissim suscipit. Nibh urna ut diam fames. Sagittis adipiscing posuere id adipiscing aliquam posuere.'
            )}
          </p>
        </motion.div>

        {/* Bottom-right photo card */}
        <motion.div 
          className="relative w-48 md:w-64 h-64 md:h-80 ml-auto -mr-4"
          initial={{ opacity: 0, rotate: 12, x: 50 }}
          whileInView={{ opacity: 1, rotate: 6, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-white p-3 shadow-2xl transform rotate-[6deg]">
            {/* TODO: <Image src={storyPhoto2} alt="" fill className="object-cover" /> */}
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700" />
          </div>
        </motion.div>
      </div>

      {/* Bottom cloud decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        {/* TODO: <Image src={cloudDecor} alt="" fill className="object-cover" /> */}
        <div className="w-full h-full bg-gradient-to-t from-white/5 to-transparent" />
      </div>
    </section>
  )
}

// ============================================================
// CALENDAR SECTION
// ============================================================
function CalendarSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#18280f] to-[#102010]">
      <motion.div 
        className="max-w-2xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* TODO: Replace with exact Khmer heading */}
        <h3 className="font-khmer text-2xl md:text-3xl text-white mb-6 leading-relaxed">
          កម្មវិធីពិធីសេចក្ដីស្នេហ៍ជីវិត
        </h3>
        <p className="font-khmer text-lg text-white/90 mb-4">
          ថ្ងៃទី២៩ អ្នកឈប់សម្រាក!ម៉ោ ហេ្លាគ ២៤ម៉ោ
        </p>

        <p className="font-english text-3xl md:text-4xl text-white/90 mb-8 tracking-wider italic">
          December
        </p>

        {/* Calendar image - TODO: Replace with actual transparent PNG */}
        <motion.div 
          className="relative max-w-md mx-auto mb-8"
          variants={scaleIn}
        >
          {/* TODO: <Image src={calendarImage} alt="December Calendar" width={400} height={450} className="w-full h-auto" /> */}
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-green-700/30 to-green-900/30 rounded-lg border border-white/10 flex items-center justify-center">
            <span className="font-english text-6xl text-white/50">Calendar</span>
          </div>
        </motion.div>

        {/* Below calendar text */}
        <p className="font-khmer text-xl md:text-2xl text-white mb-2">
          ថ្ងៃទី 29 ជាថ្ងៃឈប់សម្រាក!
        </p>
        <p className="font-english text-lg md:text-xl text-white/80 italic tracking-wide">
          Enjoy Your Day Off Tomorrow
        </p>
      </motion.div>

      {/* Swan decorations at bottom */}
      <div className="absolute bottom-8 left-8 w-24 h-24 opacity-80">
        {/* TODO: <Image src={swanLeft} alt="" width={96} height={96} /> */}
        <div className="w-full h-full bg-white/10 rounded-full" />
      </div>
      <div className="absolute bottom-8 right-8 w-24 h-24 opacity-80">
        {/* TODO: <Image src={swanRight} alt="" width={96} height={96} /> */}
        <div className="w-full h-full bg-white/10 rounded-full" />
      </div>
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
      className={`relative flex items-center gap-4 mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'text-right pr-4' : 'text-left pl-4'}`}>
        <p className="font-english text-lg md:text-xl text-white/90 font-semibold mb-1">
          {event.time}
        </p>
        <p className="font-khmer text-sm md:text-base text-white/70 leading-relaxed">
          {event.titleKh}
        </p>
      </div>

      {/* Connector dot */}
      <div className="relative z-10">
        <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm">
          <span className="text-sm">{event.icon}</span>
        </div>
      </div>

      {/* Photo (if exists) */}
      <div className="flex-1">
        {event.photo && (
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shadow-lg">
            {/* TODO: Dynamic image based on event.photo */}
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600" />
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
    <section className="relative py-20 bg-[#18280f] overflow-hidden">
      {/* Vertical dashed path */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white/20 -translate-x-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Day 1 */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4 mb-12">
            <motion.div 
              className="w-16 h-16"
              animate={floatingAnimation}
            >
              {/* TODO: <Image src={cupidImage} alt="" width={64} height={64} /> */}
              <div className="w-full h-full bg-white/10 rounded-full" />
            </motion.div>
            <h3 className="font-khmer text-3xl md:text-4xl text-white">
              ថ្ងៃទី 1
            </h3>
          </div>

          {day1Events.map((event, index) => (
            <TimelineItem 
              key={`day1-${index}`} 
              event={event} 
              index={index}
              side={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </motion.div>

        {/* Day 2 */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4 mb-12">
            <motion.div 
              className="w-16 h-16"
              animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
            >
              {/* TODO: <Image src={cupidImage} alt="" width={64} height={64} /> */}
              <div className="w-full h-full bg-white/10 rounded-full" />
            </motion.div>
            <h3 className="font-khmer text-3xl md:text-4xl text-white">
              ថ្ងៃទី 2
            </h3>
            <div className="w-16 h-16 ml-4 rounded-lg overflow-hidden">
              {/* TODO: Small decorative photo */}
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600" />
            </div>
          </div>

          {day2Events.map((event, index) => (
            <TimelineItem 
              key={`day2-${index}`} 
              event={event} 
              index={index}
              side={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </motion.div>

        {/* Bottom couple walking image */}
        <motion.div 
          className="relative w-full h-[50vh] rounded-t-[3rem] overflow-hidden mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* TODO: <Image src={coupleWalkingImage} alt="" fill className="object-cover" /> */}
          <div className="w-full h-full bg-gradient-to-b from-green-600 to-green-800" />
          
          {/* Decorative hill/flowers overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32">
            <svg viewBox="0 0 1200 120" className="w-full h-full">
              <path 
                d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z" 
                fill="rgba(255,255,255,0.1)"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================
// MAP SECTION
// ============================================================
function MapSection() {
  return (
    <section className="relative py-20 pb-32 bg-gradient-to-b from-[#102010] to-[#0a1508]">
      <motion.div 
        className="max-w-3xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          {/* TODO: Replace with exact venue name in Khmer */}
          <h3 className="font-khmer text-3xl md:text-4xl text-white mb-3">
            សមិទ្ធិមេគង្ហរភាវន័យអេវិថ្យ
          </h3>
          <p className="font-khmer text-lg text-white/80">
            សំណុំ ជាអណ្តៅងារម្លានដែល លោកថ្នងអន្លើសមង លោកបែកពីមែ ផេងណា គីងពេជេងំ អង្កាវមំាន នៅពេជ្រង៍ជូមាក និងអេយៀងបែបំលីសំពោគជេង
          </p>
        </div>

        {/* Map container */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 mb-8">
          <iframe
            src={MAP_URL}
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </div>

        {/* Map subtitle */}
        <div className="text-center mb-12">
          <p className="font-english text-2xl md:text-3xl text-white/90 mb-2 italic">
            Map Details
          </p>
          <p className="font-english text-lg text-white/70 tracking-wide">
            Enjoy Your Day Off Tomorrow
          </p>
        </div>
      </motion.div>

      {/* Bottom decoration with CTA */}
      <div className="relative">
        {/* Cloud decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-40">
          {/* TODO: <Image src={cloudDecor} alt="" fill className="object-cover" /> */}
          <div className="w-full h-full bg-gradient-to-t from-white/5 to-transparent" />
        </div>

        {/* Swans */}
        <motion.div 
          className="absolute bottom-8 left-8 w-32 h-32 opacity-80"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* TODO: <Image src={swanLeft} alt="" width={128} height={128} /> */}
          <div className="w-full h-full bg-white/10 rounded-full" />
        </motion.div>
        <motion.div 
          className="absolute bottom-8 right-8 w-32 h-32 opacity-80"
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          {/* TODO: <Image src={swanRight} alt="" width={128} height={128} /> */}
          <div className="w-full h-full bg-white/10 rounded-full" />
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="relative z-10 text-center pt-24"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/gallery">
            <button className="group relative px-12 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 rounded-full text-white font-english text-xl font-medium tracking-wide hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 shadow-2xl">
              <span className="relative z-10">Go To Gallery</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </Link>
          <p className="mt-4 text-white/50 text-sm">
            {/* TODO: /gallery page to be implemented */}
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
    <main className="relative bg-[#18280f] text-white overflow-x-hidden">
      <LanguageToggle language={language} setLanguage={setLanguage} />
      
      <HeroSection />
      <NamesBanner />
      <StorySection language={language} />
      <CalendarSection />
      <ProgramSection />
      <MapSection />
    </main>
  )
}

