import React from "react";
import hotel1 from "/images/hotel1.png"
import hotel2 from "/images/hotel2.png";
import hotel3 from "/images/hotel3.png";
import hotel4 from "/images/hotel4.png";
import hotel5 from "/images/hotel5.png";
import { Star } from "lucide-react"; // modern icons

const hotels = [
  { id: 1, name: "The Spectator Hotel", price: 2025, img: hotel1, location: "123 Street, City, Country", rating: 4.8 },
  { id: 2, name: "Luxury Stay Inn", price: 1850, img: hotel2, location: "456 Avenue, City, Country", rating: 4.6 },
  { id: 3, name: "Grand Palace", price: 2200, img: hotel3, location: "789 Road, City, Country", rating: 4.9 },
  { id: 4, name: "Elite Resort", price: 2100, img: hotel4, location: "321 Lane, City, Country", rating: 4.7 },
  { id: 5, name: "Ocean View Hotel", price: 1950, img: hotel5, location: "654 Beach, City, Country", rating: 4.5 },
];

export const Ratinghotel = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        🌟 Top Rated Hotels
      </h1>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={hotel.img}
                alt={hotel.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-800 shadow">
                ⭐ {hotel.rating}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
               <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                 {hotel.name}
               </h2>

              <p className="mt-1 text-sm text-gray-500">{hotel.location}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${hotel.price}
                  <span className="ml-1 text-sm font-medium text-gray-500">
                    / Night
                  </span>
                </span>
                 <button className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 transition">
                   Book Now
                 </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
