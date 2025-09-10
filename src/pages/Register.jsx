import React from 'react'
import { useForm } from 'react-hook-form'

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log('Register form data:', data)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              {...register('first_name', { required: 'First name is required' })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
            {errors.first_name && (
              <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('last_name', { required: 'Last name is required' })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
            {errors.last_name && (
              <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
