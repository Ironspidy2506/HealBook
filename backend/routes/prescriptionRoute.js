import express from "express";
import authDoctor from "../middlewares/authDoctor.js";

const prescriptionRouter = express.Router();

prescriptionRouter.post("/add-prescription", authDoctor);

prescriptionRouter.post("/edit-prescription/:id", authDoctor)

prescriptionRouter.delete('/delete-prescription', authDoctor);

prescriptionRouter.get('/get-prescriptions');

export default prescriptionRouter;
