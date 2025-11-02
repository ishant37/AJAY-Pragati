-----

# PM-AJAY GIA Portal

**Status:** ✅ **Migration Complete (Vite + Tailwind CSS)**

A professional, responsive web portal for the government project **"PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) Grant-in-Aid"**. This project has been migrated from Create React App (CRA) and Material UI to a modern, high-performance stack using **Vite** and **Tailwind CSS**.

-----

## 🌟 Features

This portal provides a digital mechanism for beneficiary identification, project tracking, and reporting.

  * **⚡️ Blazing Fast:** Built with Vite for instant server start (\~2-3 seconds) and Hot Module Replacement (HMR).
  * **📊 Dashboard (`/`):** Main landing page with key performance indicators (KPIs) and data visualizations.
  * **🗺️ GIS Monitoring (`/monitor`):** Integrates with mapping tools to visualize cadastrial data and project locations.
  * **📋 Project & AAP (`/ProjectnAAP`):** Module for managing project proposals and the Annual Action Plan (AAP) lifecycle.
  * **📄 Reports (`/reports`):** A dedicated section for generating, filtering, and exporting dynamic reports.
  * **🛤️ Impact Tracking (`/tracking`):** A deep-dive tool to track beneficiary outcomes and fund impact transparency.
  * **✅ Verification (`/verification`):** A module for document verification and beneficiary validation.
  * **🎓 Skill Development (`/skilldevelopment`):** Portal for managing skill development courses and beneficiary enrollment.
  * **📱 Responsive Design:** Fully optimized for all screen sizes, from mobile to desktop.
  * **🎨 Dark Mode:** Includes a toggle for light and dark themes, with preferences saved to `localStorage`.

-----

## 🚀 Getting Started

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

-----

## 🛠️ Available Scripts

This project uses Vite scripts:

  * `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
  * `npm run build`: Bundles the app for production into the `dist` folder.
  * `npm run preview`: Serves the production build locally to preview it.
  * `npm run lint`: Runs ESLint to check for code quality issues.

-----

## 💻 Technology Stack

This project is built with a modern, high-performance stack:

  * **Build Tool:** Vite
  * **Framework:** React 18.3.1
  * **Styling:** Tailwind CSS
  * **Routing:** React Router v6
  * **Charts:** Recharts
  * **Icons:** Lucide React
  * **UI Components:** Chakra UI & Headless Components
  * **Utilities:** `clsx`, `tailwind-merge`

-----

## 📁 Project Structure

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
├── README.md                # This file
└── VITE_MIGRATION_GUIDE.md  # Guide used for migration
```

-----

## 📈 Migration Benefits

The migration from CRA+MUI to Vite+Tailwind has resulted in significant performance and developer experience improvements:

  * **Dependency Reduction:** Total packages reduced by **71%** (from 1,393 to 397).
  * **Dev Server Start:** **\~20x faster** (from \~30s down to \~2-3s).
  * **Hot Reload:** **Instant** (down from 2-5s).
  * **Bundle Size:** `node_modules` is **70% smaller**.

-----

## 📄 License

This is a government project. All rights reserved by the Ministry of Social Justice and Empowerment, Government of India.

-----

## 📞 Support

For any queries or support:

  * **Email**: support@pmajaygia.gov.in
  * **Helpline**: 1800-XXX-XXXX (Toll-Free)

-----

**Government of India | Ministry of Social Justice and Empowerment**
