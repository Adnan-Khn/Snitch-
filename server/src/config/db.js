import mongoose from "mongoose";
import { config } from "./config.js";
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to MongoDB ", error.message);
  }
};
export default connectDB;
