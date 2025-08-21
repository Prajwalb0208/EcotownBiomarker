// backend/models/Report.js
import mongoose from "mongoose";

const biomarkerSchema = new mongoose.Schema({
  type: String,
  value: Number,
  unit: String,
  date: String
});

const reportSchema = new mongoose.Schema(
  {
    patient: {
      name: String
    },
    collected_on: String,
    biomarkers: [biomarkerSchema],
    extracted_at: String,
    source_file: String
  },
  { collection: "reports" }
);

const reportModel = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default reportModel;
