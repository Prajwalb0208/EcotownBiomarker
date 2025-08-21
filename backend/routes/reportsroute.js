import express from "express";
import { getReport, getReportById } from "../controllers/reportController.js";

const reportsRouter = express.Router();

reportsRouter.get("/", getReport); // Get all reports
reportsRouter.get("/:id", getReportById); // Get single report by ID

export default reportsRouter;
