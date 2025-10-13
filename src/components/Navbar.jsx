import React, { useState, useEffect } from "react";
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
import Tracking from '/projects/AshishRepo/AJAY-Pragati/src/pages/Tracking'; // Custom icon for Implementation
// Original max width for the expanded state
const MAX_DRAWER_WIDTH = 280;
// New min width for the collapsed state
const MIN_DRAWER_WIDTH = 70;

// ADD onDrawerWidthChange prop
const Navbar = ({ onDrawerWidthChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Initialize drawerWidth to MIN_DRAWER_WIDTH for desktop view
  const [drawerWidth, setDrawerWidth] = useState(MIN_DRAWER_WIDTH); 
  const location = useLocation();

  const isMinimized = drawerWidth === MIN_DRAWER_WIDTH;

  // Add useEffect to set the initial width in the parent (App.jsx)
  useEffect(() => {
    if (onDrawerWidthChange) {
      onDrawerWidthChange(MIN_DRAWER_WIDTH);
    }
  }, [onDrawerWidthChange]); // Dependency ensures this runs only once or when prop changes

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
    { path: "/monitor", label: "Visualize", icon: <Map />, color: "#60a5fa" }, 
    { path: "/projectnaap", label: "Projects & AAP", icon: <DocumentScanner />, color: "#f472b6" },
    { path: "/reports", label: "Reports", icon: <PlaylistAdd />, color: "#c084fc" },
    { path: "/tracking", label: "impact & Tracking", icon: <PlaylistAdd />, color: "#c084fc" },
    { path: "/verification", label: "Document verfication", icon: <PlaylistAdd />, color: "#c084fc" },
    { path: "/skilldevelopment", label: "Skill Development", icon: <Psychology/>, color: "#60a5fa" }, 
    // { path: "/sanctions", label: "Sanctions & Fund Release", icon: <Psychology />, color: "#fbbf24" },
    // { path: "/reports", label: "Reports", icon: <PlaylistAdd />, color: "#c084fc" }, // ADD THIS LINE
    // ... other items
  ];

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMouseEnter = () => {
    setDrawerWidth(MAX_DRAWER_WIDTH);
    // Notify parent component
    if (onDrawerWidthChange) {
        onDrawerWidthChange(MAX_DRAWER_WIDTH);
    }
  };

  const handleMouseLeave = () => {
    setDrawerWidth(MIN_DRAWER_WIDTH);
    // Notify parent component
    if (onDrawerWidthChange) {
        onDrawerWidthChange(MIN_DRAWER_WIDTH);
    }
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