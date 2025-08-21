import React from "react";
import "../styles/Home.css";
import "../styles/PatientOverview.css"

function computeStatus(type, value) {
  const v = parseFloat(value);
  switch(type) {
    case "Total Cholesterol": return v <= 200 ? "normal" : "critical";
    case "LDL":
      if (v > 160) return "critical";
      if (v >= 100) return "borderline";
      return "normal";
    case "HDL": return v < 40 ? "critical" : "normal";
    case "Triglycerides": return v < 150 ? "normal" : "critical";
    case "Creatinine": return v >= 0.6 && v <= 1.3 ? "normal" : "critical";
    case "Vitamin D": return v < 30 ? "deficient" : "normal";
    case "Vitamin B12": return v < 200 ? "deficient" : "normal";
    case "HbA1c": return v >= 6.5 ? "critical" : (v >= 5.7 ? "borderline" : "normal");
    default: return "normal";
  }
}

const PatientOverview = ({ patient, lastReport }) => {
  const biomarkers = lastReport?.biomarkers || [];
  const normalCount = biomarkers.filter(bm => computeStatus(bm.type, bm.value) === "normal").length;
  const alertCount = biomarkers.length - normalCount;

  return (
    <div className="patient-overview">
      <div>
        <span className="label">Patient Info</span>
        <div className="value"><b>{patient.patient.name}</b></div>
      </div>
      <div>
        <span className="label">Last Visit</span>
        <div className="value">{lastReport?.collected_on || "—"}</div>
      </div>
      <div>
        <span className="label">Results</span>
        <div className="value">
          {normalCount} <span className="subtxt">normal</span>
        </div>
      </div>
      <div>
        <span className="label">Alerts</span>
        <div className="value alert">
          {alertCount} {alertCount > 0 ? "critical" : "None"}
        </div>
      </div>
    </div>
  );
};


const isNormal = biomarker => {
  const val = parseFloat(biomarker.value);
  switch(biomarker.type) {
    case "Total Cholesterol": return val >= 125 && val <= 200;
    case "LDL": return val < 100;
    case "HDL": return val >= 40 && val <= 60;
    case "Triglycerides": return val < 150;
    case "Creatinine": return val >= 0.6 && val <= 1.3;
    case "Vitamin D": return val >= 30 && val <= 100;
    case "Vitamin B12": return val >= 200 && val <= 900;
    case "HbA1c": return val >= 4 && val < 6;
    default: return true;
  }
};

const getAbnormalCount = report => {
  if (!report?.biomarkers) return 0;
  return report.biomarkers.filter(bm => !isNormal(bm)).length;
};

export default PatientOverview;
