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
    collection: 'departments',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const dept = result.docs[0]
  if (!dept) return { title: 'Department not found' }
  return { title: dept.name }
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const [deptResult, newsResult] = await Promise.all([
    payload.find({
      collection: 'departments',
      where: { slug: { equals: slug } },
      limit: 1,
    }),
    payload.find({
      collection: 'news',
      where: {
        and: [
          { status: { equals: 'published' } },
        ],
      },
      limit: 3,
      sort: '-publishedAt',
    }),
  ])

  const dept = deptResult.docs[0]
  if (!dept) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/departments"
            className="text-green-300 text-sm hover:text-white transition-colors mb-4 inline-block"
          >
            ← All Departments
          </Link>
          <div className="flex items-center gap-4 mt-2">
            {dept.logo && typeof dept.logo === 'object' && 'url' in dept.logo ? (
              <img
                src={dept.logo.url as string}
                alt={dept.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-green-700 flex items-center justify-center">
                <span className="text-2xl font-black text-white">
                  {dept.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{dept.name}</h1>
              {dept.foundedYear && (
                <p className="text-green-300 text-sm mt-1">
                  Established {dept.foundedYear}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Vision & Mission */}
          {(dept.vision || dept.mission) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dept.vision && (
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h2 className="font-bold text-green-800 mb-3">Vision</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">{dept.vision}</p>
                </div>
              )}
              {dept.mission && (
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h2 className="font-bold text-green-800 mb-3">Mission</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">{dept.mission}</p>
                </div>
              )}
            </div>
          )}

          {/* HOD */}
          {dept.hod?.name && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Head of Department
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-6">
                {dept.hod.photo && typeof dept.hod.photo === 'object' && 'url' in dept.hod.photo ? (
                  <img
                    src={dept.hod.photo.url as string}
                    alt={dept.hod.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-50">
                    <span className="text-2xl font-black text-green-800">
                      {dept.hod.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{dept.hod.name}</h3>
                  <p className="text-sm text-gray-500">Head of Department</p>
                  {dept.hod.email && (
                    
                    <Link  href={`mailto:${dept.hod.email}`}
                      className="text-sm text-green-700 hover:underline mt-1 inline-block"
                    >
                      {dept.hod.email}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Recent news from this department */}
          {newsResult.docs.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent News</h2>
                <Link
                  href="/news"
                  className="text-green-700 text-sm hover:underline"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {newsResult.docs.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString('en-NG', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : ''}
                    </p>
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}