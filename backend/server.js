// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import reportsRouter from "./routes/reportsroute.js";
import patientsRouter from "./routes/patientRoutes.js";
import { connectDB } from "./config/db.js";

// app config
dotenv.config();
const app = express();

// Middleware with updated CORS config
const allowedOrigins = [
  'http://localhost:5173', // React local dev frontend
  'https://ecotown-biomarker-3km5q8fcq-prajwalb0208s-projects.vercel.app',
  'https://ecotown-biomarker.vercel.app'
  ];

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// DB connection
connectDB();

// API endpoints
app.use("/api/reports", reportsRouter);
app.use("/api/patients", patientsRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API working");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
