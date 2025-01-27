// import "dotenv/config"; // Load environment variables at the very top
// import express from "express";
// import morgan from "morgan";
// import mongoose from "mongoose";
// import cors from "cors";
// import userRoutes from "../api/routers/users.js";
// import nodemailer from "nodemailer";
// import multer from "multer";

// // Ensure all required environment variables are loaded
// if (!process.env.MONGODBURI || !process.env.GMAIL_EMAIL || !process.env.GMAIL_PASSWORD) {
//   console.error("Error: Missing required environment variables.");
//   process.exit(1);
// }

// // Create an instance of Multer for file uploads
// const upload = multer({ dest: "uploads/" });

// // Nodemailer transporter configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_EMAIL,
//     pass: process.env.GMAIL_PASSWORD,
//   },
// });

// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Nodemailer configuration error:", error);
//     process.exit(1);
//   } else {
//     console.log("Nodemailer is configured successfully.");
//   }
// });

// // Express app setup
// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(morgan("tiny"));
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGODBURI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Routes
// export default function handler(req, res) {
//   res.status(200).json({ message: 'Hello from Vercel API!' });
// }


// app.get("/", (req, res) => res.send("Server is running"));

// app.use("/user", userRoutes);

// app.get("/sendEmail", async (req, res) => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"Muhammad Issa 👻" <issabaloach03@gmail.com>', // Sender address
//       to: '"Issa Khan" <guddubaloach@gmail.com>', // List of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // Plain text body
//       html: "<b>Hello world?</b>", // HTML body
//     });

//     console.log("Message sent: %s", info.messageId);
//     res.send("Message sent: " + info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).send("Error sending email");
//   }
// });

// // Start the server
// app.listen(PORT, () => console.log("Server is running on PORT " + PORT));




import dotenv from 'dotenv';
import express from'express';
import mongoose from'mongoose';
import cors  from'cors';
import helmet from 'helmet';

// Import Routes
import usersRouter from './routers/users.js';
import loanRoutes from'./routers/loan.js';
import adminRoutes from'./routers/admin.js';
import appointmentRoutes from'./routers/appointment.js';
dotenv.config();
// Database Configuration
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Create Express App
const app = express();

// Middleware
app.use(helmet()); // Adds security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Static file serving for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/loans', loanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Server Configuration
const PORT = process.env.PORT || 4000;

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

// Graceful Shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = app;