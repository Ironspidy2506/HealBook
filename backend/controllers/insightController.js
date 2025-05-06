import insightModel from "../models/Insights.js";
import appointmentModel from "../models/Appointments.js";

const saveInsights = async (req, res) => {
  try {
    const { appointmentId, insights } = req.body;

    const newInsight = new insightModel({
      appointmentId,
      insights,
    });

    await newInsight.save();

    return res.json({
      success: true,
      message: "Insights Saved Successfully!!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getUserInsights = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({
        success: false,
        message: "User ID is required",
      });
    }

    // Step 1: Find all appointments for the user
    const userAppointments = await appointmentModel.find({ userId });

    const appointmentIds = userAppointments.map((appt) => appt._id.toString());

    if (appointmentIds.length === 0) {
      return res.json({
        success: true,
        insights: [],
        message: "No appointments found for the user.",
      });
    }

    // Step 2: Fetch insights for those appointment IDs
    const insights = await insightModel
      .find({
        appointmentId: { $in: appointmentIds },
      })
      .populate("appointmentId");

    return res.json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error("Error fetching user insights:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { saveInsights, getUserInsights };
