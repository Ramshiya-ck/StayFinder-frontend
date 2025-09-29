import React, { useEffect, useState } from "react";
import hotel1 from "/images/hotel1.png"
import hotel2 from "/images/hotel2.png";
import hotel3 from "/images/hotel3.png";
import hotel4 from "/images/hotel4.png";
import hotel5 from "/images/hotel5.png";
import { Star } from "lucide-react"; // modern icons
import { axiosinstance } from "../config/axiosinstance";
import { Link } from "react-router-dom";

const hotels = [
  { id: 1, name: "The Spectator Hotel", price: 2025, img: hotel1, location: "123 Street, City, Country", rating: 4.8 },
  { id: 2, name: "Luxury Stay Inn", price: 1850, img: hotel2, location: "456 Avenue, City, Country", rating: 4.6 },
  { id: 3, name: "Grand Palace", price: 2200, img: hotel3, location: "789 Road, City, Country", rating: 4.9 },
  { id: 4, name: "Elite Resort", price: 2100, img: hotel4, location: "321 Lane, City, Country", rating: 4.7 },
  { id: 5, name: "Ocean View Hotel", price: 1950, img: hotel5, location: "654 Beach, City, Country", rating: 4.5 },
];



export const Ratinghotel = () => {


const [hotels,setHotels] = useState([])

useEffect(() => {
  const getRating = async () => {
    try {
      const response = await axiosinstance.get("hotel/top/rated/hotels/");
      console.log(response)
      setHotels(response.data)
    } catch (error) {
    }
  };
  getRating();
}, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        🌟 Top Rated Hotels
      </h1>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-6 sm:p-10">
      {/* Search Bar (UI only, not functional yet) */}
   
      {/* Hotel Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotels.map((hotel) => (
          <Link to={`/singlehotel/${hotel.id}`}><div
          key={hotel.id}
          className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-emerald-200"
        >
          {/* Image */}
          <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
            <img
              src={hotel.image ? `http://127.0.0.1:8000${hotel.image}` : "/images/default-hotel.png"} // fallback if no image
              alt={hotel.hotal_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-sm">★</span>
                <span className="text-gray-800 text-sm font-bold">
                  {hotel.rating}
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-slate-900">
                      ${hotel.price || 0}
                    </span>
                    <span className="text-slate-600 ml-1">/night</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
              {hotel.hotal_name}
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-600 text-sm truncate">
                {hotel.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {hotel.amenities &&
                hotel.amenities.split(",").slice(0, 10).map((a, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-medium"
                  >
                    {a}
                  </span>
                ))}
            </div>
            <div className="flex items-center justify-between">
              {/* <Link
                to={`/hotels/${hotel.id}`} */}
                <Link to='/singlehotel'>
               <div className="text-emerald-700 font-semibold hover:text-emerald-800 transition">

                View Details →</div></Link>
              {/* </Link> */}
              {/* <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 transition">
                Book Now
              </button> */}
            </div>
            
          </div>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-green-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none"></div>
        </div></Link>
        ))}
      </div>
    </div>
    </div>
  );
};
