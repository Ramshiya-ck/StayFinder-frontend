import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PaymentSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-20 w-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your booking has been confirmed.
        </p>

        <div className="space-y-4">
          <div className="bg-green-100 text-green-800 p-4 rounded-lg">
            <p className="font-medium">Booking ID: #12345</p>
            <p className="text-sm">Amount Paid: $120</p>
            <p className="text-sm">Date: 22 Sep 2025</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
}
