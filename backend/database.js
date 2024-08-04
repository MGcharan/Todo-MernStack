import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongodb conneccted");
  } catch (err) {
    console.log("MongoDb not connected", err);
  }
};

export default dbConnect;
