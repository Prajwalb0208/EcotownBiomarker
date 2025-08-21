
```markdown
# Ecotown Biomarker Dashboard

A comprehensive healthcare analytics platform built to help clinicians visualize and analyze patient biomarker data effectively. This full-stack application includes a React frontend dashboard with dynamic biomarker charts and a Node.js/Express backend API connected to MongoDB for managing patient reports.

---

## Features

- Interactive, multi-series biomarker trend charts with export options (PNG, JPG) and zoom functionality.
- Patient overview panel with color-coded biomarker statuses and detailed clinical recommendations.
- Responsive design suitable for both desktop and mobile devices.
- Backend RESTful API built with Express and MongoDB Atlas for scalable patient and report management.
- Environment variable support for secure configuration of API URLs, database connections, and other secrets.
- CORS configured to securely allow frontend-backend communication from local development and deployed domains.

---

## Repository Structure

```
/backend     - Node.js/Express backend API server
/frontend    - React frontend application built with Vite
/extraction  - Python-based tools for biomarker data extraction from reports
README.md   - This file
.gitignore  - Specifies intentionally untracked files to ignore
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB instance)
- Python 3 (for extraction tools)
- .env files configured with your MongoDB URI, backend port, and frontend API URLs

---

### Backend Setup

1. Navigate to `/backend`
2. Create a `.env` file based on `.env.example` with your MongoDB connection string and configuration.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm run dev
   ```
5. Backend API accessible at `http://localhost:5000` (or your configured port).

---

### Frontend Setup

1. Navigate to `/frontend`
2. Create a `.env` file with your backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the frontend:
   ```
   npm run dev
   ```
5. Open the browser at `http://localhost:5173`

---

### Extraction Tools

- Navigate to `/extraction`
- Install Python dependencies listed in `requirements.txt`:
  ```
  pip install -r requirements.txt
  ```
- Configure `.env` or environment variables accordingly for database and file paths.
- Run extraction scripts to process biomarker report PDFs.

---

## Deployment

- Frontend is ready for deployment on [Vercel](https://vercel.com) or similar platforms.
- Backend can be deployed on [Render](https://render.com), [Railway](https://railway.app), or cloud providers that support Node.js.
- Make sure to set proper environment variables for production API URLs and database credentials.
- Backend CORS should allow your deployed frontend domain to communicate securely.

---

## Environment Variables

**Backend (`/backend/.env`):**

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
...
```

**Frontend (`/frontend/.env`):**

```
VITE_API_BASE_URL=https://your-backend-production-url.com
```

---

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for bug fixes, enhancements, or new features.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or support, please reach out via GitHub issues or contact the maintainer.

---

Thank you for using Ecotown Biomarker Dashboard!  
Empowering clinicians with clear biomarker insights.

```
