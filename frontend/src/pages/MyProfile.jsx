import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { token, userData, setUserData, getUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("address", userData.address);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/user/update-profile",
        formData,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(date)
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "-");
  };

  return (
    <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      {/* Profile Picture and Name */}
      <div className="flex items-center space-x-4">
        <img
          src={imageFile ? URL.createObjectURL(imageFile) : userData.image} // Show the new selected image in preview
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div className="flex-1">
          {isEdit ? (
            <>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mt-2"
              />
            </>
          ) : (
            <p className="text-xl font-semibold">{userData.name}</p>
          )}
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Contact Information */}
      <div>
        <p className="text-lg font-semibold mb-4">Contact Information</p>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Email ID:</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div>
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Basic Information */}
      <div>
        <p className="text-lg font-semibold mb-4">Basic Information</p>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob ? userData.dob.split("T")[0] : ""}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              />
            ) : (
              <p>{formatDate(userData.dob)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Save/Edit Button */}
      <div className="text-center">
        {isEdit ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Edit Information
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
