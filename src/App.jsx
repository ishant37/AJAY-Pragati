import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar.jsx';

// --- CORRECTED IMPORTS ---
import Dashboard from './pages/Dashboard.jsx';
import CadastrialMap from "./pages/CadastrialMap.jsx"; // Assuming fixed name
import  VerificationPage  from './pages/Verification.jsx'; 
import ProjectAAP from './pages/ProjectAAP.jsx';
// --- END CORRECTED IMPORTS ---

// Scroll to Top Button Component
function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  // ... (ScrollTop logic remains the same) ...
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
          className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
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
    // CHANGE 1: Remove 'flex-col' from outer container. The sidebar (Navbar) 
    // is responsible for positioning itself. The main content will handle its offset.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Router>
        {/* Navbar (Sidebar) is rendered outside the content flow */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* CHANGE 2: Wrap all main content (main + footer) in a div to push it clear.
           This is necessary because the Navbar is likely using a fixed/permanent position 
           and is taken out of the normal document flow. */}
        <div className="content-wrapper min-h-screen flex flex-col">
          {/* Main Content Area - Routes are contained here */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitor" element={<CadastrialMap/>} />
              <Route path="/ProjectnAAP" element={<ProjectAAP/>} />
              <Route path="/verification" element={<VerificationPage/>} />
            </Routes>
          </main>
          
          {/* Footer - Remains at the bottom of the content-wrapper */}
          <footer className="py-6 px-4 mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 PM-AJAY GIA Portal | Ministry of Social Justice and Empowerment
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Government of India | All Rights Reserved
            </p>
          </footer>
        </div>
        
        <ScrollTop />
      </Router>
    </div>
  );
}

export default App;