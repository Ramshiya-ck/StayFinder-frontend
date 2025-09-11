import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance";
import { Link, Links } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState([])
  console.log(search)

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await axiosinstance.get("customer/hotel/");
        setHotels(response.data.data); // ✅ store backend data
      } catch (error) {
      }
    };
    getHotels();
  }, []);

  
    const getSearch = async (query) => {
     
        try {
            const response = await axiosinstance.get(`customer/hotel/search/?location=${query}`)
            setHotels(response.data.data)

            
        } catch (error) {
            console.log(error)
        }
    }
 


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-6 sm:p-10">
      {/* Search Bar (UI only, not functional yet) */}
      <div className="max-w-3xl mx-auto mb-10">
        <input
        onChange={(e) => getSearch(e.target.value)}
          type="text"
          placeholder="Search hotels by location..."
          className="w-full p-4 rounded-2xl border border-emerald-200/50 bg-white/70 shadow-sm backdrop-blur focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
      </div>

      {/* Hotel Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-emerald-200"
          >
            {/* Image */}
            <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
              <img
                src={hotel.image ? hotel.image : "/images/hotel1.png"} // fallback if no image
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
                  hotel.amenities.split(",").slice(0, 3).map((a, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-medium"
                    >
                      {a}
                    </span>
                  ))}
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to={`/hotels/${hotel.id}`}
                  className="text-emerald-700 font-semibold hover:text-emerald-800 transition"
                >
                  View Details →
                </Link>
                {/* <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 transition">
                  Book Now
                </button> */}
              </div>
              
            </div>

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-green-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
