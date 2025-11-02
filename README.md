Here is an updated, professional `README.md` file based on the repository and presentation context you provided.

-----

# PM-AJAY GIA Portal

**Status:** Deployed Prototype

This repository contains the source code for a comprehensive digital portal for the **PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) Grant-in-Aid (GIA)** scheme.

## Project Overview

This application is a high-performance web portal designed as a digital mechanism for beneficiary identification, project management, and impact tracking under the PM-AJAY GIA component. It serves as a centralized solution for the Ministry of Social Justice and Empowerment to manage the complete lifecycle of Grant-in-Aid projects, from beneficiary onboarding to fund disbursement and reporting.

The system fuses scattered government data, provides instant field-level verification, and delivers a live policy command center for real-time project tracking and data-driven decision-making.

## Core Features

The portal is divided into several key modules:

  * **National Dashboard (`/`):** Main landing page featuring key performance indicators (KPIs) for the Adarsh Gram component, including population covered, works completed, and fund utilization.
  * **GIS Monitoring (`/monitor`):** Integrates with Leaflet to visualize cadastrial data and project locations, providing a geographic overview of scheme implementation.
  * **Project & AAP Management (`/ProjectnAAP`):** A comprehensive module for managing the complete lifecycle of project proposals and the Annual Action Plan (AAP). It includes role-based workflows for District Makers (DM), State Approvers (SA), and Central Users (CU).
  * **Reports & Analytics (`/reports`):** A dedicated section for generating, filtering, and exporting dynamic reports on fund allocation, project proposals, and implementation status across states and financial years.
  * **Impact & Fund Tracking (`/tracking`):** A deep-dive transparency tool to track beneficiary outcomes and the flow of GIA funds from sanction to the end beneficiary.
  * **Digital Verification (`/verification`):** An AI-driven module for digital beneficiary validation. It includes simulations for Aadhaar e-KYC, DigiLocker data import, and automated eligibility checks based on scheme criteria (e.g., caste, income).
  * **Skill Development (`/skilldevelopment`):** A portal for managing available skill development courses, allowing beneficiaries to enroll and track their progress toward certification.

## Technology Stack

This project is built with a modern, high-performance stack:

  * **Build Tool:** Vite
  * **Framework:** React 18.3.1
  * **Styling:** Tailwind CSS
  * **UI Components:** Chakra UI, MUI
  * **Routing:** React Router v6
  * **Charts:** Recharts, Chart.js
  * **Mapping:** Leaflet
  * **Icons:** Lucide React
  * **Report Generation:** jsPDF, html2canvas, xlsx
  * **Utilities:** `clsx`, `tailwind-merge`

## Getting Started

### Prerequisites

  * Node.js (v18 or higher recommended)
  * npm or yarn

### Installation

1.  **Navigate to the project directory**:

    ```bash
    cd "d:\React\Ajay pragati"
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Start the development server**:

    ```bash
    npm run dev
    ```

4.  **Open your browser** and navigate to:

    ```
    http://localhost:3000
    ```

## Available Scripts

This project uses Vite scripts:

  * `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
  * `npm run build`: Bundles the app for production into the `dist` folder.
  * `npm run preview`: Serves the production build locally to preview it.
  * `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

The structure is organized for scalability, separating configuration, pages, and reusable components.

```
/
├── public/                  # Static assets (favicon, images)
│   ├── General Duty Assistant.pdf
│   └── manifest.json
├── src/
│   ├── api/                 # Mock API for data fetching
│   │   └── mockApi.js
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── OverviewCard.jsx
│   │   └── reports/         # Report-specific components
│   │       ├── ChartContainer.jsx
│   │       ├── DynamicDataTable.jsx
│   │       └── FilterBar.jsx
│   ├── data/                # Mock data files
│   │   └── reportsData.js
│   ├── hooks/               # Custom React hooks
│   │   └── useReportData.js
│   ├── pages/               # Top-level page components (routes)
│   │   ├── Dashboard.jsx
│   │   ├── CadastrialMap.jsx
│   │   ├── ProjectAAP.jsx
│   │   ├── Reports.jsx
│   │   ├── Skilldevelopment.jsx
│   │   ├── Tracking.jsx
│   │   └── Verification.jsx
│   ├── utils/               # Utility functions
│   │   ├── cn.js            # Tailwind class merger
│   │   └── exportUtils.js   # PDF/CSV export logic
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # App entry point (Vite)
│   └── index.css            # Global styles & Tailwind directives
│
├── .gitignore               # Git ignore file
├── index.html               # Main HTML template (Vite entry)
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind theme configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## Deployment

This project is built as a static front-end application using Vite.

1.  **Build the application**:

    ```bash
    npm run build
    ```

2.  **Deploy the `dist` folder**:
    This command creates a `dist` directory in the project root. This directory contains the optimized, static HTML, CSS, and JavaScript files for production.

    You can deploy this `dist` folder to any static hosting service, such as:

      * Vercel
      * Netlify
      * GitHub Pages
      * A government-provisioned web server (e.g., using NGINX or Apache)

-----

**Government of India | Ministry of Social Justice and Empowerment**
