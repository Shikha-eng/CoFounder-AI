import { useNavigate, useLocation } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { key: 'landing', label: 'Landing' },
    { key: 'input', label: 'Idea Input' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'competitors', label: 'Competitors' },
    { key: 'insights', label: 'Market Insights' },
    { key: 'timeline', label: 'Timeline' },
    { key: 'pitch', label: 'Pitch Deck' },
    { key: 'report', label: 'Report' },
  ];

  const pageMap = {
    landing: '/',
    input: '/input',
    dashboard: '/dashboard',
    competitors: '/competitors',
    insights: '/insights',
    timeline: '/timeline',
    pitch: '/pitch',
    report: '/report',
  };

  const getPageKeyFromPath = (path) => {
    for (const [key, routePath] of Object.entries(pageMap)) {
      if (routePath === path) return key;
    }
    return 'landing';
  };

  const currentPage = getPageKeyFromPath(location.pathname);

  return (
    <nav className="page-nav">
      <div className="nav-brand">
        Co<span>Foundr</span> AI
      </div>
      <div className="nav-tabs">
        {pages.map((page) => (
          <button
            key={page.key}
            className={`nav-tab ${currentPage === page.key ? 'active' : ''}`}
            onClick={() => navigate(pageMap[page.key])}
          >
            {page.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
