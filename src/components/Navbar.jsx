// src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe,
  Search,
  Bell,
  Calendar
} from 'lucide-react';
import { cn } from '../utils/cn';

const pages = [
  { name: 'Dashboard', path: '/' },
  { name: 'GIS', path: '/map' },
  { name: 'Project & AAP', path: '/ProjectnAAP' },
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Top Header Bar with Search and Utilities */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Logo and Brand */}
            <div className="flex items-center space-x-3">
              {/* Government Emblem */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wide">AJAY Pragati</h1>
                <p className="text-xs text-blue-200">Government of India</p>
              </div>
            </div>

            {/* Center: Search Bar (Hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ⌘ S"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
                />
              </div>
            </div>

            {/* Right: Utilities */}
            <div className="flex items-center space-x-2">
              {/* Date Display */}
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="change language"
                >
                  <Globe className="w-5 h-5" />
                </button>
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    <button
                      onClick={() => handleLanguageChange('English')}
                      className={cn(
                        "w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                        language === 'English' && "bg-blue-50 dark:bg-gray-700 text-blue-600 font-medium"
                      )}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('Hindi')}
                      className={cn(
                        "w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                        language === 'Hindi' && "bg-blue-50 dark:bg-gray-700 text-blue-600 font-medium"
                      )}
                    >
                      हिंदी (Hindi)
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={handleDrawerToggle}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {pages.map((page) => (
                <button
                  key={page.name}
                  onClick={() => handleNavigation(page.path)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative",
                    isActive(page.path)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  {page.name}
                  {isActive(page.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Additional Actions */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Welcome, Admin</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer - Sidebar Style */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleDrawerToggle}
          />
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl transform transition-transform duration-300">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold">AJAY Pragati</h2>
                  <p className="text-xs text-blue-200">Dashboard</p>
                </div>
              </div>
              <button
                onClick={handleDrawerToggle}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="py-4">
              {pages.map((page, index) => (
                <button
                  key={page.name}
                  onClick={() => handleNavigation(page.path)}
                  className={cn(
                    "w-full px-6 py-3 text-left font-medium transition-all duration-200 flex items-center space-x-3 group relative",
                    isActive(page.path)
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {isActive(page.path) && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></span>
                  )}
                  <span className="text-lg">{index + 1}</span>
                  <span>{page.name}</span>
                </button>
              ))}
            </div>

            {/* User Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">A</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-blue-200">admin@pmajay.gov.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;