import React from 'react'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-900 pt-24 pb-32 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
              Advancing Medical <br /> 
              <span className="text-blue-300">Sciences through Innovation.</span>
            </h1>
            <p className="mt-6 text-lg text-blue-100 leading-relaxed">
              Official portal for the Faculty of Basic Medical Sciences at Olabisi Onabanjo University. 
              Bridging the gap between laboratory research and clinical excellence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-white px-8 py-4 font-semibold text-blue-900 rounded-lg shadow-lg hover:bg-blue-50">
                Explore E-Library
              </button>
              <button className="border border-blue-400 px-8 py-4 font-semibold text-white rounded-lg hover:bg-blue-800">
                Faculty Departments
              </button>
            </div>
          </div>
        </div>
        {/* Subtle Decorative Background Element */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-800/50 to-transparent opacity-50" />
      </section>

      {/* Bento Grid Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Research Card */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white h-80">
            <div className="relative z-10 flex flex-col justify-end h-full">
              <h3 className="text-2xl font-bold">Latest Research</h3>
              <p className="text-slate-400 mt-2">Explore the cutting-edge publications from our pharmacology and anatomy labs.</p>
            </div>
            <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 group-hover:scale-110 transition-transform">🔬</div>
          </div>

          {/* News Card */}
          <div className="rounded-3xl bg-blue-50 p-8 border border-blue-100 h-80">
            <span className="inline-block bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-4">UPDATES</span>
            <h3 className="text-2xl font-bold text-blue-900">Faculty News</h3>
            <p className="text-blue-700/80 mt-2 font-medium">Upcoming seminars and faculty event schedules.</p>
          </div>
        </div>
      </section>
    </div>
  )
}