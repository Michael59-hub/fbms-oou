'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Departments', href: '/departments' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'E-Library', href: '/e-library' },
  { label: 'Research', href: '/research' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Executives', href: '/executives' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-green-800 text-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-green-900 text-green-300 text-xs py-1 px-4 text-center hidden md:block">
        Official website of the Faculty of Basic Medical Sciences, Olabisi Onabanjo University
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
            <span className="text-green-800 font-black text-sm">OOU</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-green-300 uppercase tracking-widest leading-none">
              Olabisi Onabanjo University
            </p>
            <p className="text-sm font-bold leading-snug">
              Faculty of Basic Medical Sciences
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-green-700 bg-green-800">
          <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-3 text-sm font-medium hover:bg-green-700 rounded-md transition-colors border-b border-green-700 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}