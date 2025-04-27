import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";

const DoctorAppointments = () => {
  const {
    dtoken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, formatDate } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="min-h-screen px-4 py-8 ">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          All Appointments
        </h1>

        {/* Titles */}
        <div className="hidden sm:grid grid-cols-7 gap-4 text-gray-600 font-medium text-md mb-4 text-center">
          <div>S.No.</div>
          <div>Patient</div>
          <div>Age</div>
          <div>Details</div>
          <div>Payment</div>
          <div>Fees</div>
          <div>Actions</div>
        </div>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:grid sm:grid-cols-7 gap-2 items-center bg-gray-50 py-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                {/* Index */}
                <div className="text-blue-500 font-bold">{index + 1}</div>

                {/* Patient Info */}
                <div className="flex items-center justify-center sm:justify-start sm:flex-col">
                  <img
                    src={item.userData.image || "path/to/default-image.jpg"}
                    alt={item.userData.name || "Unknown"}
                    className="w-12 h-12 rounded-full object-cover mb-2"
                  />
                  <p className="font-semibold text-gray-800">
                    {item.userData.name || "Unknown Patient"}
                  </p>
                </div>

                {/* Age */}
                <div className="text-gray-800 font-semibold flex justify-center items-center">
                  <p className="xs:block sm:hidden md:hidden lg:hidden mr-1">
                    Age:
                  </p>
                  <span>{calculateAge(item.userData.dob)}</span>
                </div>

                {/* Appointment Info */}
                <div>
                  <p className="text-md text-gray-500">
                    {formatDate(item.slotDate)}
                  </p>
                  <p className="text-md text-gray-500"> {item.slotTime}</p>
                </div>

                {/* Payment Method */}
                <div className="font-semibold text-gray-700">
                  {item.payment ? "Online Payment" : "Cash Payment"}
                </div>

                {/* Fee */}
                <div className="text-blue-500 font-bold">${item.amount}</div>

                {/* Actions */}
                <div className="flex flex-row justify-center items-center">
                  {item.isCompleted ? (
                    <span className="text-green-600 font-semibold">
                      Completed
                    </span>
                  ) : item.cancelled ? (
                    <span className="text-red-600 font-semibold">
                      Cancelled
                    </span>
                  ) : (
                    <>
                      <img
                        src={assets.tick_icon}
                        onClick={() => completeAppointment(item._id)}
                        alt="Approve"
                        className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
                      />
                      <img
                        src={assets.cancel_icon}
                        onClick={() => cancelAppointment(item._id)}
                        alt="Cancel"
                        className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
