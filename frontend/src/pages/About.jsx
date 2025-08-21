import React from 'react';
import '../styles/About.css';

const features = [
  {
    icon: <span className="feature-icon">📊</span>,
    title: 'Biomarker Visualization',
    desc: 'View and analyze patient biomarker trends with interactive charts.'
  },
  {
    icon: <span className="feature-icon">📅</span>,
    title: 'Historical Data',
    desc: 'Examine biomarkers from multiple visits over time with easy filtering.'
  },
  {
    icon: <span className="feature-icon">📥</span>,
    title: 'Data Export',
    desc: 'Export chart visualizations as PNG or JPG images for reporting.'
  },
  {
    icon: <span className="feature-icon">📱</span>,
    title: 'Responsive Design',
    desc: 'Access the dashboard seamlessly on desktop and mobile devices.'
  }
];

const About = () => (
  <div className="about-screen">
    <h1 className="about-title">EcoTown Labs Biomarker Dashboard</h1>
    <p className="about-desc">
      A practical healthcare analytics tool for clinicians to visualize and monitor patient biomarker data effectively.
    </p>

    <div className="feature-cards">
      {features.map(f => (
        <div className="feature-card" key={f.title}>
          {f.icon}
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>

    <div className="about-key-features">
      <h2>Key Features</h2>
      <div className="key-features-row">
        <div>
          <h4>Biomarker Analysis</h4>
          <ul>
            <li>Color-coded status for easy interpretation</li>
            <li>Trend visualization across visits</li>
            <li>Normal range comparison</li>
          </ul>
        </div>
        <div>
          <h4>Dashboard Features</h4>
          <ul>
            <li>Multi-series charts with zoom and pan</li>
            <li>Custom date range filtering</li>
            <li>Export charts to image files</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default About;
