// // src/components/Navbar.js
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { 
//   Menu, 
//   X, 
//   Sun, 
//   Moon, 
//   Globe,
//   Search,
//   Bell,
//   Calendar
// } from 'lucide-react';
// import { cn } from '../utils/cn';

// const pages = [
//   { name: 'Dashboard', path: '/' },
//   { name: 'GIS', path: '/map' },
//   { name: 'Project & AAP', path: '/ProjectnAAP' },
// ];

// const Navbar = ({ darkMode, toggleDarkMode }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [langMenuOpen, setLangMenuOpen] = useState(false);
//   const [language, setLanguage] = useState('English');
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang);
//     setLangMenuOpen(false);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     if (drawerOpen) {
//       setDrawerOpen(false);
//     }
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <>
//       {/* Top Header Bar with Search and Utilities */}
//       <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14">
//             {/* Left: Logo and Brand */}
//             <div className="flex items-center space-x-3">
//               {/* Government Emblem */}
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
//                   <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
//                   </svg>
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-lg font-bold tracking-wide">AJAY Pragati</h1>
//                 <p className="text-xs text-blue-200">Government of India</p>
//               </div>
//             </div>

//             {/* Center: Search Bar (Hidden on mobile) */}
//             <div className="hidden md:flex flex-1 max-w-xl mx-8">
//               <div className="relative w-full">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search ⌘ S"
//                   className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
//                 />
//               </div>
//             </div>

//             {/* Right: Utilities */}
//             <div className="flex items-center space-x-2">
//               {/* Date Display */}
//               <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-lg">
//                 <Calendar className="w-4 h-4" />
//                 <span className="text-sm font-medium">{new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
//               </div>

//               {/* Notifications */}
//               <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               {/* Language Selector */}
//               <div className="relative">
//                 <button
//                   onClick={() => setLangMenuOpen(!langMenuOpen)}
//                   className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//                   aria-label="change language"
//                 >
//                   <Globe className="w-5 h-5" />
//                 </button>
//                 {langMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
//                     <button
//                       onClick={() => handleLanguageChange('English')}
//                       className={cn(
//                         "w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
//                         language === 'English' && "bg-blue-50 dark:bg-gray-700 text-blue-600 font-medium"
//                       )}
//                     >
//                       English
//                     </button>
//                     <button
//                       onClick={() => handleLanguageChange('Hindi')}
//                       className={cn(
//                         "w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
//                         language === 'Hindi' && "bg-blue-50 dark:bg-gray-700 text-blue-600 font-medium"
//                       )}
//                     >
//                       हिंदी (Hindi)
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Theme Toggle */}
//               <button
//                 onClick={toggleDarkMode}
//                 className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//                 aria-label="toggle theme"
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={handleDrawerToggle}
//                 className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
//                 aria-label="menu"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-12">
//             {/* Desktop Navigation Links */}
//             <div className="hidden md:flex items-center space-x-1">
//               {pages.map((page) => (
//                 <button
//                   key={page.name}
//                   onClick={() => handleNavigation(page.path)}
//                   className={cn(
//                     "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative",
//                     isActive(page.path)
//                       ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700"
//                       : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
//                   )}
//                 >
//                   {page.name}
//                   {isActive(page.path) && (
//                     <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Additional Actions */}
//             <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//               <span className="font-medium">Welcome, Admin</span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Drawer - Sidebar Style */}
//       {drawerOpen && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50"
//             onClick={handleDrawerToggle}
//           />
//           <div className="fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl transform transition-transform duration-300">
//             {/* Sidebar Header */}
//             <div className="flex items-center justify-between p-4 border-b border-white/20">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
//                   <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-bold">AJAY Pragati</h2>
//                   <p className="text-xs text-blue-200">Dashboard</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleDrawerToggle}
//                 className="p-2 rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Navigation Menu */}
//             <div className="py-4">
//               {pages.map((page, index) => (
//                 <button
//                   key={page.name}
//                   onClick={() => handleNavigation(page.path)}
//                   className={cn(
//                     "w-full px-6 py-3 text-left font-medium transition-all duration-200 flex items-center space-x-3 group relative",
//                     isActive(page.path)
//                       ? "bg-white/20 text-white shadow-lg"
//                       : "text-blue-100 hover:bg-white/10 hover:text-white"
//                   )}
//                 >
//                   {isActive(page.path) && (
//                     <span className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></span>
//                   )}
//                   <span className="text-lg">{index + 1}</span>
//                   <span>{page.name}</span>
//                 </button>
//               ))}
//             </div>

