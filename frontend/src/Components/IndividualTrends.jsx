import React from "react";
import "../styles/IndividualTrends.css";

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

const ranges = {
  "Total Cholesterol": "125-200 mg/dL",
  "LDL": "0-100 mg/dL",
  "HDL": "40-60 mg/dL",
  "Triglycerides": "0-150 mg/dL",
  "Creatinine": "0.6-1.3 mg/dL",
  "Vitamin D": "30-100 ng/mL",
  "Vitamin B12": "200-900 pg/mL",
  "HbA1c": "4-6%"
};

const statusLabels = {
  normal: "Normal",
  borderline: "Borderline",
  critical: "Critical",
  deficient: "Deficient"
};

const statusColors = {
  normal: "#16a34a",
  borderline: "#f59e42",
  critical: "#ef4444",
  deficient: "#fbbf24"
};

const IndividualTrends = ({ reports }) => {
  if (!reports.length) return null;
  const latest = reports[reports.length - 1].biomarkers;

  const biomarkerTypes = Object.keys(ranges);

  return (
    <div className="trends-cards">
      {biomarkerTypes.map(type => {
        const biomarker = latest.find(bm => bm.type === type);
        if (!biomarker) return null;

        const status = computeStatus(type, biomarker.value);

        return (
          <div key={type} className="ind-card" style={{ borderLeft: `5px solid ${statusColors[status]}` }}>
            <div className="ic-title">{type}</div>
            <div className="ic-value">{biomarker.value} <span style={{ fontSize: "0.9em", color: "#818cf8" }}>{biomarker.unit}</span></div>
            <div className="ic-status" style={{ color: statusColors[status] }}>{statusLabels[status]}</div>
            <div className="ic-range">Normal Range: {ranges[type]}</div>
          </div>
        );
      })}
    </div>
  )
};

export default IndividualTrends;
