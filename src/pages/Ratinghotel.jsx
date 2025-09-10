import React from 'react'
import hotel1 from '/images/hotel1.png'
import hotel2 from '/images/hotel2.png'
import hotel3 from '/images/hotel3.png'
import hotel4 from '/images/hotel4.png'
import hotel5 from '/images/hotel5.png'


export const Ratinghotel = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900 sm:text-4xl'>Top Rated</h1>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
    <div className="group mx-auto max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-gray-100">
        <img src={hotel1} alt="Hotel" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />

        <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">The Spectator Hotel</h1>

        <div className="flex items-center gap-1 text-lg">
            <span className="font-bold text-gray-900">$2025</span>
            <span className="text-gray-600">/ Night</span>
        </div>

        <p className="text-gray-500 mt-2">123 Street, City, Country</p>
        </div>
    </div>
    <div className="group mx-auto max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-gray-100">
        <img src={hotel2} alt="Hotel" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />

        <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">The Spectator Hotel</h1>

        <div className="flex items-center gap-1 text-lg">
            <span className="font-bold text-gray-900">$2025</span>
            <span className="text-gray-600">/ Night</span>
        </div>

        <p className="text-gray-500 mt-2">123 Street, City, Country</p>
        </div>
    </div>
    <div className="group mx-auto max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-gray-100">
        <img src={hotel3} alt="Hotel" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />

        <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">The Spectator Hotel</h1>

        <div className="flex items-center gap-1 text-lg">
            <span className="font-bold text-gray-900">$2025</span>
            <span className="text-gray-600">/ Night</span>
        </div>

        <p className="text-gray-500 mt-2">123 Street, City, Country</p>
        </div>
    </div>
    <div className="group mx-auto max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-gray-100">
        <img src={hotel4} alt="Hotel" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />

        <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">The Spectator Hotel</h1>

        <div className="flex items-center gap-1 text-lg">
            <span className="font-bold text-gray-900">$2025</span>
            <span className="text-gray-600">/ Night</span>
        </div>

        <p className="text-gray-500 mt-2">123 Street, City, Country</p>
        </div>
    </div>
    <div className="group mx-auto max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-gray-100">
        <img src={hotel5} alt="Hotel" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />

        <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">The Spectator Hotel</h1>

        <div className="flex items-center gap-1 text-lg">
            <span className="font-bold text-gray-900">$2025</span>
            <span className="text-gray-600">/ Night</span>
        </div>

        <p className="text-gray-500 mt-2">123 Street, City, Country</p>
        </div>
    </div>

</section>

        
    </div>
  )
}
