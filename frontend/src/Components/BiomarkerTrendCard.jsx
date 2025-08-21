import React from 'react';

const getClinicalStatus = (type, value) => {
  // Use clinicalRanges above for ranges; return 'normal', 'low', 'high'
};

const BiomarkerTrendCard = ({ type, trend, unit, lastValue, lastDate, status }) => (
  <div className={`trend-card ${status}`}>
    <div className="trend-type">{type}</div>
    <div className="trend-value">{lastValue} <span className="trend-unit">{unit}</span></div>
    <div className="trend-date">{lastDate}</div>
    <div className="trend-status">{status}</div>
  </div>
);

export default BiomarkerTrendCard;
