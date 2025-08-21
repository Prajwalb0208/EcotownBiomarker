import React, { useEffect, useState } from "react";
import PatientOverview from "../Components/PatientOverview";
import TimeSeriesChart from "../Components/TimeSeriesChart";
import IndividualTrends from "../Components/IndividualTrends";
import DashboardFooter from "../Components/DashboardFooter";
import "../styles/Home.css";

const PATIENT_NAME = "B G MANJUNATHA SWAMY";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ecotownbiomarker.onrender.com';

const Home = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/patients/${encodeURIComponent(PATIENT_NAME)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('API error:', data.error);
          setPatient(null);
        } else {
          setPatient(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);
  console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

  if (loading) return <div>Loading...</div>;
  if (!patient) return <div>No data found</div>;

  // Sort reports oldest to newest for chart and general use
  const reports = [...patient.reports].sort((a, b) => new Date(a.collected_on) - new Date(b.collected_on));

  // Use latest report for overview and footer (latest is last after sorting oldest to newest)
  const latestReport = reports.length ? reports[reports.length - 1] : null;

  return (
    <div className="dashboard-content">
      <PatientOverview patient={patient} lastReport={latestReport} />

      <div className="main-layout">
        <div className="main-left">
          <div className="chart-panel">
            <TimeSeriesChart reports={reports} />
          </div>
          <DashboardFooter latestReport={latestReport} />
        </div>

        <div className="trends-panel">
          <IndividualTrends reports={reports} />
        </div>
      </div>
    </div>

  );
};

export default Home;
