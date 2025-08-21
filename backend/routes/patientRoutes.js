// routes/patientRoutes.js
import express from "express";
import Patient from "../models/patient.js";

const router = express.Router();

// GET all patients with all details + sorted reports
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().lean();

    const result = patients.map(p => {
      const sortedReports = [...p.reports].sort(
        (a, b) => new Date(b.collected_on) - new Date(a.collected_on)
      );
      return {
        ...p,
        reports: sortedReports,
        latest_report_date: sortedReports.length ? sortedReports[0].collected_on : null
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET specific patient by name (case-insensitive, normalized_name fallback)
router.get("/:name", async (req, res) => {
  try {
    const searchName = req.params.name.trim().toUpperCase();

    // Try to find patient by normalized_name field first
    let patient = await Patient.findOne({ "patient.normalized_name": searchName }).lean();

    // If not found, fallback to patient.name case-insensitive regex search
    if (!patient) {
      patient = await Patient.findOne({
        "patient.name": { $regex: new RegExp(`^${searchName}$`, "i") }
      }).lean();
    }

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const sortedReports = [...patient.reports].sort(
      (a, b) => new Date(b.collected_on) - new Date(a.collected_on)
    );

    res.json({
      ...patient,
      reports: sortedReports
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
