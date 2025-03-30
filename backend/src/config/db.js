import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGO_URI;
    const connect = await mongoose.connect(mongodbURI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed");
  }
};
