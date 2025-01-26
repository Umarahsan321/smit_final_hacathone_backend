import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import QRcode from "qrcode";
import authRoutes from "./Routes/auth.js";

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose
    .connect(process.env.MONGODBURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Express App
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.get("/", (req, res) => res.send("Server is running"));
app.use("/login" , authRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));