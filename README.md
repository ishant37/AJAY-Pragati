# PM-AJAY GIA Portal

## Digital Mechanism for Beneficiary Identification under Grant-in-Aid Component

A professional, responsive web portal built with **React** and **Material UI (MUI v5)** for the government project **"PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) Grant-in-Aid"**.

---

## 🌟 Features

### 🏠 Home Page
- Hero section with gradient background and animated elements
- Clear call-to-action buttons for beneficiaries, enumerators, and admins
- Key features and objectives section
- Fully responsive design

### 🧭 Navigation
- Sticky navbar with smooth transitions
- Mobile-responsive drawer menu
- Dark/light mode toggle
- Language selector (English/Hindi)

### 📊 Dashboard
- Overview cards displaying key metrics
- Real-time activity table with search and filters
- Status indicators with color coding
- Responsive grid layout

### 📈 Analysis Page
- Interactive charts using Recharts library:
  - Bar chart: Beneficiaries by District
  - Pie chart: Gender Distribution
  - Line chart: Fund Disbursal Trend
  - Progress bars: Category Distribution
- Date range and district filters
- Export functionality

### ℹ️ About Scheme Page
- Comprehensive scheme information
- Eligibility criteria
- FAQ section with expandable accordions
- Contact information

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or use the existing folder):
   ```bash
   cd "d:\React\Ajay pragati"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar with theme toggle
│   ├── HeroSection.jsx         # Landing page hero section
│   └── OverviewCard.jsx        # Reusable metric card component
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── Dashboard.jsx           # Dashboard with metrics and table
│   ├── Analysis.jsx            # Data visualization page
│   └── About.jsx               # Scheme information page
├── App.jsx                     # Main app with routing
├── theme.js                    # MUI theme configuration
├── index.js                    # App entry point
└── index.css                   # Global styles
```

---

## 🎨 Technologies Used

- **React 18.2** - JavaScript library for building user interfaces
- **Material UI (MUI) v5** - React component library
- **React Router v6** - Client-side routing
- **Recharts** - Charting library for data visualization
- **Emotion** - CSS-in-JS styling

---

## 🎨 Theme & Design

### Color Palette
- **Primary**: `#0B57A4` (Government Blue)
- **Secondary**: `#2E7D32` (Action Green)
- **Background**: `#F7F9FC` (Light) / `#121212` (Dark)

### Typography
- Font Family: Roboto, Noto Sans
- Responsive font sizes
- Accessible contrast ratios

---

## 📱 Responsive Design

The portal is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1440px and up)

---

## ♿ Accessibility

- High contrast mode support
- ARIA labels for screen readers
- Keyboard navigation support
- Semantic HTML structure

---

## 🔮 Future Enhancements

- User authentication and authorization
- Real-time data integration with backend APIs
- Multi-language support (Hindi, regional languages)
- PDF report generation
- Mobile app version
- Advanced analytics and reporting

---

## 📄 License

This is a government project. All rights reserved by the Ministry of Social Justice and Empowerment, Government of India.

---

## 📞 Support

For any queries or support:
- **Email**: support@pmajaygia.gov.in
- **Helpline**: 1800-XXX-XXXX (Toll-Free)

---

## 👨‍💻 Development

Built with ❤️ for the empowerment of Scheduled Caste communities across India.

**Government of India | Ministry of Social Justice and Empowerment**
