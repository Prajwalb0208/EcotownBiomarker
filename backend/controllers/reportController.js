import reportModel from "../models/report.js";

// Get all reports
const getReport = async (req, res) => {
  try {
    const reports = await reportModel.find().sort({ collected_on: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get report by ID
const getReportById = async (req, res) => {
  try {
    const report = await reportModel.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getReport, getReportById };
