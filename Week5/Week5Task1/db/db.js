// EZ1zd2dAhOHOoHeZ


import mongoose from "mongoose";

export const connectDB = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected");
    } catch (error) {
        console.error("Err in DB",error);
    }
}