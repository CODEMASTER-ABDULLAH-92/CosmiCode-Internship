import express from 'express'
import { connectDB } from './db/db.js';
import { userRouter } from './routes/User.route.js';

const app = express();

app.use("/",(req,res)=>{
    res.send("Api is working");
})

app.use(express.json());

connectDB()

app.use("/api/user", userRouter)

const PORT = 8001;
app.listen(PORT,()=>{
    console.log("App is listened");
})
