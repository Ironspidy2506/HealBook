import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentsAdmin,
  cancelAppointmentAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

adminRouter.post("/all-doctors", authAdmin, allDoctors);

adminRouter.post("/change-availability", authAdmin, changeAvailability);

adminRouter.get("/appointments", authAdmin, appointmentsAdmin);

adminRouter.post("/cancel-appointment", authAdmin, cancelAppointmentAdmin);

adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
