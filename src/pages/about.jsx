import React from 'react'
import { Link, Links } from 'react-router-dom'

export const About = () => {
  return (
    <div className='bg-gradient-to-br from-slate-50 via-white to-emerald-50/30'>
      {/* Hero */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 opacity-30' style={{
          backgroundImage: `radial-gradient(1200px 600px at -10% -10%, rgba(16,185,129,0.15), transparent 50%), radial-gradient(800px 400px at 110% 10%, rgba(16,185,129,0.12), transparent 40%)`
        }}></div>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative'>
          <div className='text-center'>
            <span className='inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200'>
              Your trusted partner for memorable stays
            </span>
            <h1 className='mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'>
              Book Premium Hotels & Rooms
              <span className='block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'>
                with Confidence & Comfort
              </span>
            </h1>
            <p className='mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-600'>
              We curate exceptional stays across the globe—bringing you handpicked hotels, seamless booking, and 24/7 support for worry-free travel.
            </p>
            <div className='mt-8 flex items-center justify-center gap-4'>
            <Link to='hotelpage'> <a className='rounded-xl bg-emerald-600 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow hover:bg-emerald-700 transition'>
                Explore Hotels
              </a></Link>
              <a href='/category' className='rounded-xl border border-emerald-200 bg-white/70 px-5 py-3 text-sm sm:text-base font-semibold text-emerald-700 hover:bg-emerald-50 transition'>
                Browse Categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'>
              <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 7l9-4 9 4-9 4-9-4zm0 6l9 4 9-4' />
              </svg>
            </div>
            <h3 className='mt-4 text-lg font-semibold text-gray-900'>Handpicked Premium Stays</h3>
            <p className='mt-2 text-sm text-gray-600'>
              Only verified hotels and rooms that meet our quality standards for comfort, design, and service.
            </p>
          </div>
          <div className='group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'>
              <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 1.79-3 4s1.343 4 3 4 3-1.79 3-4-1.343-4-3-4z' />
              </svg>
            </div>
            <h3 className='mt-4 text-lg font-semibold text-gray-900'>Best Price Guarantee</h3>
            <p className='mt-2 text-sm text-gray-600'>
              Transparent pricing with exclusive deals—what you see is what you pay. No hidden fees.
            </p>
          </div>
          <div className='group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'>
              <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5h18M8 5v14m8-14v14M5 19h14' />
              </svg>
            </div>
            <h3 className='mt-4 text-lg font-semibold text-gray-900'>Seamless Booking</h3>
            <p className='mt-2 text-sm text-gray-600'>
              Fast, secure, and intuitive booking flow with instant confirmations and flexible options.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12'>
        <div className='grid grid-cols-2 gap-4 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:grid-cols-4'>
          <div className='text-center'>
            <p className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>2K+</p>
            <p className='mt-1 text-xs sm:text-sm text-gray-500'>Curated Hotels</p>
          </div>
          <div className='text-center'>
            <p className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>50+</p>
            <p className='mt-1 text-xs sm:text-sm text-gray-500'>Cities Covered</p>
          </div>
          <div className='text-center'>
            <p className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>98%</p>
            <p className='mt-1 text-xs sm:text-sm text-gray-500'>Happy Travelers</p>
          </div>
          <div className='text-center'>
            <p className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>24/7</p>
            <p className='mt-1 text-xs sm:text-sm text-gray-500'>Customer Support</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
          <div className='rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm'>
            <h4 className='text-sm font-semibold text-emerald-700'>Step 1</h4>
            <h3 className='mt-1 text-lg font-bold text-gray-900'>Discover</h3>
            <p className='mt-2 text-sm text-gray-600'>Browse curated hotels and rooms tailored to your taste, location, and budget.</p>
          </div>
          <div className='rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm'>
            <h4 className='text-sm font-semibold text-emerald-700'>Step 2</h4>
            <h3 className='mt-1 text-lg font-bold text-gray-900'>Select</h3>
            <p className='mt-2 text-sm text-gray-600'>Compare amenities, pricing, and ratings to find your perfect stay.</p>
          </div>
          <div className='rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm'>
            <h4 className='text-sm font-semibold text-emerald-700'>Step 3</h4>
            <h3 className='mt-1 text-lg font-bold text-gray-900'>Book</h3>
            <p className='mt-2 text-sm text-gray-600'>Confirm instantly and manage your bookings with ease, anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24'>
        <div className='relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-500 to-green-500 p-6 sm:p-10 text-center text-white shadow'>
          <div className='absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl'></div>
          <div className='absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl'></div>
          <h3 className='text-2xl sm:text-3xl font-extrabold tracking-tight'>Ready to find your next stay?</h3>
          <p className='mt-2 text-sm sm:text-base text-emerald-50'>Discover premium hotels and book with confidence today.</p>
          <div className='mt-6'>
            <Link to='hotelpage'><a href='/hotels' className='inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-700 shadow hover:bg-emerald-50 transition'>
              Explore Hotels
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </a></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
