import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Places from './pages/Places';
import Stories from './pages/Stories';
import Marketplace from './components/Marketplace';
import Footer from './components/Footer';
import RecentEvents from './pages/RecentEvents';
import Dashboard from './pages/Dashboard';
import Destinations from './pages/Destinations';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/places" element={<Places />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/recent-events" element={<RecentEvents />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/destinations" element={<Destinations />} />
        </Routes>
            </div>
      <Footer />
    </Router>
  );
}

export default App;