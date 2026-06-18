/*import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path:'./config/.env'})
const Connection=async()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log("connected")
    }catch(err){
        console.log("Error:"+ err.message)
    }
}
Connection()*/
import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;