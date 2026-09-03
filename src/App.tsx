import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import ReportView from './components/ReportView';
import { CookieConsent } from './components/CookieConsent';

export const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  // Handle browser back button or hash navigation if any
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#relatorio') {
        setView('dashboard');
      } else if (view === 'dashboard' && window.location.hash === '') {
        setView('landing');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [view]);

  const handleOpenReport = () => {
    window.location.hash = 'relatorio';
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    window.location.hash = '';
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {view === 'dashboard' ? (
        <ReportView onBack={handleBackToLanding} />
      ) : (
        <LandingPage onExplore={handleOpenReport} />
      )}
      <CookieConsent />
    </>
  );
};

export default App;

