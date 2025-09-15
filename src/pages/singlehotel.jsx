import React, { useEffect, useState } from 'react'
import { axiosinstance } from '../config/axiosinstance'
import { Link, useParams } from 'react-router-dom'

export const Singlehotel = () => {
    const [singlehotel, setSinglehotel] = useState('')
    const { id } = useParams()
    const token = localStorage.getItem("token")
    console.log(singlehotel.image)

    useEffect(() => {
        const getSingleHotel = async () => {
            try {
                const response = await axiosinstance.get(`hotel/single/hotel/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                setSinglehotel(response.data.data.hotel)
            } catch (error) {
                console.log(error)
            }
        }
        getSingleHotel()
    }, [])



    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Hotel Image */}
                <div className="h-80 w-full">
                    <img
                        src={singlehotel?.image}
                        alt="Hotel"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Hotel Content */}
                <div className="p-6 space-y-4">
                    {/* Title + Price */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800">{singlehotel.hotal_name}</h1>
                        <span className="text-xl font-semibold text-emerald-600">$250 / night</span>
                    </div>

                    {/* Location */}
                    <p className="text-gray-500 text-sm">{singlehotel.location}</p>
                    {/* Contact & Details */}
                    <div className="space-y-2 text-gray-700 text-sm">
                        <p><span className="font-semibold">📞 Phone:</span> 871431630</p>
                        <p><span className="font-semibold">📧 Email:</span> abc@gmail.com</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                        {singlehotel.description}
                    </p>

                    {/* Amenities */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h2>
                        <ul className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                            {singlehotel.amenities &&
                                singlehotel.amenities.split(",").map((item, index) => (
                                    <li key={index}>✔ {item.trim()}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* Call to Action (no <a>, just button) */}
                    <div className="pt-4">
                    <Link to={`/room/${id}`}>
                        <button className="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 transition">
                            SEE ROOMS
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
