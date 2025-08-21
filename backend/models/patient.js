import mongoose from "mongoose";

const biomarkerSchema = new mongoose.Schema({
  type: String,
  value: Number,
  unit: String,
  date: String
});

const reportSchema = new mongoose.Schema({
  collected_on: String,
  biomarkers: [biomarkerSchema],
  extracted_at: String,
  source_file: String
});

const patientSchema = new mongoose.Schema({
  patient: {
    name: { type: String, required: true }
  },
  reports: [reportSchema]
}, { collection: "patients" }); // explicitly store in 'patients' collection

export default mongoose.model("Patient", patientSchema);
