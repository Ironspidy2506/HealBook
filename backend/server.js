import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./config/db.js";
import cloudinaryConnect from "./config/cloudinary.js";
import aiRouter from "./routes/ai.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import prescriptionRouter from "./routes/prescriptionRoute.js";
import insightRouter from "./routes/insightRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
dbConnect();
cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoint
app.use("/api/ai", aiRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/prescription", prescriptionRouter);
app.use("/api/insights", insightRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
