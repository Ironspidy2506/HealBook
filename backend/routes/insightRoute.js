import express from "express";
import authUser from "../middlewares/authUser.js"; // Authentication middleware
import {
  getUserInsights,
  saveInsights,
} from "../controllers/insightController.js";

const insightRouter = express.Router();

// Route to save insights
insightRouter.post("/save-insights", authUser, saveInsights);

insightRouter.get("/get-user-insights", authUser, getUserInsights);

export default insightRouter;
