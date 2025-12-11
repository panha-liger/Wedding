import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const khmerFont = localFont({
  src: '../public/fonts/Moul-Regular.ttf',
  variable: '--font-khmer',
  weight: '400',
  style: 'normal',
  display: 'swap',
  fallback: ['Khmer OS Muol Light', 'Moul', 'Noto Sans Khmer', 'sans-serif'],
})

const kantumruyFont = localFont({
  src: '../public/fonts/KantumruyPro-VariableFont_wght.ttf',
  variable: '--font-kantumruy',
  weight: '200 700',
  style: 'normal',
  display: 'swap',
  fallback: ['Kantumruy Pro', 'Noto Sans Khmer', 'sans-serif'],
})

const englishFont = localFont({
  src: '../public/fonts/CormorantGaramond-VariableFont_wght.ttf',
  variable: '--font-english',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  fallback: ['Cormorant Garamond', 'Georgia', 'serif'],
})

const scriptFont = localFont({
  src: '../public/fonts/AlexBrush-Regular.ttf',
  variable: '--font-script',
  weight: '400',
  style: 'normal',
  display: 'swap',
  fallback: ['Alex Brush', 'cursive'],
})

export const metadata: Metadata = {
  title: 'Wedding Website',
  description: 'Our special day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[#18280f] text-white">
      <body className={`${khmerFont.variable} ${kantumruyFont.variable} ${englishFont.variable} ${scriptFont.variable} antialiased bg-[#18280f] text-white`}>
        {children}
      </body>
    </html>
  )
}
