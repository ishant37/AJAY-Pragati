# PM-AJAY GIA Portal - Quick Start Guide

## 🚀 Getting Started

### Installation Complete ✅
All dependencies have been installed successfully!

### Available Scripts

#### Start Development Server
```bash
npm start
```
- Runs the app in development mode
- Open [http://localhost:3000](http://localhost:3000) to view in browser
- Page will reload when you make changes

#### Build for Production
```bash
npm run build
```
- Builds the app for production to the `build` folder
- Optimizes the build for best performance

#### Run Tests
```bash
npm test
```
- Launches the test runner in interactive watch mode

## 📄 Pages Overview

### 1. Home Page (`/`)
- Hero section with gradient background
- About PM-AJAY scheme
- Key features and objectives
- Call-to-action buttons

### 2. Dashboard (`/dashboard`)
- Overview cards with key metrics
- Recent activity table
- Search and filter functionality
- Real-time status updates

### 3. Analysis (`/analysis`)
- Bar chart: Beneficiaries by District
- Pie chart: Gender Distribution
- Line chart: Fund Disbursal Trend
- Category distribution with progress bars
- Date range and district filters

### 4. About Scheme (`/about`)
- Comprehensive scheme information
- Eligibility criteria
- FAQ section
- Contact information

## 🎨 Features

### Theme System
- **Light Mode**: Clean, professional look
- **Dark Mode**: Easy on the eyes
- Toggle button in navbar

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 600px
  - Tablet: 600px - 960px
  - Desktop: > 960px

### Navigation
- **Desktop**: Horizontal navbar
- **Mobile**: Hamburger menu with drawer
- Sticky navigation
- Active route highlighting

### Accessibility
- ARIA labels
- Keyboard navigation
- High contrast support
- Screen reader friendly

## 🎨 Color Palette

### Primary Colors
- **Primary Blue**: `#0B57A4` - Government official color
- **Secondary Green**: `#2E7D32` - Action/success color
- **Background**: `#F7F9FC` (light) / `#121212` (dark)

### Status Colors
- **Success**: Green - Approved items
- **Warning**: Orange - Pending items
- **Error**: Red - Rejected items
- **Info**: Blue - Under review items

## 📦 Dependencies

### Core
- React 18.2
- React DOM 18.2
- React Router DOM 6.20

### UI Framework
- @mui/material 5.14.16
- @mui/icons-material 5.14.16
- @mui/x-data-grid 6.18.1
- @emotion/react 11.11.1
- @emotion/styled 11.11.0

### Charts
- Recharts 2.10.3

## 🔧 Customization

### Modify Theme Colors
Edit `src/theme.js`:
```javascript
primary: {
  main: '#0B57A4', // Change this
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add link in `src/components/Navbar.jsx`

### Modify Charts
Edit data in `src/pages/Analysis.jsx`:
- `districtData` - Bar chart data
- `genderData` - Pie chart data
- `disbursalTrend` - Line chart data

## 📱 Mobile Testing

Test on different screen sizes:
- iPhone SE: 375x667
- iPhone 12: 390x844
- iPad: 768x1024
- Desktop: 1920x1080

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Clear Cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Delete build folder and rebuild
rm -rf build
npm run build
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Material UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Recharts Documentation](https://recharts.org/)

## 🎯 Next Steps

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Open your browser** and go to `http://localhost:3000`

3. **Explore the portal**:
   - Navigate between pages
   - Try the dark/light mode toggle
   - Test responsive design (resize browser)
   - Check mobile view (F12 → Toggle device toolbar)

4. **Customize as needed**:
   - Update colors in `theme.js`
   - Modify content in page components
   - Add new features or pages

## ✨ Project Complete!

Your PM-AJAY GIA Portal is ready to use! 🎉

For any questions or issues, refer to the README.md file.
