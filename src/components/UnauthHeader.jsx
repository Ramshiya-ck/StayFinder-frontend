import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const UnauthHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="group flex items-center gap-2">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-green-600 to-lime-500 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-white/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
        

          {/* Book Now */}
          <a
            href="#book"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:shadow-emerald-500/30 md:inline-flex"
          >
            Book now
          </a>

          {/* Join Us (instead of Profile) */}
          <Link
            to="/register"
            className="hidden rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 md:inline-flex"
          >
            Join Us
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm ring-1 ring-black/5 transition hover:text-gray-900 md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
