import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance";
import { useParams, useNavigate } from "react-router-dom";

export default function BookingCard() {
  const { booking_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token)
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await axiosinstance.get(
          `booking/single/booking/${booking_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log( response.data);
        setBooking(response.data.data); // ✅ extract booking object
      } catch (error) {
        console.log(error);
      }
    };

    if (booking_id) getBooking();
  }, [booking_id, token]);

  if (!booking) {
    return <p className="text-center mt-10">Loading booking details...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Details</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Booking ID:</span>
          <span className="text-gray-900">#{booking.id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Amount Paid:</span>
          <span className="text-gray-900">₹{booking.advance_amount}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Payment Status:</span>
          <span
            className={`font-semibold ${
              booking.payment_status === "paid"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {booking.payment_status}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Booking Status:</span>
          <span
            className={`font-semibold ${
              booking.booking_status === "confirmed"
                ? "text-green-600"
                : "text-yellow-500"
            }`}
          >
            {booking.booking_status}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Dates:</span>
          <span className="text-gray-900">
            {booking.check_in} → {booking.check_out}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate("/payment/success")}
        className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors"
      >
        View My Bookings
      </button>
    </div>
  );
}
