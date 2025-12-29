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

    const [profileId, setProfileId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    // You will need to get the token from local storage or context
    const token = localStorage.getItem("token") || localStorage.getItem("access");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosinstance.get('customer/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.data.data && response.data.data.length > 0) {
                    //   Assuming your API returns an array, we take the first object
                    const profile = response.data.data[0];
                    setProfileId(profile.id);
                    // Construct full URL for profile image if it's a relative path
                    if (profile.profile_image && !profile.profile_image.startsWith('http')) {
                        profile.profile_image = `http://127.0.0.1:8000${profile.profile_image}`;
                    }
                    setProfileData(profile);
                } else {
                    // No profile exists, set loading to false
                    setError("No profile found. Please create one.");
                }
                setIsLoading(false);
                console.log(response)
            } catch (error) {
                console.error(error);
                setError("Failed to load profile. Please try again.");
                setIsLoading(false);
            }
        };
        if (token) {
            fetchProfile();
        } else {
            setError("Please login to view your profile");
            setIsLoading(false);
        }
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
      
          // Clear all tokens from localStorage
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("token");
      
          navigate("/login");
        } catch (error) {
          console.log(error);
          // Even if logout API fails, clear local storage and redirect
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("token");
          navigate("/login");
        }
      };



    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        // Handle file inputs differently
        if (name === 'profile_image' && files && files[0]) {
            const file = files[0];
            
            // Create a preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            
            setProfileData((prevData) => ({
                ...prevData,
                [name]: previewUrl, // Show preview
                fileObject: file    // Store actual file for upload
            }));
        } else {
            // Handle regular text inputs
            setProfileData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            
            // Append text fields
            Object.keys(profileData).forEach(key => {
                if (key !== 'profile_image' && key !== 'fileObject' && key !== 'id' && key !== 'customer_email' && key !== 'customer_name' && key !== 'is_default') {
                    formData.append(key, profileData[key]);
                }
            });
            
            // Append file if exists
            if (profileData.fileObject) {
                formData.append('profile_image', profileData.fileObject);
            }
            
            let response;
            if (profileId) {
                // Update existing profile
                response = await axiosinstance.put(
                    `customer/profile/${profileId}/update/`, 
                    formData,
                    {
                        headers: { 
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                // Create new profile
                response = await axiosinstance.post(
                    'customer/profile/create/', 
                    formData,
                    {
                        headers: { 
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data.data && response.data.data.id) {
                    setProfileId(response.data.data.id);
                }
            }
            
            console.log("Profile saved:", response.data);
            alert("Profile saved successfully!");
            // Reload profile data
            window.location.reload();
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile. Please check the console for details.");
        }
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
                                accept="image/*"
                                className="hidden"
                                onChange={handleChange}
                            />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">Click to select a profile image</p>
                    </div>

                    {/* Form Fields Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Name - Read Only */}
                        <div>
                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Customer Name</label>
                            <input
                                type="text"
                                name="customer_name"
                                id="customer_name"
                                value={profileData.customer_name || profileData.customer || ""}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
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
                </form>

                {/* Logout Button - Outside form */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;