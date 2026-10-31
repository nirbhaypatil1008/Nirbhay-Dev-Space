import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import BotanicalBackground from './components/BotanicalBackground';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { PrivacyPolicy, TermsAndConditions } from './pages/Legal';
import NotFound from './pages/NotFound';
import './styles/design-system.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Only scroll to top on non-hash navigation
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />
          <BotanicalBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <AIAssistant />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
