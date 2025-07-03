import express from 'express';
import "dotenv/config";
import cors from "cors"
import cookieParser from 'cookie-parser';
import { connectDB } from './db/db.js';
import { userRouter } from './routes/user.route.js';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials:true}))




connectDB();
app.use("/api/user", userRouter);

// app.use("/",(req,res) => {
//     res.send("Api is working");
// })


let PORT = 8001;
app.listen(process.env.PORT || PORT,()=>{
    console.log("App is listend");
})



