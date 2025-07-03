import express from "express";
import "dotenv/config";  // No need for dotenv.config() since it's handled here
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db/db.js";
import UserRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/postRoutes.js";
import { connectCloudinary } from "./config/multer.js";




const app = express();
app.use(express.json());
app.use(helmet());

app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true, // allow cookies and authorization headers
}));
//DataBase Connection
connectDB();
connectCloudinary();



// API Routing
app.get("/", (req, res) => {
    res.send("API Working");
});

app.use("/api/user",UserRouter);
app.use("/api/post",postRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (${process.env.PORT || "default 8000"})`));



