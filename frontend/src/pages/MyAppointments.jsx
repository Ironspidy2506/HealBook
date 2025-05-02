import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [disease, setDisease] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [reports, setReports] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

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

  const fetchPrescription = async (appointmentId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/prescription/get-prescription-by-appointmentId/${appointmentId}`
      );

      if (data.success) {
        const { disease, medicines, reports, additionalNotes } =
          data.prescription;
        setDisease(disease);
        setMedicines(medicines);
        setReports(reports);
        setAdditionalNotes(additionalNotes);
        setShowModal(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch prescription");
    }
  };

  const [insights, setInsights] = useState("");
  const [loadingInsights, setLoadingInsights] = useState(false);

  const getInsights = async () => {
    setLoadingInsights(true); // Start loading
    const prompt = `
A patient has the following prescription:
- Disease: ${disease}
- Medicines: ${medicines
      .map(
        (m) =>
          `${m.name} (${m.dosage}, ${m.frequency.join(", ")}, for ${
            m.duration
          })`
      )
      .join(", ")}
- Reports: ${reports.join(", ")}
- Notes: ${additionalNotes}

Provide ONLY the following suggestions with 1 line explanations for each point except Alternate Medicines, also write the dosage, frequency and duration for the alternate medicines and NO disclaimers:

Alternate Medicines:  
1.  
2.

Precautions:  
1.  
2.

Medications Advice:  
1.  
2.

Workouts:  
1.  
2.

Diet Recommendations:  
1.  
2.
`;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/ai/get-insights",
        {
          prompt,
        },
        {
          headers: { token },
        }
      );

      if (data.success) {
        setInsights(data.insights);
        toast.success("Insights generated!");
      } else {
        toast.error("Failed to get insights.");
      }
    } catch (err) {
      toast.error("Error getting insights.");
      console.error(err);
    } finally {
      setLoadingInsights(false); // Stop loading
    }
  };

  const saveInsights = () => {
    if (insights) {
      localStorage.setItem("savedInsights", insights); // Save to localStorage or you can use an API
      toast.success("Insights saved successfully!");
    } else {
      toast.error("No insights to save.");
    }
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
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 bg-blue-400"
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
                      <span className="font-semibold">Address: </span>{" "}
                      {item.docData.address}
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
                      onClick={() => fetchPrescription(item._id)}
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-[90%] max-w-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-gray-800 text-3xl"
            >
              &times;
            </button>

            {/* Header */}
            <div className="flex justify-center items-center">
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 pb-0 inline-block border-b-2 border-blue-600">
                Doctor's Prescription
              </h2>
            </div>

            {/* Prescription Content */}
            <div className="text-gray-700 space-y-6">
              {/* Disease */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Disease</h3>
                <p className="text-gray-600 mt-1">
                  {disease || "Not specified"}
                </p>
              </div>

              {/* Medicines */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Medicines
                </h3>
                {medicines.length > 0 ? (
                  <ul className="space-y-2 mt-2">
                    {medicines.map((med, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                      >
                        <p>
                          <strong>Name:</strong> {med.name}
                        </p>
                        <p>
                          <strong>Dosage:</strong> {med.dosage}
                        </p>
                        <p>
                          <strong>Frequency:</strong> {med.frequency.join(", ")}
                        </p>
                        <p>
                          <strong>Duration:</strong> {med.duration}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-1">No medicines listed.</p>
                )}
              </div>

              {/* Reports */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Reports</h3>
                {reports.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600 mt-1">
                    {reports.map((report, index) => (
                      <li key={index}>{report}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-1">No reports available.</p>
                )}
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Additional Notes
                </h3>

                {additionalNotes ? (
                  <p className="text-gray-600 mt-1">{additionalNotes}</p>
                ) : (
                  <p className="text-gray-500 mt-1">
                    No additional notes available.
                  </p>
                )}
              </div>
            </div>

            {/* Footer Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={getInsights}
                disabled={loadingInsights}
                className={`px-6 py-3 rounded-xl font-medium shadow-md transition ${
                  loadingInsights
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {loadingInsights ? "Loading Insights..." : "Get Insights"}
              </button>
            </div>

            {/* AI Insights or Loader */}
            <div className="mt-8">
              {loadingInsights ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-6 w-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <p className="ml-3 text-blue-600 font-medium">
                    Generating insights...
                  </p>
                </div>
              ) : (
                insights && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      AI Insights
                    </h3>
                    <p className="text-gray-600 mt-1 whitespace-pre-line">
                      {insights}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Save Insights Button */}

            {insights && (
              <div className="mt-6 flex justify-center items-center">
                <button
                  onClick={saveInsights}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                  Save Insights
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
