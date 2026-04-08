import Link from 'next/link'

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
  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-75">
              Olabisi Onabanjo University
            </p>
            <h1 className="text-lg font-bold leading-tight">
              Faculty of Basic Medical Sciences
            </h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-green-200 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}