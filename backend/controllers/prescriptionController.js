import appointmentModel from "../models/Appointments.js";
import prescriptionModel from "../models/Prescription.js";

// To add a prescription
const addPrescription = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// To edit a prescription
const editPrescription = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const prescription = await prescriptionModel.findById(prescriptionId);
    const appointmentId = prescription.appointmentId;

    await prescriptionModel.findByIdAndDelete(prescriptionId);
    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { prescriptionAdded: false },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Prescription deleted successfully!!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addPrescription, editPrescription, deletePrescription };
