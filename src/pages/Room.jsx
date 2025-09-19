import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance";
import { Link, useParams } from "react-router-dom";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  console.log(rooms)

  
  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await axiosinstance.get(`room/rooms/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, [id, token]);

  // Handle search
  const handleSearch = async (query) => {   // ✅ accept query as parameter
    try {
      let url = `room/room/search/${id}/`;
  
      // If the query is a number → search by price
      if (!isNaN(query)) {
        url += `?price=${query}`;
      }
      // Otherwise → search by room_type
      else {
        url += `?room_type=${query}`;
      }
  
      const response = await axiosinstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.status_code === 6000) {
        setRooms(response.data.data);
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clearSearch = async () => {
    setSearch(""); // reset input
  
    try {
      const response = await axiosinstance.get(`room/rooms/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data.data); // reload all rooms
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/40 p-6">
      <div className="max-w-6xl mx-auto space-y-6 pb-10">
        <div className="flex gap-3">
        <input
    type="text"
    placeholder="Search rooms..."
    className="w-full p-4 text-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
    value={search}
    onChange={(e) => {
      const value = e.target.value;
      setSearch(value);
      if (value) {
        handleSearch(value);
      }
    }}
  />

  <button
    onClick={() => handleSearch(search)}
    className="bg-emerald-600 text-white px-6 rounded-xl shadow-lg hover:bg-emerald-700"
  >
    Search
  </button>

  {search && (
    <button
      onClick={clearSearch}
      className="bg-red-500 text-white px-6 rounded-xl shadow-lg hover:bg-red-600"
    >
      Clear
    </button>
  )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Image Section */}
              <div className="h-80 md:h-[500px] w-full">
                {room.image ? (
                  <img
                    src={room.image}
                    alt="Room"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {room.room_type || "Room"}
                  </h1>
                  <span className="text-2xl font-semibold text-emerald-600">
                    ${room.price} / night
                  </span>
                </div>

                <div className="text-gray-600 text-sm">
                  <p>
                    <span className="font-semibold">Hotel:</span>{" "}
                    {room.hotel_id || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Room Type:</span>{" "}
                    {room.room_type}
                  </p>
                  <p>
                    <span className="font-semibold">Availability:</span>{" "}
                    <span
                      className={
                        room.availability ? "text-emerald-600" : "text-red-600"
                      }
                    >
                      {room.availability ? "Available" : "Not Available"}
                    </span>
                  </p>
                </div>

                <div className="pt-4">
                  <Link to={`/booking/${id}/${room.id}`}>
                    <button className="w-full md:w-auto bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-emerald-700 hover:scale-105 transition-transform">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No rooms available.</p>
        )}
      </div>
    </div>
  );
}
