// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import reportsRouter from "./routes/reportsroute.js";
import patientsRouter from "./routes/patientRoutes.js";
import { connectDB } from "./config/db.js";


//app config
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // React frontend origin
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

//Db connection
connectDB();

//Api endpoint
app.use("/api/reports",reportsRouter)
app.use("/api/patients", patientsRouter);



app.get("/",(req,res)=>{
  res.send("API working")
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
