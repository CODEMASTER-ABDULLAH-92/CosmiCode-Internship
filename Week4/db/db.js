import mongoose from 'mongoose'

export const connectDB = async (req,res) => {
    try {
        await mongoose.connect("mongodb+srv://abdullahpeerzada92:sVXWw46Wv9fuL4Nu@cluster0.qnvr9ip.mongodb.net/Assignment");
        console.log("DB is connected");
    } catch (error) {
        console.error("Err in Db ",error);
    }
}