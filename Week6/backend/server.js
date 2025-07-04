import express from "express";
import "dotenv/config";  // No need for dotenv.config() since it's handled here
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import notesRouter from "./routes/notesRoute.js";
import connectDB from "./db/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "https://task-managment-app-frontend.vercel.app",credentials:true}));
app.use(morgan("dev"));


app.use(rateLimiter);

// API Routing
app.get("/", (req, res) => {
    res.send("API Working");
});

app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 8001;
connectDB().then(()=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (${process.env.PORT || "default 8000"})`));
})