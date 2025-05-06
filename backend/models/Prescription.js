import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    disease: {
      type: String,
      required: true,
    },
    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: [{ type: String, required: true }],
        duration: { type: String, required: true },
      },
    ],

    reports: [{ type: String }],
    additionalNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

const prescriptionModel =
  mongoose.models.prescription ||
  mongoose.model("prescription", prescriptionSchema);
export default prescriptionModel;
