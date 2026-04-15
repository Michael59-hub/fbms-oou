import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Departments',
}

export default async function DepartmentsPage() {
  const payload = await getPayloadClient()

  const departments = await payload.find({
    collection: 'departments',
    limit: 20,
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 uppercase tracking-widest text-sm mb-3">
            Academic units
          </p>
          <h1 className="text-4xl font-bold">Our Departments</h1>
          <p className="text-green-200 mt-4 mx-auto">
            The Faculty of Basic Medical Sciences is made up of several departments,
            each dedicated to a specific area of medical science.
          </p>
        </div>
      </section>

      {/* Departments grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {departments.docs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No departments listed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.docs.map((dept) => (
                <Link
                  key={dept.id}
                  href={`/departments/${dept.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-green-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {dept.logo && typeof dept.logo === 'object' && 'url' in dept.logo ? (
                      <img
                        src={dept.logo.url as string}
                        alt={dept.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-green-800 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-black text-lg">
                          {dept.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h2 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors mb-1">
                        {dept.name}
                      </h2>
                      {dept.foundedYear && (
                        <p className="text-xs text-gray-400">
                          Est. {dept.foundedYear}
                        </p>
                      )}
                    </div>
                  </div>

                  {dept.mission && (
                    <p className="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-3">
                      {dept.mission}
                    </p>
                  )}

                  {dept.hod?.name && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                      {dept.hod.photo && typeof dept.hod.photo === 'object' && 'url' in dept.hod.photo ? (
                        <img
                          src={dept.hod.photo.url as string}
                          alt={dept.hod.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-green-800">
                            {dept.hod.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">
                        HOD: <span className="font-medium text-gray-700">{dept.hod.name}</span>
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-green-700 font-medium mt-4 group-hover:underline">
                    View department →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}