import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";

const AllAppointments = () => {
  const { atoken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, formatDate } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className="max-w-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-blue-500 text-center mb-6">
        All Appointments
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="table w-full">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 bg-gray-200 py-2 px-4 rounded-t-lg">
            <p className="font-bold text-center text-gray-600">S.No.</p>
            <p className="font-bold text-center text-gray-600">Patient</p>
            <p className="font-bold text-center text-gray-600">Age</p>
            <p className="font-bold text-center text-gray-600">Date & Time</p>
            <p className="font-bold text-center text-gray-600">Doctor</p>
            <p className="font-bold text-center text-gray-600">Fees</p>
            <p className="font-bold text-center text-gray-600">Actions</p>
          </div>

          {/* Table Data */}
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 py-4 px-4 border-b border-gray-300 hover:bg-gray-100"
            >
              <p className="flex items-center justify-center text-gray-700">
                {index + 1}
              </p>

              <div className="flex space-x-2">
                <div className="hidden xl:block">
                  <img
                    src={item.userData.image}
                    alt="patient"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <p className="flex items-center justify-center text-gray-700">
                  {item.userData.name}
                </p>
              </div>

              <p className="flex items-center justify-center text-gray-700">
                {calculateAge(item.userData.dob)}
              </p>

              <p className="flex items-center justify-center text-gray-700">
                {formatDate(item.slotDate)}, {item.slotTime}
              </p>

              <div className="flex  space-x-2">
                <div className="hidden xl:block">
                  <img
                    src={item.docData.image}
                    alt="doctor"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <p className="flex items-center justify-center text-gray-700">
                  {item.docData.name}
                </p>
              </div>

              <p className="flex items-center justify-center text-blue-500 font-semibold py-1 px-2 rounded-md">
                ${item.amount}
              </p>

              <div className="flex justify-center items-center space-x-2">
                {item.cancelled ? (
                  <p className="text-red-500 text-center font-semibold">
                    Cancelled
                  </p>
                ) : (
                  <img
                    src={assets.cancel_icon}
                    alt="cancel"
                    className="w-10 h-10 cursor-pointer"
                    onClick={() => cancelAppointment(item._id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
