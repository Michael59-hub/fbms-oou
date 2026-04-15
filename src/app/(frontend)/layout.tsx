import type { Metadata } from 'next'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata: Metadata = {
  title: {
    template: '%s | FBMS OOU',
    default: 'Faculty of Basic Medical Sciences — OOU',
  },
  description: 'Official website of the Faculty of Basic Medical Sciences, Olabisi Onabanjo University.',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}