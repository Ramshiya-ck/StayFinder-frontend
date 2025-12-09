import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hotel: "",
    room: "",
    checkin: "",
    checkout: "",
    guests: 1,
    message: "",
    subscribe: false,
  });

  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // UI-only component: simulate submit
    const isValid = form.name && form.email && form.checkin && form.checkout;
    if (!isValid) {
      setStatus("error");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStatus("success");
    // reset after a short delay (purely visual)
    setTimeout(() => {
      setForm({
        name: "",
        email: "",
        phone: "",
        hotel: "",
        room: "",
        checkin: "",
        checkout: "",
        guests: 1,
        message: "",
        subscribe: false,
      });
    }, 800);
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 11.5V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 11.5v7.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 11.5v7.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold">Get in touch — Reserve your room</h1>
              <p className="text-sm text-slate-500">Premium support and fast confirmation. Tell us your dates and preferences.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-500">Need help?</div>
              <div className="font-medium">+91 91234 56789</div>
            </div>
            <button className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm shadow-md hover:bg-emerald-700 transition">Call us</button>
          </div>
        </header>

        {status === "error" && (
          <div className="mb-6 rounded-lg border border-rose-100 bg-rose-50/60 p-4 text-rose-700">Please fill in your name, email, check-in and check-out dates.</div>
        )}
        {status === "success" && (
          <div className="mb-6 rounded-lg border border-emerald-100 bg-emerald-50/60 p-4 text-emerald-800">Thanks — your request has been received. We'll contact you shortly.</div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-4">Contact & Booking Request</h2>
            <p className="text-sm text-slate-500 mb-6">Fill the form and we'll hold the room for you while we confirm availability.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Full name</span>
                  <input name="name" value={form.name} onChange={handleChange} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="e.g. Priya Sharma" />
                </label>
                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Email</span>
                  <input name="email" value={form.email} onChange={handleChange} type="email" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="you@domain.com" />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Phone</span>
                  <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="+91 9XXXXXXXXX" />
                </label>

                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Hotel</span>
                  <select name="hotel" value={form.hotel} onChange={handleChange} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                    <option value="">Select hotel (optional)</option>
                    <option value="royal_garden">Royal Garden</option>
                    <option value="sea_view">Sea View Suites</option>
                    <option value="city_center">City Center Inn</option>
                  </select>
                </label>

                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Room type</span>
                  <select name="room" value={form.room} onChange={handleChange} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                    <option value="">Preferred room (optional)</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="family">Family</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Check-in</span>
                  <input name="checkin" value={form.checkin} onChange={handleChange} type="date" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                </label>
                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Check-out</span>
                  <input name="checkout" value={form.checkout} onChange={handleChange} type="date" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                </label>
                <label className="flex flex-col">
                  <span className="text-xs text-slate-600 mb-2">Adults</span>
                  <input name="guests" value={form.guests} onChange={handleChange} type="number" min="1" max="10" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                </label>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 w-full">
                    <input name="subscribe" checked={form.subscribe} onChange={handleChange} type="checkbox" className="w-4 h-4 rounded-md accent-emerald-500" />
                    <span className="text-sm text-slate-600">Subscribe to exclusive offers</span>
                  </label>
                </div>
              </div>

              <label className="flex flex-col">
                <span className="text-xs text-slate-600 mb-2">Message</span>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Any special requests, accessibility needs, or questions?" />
              </label>

              <div className="flex items-center justify-between gap-4">
                <button type="submit" className="flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-600 text-white font-medium shadow hover:bg-emerald-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Request booking
                </button>

                <div className="text-sm text-slate-500">Or email us at <span className="text-emerald-600 font-medium">reservations@hotelprime.com</span></div>
              </div>
            </form>
          </section>

          {/* Contact card + map */}
          <aside className="bg-emerald-50/60 rounded-2xl p-6 shadow-md flex flex-col gap-6">
            <div className="rounded-xl bg-white p-4 shadow-inner">
              <h3 className="text-sm text-slate-500">Our address</h3>
              <p className="font-medium mt-2">Hotel Prime — Sea View Road</p>
              <p className="text-sm text-slate-500">Marine Drive, Kochi, Kerala</p>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-600">Get directions</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10v6a2 2 0 0 1-2 2h-1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 7v6a2 2 0 0 0 2 2h1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 21h8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-600">+91 91234 56789</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16v16H4z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6L12 13 2 6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-600">reservations@hotelprime.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm">
              {/* Placeholder map - replace with actual map iframe when integrating */}
              <div className="w-full h-44 bg-gradient-to-br from-emerald-200/40 to-white flex items-center justify-center">
                <div className="text-center text-sm text-emerald-700">
                  <div className="font-semibold">Map placeholder</div>
                  <div className="text-xs text-slate-600">Add your Google Maps iframe here</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4">
              <h4 className="text-sm text-slate-500">Opening hours</h4>
              <div className="mt-2 text-sm">
                <div className="flex justify-between"><span>Reception</span><span className="font-medium">24 / 7</span></div>
                <div className="flex justify-between"><span>Check-in</span><span className="font-medium">2:00 PM</span></div>
                <div className="flex justify-between"><span>Check-out</span><span className="font-medium">11:00 AM</span></div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500">Secure booking · No hidden fees · Flexible cancellation</div>
          </aside>
        </main>

        <footer className="mt-12 text-center text-sm text-slate-500">© {new Date().getFullYear()} Hotel Prime — Crafted with care</footer>
      </div>
    </div>
  );
}
