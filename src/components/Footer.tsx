import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export default async function Footer() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <footer className="bg-green-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">FBMS OOU</h3>
          <p className="text-green-200 text-sm">
            {siteSettings.tagline || 'Advancing medical knowledge and healthcare in Nigeria.'}
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-green-200">
            {[
              { label: 'About', href: '/about' },
              { label: 'Departments', href: '/departments' },
              { label: 'News', href: '/news' },
              { label: 'E-Library', href: '/e-library' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <ul className="space-y-1 text-sm text-green-200">
            {siteSettings.contactEmail && (
              <li>{siteSettings.contactEmail}</li>
            )}
            {siteSettings.phone && (
              <li>{siteSettings.phone}</li>
            )}
            {siteSettings.address && (
              <li>{siteSettings.address}</li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-green-700 text-center py-4 text-xs text-green-300">
        © {new Date().getFullYear()} Faculty of Basic Medical Sciences, OOU. All rights reserved.
      </div>
    </footer>
  )
}