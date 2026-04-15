import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'News',
}

export default async function NewsPage() {
  const payload = await getPayloadClient()

  const news = await payload.find({
    collection: 'news',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 12,
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 uppercase tracking-widest text-sm mb-3">
            Stay informed
          </p>
          <h1 className="text-4xl font-bold">News & Announcements</h1>
          <p className="text-green-200 mt-4 max-w-xl mx-auto">
            Latest updates, announcements, and stories from the Faculty of Basic Medical Sciences.
          </p>
        </div>
      </section>

      {/* News grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {news.docs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No news published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.docs.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {article.coverImage &&
                    typeof article.coverImage === 'object' &&
                    'url' in article.coverImage ? (
                    <img
                      src={article.coverImage.url as string}
                      alt={article.coverImage.alt as string}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-green-50 flex items-center justify-center">
                      <span className="text-green-200 text-5xl font-black">N</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {article.department && typeof article.department === 'object' && 'name' in article.department && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                          {article.department.name as string}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString('en-NG', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : ''}
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    {article.author && (
                      <p className="text-xs text-gray-400">By {article.author}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}