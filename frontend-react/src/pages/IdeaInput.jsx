import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

export default function IdeaInput() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [audience, setAudience] = useState('');
  const [revenue, setRevenue] = useState('');
  const [toast, setToast] = useState(null);

  const exampleIdeas = {
    'AI/ML SaaS': 'An AI-powered tool that helps solo founders validate product-market fit using competitor analysis and market signals before writing a single line of code.',
    'E-Commerce Tool': 'A smart inventory and pricing optimization platform for Shopify merchants that uses ML to predict demand and prevent stockouts.',
    'Analytics Platform': 'A no-code analytics platform that lets non-technical startup founders set up funnels, cohort analysis, and revenue dashboards in under 5 minutes.',
  };

  const handleHintClick = (label) => {
    setIdea(exampleIdeas[label]);
  };

  const handleAnalyze = () => {
    if (!idea.trim()) {
      setToast('Please describe your idea before analyzing.');
      return;
    }
    // Navigate to dashboard with idea data
    navigate('/dashboard', { state: { idea, audience, revenue } });
  };

  return (
    <div className="page page-input">
      <div className="input-wrapper">
        <div className="input-header">
          <div className="hero-badge" style={{ margin: '0 auto 20px' }}>
            <span className="badge-dot"></span>
            New Analysis
          </div>
          <h2>What's your startup idea?</h2>
          <p>Describe it in your own words. Our AI handles the rest.</p>
        </div>

        <div className="idea-box">
          <textarea
            className="idea-input"
            placeholder="Describe your startup idea... e.g. 'An AI-powered tool that helps solo founders validate product-market fit before writing a single line of code'"
            value={idea}
            onChange={(e) => setIdea(e.target.value.slice(0, 500))}
            maxLength="500"
          />
          <div className="idea-divider"></div>
          <div className="idea-fields">
            <div className="idea-field">
              <label>Target Audience</label>
              <input
                type="text"
                placeholder="e.g. Solo founders, SMBs"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <div className="idea-field idea-field--last">
              <label>Revenue Model</label>
              <input
                type="text"
                placeholder="e.g. SaaS subscription, B2B"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
              />
            </div>
          </div>
          <div className="idea-footer">
            <span className="idea-counter">{idea.length} / 500 characters</span>
            <button className="analyze-btn" onClick={handleAnalyze}>
              Run Analysis →
            </button>
          </div>
        </div>

        <div className="input-hints">
          {Object.keys(exampleIdeas).map((label) => (
            <div
              key={label}
              className="hint-chip"
              onClick={() => handleHintClick(label)}
            >
              <div className="hint-icon">
                {label === 'AI/ML SaaS' ? '🤖' : label === 'E-Commerce Tool' ? '🛒' : '📊'}
              </div>
              <div className="hint-text">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
