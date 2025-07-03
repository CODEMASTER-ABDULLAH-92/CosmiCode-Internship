import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("Data Base is Connected: ");
    } catch (error) {
        console.error("DB Connetion Error: ",error);
    }
}