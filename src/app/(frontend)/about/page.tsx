import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'About',
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 uppercase tracking-widest text-sm mb-3">
            Who we are
          </p>
          <h1 className="text-4xl font-bold">About the Faculty</h1>
        </div>
      </section>

      {/* Dean's welcome */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Dean's Welcome Message
          </h2>
          <div className="bg-green-50 border-l-4 border-green-700 rounded-r-xl p-6 text-gray-700 leading-relaxed">
            <p>
              Welcome to the Faculty of Basic Medical Sciences, Olabisi Onabanjo University.
              Our faculty is committed to producing graduates of the highest academic standard,
              equipped with the knowledge and skills needed to make meaningful contributions
              to healthcare and medical research in Nigeria and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-green-50 py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
            <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be a leading faculty in Africa for basic medical sciences education,
              research, and community service, producing world-class graduates who
              will transform healthcare delivery.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
            <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide high-quality education in the basic medical sciences through
              innovative teaching, cutting-edge research, and meaningful community
              engagement, while upholding the highest standards of academic integrity.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Our History</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              The Faculty of Basic Medical Sciences was established as part of Olabisi Onabanjo
              University's commitment to advancing medical education in Ogun State and Nigeria
              at large. Since its founding, the faculty has grown to become one of the most
              respected institutions for basic medical sciences training in the country.
            </p>
            <p>
              Over the years, the faculty has produced hundreds of graduates who have gone on
              to distinguish themselves in medicine, research, academia, and public health
              across Nigeria and internationally.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '500+', label: 'Graduates' },
            { value: '5', label: 'Departments' },
            { value: '50+', label: 'Academic Staff' },
            { value: '30+', label: 'Years of Excellence' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-black text-green-300 mb-2">{stat.value}</p>
              <p className="text-sm text-green-100 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}