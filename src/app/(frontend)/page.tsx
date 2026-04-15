import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [siteSettings, latestNews, upcomingEvents] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'news',
      where: { status: { equals: 'published' } },
      limit: 3,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'events',
      where: { status: { equals: 'upcoming' } },
      limit: 3,
      sort: 'startDate',
    }),
  ])

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 uppercase tracking-widest text-sm mb-4">
            Olabisi Onabanjo University
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Faculty of Basic Medical Sciences
          </h1>
          <p className="text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {siteSettings.heroText ||
              'Advancing medical knowledge, research, and healthcare excellence in Nigeria.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="bg-white text-green-900 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition-colors"
            >
              About the Faculty
            </Link>
            <Link
              href="/e-library"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Visit E-Library
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-green-50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Departments', href: '/departments', desc: 'Explore our departments' },
            { label: 'Executives', href: '/executives', desc: 'Meet our student leaders' },
            { label: 'Research', href: '/research', desc: 'Browse publications' },
            { label: 'Gallery', href: '/gallery', desc: 'Photos & memories' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:border-green-500 border border-transparent transition-all"
            >
              <h3 className="font-bold text-green-800 mb-1">{item.label}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
            <Link href="/news" className="text-green-700 text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>

          {latestNews.docs.length === 0 ? (
            <p className="text-gray-400">No news published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.docs.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  {article.coverImage &&
                    typeof article.coverImage === 'object' &&
                    'url' in article.coverImage && (
                      <img
                        src={article.coverImage.url as string}
                        alt={article.coverImage.alt as string}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-2">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString('en-NG', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : ''}
                    </p>
                    <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-green-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
            <Link href="/events" className="text-green-700 text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>

          {upcomingEvents.docs.length === 0 ? (
            <p className="text-gray-400">No upcoming events.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.docs.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                    {event.startDate
                      ? new Date(event.startDate).toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : ''}
                  </p>
                  <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors mb-2">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="text-sm text-gray-500">{event.location}</p>
                  )}
                  {event.isPaid && (
                    <span className="inline-block mt-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      ₦{event.amount?.toLocaleString()}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Have questions?</h2>
          <p className="text-green-200 mb-8">
            Reach out to the faculty executives or check our contact page for more information.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-green-900 font-semibold px-8 py-3 rounded-lg hover:bg-green-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}