import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openPrescription = (appointment) => {
    setSelectedPrescription(appointment.prescription);
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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments booked yet.</p>
      ) : (
        <div className="grid gap-8">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 transition-transform hover:scale-105"
            >
              {/* Doctor's Image */}
              {/* Doctor's Image and Name */}
              <div className="flex flex-col items-center">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 bg-blue-400"
                />
                <p className="mt-2 text-lg font-semibold text-blue-500 text-center">
                  {item.docData.name}
                </p>
              </div>

              {/* Doctor's Details */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-gray-500">{item.speciality}</p>
                    <p className="text-gray-600 mt-1">
                    <span className="font-semibold">Address: </span> {item.docData.address}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <p className="text-gray-600">
                      <span className="font-semibold">Date & Time: </span>
                      {formatDate(item.slotDate)} | {item.slotTime}
                    </p>
                  </div>
                </div>

                {/* Appointment Status */}
                <div className="mt-4 flex items-center space-x-2">
                  {item.cancelled ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                {!item.cancelled && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition">
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
                    >
                      Cancel Appointment
                    </button>
                    <button
                      onClick={() => openPrescription(item)}
                      className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition"
                    >
                      Get Prescription
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm backdrop-brightness-90 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Doctor's Prescription
            </h2>
            <div className="text-gray-700 whitespace-pre-line text-center min-h-[100px]">
              {selectedPrescription ? (
                selectedPrescription
              ) : (
                <p className="text-gray-500">No prescription provided yet.</p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => console.log("Get Insights Clicked")}
                className="mt-6 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition w-full max-w-xs"
              >
                Get Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
