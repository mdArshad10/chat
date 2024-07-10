import mongoose from "mongoose";

export const connectBD = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/chat`
    );
    console.log(`MongoDB Connected: ${connectionInstance.connection.port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
