import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { axiosinstance } from '../config/axiosinstance'
import background from '/images/background.jpeg'

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axiosinstance.post("customer/register/", data)
      const tokenreg = response.data.data.access
      localStorage.setItem("token", tokenreg)
      console.log(tokenreg)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md 
        bg-white/20 backdrop-blur-lg border border-white/30 
        rounded-2xl shadow-xl p-6 sm:p-8">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow">
          Register ✨
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-white/90">First Name</label>
            <input
              type="text"
              {...register('first_name', { required: 'First name is required' })}
              className="mt-1 block w-full rounded-lg border border-white/30 
              bg-white/10 px-3 py-2 text-white placeholder-gray-300 shadow-sm 
              focus:border-emerald-300 focus:ring-emerald-300 sm:text-sm"
              placeholder="John"
            />
            {errors.first_name && (
              <p className="text-sm text-red-300 mt-1">{errors.first_name.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-white/90">Last Name</label>
            <input
              type="text"
              {...register('last_name', { required: 'Last name is required' })}
              className="mt-1 block w-full rounded-lg border border-white/30 
              bg-white/10 px-3 py-2 text-white placeholder-gray-300 shadow-sm 
              focus:border-emerald-300 focus:ring-emerald-300 sm:text-sm"
              placeholder="Doe"
            />
            {errors.last_name && (
              <p className="text-sm text-red-300 mt-1">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/90">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full rounded-lg border border-white/30 
              bg-white/10 px-3 py-2 text-white placeholder-gray-300 shadow-sm 
              focus:border-emerald-300 focus:ring-emerald-300 sm:text-sm"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-300 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white/90">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 4, message: 'Password must be at least 4 characters' }
              })}
              className="mt-1 block w-full rounded-lg border border-white/30 
              bg-white/10 px-3 py-2 text-white placeholder-gray-300 shadow-sm 
              focus:border-emerald-300 focus:ring-emerald-300 sm:text-sm"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-300 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white font-semibold 
            shadow-lg hover:bg-emerald-500 hover:scale-105 transition-transform duration-200 
            focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
          >
            Register
          </button>

          {/* Link */}
          <p className="mt-4 text-center text-sm text-white/80">
            Already have an account?{' '}
            <Link to='/login' className="text-emerald-200 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
