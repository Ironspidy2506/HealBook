import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dtoken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  const updateProfile = async () => {
    try {
      const updatedProfile = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available,
      };

      const { data } = await axios.post(
        "https://heal-book-backend.vercel.app/api/doctor/update-profile",
        updatedProfile,
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getProfileData();
        setEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => {
      const updatedData = { ...prev };

      if (field.includes("address.")) {
        const [_, subField] = field.split(".");
        updatedData.address = { ...updatedData.address, [subField]: value };
      } else {
        updatedData[field] = value;
      }

      return updatedData;
    });
  };

  return (
    profileData && (
      <div className="px-4 py-8">
        <h1 className="text-center text-blue-500 text-2xl mb-2 font-bold">
          My Profile
        </h1>
        <div className="max-w-full mx-auto bg-white p-6 shadow-lg rounded-lg">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="text-center sm:text-left">
              <p className="text-3xl font-bold text-gray-800">
                {profileData.name}
              </p>
              <p className="text-gray-600 mt-1">
                {profileData.degree} - {profileData.speciality}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {profileData.experience} years of experience
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <p className="font-semibold text-gray-700">About:</p>
            <p className="text-gray-600 mt-2">
              {profileData.about || "No details provided."}
            </p>
          </div>

          {/* Editable Fields */}
          <div className="mb-6">
            {editing ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Appointment Fee:
                  </label>
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) => handleChange("fees", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Availability:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profileData.available}
                      onChange={(e) =>
                        handleChange("available", e.target.checked)
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-gray-600">Available</span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Address Line 1:
                  </label>
                  <input
                    type="text"
                    value={profileData.address?.line1 || ""}
                    onChange={(e) =>
                      handleChange("address.line1", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Address Line 2:
                  </label>
                  <input
                    type="text"
                    value={profileData.address?.line2 || ""}
                    onChange={(e) =>
                      handleChange("address.line2", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-blue-500"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">
                    Appointment Fee:
                  </p>
                  <p className="text-gray-600">${profileData.fees}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">Availability:</p>
                  <p
                    className={`${
                      profileData.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {profileData.available ? "Available" : "Unavailable"}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">Address:</p>
                  <p className="text-gray-600">
                    {profileData.address?.line1 || ""}
                    <br />
                    {profileData.address?.line2 || ""}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {editing ? (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateProfile()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Information
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit Information
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
