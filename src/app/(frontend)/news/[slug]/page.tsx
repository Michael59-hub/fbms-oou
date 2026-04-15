import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const article = result.docs[0]
  if (!article) return { title: 'Article not found' }
  return { title: article.title }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'news',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
  })

  const article = result.docs[0]
  if (!article) notFound()

  const moreNews = await payload.find({
    collection: 'news',
    where: {
      and: [
        { status: { equals: 'published' } },
        { slug: { not_equals: slug } },
      ],
    },
    sort: '-publishedAt',
    limit: 3,
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/news"
            className="text-green-300 text-sm hover:text-white transition-colors mb-6 inline-block"
          >
            ← Back to News
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {article.department &&
              typeof article.department === 'object' &&
              'name' in article.department && (
                <span className="text-xs bg-green-700 text-green-100 px-3 py-1 rounded-full font-medium">
                  {article.department.name as string}
                </span>
              )}
            {article.publishedAt && (
              <span className="text-green-300 text-sm">
                {new Date(article.publishedAt).toLocaleDateString('en-NG', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {article.title}
          </h1>
          {article.author && (
            <p className="text-green-300 mt-4 text-sm">By {article.author}</p>
          )}
        </div>
      </section>

      {/* Cover image */}
      {article.coverImage &&
        typeof article.coverImage === 'object' &&
        'url' in article.coverImage && (
          <div className="max-w-3xl mx-auto px-4 -mt-8">
            <img
              src={article.coverImage.url as string}
              alt={article.coverImage.alt as string}
              className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

      {/* Article body */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-green max-w-none text-gray-700 leading-relaxed">
            {article.body && typeof article.body === 'object' ? (
              <ArticleBody content={article.body} />
            ) : (
              <p className="text-gray-400">No content available.</p>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
              {article.tags.map((tagObj, i) => (
                <span
                  key={i}
                  className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full"
                >
                  {tagObj.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More news */}
      {moreNews.docs.length > 0 && (
        <section className="bg-green-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">More News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreNews.docs.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {item.coverImage &&
                    typeof item.coverImage === 'object' &&
                    'url' in item.coverImage ? (
                    <img
                      src={item.coverImage.url as string}
                      alt={item.coverImage.alt as string}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-40 bg-green-50 flex items-center justify-center">
                      <span className="text-green-200 text-4xl font-black">N</span>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString('en-NG', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : ''}
                    </p>
                    <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors line-clamp-2 text-sm">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function ArticleBody({ content }: { content: any }) {
  if (!content?.root?.children) return null

  return (
    <div className="space-y-4">
      {content.root.children.map((node: any, i: number) => {
        if (node.type === 'paragraph') {
          return (
            <p key={i} className="text-gray-700 leading-relaxed">
              {node.children?.map((child: any, j: number) => {
                if (child.type === 'text') {
                  if (child.format === 1) return <strong key={j}>{child.text}</strong>
                  if (child.format === 2) return <em key={j}>{child.text}</em>
                  return child.text
                }
                return null
              })}
            </p>
          )
        }
        if (node.type === 'heading') {
            const text = node.children?.map((child: any) => child.text).join('')
            const headingClass = "font-bold text-gray-800 mt-6"
            if (node.tag === 'h1') return <h1 key={i} className={headingClass}>{text}</h1>
            if (node.tag === 'h2') return <h2 key={i} className={headingClass}>{text}</h2>
            if (node.tag === 'h3') return <h3 key={i} className={headingClass}>{text}</h3>
            if (node.tag === 'h4') return <h4 key={i} className={headingClass}>{text}</h4>
            return <h2 key={i} className={headingClass}>{text}</h2>
        }
        if (node.type === 'list') {
          const ListTag = node.listType === 'number' ? 'ol' : 'ul'
          return (
            <ListTag key={i} className="list-disc list-inside space-y-1 text-gray-700 pl-4">
              {node.children?.map((item: any, j: number) => (
                <li key={j}>
                  {item.children?.map((child: any) => child.text).join('')}
                </li>
              ))}
            </ListTag>
          )
        }
        return null
      })}
    </div>
  )
}