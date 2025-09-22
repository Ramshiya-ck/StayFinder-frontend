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
  const [booking,setBooking] = useState("")
console.log(booking)

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
    setValue("balance_amount", total - advance);
  }, [total, advance, setValue]);

  // fetch bookings list
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBookings = async () => {
      try {
        const response = await axiosinstance.get(
          `booking/booking/list/${id}/${room_id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooking(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, [id, room_id]);

  const token = localStorage.getItem("token");
  console.log(token)

  // ✅ submit handler
  const onSubmit = async (data) => {
    try {
      console.log("Form Data Submitted:", data);

      
      const response = await axiosinstance.post("booking/create/checkout/session/", data,id, room_id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooking(response.data.data);
      alert("Booking confirmed!");
    } catch (error) {
      console.log("Booking failed:", error);
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
          <h2 className="text-2xl font-bold text-gray-800">Book Your Stay</h2>

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
              value={booking.total_amount}
                type="number"
                {...register("total_amount")}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance Amount
              </label>
              <input
              value={booking.advance_amount}
                type="number"
                {...register("advance_amount")}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Balance Amount
              </label>
              <input
              value={booking.balance_amount}
                type="number"
                {...register("balance_amount")}
                readOnly
                className="w-full rounded-xl border px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Booking Status & Payment Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">



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
