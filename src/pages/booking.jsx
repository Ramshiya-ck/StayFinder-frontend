import React, { useState } from "react";
import axios from "axios";
import slider1 from '/images/slider1.png'
import slider2 from '/images/slider2.jpeg'
import slider3 from '/images/slider3.jpg'
import slider4 from '/images/slider4.png'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    hotel: "",
    room: "",
    check_in: "",
    check_out: "",
    number_of_guest: 1,
    status: "pending",
    payment_status: "pending",
    payment_method: "card",
    total_amount: 0,
    address: "",
    phone: "",
    image: null,
  });

  const [isPaying, setIsPaying] = useState(false); // 🔑 Track payment state

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Calculate total amount based on nights and guests
  const calculateTotal = () => {
    if (formData.check_in && formData.check_out) {
      const checkIn = new Date(formData.check_in);
      const checkOut = new Date(formData.check_out);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const basePrice = 150; // Base price per night
      const guestMultiplier = Math.max(1, formData.number_of_guest - 1) * 0.2; // 20% extra per additional guest
      return Math.round(nights * basePrice * (1 + guestMultiplier));
    }
    return 0;
  };
 
  // Update total when relevant fields change
  React.useEffect(() => {
    const total = calculateTotal();
    setFormData(prev => ({ ...prev, total_amount: total }));
  }, [formData.check_in, formData.check_out, formData.number_of_guest]);

  // Simulated payment process
  const handlePayment = () => {
    setIsPaying(true); // disable button while paying
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, payment_status: "paid" }));
      setIsPaying(false);
    }, 1500); // simulate API call
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post("/api/v1/booking/create/", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert("Booking successful 🎉");
    } catch (error) {
      console.error(error);
      alert("Booking failed ❌");
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    paid: "bg-green-100 text-green-700 border-green-300",
    failed: "bg-red-100 text-red-700 border-red-300",
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
            <img src={slider1} alt="Hotel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="h-40 sm:h-48 overflow-hidden rounded-2xl shadow">
            <img src={slider2} alt="Lobby" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="h-40 sm:h-48 overflow-hidden rounded-2xl shadow">
            <img src={slider3} alt="Suite" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="col-span-2 h-44 sm:h-56 overflow-hidden rounded-2xl shadow">
            <img src={slider4} alt="Pool" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        {/* Booking Card (form unchanged) */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur rounded-3xl shadow-xl ring-1 ring-gray-900/5 p-6 sm:p-8 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Book Your Stay</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-emerald-600">${formData.total_amount}</p>
            </div>
          </div>

          {/* Hotel & Room Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  Select Hotel
                </span>
              </label>
              <select
                name="hotel"
                value={formData.hotel}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none px-4 py-3 transition-colors bg-white"
                required
              >
                <option value="">Choose a hotel</option>
                <option value="1">Grand Palace Hotel</option>
                <option value="2">Ocean View Resort</option>
                <option value="3">Mountain Lodge</option>
                <option value="4">City Center Hotel</option>
                <option value="5">Beachfront Villa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-6 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2M3 7h18"/>
                  </svg>
                  Select Room
                </span>
              </label>
              <select
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none px-4 py-3 transition-colors bg-white"
                required
              >
                <option value="">Choose a room</option>
                <option value="1">Deluxe Suite</option>
                <option value="2">Ocean View Room</option>
                <option value="3">Standard Room</option>
                <option value="4">Presidential Suite</option>
                <option value="5">Garden Villa</option>
              </select>
            </div>
          </div>

      {/* Dates & Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5A2 2 0 003 7v12a2 2 0 002 2z"/>
              </svg>
              Check In
            </span>
          </label>
          <input
            type="date"
            name="check_in"
            value={formData.check_in}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none px-4 py-3 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5A2 2 0 003 7v12a2 2 0 002 2z"/>
              </svg>
              Check Out
            </span>
          </label>
          <input
            type="date"
            name="check_out"
            value={formData.check_out}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none px-4 py-3 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Guests
            </span>
          </label>
          <input
            type="number"
            name="number_of_guest"
            value={formData.number_of_guest}
            onChange={handleChange}
            min="1"
            className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none px-4 py-3 transition-colors"
            required
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Address
              </span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none px-4 py-3 transition-colors resize-none"
              placeholder="Enter your full address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Phone Number
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none px-4 py-3 transition-colors"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Upload Booking Document (Optional)
            </span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-emerald-400 transition-colors">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                  <span>Upload a file</span>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              {formData.image && (
                <p className="text-sm text-emerald-600 font-medium">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Total Amount Display */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.79-3 4s1.343 4 3 4 3-1.79 3-4-1.343-4-3-4z"/>
          </svg>
          Booking Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base price per night</span>
            <span className="font-medium">$150</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Number of guests</span>
            <span className="font-medium">{formData.number_of_guest}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Nights</span>
            <span className="font-medium">
              {formData.check_in && formData.check_out 
                ? Math.ceil((new Date(formData.check_out) - new Date(formData.check_in)) / (1000 * 60 * 60 * 24))
                : 0
              }
            </span>
          </div>
          <div className="border-t border-emerald-200 pt-2">
            <div className="flex justify-between text-lg font-bold text-emerald-600">
              <span>Total Amount</span>
              <span>${formData.total_amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 space-y-4 shadow-inner border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
          Payment Details
        </h3>

        {/* Payment Status */}
        <div
          className={`rounded-xl border px-4 py-2 font-medium text-center ${statusColors[formData.payment_status]}`}
        >
          {formData.payment_status === "pending" && "🟡 Pending"}
          {formData.payment_status === "paid" && "🟢 Paid"}
          {formData.payment_status === "failed" && "🔴 Failed"}
        </div>

        {/* Payment Method */}
        {formData.payment_status === "pending" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                Select Payment Method
              </span>
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors bg-white"
            >
              <option value="card">💳 Credit/Debit Card</option>
              <option value="upi">📱 UPI</option>
              <option value="wallet">💰 Wallet</option>
              <option value="cod">💵 Cash on Delivery</option>
            </select>
          </div>
        )}

        {/* Pay Now Button */}
        {formData.payment_status === "pending" && (
          <button
            type="button"
            onClick={handlePayment}
            disabled={isPaying}
            className={`w-full py-4 rounded-xl shadow-lg transition-all duration-200 font-semibold ${
              isPaying
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isPaying ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                Pay Now
              </span>
            )}
          </button>
        )}
      </div>

      {/* Submit Booking */}
      <button
        type="submit"
        disabled={formData.payment_status !== "paid"} // ✅ prevent booking without payment
        className={`w-full py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
          formData.payment_status === "paid"
            ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl transform hover:-translate-y-0.5"
            : "bg-gray-400 cursor-not-allowed text-gray-200"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {formData.payment_status === "paid" ? "Confirm Booking" : "Complete Payment First"}
        </span>
      </button>
    </form>
      </div>

      {/* Benefits strip */}
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
