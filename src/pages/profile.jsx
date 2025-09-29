import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [profileData, setProfileData] = useState({
        customer: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        profile_image: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    // You will need to get the token from local storage or context
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosinstance.get('customer/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                //   headers: {
                //     Authorization: `Bearer ${token}`,
                //   },
                // });
                if (response.data.data && response.data.data.length > 0) {
                    //   Assuming your API returns an array, we take the first object
                    setProfileData(response.data.data[0]);
                }
                setIsLoading(false);
                console.log(response)
            } catch (error) {

                console.error(error);
            }
        };
        fetchProfile();
    }, [token]);
    const handleLogout = async () => {
        try {
          const refresh = localStorage.getItem("refresh");
          const access = localStorage.getItem("access");
      
          await axiosinstance.post(
            "customer/logout/",
            { refresh }, // request body
            {
              headers: {
                Authorization: `Bearer ${access}`, // 👈 goes inside config
              },
            }
          );
      
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
      
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      };



    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // You would add your API call here to update the profile data
        console.log("Profile data submitted:", profileData);
        // Example: axiosinstance.put('/profile/update', profileData, { headers: { Authorization: `Bearer ${token}` }})
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h2>

                <form onSubmit={handleSubmit}>
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500">
                            {profileData.profile_image ? (
                                <img
                                    src={profileData.profile_image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">
                                    No Image
                                </div>
                            )}
                        </div>
                        <label className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-full cursor-pointer hover:bg-emerald-600 transition">
                            Upload Photo
                            <input
                                type="file"
                                name="profile_image"
                                className="hidden"
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {/* Form Fields Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Name */}
                        <div>
                            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer Name</label>
                            <input
                                type="text"
                                name="customer"
                                id="customer"
                                value={profileData.customer}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={profileData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={profileData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={profileData.city}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                value={profileData.country}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            Update Profile
                        </button>

                    </div>
                    <div>              
                        <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button></div>
                </form>
            </div>
        </div>
    );
};

export default Profile;