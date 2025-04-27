import express from "express";
import { getAiInsights } from "../controllers/aiController.js"; // Import your AI controller
import authUser from "../middlewares/authUser.js"; // Authentication middleware

const aiRouter = express.Router();

// AI Route for getting insights
aiRouter.post("/get-insights", authUser, getAiInsights); // AI route

export default aiRouter;
