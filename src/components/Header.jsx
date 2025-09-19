import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="group flex items-center gap-2">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-green-600 to-lime-500 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-white/20">
              {/* Key icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M14.5 5.5a4.5 4.5 0 1 0-3.247 7.561l.247.219V15h2v2h2v2h2v-2.586a2 2 0 0 0-.586-1.414l-3.17-3.17.106-.122A4.48 4.48 0 0 0 14.5 5.5Z" fill="currentColor"/>
              </svg>
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight text-gray-900">StayFinder</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Premium Stays</span>
            </div>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-gray-700 transition hover:text-gray-900">Home</Link>
          <a href="#rooms" className="text-sm text-gray-700 transition hover:text-gray-900">Gallery</a>
          <a href="#hotel" className="text-sm text-gray-700 transition hover:text-gray-900">Hotel</a>
          <a href="#contact" className="text-sm text-gray-700 transition hover:text-gray-900">Contact</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search */}
          <div className="hidden items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-black/5 transition focus-within:ring-2 focus-within:ring-emerald-600 md:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            <input
              type="text"
              placeholder="Search rooms, cities..."
              className="ml-2 w-48 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          {/* Call to book */}
          <a
            href="#book"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:shadow-emerald-500/30 md:inline-flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.09 1h2a2 2 0 0 1 2 1.72c.12.9.32 1.78.59 2.63a2 2 0 0 1-.45 2.11L7.1 8.91a16 16 0 0 0 6 6l1.45-1.1a2 2 0 0 1 2.11-.45c.85.27 1.73.47 2.63.59A2 2 0 0 1 22 16.92Z" fill="currentColor"/>
            </svg>
            Book now
          </a>

          {/* Profile */}

          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm ring-1 ring-black/5 transition hover:text-gray-900 md:inline-flex"
            aria-label="User"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14Z" fill="currentColor"/>
            </svg>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm ring-1 ring-black/5 transition hover:text-gray-900 md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white/90 px-4 pb-6 pt-2 shadow-lg md:hidden">
          <div className="mt-2 grid gap-1">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between rounded-md px-2 py-3 text-gray-800 hover:bg-gray-50">
              <span>Home</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="#rooms" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between rounded-md px-2 py-3 text-gray-800 hover:bg-gray-50">
              <span>Rooms</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a  onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between rounded-md px-2 py-3 text-gray-800 hover:bg-gray-50">
              <span>Hotel</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between rounded-md px-2 py-3 text-gray-800 hover:bg-gray-50">
              <span>Contact</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500">
                <path d="M12 2l2.9 6.2L22 9.3l-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2 2 9.3l7.1-1.1L12 2z" fill="currentColor"/>
              </svg>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Exclusive Concierge</p>
                <p className="text-xs text-gray-500">24/7 support for premium stays</p>
              </div>
            </div>
            <a href="#book" className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">Book</a>
          </div>
        </div>
      )}
    </header>
  )
}