//             {/* User Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                   <span className="text-lg font-semibold">A</span>
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium">Admin User</p>
//                   <p className="text-xs text-blue-200">admin@pmajay.gov.in</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Map,
  DocumentScanner,
  Psychology,
  Settings,
  Logout,
  Menu,
  Notifications,
  Forest,
  PlaylistAdd,
} from "@mui/icons-material";

// Original max width for the expanded state
const MAX_DRAWER_WIDTH = 280;
// New min width for the collapsed state
const MIN_DRAWER_WIDTH = 70;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Initialize drawerWidth to MIN_DRAWER_WIDTH for desktop view
  const [drawerWidth, setDrawerWidth] = useState(MIN_DRAWER_WIDTH); 
  const location = useLocation();

  const isMinimized = drawerWidth === MIN_DRAWER_WIDTH;

  const getLoggedInUser = () => {
    // Mock user data for the simulation
    const userData = localStorage.getItem('loggedInUser');
    return userData ? JSON.parse(userData) : { username: 'Guest', displayName: 'Guest User', role: 'Role' };
  };

  const loggedInUser = getLoggedInUser();

  const handleLogout = () => {
    localStorage.removeItem('loginTimestamp');
    localStorage.removeItem('loggedInUser');
    // In a real app, this would redirect to the login page: navigate('/login');
    window.location.reload(); 
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Dashboard />, color: "#34d399" },
    // Using Map for Monitor, since CadastrialMap component was causing issues
    { path: "/monitor", label: "Monitor", icon: <Map />, color: "#60a5fa" }, 
    { path: "/projectnaap", label: "Projects & AAP", icon: <DocumentScanner />, color: "#f472b6" },
    { path: "/sanctions", label: "Sanctions & Fund Release", icon: <Psychology />, color: "#fbbf24" },
    { path: "/reports", label: "Reports", icon: <PlaylistAdd />, color: "#c084fc" },
    { path: "/implementation", label: "Implementation", icon: <PlaylistAdd />, color: "#c084fc" },
    { path: "/verification", label: "Document verfication", icon: <PlaylistAdd />, color: "#c084fc" },
    // { path: "/reports", label: "Reports", icon: <PlaylistAdd />, color: "#c084fc" }, // ADD THIS LINE
    // ... other items
  ];

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMouseEnter = () => {
    setDrawerWidth(MAX_DRAWER_WIDTH);
  };

  const handleMouseLeave = () => {
    setDrawerWidth(MIN_DRAWER_WIDTH);
  };

  /**
   * Helper component to apply smooth visibility transition to text
   */
  const SmoothText = ({ children }) => (
    <Box
      sx={{
        // Controls the visual hiding/showing of the text container
        opacity: isMinimized ? 0 : 1,
        width: isMinimized ? 0 : 'auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        // Transition settings for smooth animation
        transition: 'opacity 0.2s ease-in-out, width 0.3s ease-in-out 0.1s',
        display: 'flex', 
        alignItems: 'center',
        ml: isMinimized ? 0 : 1, 
      }}
    >
      {children}
    </Box>
  );

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // >>> UPDATED BACKGROUND TO BLUE THEME <<<
        background: "linear-gradient(180deg, #1E3A8A 0%, #155E75 100%)", // Dark blue gradient
        color: "#e2e8f0",
      }}
    >
      {/* Logo Section - Clickable link to root route ("/") */}
      <Box
        component={Link} // Use Link component here
        to="/" // Directs to the Dashboard
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: isMinimized ? 'center' : 'flex-start',
          gap: 2,
          textDecoration: 'none', 
          color: 'inherit', 
          cursor: 'pointer', 
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
          transition: "background-color 0.2s ease-in-out",
        }}
      >
        <Forest sx={{ fontSize: 40, color: "#34d399" }} />
        {/* Pass the complex text content to SmoothText */}
        <SmoothText>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                letterSpacing: "0.5px",
              }}
            >
              PM-AJAY Portal
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#94a3b8",
                fontSize: "11px",
              }}
            >
              Social Justice Management
            </Typography>
          </Box>
        </SmoothText>
      </Box>

      {/* Navigation Items */}
      <List sx={{ px: isMinimized ? 0 : 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1, justifyContent: isMinimized ? 'center' : 'flex-start' }}>
              <ListItemButton
                component={Link}
                to={item.path}
                // Center button content when minimized
                sx={{
                  borderRadius: "12px",
                  py: 1.2,
                  justifyContent: isMinimized ? 'center' : 'flex-start',
                  width: '100%',
                  backgroundColor: active ? "rgba(74, 222, 128, 0.1)" : "transparent",
                  borderLeft: active ? `4px solid ${item.color}` : "4px solid transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                  transition: "all 0.2s ease-in-out",
                  // Remove padding when minimized to allow icon to center correctly
                  px: isMinimized ? 0 : 2, 
                  ml: isMinimized ? 1 : 0, 
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? item.color : "#94a3b8",
                    // Use a fixed small minWidth for icons to center when minimized
                    minWidth: isMinimized ? '100%' : 32, 
                    justifyContent: 'center',
                    filter: active ? `drop-shadow(0 0 5px ${item.color}60)` : "none",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {/* Smoothly hide/show the primary text content */}
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: isMinimized ? 0 : 1,
                    width: isMinimized ? 0 : 'auto',
                    overflow: 'hidden',
                    transition: 'opacity 0.2s ease-in-out, width 0.3s ease-in-out 0.1s',
                    "& .MuiListItemText-primary": {
                      color: active ? "#fff" : "#e2e8f0",
                      fontWeight: active ? 600 : 500,
                      fontSize: "15px",
                      whiteSpace: 'nowrap', 
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* User Actions Section - Adjust for minimization */}
      <Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mx: isMinimized ? 1 : 2 }} />
        <List sx={{ px: isMinimized ? 0 : 2, py: 2 }}>
          {/* Settings and Logout Buttons */}
          {[
            { label: 'Settings', icon: <Settings />, path: '/settings' },
            { label: 'Logout', icon: <Logout />, onClick: handleLogout }
          ].map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1, justifyContent: isMinimized ? 'center' : 'flex-start' }}>
              <ListItemButton
                component={item.path ? Link : 'div'}
                to={item.path}
                onClick={item.onClick}
                sx={{
                  borderRadius: "12px",
                  justifyContent: isMinimized ? 'center' : 'flex-start',
                  width: '100%',
                  py: 1.2,
                  px: isMinimized ? 0 : 2, 
                  ml: isMinimized ? 1 : 0, 
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.05)" }
                }}
              >
                <ListItemIcon 
                    sx={{ color: "#94a3b8", minWidth: isMinimized ? '100%' : 32, justifyContent: 'center' }}
                >
                    {item.icon}
                </ListItemIcon>

                {/* Use ListItemText for action items with smooth hide/show */}
                <ListItemText
                    primary={item.label}
                    sx={{
                        opacity: isMinimized ? 0 : 1,
                        width: isMinimized ? 0 : 'auto',
                        overflow: 'hidden',
                        transition: 'opacity 0.2s ease-in-out, width 0.3s ease-in-out 0.1s',
                        "& .MuiListItemText-primary": {
                            whiteSpace: 'nowrap',
                            fontSize: "15px",
                            color: "#e2e8f0"
                        }
                    }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mx: isMinimized ? 1 : 2 }} />

        {/* User Profile - Adjust for minimization */}
        <Box sx={{ p: isMinimized ? 1 : 2, display: "flex", alignItems: "center", justifyContent: isMinimized ? 'center' : 'flex-start', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "#10b981" }}>
            {loggedInUser.displayName ? loggedInUser.displayName.charAt(0).toUpperCase() : 'U'}
          </Avatar>

          {/* Wrap profile text in SmoothText for a consistent layout */}
          <SmoothText>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#fff" }}>
                {loggedInUser.displayName || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "11px" }}>
                {loggedInUser.role || 'Role'} • {loggedInUser.username}
              </Typography>
            </Box>
          </SmoothText>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar for mobile */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${MAX_DRAWER_WIDTH}px)` },
          ml: { sm: `${MAX_DRAWER_WIDTH}px` },
          display: { sm: "none" },
          background: "#fff",
          boxShadow: "none",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: "#0f172a" }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "#0f172a" }}>
            FRA Portal
          </Typography>
          <IconButton sx={{ color: "#0f172a" }}>
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{
          width: { xs: MAX_DRAWER_WIDTH, sm: drawerWidth },
          flexShrink: { sm: 0 },
          transition: { sm: 'width 0.3s ease-in-out' },
        }}
        // Apply hover handlers to the desktop view's wrapper Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mobile Drawer (uses MAX_DRAWER_WIDTH) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: MAX_DRAWER_WIDTH,
              borderRight: "none",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              transition: 'width 0.3s ease-in-out',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
