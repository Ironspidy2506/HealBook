import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/assets.js";

const Dashboard = () => {
  const { atoken, getDashboard, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashboard();
    }
  }, [atoken]);

  return (
    dashData && (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doctors */}
          <div className="flex items-center bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
              <img
                src={assets.doctor_icon}
                alt="Doctors"
                className="w-10 h-10"
              />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 font-medium">Doctors</p>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.doctors}
              </p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
              <img
                src={assets.patients_icon}
                alt="Patients"
                className="w-10 h-10"
              />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 font-medium">Patients</p>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.patients}
              </p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 flex items-center justify-center bg-yellow-100 rounded-full">
              <img
                src={assets.appointments_icon}
                alt="Appointments"
                className="w-10 h-10"
              />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 font-medium">Appointments</p>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.appointments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <img src={assets.list_icon} alt="" />
            <h2 className="flex justify-center items-center text-xl font-semibold text-gray-700">
              Latest Appointments
            </h2>
          </div>
          <ul className="space-y-4">
            {dashData?.latestAppointments?.length > 0 ? (
              dashData.latestAppointments.map((appointment, index) => (
                <li
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={
                        appointment.docData?.image ||
                        "path/to/default-image.jpg"
                      }
                      alt={appointment.docData?.name || "Unknown user"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-700">
                      {appointment.docData?.name || "Unknown Doctor"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.slotDate || "NA"} -{" "}
                      {appointment.slotTime || "NA"} -{" Patient Name - "}
                      {appointment.userData?.name || "Unknown User"}
                    </p>
                  </div>
                  {appointment.cancelled ? (
                    <p className="text-red-500 text-center font-semibold">
                      Cancelled
                    </p>
                  ) : (
                    <img
                      src={assets.cancel_icon}
                      alt="cancel"
                      className="w-10 h-10 cursor-pointer"
                      onClick={() => cancelAppointment(appointment._id)}
                    />
                  )}
                </li>
              ))
            ) : (
              <p>No appointments available.</p>
            )}
          </ul>
        </div>
      </div>
    )
  );
};

export default Dashboard;
