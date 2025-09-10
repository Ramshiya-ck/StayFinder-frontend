import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance";

export const Profile = () => {
  const [profile, setProfile] = useState({
    phone: "",
    address: "",
    nationality: "",
    id_proof: "",
    profile_image: null,
  });

  const [loading, setLoading] = useState(true);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axiosinstance.get("profile/");
      setProfile(response.data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setProfile({
      ...profile,
      profile_image: e.target.files[0],
    });
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone", profile.phone);
    formData.append("address", profile.address);
    formData.append("nationality", profile.nationality);
    formData.append("id_proof", profile.id_proof);
    if (profile.profile_image instanceof File) {
      formData.append("profile_image", profile.profile_image);
    }

    await axiosinstance.put("profile/update/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Profile updated successfully ✅");
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {profile.profile_image ? (
            <img
              src={
                profile.profile_image instanceof File
                  ? URL.createObjectURL(profile.profile_image)
                  : profile.profile_image
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-2"></div>
          )}
          <input type="file" onChange={handleFileChange} />
        </div>

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Address */}
        <textarea
          name="address"
          value={profile.address || ""}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* ID Proof */}
        <input
          type="text"
          name="id_proof"
          value={profile.id_proof || ""}
          onChange={handleChange}
          placeholder="ID Proof (Passport / Aadhaar / etc.)"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Nationality */}
        <input
          type="text"
          name="nationality"
          value={profile.nationality || ""}
          onChange={handleChange}
          placeholder="Nationality"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
