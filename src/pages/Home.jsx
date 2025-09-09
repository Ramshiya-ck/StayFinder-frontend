import React, { useEffect, useMemo, useRef, useState } from 'react'
import slider1 from '/images/slider1.png'
import slider2 from '/images/slider2.jpeg'
import slider3 from '/images/slider3.jpg'
import slider4 from '/images/slider4.png'

export const Home = () => {
  const slides = useMemo(() => ([
    { src: slider1, alt: 'Beachfront suite - sunrise view' },
    { src: slider2, alt: 'City skyline hotel room - night' },
    { src: slider3, alt: 'Mountain resort - premium room' },
    { src: slider4, alt: 'Modern boutique hotel - lobby' }
  ]), [])

  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)

  useEffect(() => {
    startAuto()
    return stopAuto
  }, [])

  const startAuto = () => {
    stopAuto()
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
  }

  const stopAuto = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const goTo = (i) => {
    setIndex((i + slides.length) % slides.length)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  const onTouchStart = (e) => {
    stopAuto()
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }

  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }

  const onTouchEnd = () => {
    const threshold = 50
    if (touchDeltaX.current > threshold) prev()
    else if (touchDeltaX.current < -threshold) next()
    startAuto()
  }

  return (
    <div className='mx-auto w-[95%] mt-10'>
      <div
        className='relative overflow-hidden rounded-2xl border border-white/20 bg-gray-100 shadow-xl ring-1 ring-black/5'
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides */}
        <div
          className='flex transition-transform duration-700 ease-out'
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className='relative min-w-full'>
              <img
                src={s.src}
                alt={s.alt}
                className='h-56 w-full object-cover sm:h-72 md:h-96 lg:h-[32rem]'
                draggable='false'
              />
              {/* Premium overlay */}
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent' />
              <div className='pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4 sm:p-6'>
                <div className='max-w-[70%]'>
                  <div className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm ring-1 ring-black/5 backdrop-blur'>
                    <span className='inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-green-500 text-white'>
                      <svg width='10' height='10' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M20 7L9 18l-5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                      </svg>
                    </span>
                    Handpicked premium stays
                  </div>
                  <p className='mt-2 text-sm font-medium text-white drop-shadow sm:text-base'>
                    {s.alt}
                  </p>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        

        {/* Dots */}
        <div className='absolute inset-x-0 bottom-2 flex items-center justify-center gap-2 sm:bottom-4'>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-emerald-500' : 'w-2.5 bg-white/70'} shadow ring-1 ring-black/5`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
