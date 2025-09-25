import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id"); // ✅ grab from query string
  const token = localStorage.getItem("token");
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPaymentSuccess = async () => {
      try {
        const response = await axiosinstance.get(
          `booking/verify/payment/${session_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setBooking(response.data.data); // ✅ store the booking object
      } catch (error) {
        console.log(error);
      }
    };
    if (session_id) getPaymentSuccess();
  }, [session_id, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-20 w-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your booking has been confirmed.
        </p>

        {booking && (
          <div className="space-y-4">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg">
              <p className="font-medium">Booking ID: #{booking.id}</p>
              <p className="text-sm">Amount Paid: ₹{booking.total_amount}</p>
              <p className="text-sm">Payment: {booking.payment_status}</p>
              <p className="text-sm">Status: {booking.booking_status}</p>
              <p className="text-sm">
                Dates: {booking.check_in} → {booking.check_out}
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate("/my-bookings")}
          className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
}
