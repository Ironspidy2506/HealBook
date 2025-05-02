import express from "express";
import authDoctor from "../middlewares/authDoctor.js";
import { addPrescription, deletePrescription, editPrescription, getPrescriptionByAppointmentId } from "../controllers/prescriptionController.js";

const prescriptionRouter = express.Router();

prescriptionRouter.post("/add-prescription", authDoctor, addPrescription);

prescriptionRouter.post("/edit-prescription/:appointmentId", authDoctor, editPrescription)

prescriptionRouter.delete('/delete-prescription/:appointmentId', authDoctor, deletePrescription);

prescriptionRouter.get('/get-prescription-by-appointmentId/:appointmentId', getPrescriptionByAppointmentId);

export default prescriptionRouter;
