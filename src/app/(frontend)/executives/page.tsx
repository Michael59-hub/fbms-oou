import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Executives',
}

export default async function ExecutivesPage() {
  const payload = await getPayloadClient()

  const executives = await payload.find({
    collection: 'executives',
    sort: 'order',
    limit: 50,
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 uppercase tracking-widest text-sm mb-3">
            Student leadership
          </p>
          <h1 className="text-4xl font-bold">Executive Team</h1>
          <p className="text-green-200 mt-4 max-w-xl mx-auto">
            Meet the student executives responsible for managing and representing
            the Faculty of Basic Medical Sciences.
          </p>
        </div>
      </section>

      {/* Executives grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {executives.docs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No executives listed yet.</p>
            </div>
          ) : (
            <>
              {/* President first — full width card */}
              {executives.docs.slice(0, 1).map((exec) => (
                <div
                  key={exec.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center gap-8"
                >
                  {exec.photo && typeof exec.photo === 'object' && 'url' in exec.photo ? (
                    <img
                      src={exec.photo.url as string}
                      alt={exec.name}
                      className="w-40 h-40 rounded-full object-cover border-4 border-green-800 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border-4 border-green-800">
                      <span className="text-4xl font-black text-green-800">
                        {exec.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="inline-block bg-green-800 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                      {exec.position}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{exec.name}</h2>
                    {exec.bio && (
                      <p className="text-gray-600 leading-relaxed mb-4">{exec.bio}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {exec.email && (
                        
                        <Link
                          href={`mailto:${exec.email}`}
                          className="hover:text-green-700 transition-colors"
                        >
                          {exec.email}
                        </Link>
                      )}
                      {exec.phone && (
                        
                        <Link
                          href={`tel:${exec.phone}`}
                          className="hover:text-green-700 transition-colors"
                        >
                          {exec.phone}
                        </Link>
                      )}
                    </div>
                    {exec.socialLinks && (
                      <div className="flex gap-3 mt-4">
                        {exec.socialLinks.twitter && (
                          
                        <Link    href={exec.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-50 text-green-800 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
                          >
                            Twitter
                          </Link>
                        )}
                        {exec.socialLinks.instagram && (
                          
                         <Link   href={exec.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-50 text-green-800 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
                          >
                            Instagram
                          </Link>
                        )}
                        {exec.socialLinks.linkedin && (
                          
                        <Link    href={exec.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-50 text-green-800 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
                          >
                            LinkedIn
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Rest of executives — grid */}
              {executives.docs.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {executives.docs.slice(1).map((exec) => (
                    <div
                      key={exec.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
                    >
                      {exec.photo && typeof exec.photo === 'object' && 'url' in exec.photo ? (
                        <img
                          src={exec.photo.url as string}
                          alt={exec.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-green-100 mx-auto mb-4"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 border-4 border-green-50">
                          <span className="text-2xl font-black text-green-800">
                            {exec.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="inline-block bg-green-50 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
                        {exec.position}
                      </span>
                      <h3 className="font-bold text-gray-800 mb-2">{exec.name}</h3>
                      {exec.bio && (
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                          {exec.bio}
                        </p>
                      )}
                      <div className="flex flex-col gap-1 text-xs text-gray-400">
                        {exec.email && (
                          
                        <Link    href={`mailto:${exec.email}`}
                            className="hover:text-green-700 transition-colors truncate"
                          >
                            {exec.email}
                          </Link>
                        )}
                        {exec.phone && (
                          
                        <Link    href={`tel:${exec.phone}`}
                            className="hover:text-green-700 transition-colors"
                          >
                            {exec.phone}
                          </Link>
                        )}
                      </div>
                      {exec.socialLinks && (
                        <div className="flex justify-center gap-2 mt-3">
                          {exec.socialLinks.twitter && (
                            
                            <Link  href={exec.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
                            >
                              Twitter
                            </Link>
                          )}
                          {exec.socialLinks.instagram && (
                            
                            <Link   href={exec.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
                            >
                              Instagram
                            </Link>
                          )}
                          {exec.socialLinks.linkedin && (
                            
                            <Link    href={exec.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
                            >
                              LinkedIn
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}