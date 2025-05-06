import mongoose from "mongoose";

const insightSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
    },
    insights: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const insightModel =
  mongoose.models.insight || mongoose.model("insight", insightSchema);
export default insightModel;
