import React, { useEffect, useState } from 'react'
import { axiosinstance } from '../config/axiosinstance'

export const Category = () => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    const getcategory = async () => {
      try {
        const response = await axiosinstance.get('hotel/')
        setCategory(response.data.data) // ✅ backend data
      } catch (error) {
        console.log(error)
      }
    }
    getcategory()
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight">
            Find Your Next Getaway
            <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Handpicked Stays
            </span>
          </h1>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From city escapes to beach retreats, browse stays you'll love
          </p>
        </div>

        {/* Hotels Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.map((hotel) => (
            <div
              key={hotel.id}
              className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-emerald-200"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {hotel.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {hotel.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-500 text-sm truncate">{hotel.location}</p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.amentities &&
                    hotel.amentities.split(',').map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-medium"
                      >
                        {amenity.trim()}
                      </span>
                    ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="truncate">{hotel.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{hotel.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Book Now
                  </button>
                  <button className="px-4 py-3 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Effect Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-green-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span>View All Hotels</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
