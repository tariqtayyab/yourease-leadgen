'use client'

import { usePathname } from 'next/navigation'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLeadsPage = pathname === '/leads' || pathname?.startsWith('/leads/')

  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {!isLeadsPage && <Navbar />}
        <main>{children}</main>
        {!isLeadsPage && <Footer />}
      </body>
    </html>
  )
}