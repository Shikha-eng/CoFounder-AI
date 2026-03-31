import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: 'dashboard', label: 'Overview', icon: '▦', route: '/dashboard' },
    { key: 'competitors', label: 'Competitors', icon: '⊞', route: '/competitors' },
    { key: 'insights', label: 'Market Insights', icon: '◉', route: '/insights' },
    { key: 'timeline', label: 'Timeline', icon: '→', route: '/timeline' },
  ];

  const outputItems = [
    { key: 'pitch', label: 'Pitch Deck', icon: '⊡', route: '/pitch' },
    { key: 'report', label: 'Full Report', icon: '≡', route: '/report' },
  ];

  const getPageKeyFromPath = (path) => {
    const pathMap = {
      '/dashboard': 'dashboard',
      '/competitors': 'competitors',
      '/insights': 'insights',
      '/timeline': 'timeline',
      '/pitch': 'pitch',
      '/report': 'report',
    };
    return pathMap[path] || 'dashboard';
  };

  const currentPage = getPageKeyFromPath(location.pathname);

  return (
    <div className="sidebar">
      <div className="sb-logo">
        Co<span>Foundr</span> AI
      </div>

      <nav className="sb-nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`sb-item ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => navigate(item.route)}
          >
            <span className="sb-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div className="sb-label">Output</div>
        {outputItems.map((item) => (
          <button
            key={item.key}
            className={`sb-item ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => navigate(item.route)}
          >
            <span className="sb-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sb-bottom">
        <div className="sb-idea-card">
          <div className="sb-idea-title">CURRENT IDEA</div>
          <div className="sb-idea-name">AI Startup Validator for Solo Founders</div>
          <div className="sb-score">
            <div className="sb-score-bar">
              <div className="sb-score-fill"></div>
            </div>
            <span className="sb-score-n">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
