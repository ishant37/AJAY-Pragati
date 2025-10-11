import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe 
} from 'lucide-react';
import { cn } from '../utils/cn';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Analysis', path: '/analysis' },
  { name: 'About Scheme', path: '/about' },
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
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={handleDrawerToggle}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <h1 className="text-lg sm:text-xl font-bold text-primary tracking-wide">
                PM-AJAY GIA Portal
              </h1>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex flex-1 ml-10 space-x-2">
              {pages.map((page) => (
                <button
                  key={page.name}
                  onClick={() => handleNavigation(page.path)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    isActive(page.path)
                      ? "text-primary border-b-2 border-primary bg-blue-50 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  {page.name}
                </button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2">
              {/* Language Toggle */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="change language"
                >
                  <Globe className="w-5 h-5" />
                </button>
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    <button
                      onClick={() => handleLanguageChange('English')}
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                        language === 'English' && "bg-blue-50 dark:bg-gray-700 text-primary font-medium"
                      )}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('Hindi')}
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                        language === 'Hindi' && "bg-blue-50 dark:bg-gray-700 text-primary font-medium"
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
                className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleDrawerToggle}
          />
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-primary">PM-AJAY GIA</h2>
              <button
                onClick={handleDrawerToggle}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="py-4">
              {pages.map((page) => (
                <button
                  key={page.name}
                  onClick={() => handleNavigation(page.path)}
                  className={cn(
                    "w-full px-6 py-3 text-left font-medium transition-colors",
                    isActive(page.path)
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  {page.name}
                </button>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
