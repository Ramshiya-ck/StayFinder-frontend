import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance";
import { Link, useParams } from "react-router-dom";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const {id} = useParams()
  console.log(id, "====id")
  const token = localStorage.getItem("token")
  console.log(token)
  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await axiosinstance.get(`room/rooms/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          });
          
        console.log(response);
        setRooms(response.data.data); // ✅ store array
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/40 p-6">
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
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {room.room_type || "Room"}
                  </h1>
                  <span className="text-2xl font-semibold text-emerald-600">
                    ${room.price} / night
                  </span>
                </div>

                {/* Hotel Info */}
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
                        room.availability
                          ? "text-emerald-600"
                          : "text-red-600"
                      }
                    >
                      {room.availability ? "Available" : "Not Available"}
                    </span>
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                    <Link to='/booking'>
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
