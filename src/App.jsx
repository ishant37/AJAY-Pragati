import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Analysis from './pages/Analysis.jsx';
import About from './pages/About.jsx';

// Scroll to Top Button Component
function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
          aria-label="scroll back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="py-6 px-4 mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 PM-AJAY GIA Portal | Ministry of Social Justice and Empowerment
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Government of India | All Rights Reserved
          </p>
        </footer>
        
        <ScrollTop />
      </Router>
    </div>
  );
}

export default App;
