import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function Pitch() {
  const [toast, setToast] = useState(null);

  const slides = [
    {
      number: '01',
      title: 'The Problem',
      content: 'Founders spend months validating ideas without data. They lack a systematic way to assess market opportunity, competition, and growth potential before committing resources.',
    },
    {
      number: '02',
      title: 'The Solution',
      content: 'CoFoundr AI provides AI-powered analysis that validates startup ideas in minutes. Founders get market insights, competitor analysis, and growth projections instantly.',
    },
    {
      number: '03',
      title: 'Market Opportunity',
      content: 'A $2.4B TAM in startup tools growing at 24% annually. 12,000+ startups founded monthly need validation. Increasing founder awareness and limited alternatives.',
    },
    {
      number: '04',
      title: 'Business Model',
      content: 'Freemium SaaS with tiered pricing. Free tier for basic analysis, Pro ($99/month) for deep insights, Enterprise for teams. Target LTV:CAC of 10:1.',
    },
    {
      number: '05',
      title: 'Competitive Advantage',
      content: 'AI-powered insights, founder-focused UX, real-time data, integration with popular tools. First-mover advantage in AI-driven idea validation.',
    },
    {
      number: '06',
      title: 'Metrics & Traction',
      content: 'Beta: 1,200 users, $24K MRR, 40% MoM growth. 94% retention rate. $500K ARR path within 18 months. Seeking $1.5M Series A.',
    },
  ];

  const handleExport = () => {
    setToast('Pitch deck export coming soon — connect your Figma account.');
  };

  return (
    <div className="dash-container">
      <Sidebar />
      <div className="dash-content">
        <div className="dash-header">
          <h1 className="dash-title">Pitch Deck</h1>
          <p className="dash-subtitle">Investor-ready pitch in 6 slides</p>
        </div>

        {/* Slides Grid */}
        <div className="pitch-slides">
          {slides.map((slide, idx) => (
            <div key={idx} className="slide-card">
              <div className="slide-number">Slide {slide.number}</div>
              <h3 className="slide-title">{slide.title}</h3>
              <p className="slide-content">{slide.content}</p>
              <div className="slide-footer">
                Customizable content {slide.number}
              </div>
            </div>
          ))}
        </div>

        {/* Export Options */}
        <div className="score-card" style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Export & Share
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              className="btn-primary"
              onClick={handleExport}
              style={{ width: '100%' }}
            >
              Export as PDF
            </button>
            <button
              className="btn-primary"
              onClick={handleExport}
              style={{ width: '100%' }}
            >
              Share Link
            </button>
          </div>
        </div>

        {/* Pitch Tips */}
        <div className="score-card" style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Presenting Your Pitch
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' }}>
                ✓ Do's
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Tell a compelling story',
                  'Back up claims with data',
                  'Show traction/proof',
                  'Be authentic and passionate',
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--text2)', padding: '6px 0' }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' }}>
                ✗ Don'ts
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Over-claim market size',
                  'Ignore competition',
                  'Be too technical',
                  'Ask for too much',
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--text2)', padding: '6px 0' }}>
                    • {item}
                  </li>
                ))}
              </ul>
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
