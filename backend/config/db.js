import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/healbook`);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
