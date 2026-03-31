import Sidebar from '../components/Sidebar';
import { GrowthChart, MarketShareChart } from '../components/Charts';
import Toast from '../components/Toast';
import { useState } from 'react';

export default function Dashboard() {
  const [toast, setToast] = useState(null);

  // Sample transaction data
  const transactions = [
    { id: 1, title: 'Product-Market Fit Analysis', status: 'Completed', date: 'Mar 28, 2025', impact: '+12%' },
    { id: 2, title: 'Competitive Landscape Review', status: 'In Progress', date: 'Mar 29, 2025', impact: '+8%' },
    { id: 3, title: 'TAM Calculation', status: 'Completed', date: 'Mar 27, 2025', impact: '+15%' },
    { id: 4, title: 'Funding Readiness Assessment', status: 'Pending', date: 'Mar 30, 2025', impact: '+5%' },
    { id: 5, title: 'Risk Mitigation Strategy', status: 'Completed', date: 'Mar 26, 2025', impact: '+9%' },
  ];

  const handleExport = () => {
    setToast('Report downloaded successfully');
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      
      <div className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="header-title">Dashboard</h1>
            <p className="header-subtitle">Real-time analysis of your startup idea</p>
          </div>
          <div className="header-right">
            <input 
              type="text" 
              placeholder="Search..." 
              className="header-search"
            />
            <div className="header-profile">
              <div className="profile-avatar">SK</div>
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="dashboard-grid">
          {/* TOP ROW */}
          <div className="grid-top">
            {/* Large Chart - 70% */}
            <div className="chart-main">
              <div className="chart-header">
                <h2 className="chart-title">Projected Growth vs Market Leaders</h2>
                <div className="chart-options">
                  <button className="chart-option-btn">📊</button>
                </div>
              </div>
              <div className="chart-content">
                <GrowthChart />
              </div>
            </div>

            {/* Right Stack - 30% */}
            <div className="stats-stack">
              {/* Viability Score Card */}
              <div className="stat-box">
                <div className="stat-label">Viability Score</div>
                <div className="stat-score">78</div>
                <div className="stat-sub">out of 100</div>
              </div>

              {/* Market Share */}
              <div className="stat-box">
                <div className="stat-label">Market Share</div>
                <div className="chart-small">
                  <MarketShareChart />
                </div>
              </div>

              {/* Action Card */}
              <div className="action-box">
                <div className="action-title">Ready to Scale?</div>
                <p className="action-text">Get a detailed growth strategy</p>
                <button className="action-btn" onClick={handleExport}>
                  Download Report
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW - TRANSACTIONS TABLE */}
          <div className="grid-bottom">
            <div className="table-container">
              <div className="table-header">
                <h2 className="table-title">Analysis Updates</h2>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="tx-title">{tx.title}</td>
                      <td>
                        <span className={`badge-status badge-${tx.status.toLowerCase().replace(' ', '-')}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td>{tx.date}</td>
                      <td className="tx-impact">
                        <span className="trend positive">{tx.impact}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
