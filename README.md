# Ecotown Biomarker Dashboard

## Project Overview and Objectives

Ecotown Biomarker Dashboard is a comprehensive healthcare analytics platform designed to help clinicians visualize, analyze, and interpret patient biomarker data effectively. The application consolidates biomarker reports into interactive visual charts, patient overviews, and clinical recommendations. Its goal is to empower healthcare professionals with actionable insights to make better-informed decisions for patient care.

---

## Technology Stack Used

- **Frontend:** React.js with Vite for fast development and optimized builds.
- **Backend:** Node.js and Express.js serve a RESTful API.
- **Database:** MongoDB Atlas for scalable and reliable data storage.
- **Data Extraction:** Python scripts automate biomarker data extraction from PDF lab reports.
- **Deployment:** Frontend deployed on Vercel, backend deployed on Render.
- **Others:** CORS configuration for secure cross-origin requests, environment variables for configuration management.

---

## Installation and Setup Instructions

### Backend

1. Navigate to the backend folder:

cd backend

2. Install dependencies:

npm install


3. Create a `.env` file with the following content (replace with your MongoDB URI):

MONGO_URI=your_mongodb_connection_string
PORT=5000


4. Start the backend server locally:

npm run dev


### Frontend

1. Navigate to the frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Create a `.env` file with the backend API URL:

VITE_API_BASE_URL=http://localhost:5000


4. Start the frontend development server:


npm run dev


5. Open your browser and go to `http://localhost:5173` to access the dashboard.

---

### Data Extraction Tools

1. Navigate to the extraction folder:

cd extraction


2. Install Python dependencies:

pip install -r requirements.txt


3. Configure environment variables as needed for database connections and file paths.

4. Run the extraction scripts to process biomarker PDF reports:

python extract.py


---

## Features and Functionality

- **Interactive Biomarker Trends:** Multi-series charts offer visualizations over time, supporting zooming and export to PNG/JPG.
- **Patient Overview:** Displays key biomarker statuses with color-coded alerts and normal values for quick clinical assessment.
- **Clinical Recommendations:** Context-specific guidance based on biomarker values aids clinical decision-making.
- **Responsive UI:** Designed to work seamlessly across desktop and mobile devices.
- **Robust Backend API:** Handles patient data and reports securely and reliably.
- **Automated Data Extraction:** Python scripts to streamline importing biomarker data from lab reports.

---

## Clinical Interpretation Guide

- **Cholesterol & LDL:** Values within the normal range (LDL < 100 mg/dL) are considered healthy; elevated levels may indicate risk of cardiovascular issues.
- **HDL:** Levels below 40 mg/dL are critical and require clinical attention as they imply increased risk.
- **Triglycerides:** Values above 150 mg/dL are critical and may suggest metabolic imbalance.
- **Creatinine:** Values within 0.6 – 1.3 mg/dL range are normal kidney functions.
- **Vitamin D:** Levels below 30 ng/mL are deficient; supplementation or clinical follow-up might be needed.
- **Vitamin B12 & HbA1c:** Regular monitoring of these aids in managing anemia and glycemic control respectively.

*Note:* Always interpret biomarkers in clinical context and consult with healthcare professionals for treatment decisions.

---

## Future Enhancement Opportunities

- **User Authentication & Role Management:** Secure login for clinicians and patients with role-based access control.
- **Historical Data Comparison:** Allow comparing current data with previous periods for trend insights.
- **Predictive Analytics:** Integrate machine learning models to predict patient health risks based on biomarker trends.
- **Extended Biomarker Support:** Add support for additional biomarkers or lab tests.
- **Multi-language Support:** Make the dashboard accessible to non-English speaking users.
- **Mobile Apps:** Develop native iOS and Android apps for enhanced user accessibility.
- **Notifications & Alerts:** Real-time alerts for critical biomarker values via email or SMS.
- **Report Export:** Generate downloadable PDF summaries of patient biomarker history and clinical interpretations.

---

Thank you for using the Ecotown Biomarker Dashboard!  
Empowering clinicians to deliver better patient care through insightful data visualization and interpretation.
