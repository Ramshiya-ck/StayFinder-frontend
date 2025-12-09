import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";

import slider1 from "/images/slider1.png";
import slider2 from "/images/slider2.jpeg";
import slider3 from "/images/slider3.jpg";
import slider4 from "/images/slider4.png";

export default function Booking() {
  const { id, room_id } = useParams();
  const [booking, setBooking] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [roomData, setRoomData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      phone: "",
      payment_status: "pending",
      check_in: "",
      check_out: "",
      guests: 1,
      total_amount: 0,
      advance_amount: 0,
      balance_amount: 0,
      booking_status: "pending",
    },
  });

  // auto calculate balance_amount
  const total = watch("total_amount");
  const advance = watch("advance_amount");
  useEffect(() => {
    const totalNum = parseFloat(total) || 0;
    const advanceNum = parseFloat(advance) || 0;
    setValue("balance_amount", totalNum - advanceNum);
  }, [total, advance, setValue]);

  // fetch room details to get pricing
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchRoomData = async () => {
      try {
        // Fetch all rooms for this hotel
        const response = await axiosinstance.get(
          `room/rooms/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        // Find the specific room by room_id
        const rooms = response.data.data;
        const room = rooms.find(r => r.id === parseInt(room_id));
        
        if (room) {
          setRoomData(room);
          
          // Set the pricing in the form
          if (room.price) {
            const totalPrice = parseFloat(room.price);
            const advancePrice = totalPrice * 0.3; // 30% advance
            const balancePrice = totalPrice * 0.7; // 70% balance
            
            setValue("total_amount", totalPrice.toFixed(2));
            setValue("advance_amount", advancePrice.toFixed(2));
            setValue("balance_amount", balancePrice.toFixed(2));
          }
        } else {
          setErrorMessage("Room not found.");
        }
      } catch (error) {
        console.log("Error fetching room data:", error);
        setErrorMessage("Unable to load room pricing. Please refresh the page.");
      }
    };
    fetchRoomData();
  }, [id, room_id, setValue]);

  const token = localStorage.getItem("token");

  // ✅ submit handler
  const onSubmit = async (data) => {
    try {
      // Clear previous messages
      setErrorMessage("");
      setSuccessMessage("");
      
      console.log("Form Data Submitted:", data);

      // Step 1: Create booking
      const bookingResponse = await axiosinstance.post(
        "booking/booking/create/",
        {
          hotel: id,
          room: room_id,
          check_in: data.check_in,
          check_out: data.check_out,
          guests: data.guests,
          address: data.address,
          phone: data.phone,
          total_amount: data.total_amount,
          advance_amount: data.advance_amount,
          balance_amount: data.balance_amount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookingId = bookingResponse.data.data.id;
      console.log("Booking created:", bookingId);

      // Step 2: Create checkout session
      const sessionResponse = await axiosinstance.post(
        "booking/create/checkout/session/",
        { booking_id: bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Checkout Session:", sessionResponse.data);

      // Step 3: Redirect to Stripe Checkout
      if (sessionResponse.data?.checkout_url) {
        setSuccessMessage("Booking created! Redirecting to payment...");
        setTimeout(() => {
          window.location.href = sessionResponse.data.checkout_url;
        }, 1000);
      } else {
        setErrorMessage("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      
      // Handle specific error from backend
      const backendError = error.response?.data;
      if (backendError?.message) {
        setErrorMessage(backendError.message);
      } else if (backendError?.detail) {
        setErrorMessage(backendError.detail);
      } else {
        setErrorMessage("Booking failed. Please check your information and try again.");
      }
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          Reserve Your Perfect Stay
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Handpicked rooms, flexible dates, and instant confirmation.
        </p>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Image Gallery */}
        <div className="order-last lg:order-first grid grid-cols-2 gap-3 sm:gap-4">
          <div className="col-span-2 h-56 sm:h-72 lg:h-80 overflow-hidden rounded-3xl shadow">
            <img
              src={slider1}
              alt="Hotel"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="h-40 sm:h-48 overflow-hidden rounded-2xl shadow">
            <img
              src={slider2}
              alt="Lobby"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="h-40 sm:h-48 overflow-hidden rounded-2xl shadow">
            <img
              src={slider3}
              alt="Suite"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="col-span-2 h-44 sm:h-56 overflow-hidden rounded-2xl shadow">
            <img
              src={slider4}
              alt="Pool"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 backdrop-blur rounded-3xl shadow-xl ring-1 ring-gray-900/5 p-6 sm:p-8 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Book Your Stay</h2>
            {roomData && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium text-emerald-600">{roomData.room_type}</p>
                <p className="text-lg font-semibold text-gray-800">${roomData.price} / night</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage("")}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check In
              </label>
              <input
                type="date"
                {...register("check_in", { required: true })}
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
              />
              {errors.check_in && (
                <p className="text-red-500 text-sm">Check-in is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check Out
              </label>
              <input
                type="date"
                {...register("check_out", { required: true })}
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
              />
              {errors.check_out && (
                <p className="text-red-500 text-sm">Check-out is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <input
                type="number"
                min="1"
                {...register("guests", { required: true, min: 1 })}
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                {...register("address")}
                rows="3"
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Amounts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("total_amount", { required: true, min: 0 })}
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
              />
              {errors.total_amount && (
                <p className="text-red-500 text-sm">Total amount is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("advance_amount", { required: true, min: 0 })}
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
              />
              {errors.advance_amount && (
                <p className="text-red-500 text-sm">Advance amount is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Balance Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("balance_amount")}
                readOnly
                className="w-full rounded-xl border px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all duration-200"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* Benefits */}
      <div className="mx-auto max-w-7xl mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="rounded-2xl bg-white shadow p-4">
          <p className="text-sm font-semibold text-gray-900">Best Price</p>
          <p className="text-xs text-gray-500">Guaranteed deals</p>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <p className="text-sm font-semibold text-gray-900">Free Cancel</p>
          <p className="text-xs text-gray-500">Select rooms</p>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <p className="text-sm font-semibold text-gray-900">24/7 Support</p>
          <p className="text-xs text-gray-500">We’re here to help</p>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <p className="text-sm font-semibold text-gray-900">Secure</p>
          <p className="text-xs text-gray-500">Safe checkout</p>
        </div>
      </div>
    </div>
  );
}
