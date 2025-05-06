import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorAppointments = () => {
  const {
    dtoken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, formatDate } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);

  // Modal related states
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [disease, setDisease] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: [], duration: "" },
  ]);

  const [reports, setReports] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  const openPrescriptionModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(false);
    setShowModal(true);
  };

  const closePrescriptionModal = () => {
    setShowModal(false);
    setDisease("");
    setMedicines([{ name: "", dosage: "", frequency: [], duration: "" }]);
    setReports([]);
    setAdditionalNotes("");
    setSelectedAppointment(null);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicineField = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", frequency: [], duration: "" },
    ]);
  };

  const removeMedicineField = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  // Adding a new report field
  const addReportField = () => {
    setReports([...reports, ""]);
  };

  // Removing a report field
  const removeReportField = (index) => {
    const updatedReports = [...reports];
    updatedReports.splice(index, 1);
    setReports(updatedReports);
  };

  // Updating a report field
  const handleReportChange = (index, value) => {
    const updatedReports = [...reports];
    updatedReports[index] = value;
    setReports(updatedReports);
  };

  const handleSubmitPrescription = async () => {
    try {
      const prescriptionData = {
        appointmentId: selectedAppointment._id,
        doctorId: selectedAppointment.docData._id,
        patientId: selectedAppointment.userData._id,
        disease,
        medicines,
        reports,
        additionalNotes,
      };

      const url = isEditing
        ? `https://heal-book-backend.vercel.app/api/prescription/edit-prescription/${prescriptionData.appointmentId}`
        : "https://heal-book-backend.vercel.app/api/prescription/add-prescription";

      const { data } = await axios.post(url, prescriptionData, {
        headers: { dtoken },
      });

      if (data.success) {
        toast.success(data.message);
        closePrescriptionModal();
        getAppointments(); // refresh appointments
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchPrescription = async (appointmentId) => {
    try {
      const { data } = await axios.get(
        `https://heal-book-backend.vercel.app/api/prescription/get-prescription-by-appointmentId/${appointmentId}`,
      );

      if (data.success) {
        const { disease, medicines, reports, additionalNotes } =
          data.prescription;
        setDisease(disease);
        setMedicines(medicines);
        setReports(reports);
        setAdditionalNotes(additionalNotes);
        setIsEditing(true); // enable edit mode
        setShowModal(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch prescription");
    }
  };

  const deletePrescription = async (appointmentId) => {
    try {
      const { data } = await axios.delete(
        `https://heal-book-backend.vercel.app/api/prescription/delete-prescription/${appointmentId}`,
        {
          headers: { dtoken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments(); // Refresh the appointment list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete prescription");
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          All Appointments
        </h1>

        {/* Titles */}
        <div className="hidden sm:grid grid-cols-8 gap-4 text-gray-600 font-medium text-md mb-4 text-center">
          <div>S.No.</div>
          <div>Patient</div>
          <div>Age</div>
          <div>Details</div>
          <div>Payment</div>
          <div>Fees</div>
          <div>Prescription</div>
          <div>Actions</div>
        </div>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:grid sm:grid-cols-8 gap-2 items-center bg-gray-50 py-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow text-center"
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
                  <p className="text-md text-gray-500">{item.slotTime}</p>
                </div>

                {/* Payment Method */}
                <div className="font-semibold text-gray-700">
                  {item.payment ? "Online Payment" : "Cash Payment"}
                </div>

                {/* Fee */}
                <div className="text-blue-500 font-bold">${item.amount}</div>

                {/* Prescription Button */}
                {!item.prescriptionAdded ? (
                  <div>
                    <button
                      onClick={() => openPrescriptionModal(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Add Prescription
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center items-center">
                    <button
                      onClick={() => {
                        setSelectedAppointment(item);
                        fetchPrescription(item._id);
                      }}
                      className="w-full sm:w-auto bg-yellow-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-200"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deletePrescription(item._id)}
                      className="w-full sm:w-auto bg-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

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

      {/* Prescription Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-4 text-blue-500 text-center">
              {isEditing ? "Edit Prescription" : "Add Prescription"}
            </h2>

            {/* Disease Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Disease</label>
              <input
                type="text"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter disease name"
              />
            </div>

            {/* Medicines List */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Medicines</label>
              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="mb-4 border p-4 rounded-md flex flex-col gap-3"
                >
                  <label className="block text-gray-700 mb-2">
                    Medicine {index + 1}
                  </label>
                  {/* Medicine Name */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm">
                      Medicine Name
                    </label>
                    <input
                      type="text"
                      value={medicine.name}
                      onChange={(e) =>
                        handleMedicineChange(index, "name", e.target.value)
                      }
                      placeholder="Enter medicine name"
                      className="border border-gray-300 rounded px-2 py-1 focus:outline-none w-full"
                    />
                  </div>

                  {/* Dosage */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm">Dosage</label>
                    <input
                      type="text"
                      value={medicine.dosage}
                      onChange={(e) =>
                        handleMedicineChange(index, "dosage", e.target.value)
                      }
                      placeholder="Dosage (e.g., 500mg)"
                      className="border border-gray-300 rounded px-2 py-1 focus:outline-none w-full"
                    />
                  </div>

                  {/* Frequency */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-gray-600 text-sm">Frequency</label>
                    <div className="flex flex-wrap gap-4">
                      {["Morning", "Lunch", "Evening", "Night"].map((time) => (
                        <label
                          key={time}
                          className="flex items-center gap-1 text-gray-700"
                        >
                          <input
                            type="checkbox"
                            value={time}
                            checked={medicine.frequency?.includes(time)}
                            onChange={(e) => {
                              const updatedMedicines = [...medicines];
                              const selected =
                                updatedMedicines[index].frequency || [];

                              if (e.target.checked) {
                                updatedMedicines[index].frequency = [
                                  ...selected,
                                  time,
                                ];
                              } else {
                                updatedMedicines[index].frequency =
                                  selected.filter((t) => t !== time);
                              }
                              setMedicines(updatedMedicines);
                            }}
                            className="accent-blue-500"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm">Duration</label>
                    <input
                      type="text"
                      value={medicine.duration}
                      onChange={(e) =>
                        handleMedicineChange(index, "duration", e.target.value)
                      }
                      placeholder="Duration (e.g., 5 days)"
                      className="border border-gray-300 rounded px-2 py-1 focus:outline-none w-full"
                    />
                  </div>

                  {/* ❌ Remove Button at bottom-right */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => removeMedicineField(index)}
                      className="bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Medicine Button */}
              <button
                onClick={addMedicineField}
                className="bg-blue-500 text-white font-bold px-3 py-2 rounded hover:bg-blue-600 mt-2"
              >
                + Add Medicine
              </button>
            </div>

            {/* Reports Section */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Reports</label>

              {/* Multiple Reports Inputs */}
              {reports.map((report, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={report}
                    onChange={(e) => handleReportChange(index, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder={`Report ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeReportField(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              ))}

              {/* Add Report Button */}
              <button
                type="button"
                onClick={addReportField}
                className="bg-blue-500 text-white font-bold px-3 py-2 rounded hover:bg-blue-600 mt-2"
              >
                + Add Report
              </button>
            </div>

            {/* Additional Notes Section */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="Add any additional notes"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={closePrescriptionModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPrescription}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
