import appointmentModel from "../models/Appointments.js";
import prescriptionModel from "../models/Prescription.js";

// To add a prescription
const addPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      doctorId,
      patientId,
      disease,
      medicines,
      reports,
      additionalNotes,
    } = req.body;

    const newPrescription = new prescriptionModel({
      appointmentId,
      doctorId,
      patientId,
      disease,
      medicines,
      reports,
      additionalNotes,
    });

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { prescriptionAdded: true },
      { new: true }
    );

    await newPrescription.save();

    return res.json({
      success: true,
      message: "Prescription added successfully!!",
    });
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
    const { appointmentId } = req.params;

    const prescription = await prescriptionModel.findOne({ appointmentId });

    const { disease, medicines, reports, additionalNotes } = req.body;

    const updatedPrescription = await prescriptionModel.findByIdAndUpdate(
      prescription._id,
      {
        disease,
        medicines,
        reports,
        additionalNotes,
      },
      { new: true }
    );

    if (!updatedPrescription) {
      return res.json({
        success: false,
        message: "Prescription not found",
      });
    }

    return res.json({
      success: true,
      message: "Prescription updated successfully",
      data: updatedPrescription,
    });
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
    const { appointmentId } = req.params;

    const prescription = await prescriptionModel.findOne({ appointmentId });

    await prescriptionModel.findByIdAndDelete(prescription._id);
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

// To get all the prescriptions
const getPrescriptionByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const prescription = await prescriptionModel.findOne({ appointmentId });

    return res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addPrescription,
  editPrescription,
  deletePrescription,
  getPrescriptionByAppointmentId,
};
