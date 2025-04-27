import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]); // Properly initialize state
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openPrescription = (appointment) => {
    setSelectedPrescription(appointment.prescription); // Assuming prescription is in the appointment
    setShowModal(true);
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/appointments`,
        {
          headers: { token },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, cancelled: true }
              : appointment
          )
        );
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    );

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = monthNames[date.getMonth()];
    const formattedYear = date.getFullYear();

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        My Appointments
      </h1>

      {/* Check if there are appointments */}
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments booked yet.</p>
      ) : (
        <div className="grid gap-6">
          {appointments.slice(0).map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 transition-transform hover:scale-105"
            >
              {/* Doctor's Image */}
              <div>
                <img
                  src={item.docData.image}
                  alt={`${item.name}`}
                  className="w-36 h-36 rounded-full border-2 border-gray-300 bg-blue-400"
                />
              </div>

              {/* Doctor's Details */}
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-gray-600 mb-2">{item.speciality}</p>
                <p className="font-medium text-gray-700">Address:</p>
                <p className="text-gray-700 font-medium">
                  <span>Date & Time: </span>
                  <span className="font-normal text-gray-600">
                    {formatDate(item.slotDate)} | {item.slotTime}
                  </span>
                </p>
              </div>

              {/* Action Buttons or Appointment Status */}
              <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
                {item.cancelled ? (
                  <p className="text-red-500 text-lg font-bold">
                    Appointment Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-lg font-bold">
                    Appointment Completed
                  </p>
                ) : (
                  <div className="flex flex-col lg:flex-row gap-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}

                {/* Get Prescription button - always visible if appointment is not cancelled */}
                {!item.cancelled && (
                  <button
                    className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                    onClick={() => openPrescription(item)}
                  >
                    Get Prescription
                  </button>
                )}

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm backdrop-brightness-80 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-lg">
                      <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                      >
                        &times;
                      </button>
                      <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">
                        Doctor's Prescription
                      </h2>
                      <div className="flex justify-center">
                        {selectedPrescription ? (
                          <p className="text-gray-700 whitespace-pre-line">
                            {selectedPrescription}
                          </p>
                        ) : (
                          <p className="text-gray-500">
                            No prescription provided yet.
                          </p>
                        )}
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => console.log("Get Insights Clicked")}
                          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 w-full max-w-xs"
                        >
                          Get Insights
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
