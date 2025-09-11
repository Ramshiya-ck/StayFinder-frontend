import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log('Login form data:', data)
        // Example: send to API
        // axios.post('/api/login', data).then(...)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm 
                         focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
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
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm 
                         focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium 
                       shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 
                       focus:ring-emerald-500 focus:ring-offset-1"
                    >
                        Login
                    </button>
                </form>

                {/* Extra Links */}
                <Link to='/register'>        <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <a className="text-emerald-600 hover:underline font-medium">
                        Register
                    </a>
                </p></Link>
            </div>
        </div>
    )
}
