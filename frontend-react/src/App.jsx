import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import IdeaInput from './pages/IdeaInput';
import Dashboard from './pages/Dashboard';
import Competitors from './pages/Competitors';
import Insights from './pages/Insights';
import Timeline from './pages/Timeline';
import Pitch from './pages/Pitch';
import Report from './pages/Report';

import './styles/globals.css';
import './styles/components.css';
import './styles/pages.css';

function AppContent() {
  const location = useLocation();
  
  // Dashboard routes that have their own layout/no top nav
  const dashboardRoutes = ['/dashboard', '/competitors', '/insights', '/timeline', '/pitch', '/report'];
  const showNav = !dashboardRoutes.includes(location.pathname);

  return (
    <>
      {showNav && <Navigation />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/input" element={<IdeaInput />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/pitch" element={<Pitch />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
