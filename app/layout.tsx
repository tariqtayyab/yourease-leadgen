import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Yourease | Web & App Development Agency',
  description: 'Custom web and mobile app development built for scale. Clean code, intuitive design, and high-performance digital products that help your business grow.',
  keywords: 'web development, app development, mobile app development, custom software development, web design, digital agency, software development agency',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}