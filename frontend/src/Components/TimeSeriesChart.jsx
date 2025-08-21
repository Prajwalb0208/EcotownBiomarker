import React, { useState, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea, Brush
} from "recharts";
import { toPng, toJpeg } from "html-to-image";
import "../styles/TimeSeriesChart.css";

const biomarkerColors = {
  "Total Cholesterol": "#1976d2",
  "LDL": "#f59e42",
  "HDL": "#229932",
  "Triglycerides": "#e44830",
  "Creatinine": "#8e24aa",
  "Vitamin D": "#1976a0",
  "Vitamin B12": "#4fafe2",
  "HbA1c": "#ea15b3",
};

const clinicalRanges = {
  "Total Cholesterol": [125, 200],
  "LDL": [0, 100],
  "HDL": [40, 60],
  "Triglycerides": [0, 150],
  "Creatinine": [0.6, 1.3],
  "Vitamin D": [30, 100],
  "Vitamin B12": [200, 450],
  "HbA1c": [4, 6],
};

const options = [
  { label: 'Last 1 Month', value: 30 },
  { label: 'Last 3 Months', value: 90 },
  { label: 'Last 6 Months', value: 180 },
  { label: 'Last 1 Year', value: 365 },
  { label: 'All', value: "all" },
  { label: 'Custom', value: "custom" }
];

const biomarkerOptions = Object.keys(biomarkerColors);

function filterReportsByPeriod(reports, days, customDates) {
  if (days === "all") return reports;
  if (days === "custom" && customDates.from && customDates.to) {
    const from = new Date(customDates.from);
    const to = new Date(customDates.to);
    return reports.filter(r => {
      const d = new Date(r.collected_on);
      return d >= new Date(from.getTime() - 3 * 24 * 60 * 60 * 1000) &&
        d <= new Date(to.getTime() + 3 * 24 * 60 * 60 * 1000);
    });
  }
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - Number(days));
  return reports.filter(r => {
    const d = new Date(r.collected_on);
    return d >= new Date(fromDate.getTime() - 2 * 24 * 60 * 60 * 1000) &&
      d <= new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
  });
}

function formatData(reports) {
  return reports.map(r => {
    const item = { date: r.collected_on };
    r.biomarkers.forEach(b => {
      item[b.type] = parseFloat(b.value);
    });
    return item;
  });
}

const TimeSeriesChart = ({ reports }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(90);
  const [customDates, setCustomDates] = useState({ from: "", to: "" });
  const [selectedBiomarkers, setSelectedBiomarkers] = useState([...biomarkerOptions]);
  const chartRef = useRef(null);

  const sortedReports = [...reports].sort((a, b) => new Date(a.collected_on) - new Date(b.collected_on));
  const filteredReports = filterReportsByPeriod(sortedReports, selectedPeriod, customDates);
  const data = formatData(filteredReports);

  const toggleBiomarker = (bio) => {
    if (selectedBiomarkers.includes(bio)) {
      setSelectedBiomarkers(selectedBiomarkers.filter(b => b !== bio));
    } else {
      setSelectedBiomarkers([...selectedBiomarkers, bio]);
    }
  };

  const exportChart = (type) => {
    if (!chartRef.current) return;
    if (type === "png") {
      toPng(chartRef.current).then(dataUrl => {
        const link = document.createElement("a");
        link.download = "biomarker-chart.png";
        link.href = dataUrl;
        link.click();
      }).catch(e => console.error("Export PNG error", e));
    } else if (type === "jpg") {
      toJpeg(chartRef.current, { quality: 0.95 }).then(dataUrl => {
        const link = document.createElement("a");
        link.download = "biomarker-chart.jpg";
        link.href = dataUrl;
        link.click();
      }).catch(e => console.error("Export JPG error", e));
    }
  };

  function handleReset() {
    setSelectedPeriod("all");
    setCustomDates({ from: "", to: "" });
  }

  return (
    <div className="tsc-wrapper">
      <div className="tsc-header">
        <div className="tsc-controls">
          <select
            className="tsc-period-select"
            value={selectedPeriod}
            onChange={e => {
              setSelectedPeriod(e.target.value);
              setCustomDates({ from: "", to: "" });
            }}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {selectedPeriod === "custom" && (
            <div className="tsc-custom-date">
              <input
                type="date"
                value={customDates.from}
                onChange={e => setCustomDates(d => ({ ...d, from: e.target.value }))}
              />
              <span style={{ margin: "0 8px" }}>to</span>
              <input
                type="date"
                value={customDates.to}
                onChange={e => setCustomDates(d => ({ ...d, to: e.target.value }))}
              />
            </div>
          )}
        </div>

        <div className="tsc-biomarkers-multi-select">
          {biomarkerOptions.map(bio => (
            <label key={bio} style={{ marginRight: 10, cursor: "pointer", userSelect: "none" }}>
              <input
                type="checkbox"
                checked={selectedBiomarkers.includes(bio)}
                onChange={() => toggleBiomarker(bio)}
              />
              <span style={{ color: biomarkerColors[bio], marginLeft: 4 }}>{bio}</span>
            </label>
          ))}
        </div>

        <div className="tsc-buttons">
          <button onClick={handleReset}>Reset Zoom</button>
          <button onClick={() => exportChart("png")}>Export PNG</button>
          <button onClick={() => exportChart("jpg")}>Export JPG</button>
        </div>
      </div>

      {selectedPeriod === "custom" && customDates.from && customDates.to && (
        <div className="tsc-selected-range">
          {customDates.from} — {customDates.to}
        </div>
      )}

      <div ref={chartRef} className="tsc-chart-root">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ebeef3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            {selectedBiomarkers.map(bio => (
              <React.Fragment key={bio}>
                <Line
                  type="monotone"
                  dataKey={bio}
                  stroke={biomarkerColors[bio]}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
                {clinicalRanges[bio] && (
                  <ReferenceArea
                    y1={clinicalRanges[bio][0]}
                    y2={clinicalRanges[bio][1]}
                    fill={biomarkerColors[bio]}
                    fillOpacity={0.07}
                    ifOverflow="extendDomain"
                  />
                )}
              </React.Fragment>
            ))}

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
