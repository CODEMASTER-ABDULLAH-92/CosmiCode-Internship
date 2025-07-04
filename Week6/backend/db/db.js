import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase is connected");
    } catch (error) {
        console.error("DataBase Err", error);
    }
}

export default connectDB;