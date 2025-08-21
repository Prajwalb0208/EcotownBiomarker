import React from "react";
import "../styles/DashboardFooter.css";

const DashboardFooter = ({ latestReport }) => {
  if (!latestReport) return null;
  if (!Array.isArray(latestReport.biomarkers)) return null;

  return (
    <div className="dash-footer">
      <h4>Clinical Recommendations</h4>
      <ul>
        {latestReport.biomarkers.map(bm => (
          <li key={bm.type}>
            <b>{bm.type}:</b> {recommendationText(bm)}
          </li>
        ))}
      </ul>
    </div>
  );
};

function recommendationText(bm) {
  const value = parseFloat(bm.value);
  switch (bm.type) {
    case "Total Cholesterol":
      return value > 200 ? "Above recommended range: lipid management suggested." : "Within normal range.";
    case "LDL":
      return value >= 100 ? "Elevated LDL: consider lifestyle changes." : "LDL levels normal.";
    case "HDL":
      return value < 40 ? "Low HDL: physical activity recommended." : "HDL levels normal.";
    case "Triglycerides":
      return value > 150 ? "High triglycerides: dietary review advised." : "Triglycerides normal.";
    case "Creatinine":
      return value < 0.6 || value > 1.3 ? "Abnormal creatinine levels: consult physician." : "Creatinine levels normal.";
    case "Vitamin D":
      return value < 30 ? "Vitamin D deficiency: supplementation recommended." : "Vitamin D levels normal.";
    case "Vitamin B12":
      return value < 200 ? "Vitamin B12 deficiency: consider supplements." : "Vitamin B12 levels normal.";
    case "HbA1c":
      return value >= 6.5
        ? "Diabetic glucose levels: medical attention advised."
        : value >= 5.7
        ? "Prediabetic glucose levels: lifestyle changes suggested."
        : "Blood glucose levels normal.";
    default:
      return "Within clinical norms.";
  }
}

export default DashboardFooter;
