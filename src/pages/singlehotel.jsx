import React from 'react'
import hotel4 from '/images/slider3.jpg'

export const Singlehotel = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Hotel Image */}
        <div className="h-80 w-full">
          <img 
            src= {hotel4} 
            alt="Hotel" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hotel Content */}
        <div className="p-6 space-y-4">
          {/* Title + Price */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">The Grand Paradise Hotel</h1>
            <span className="text-xl font-semibold text-emerald-600">$250 / night</span>
          </div>

          {/* Location */}
          <p className="text-gray-500 text-sm">📍 123 Beach Avenue, Miami, USA</p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            Experience ultimate luxury and comfort at The Grand Paradise Hotel.
            Located on the pristine shores of Miami Beach, this 5-star property 
            offers breathtaking ocean views, modern rooms, and world-class amenities. 
            Whether you're here for leisure or business, we ensure a memorable stay.
          </p>

          {/* Amenities */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h2>
            <ul className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
              <li>✔ Free WiFi</li>
              <li>✔ Swimming Pool</li>
              <li>✔ Spa & Wellness Center</li>
              <li>✔ Gym & Fitness Studio</li>
              <li>✔ 24/7 Room Service</li>
              <li>✔ Ocean View Rooms</li>
            </ul>
          </div>

          {/* Rooms */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Room Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-700">Deluxe Room</h3>
                <p className="text-sm text-gray-500">King-size bed, balcony view</p>
                <p className="text-emerald-600 font-semibold mt-1">$180 / night</p>
              </div>
              <div className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-700">Suite</h3>
                <p className="text-sm text-gray-500">2 Bedrooms, private pool</p>
                <p className="text-emerald-600 font-semibold mt-1">$350 / night</p>
              </div>
            </div>
          </div>

          {/* Call to Action (no <a>, just button) */}
          <div className="pt-4">
            <button className="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
