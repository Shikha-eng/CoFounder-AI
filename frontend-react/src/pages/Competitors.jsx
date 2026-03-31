import Sidebar from '../components/Sidebar';

export default function Competitors() {
  const competitors = [
    {
      name: 'Startup.ai',
      similarity: 92,
      stage: 'Series B',
      funding: '$12M',
      tags: ['AI', 'Validation', 'B2B'],
    },
    {
      name: 'IdeaVault',
      similarity: 78,
      stage: 'Series A',
      funding: '$4.2M',
      tags: ['Market Research', 'SaaS'],
    },
    {
      name: 'ValidateHub',
      similarity: 65,
      stage: 'Seed',
      funding: '$800K',
      tags: ['MVP Testing', 'Analytics'],
    },
    {
      name: 'MarketPulse',
      similarity: 54,
      stage: 'Series A',
      funding: '$6.5M',
      tags: ['Market Data', 'Intelligence'],
    },
    {
      name: 'FounderTools',
      similarity: 48,
      stage: 'Seed',
      funding: '$1.2M',
      tags: ['Resources', 'Community'],
    },
    {
      name: 'CompeteMap',
      similarity: 42,
      stage: 'Bootstrapped',
      funding: 'Self-funded',
      tags: ['Competitor Analysis'],
    },
  ];

  return (
    <div className="dash-container">
      <Sidebar />
      <div className="dash-content">
        <div className="dash-header">
          <h1 className="dash-title">Competitor Analysis</h1>
          <p className="dash-subtitle">{competitors.length} similar companies in market</p>
        </div>

        <div className="competitors-grid">
          {competitors.map((comp, idx) => (
            <div key={idx} className="competitor-card">
              <div className="comp-header">
                <div className="comp-name">{comp.name}</div>
                <div className="comp-similarity">{comp.similarity}% Similar</div>
              </div>

              <div className="comp-info">
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text3)', fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>
                    Funding Stage
                  </span>
                  <div style={{ color: 'var(--text)', fontWeight: '600', marginTop: '2px' }}>
                    {comp.stage}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text3)', fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>
                    Total Funding
                  </span>
                  <div style={{ color: 'var(--accent)', fontWeight: '700', marginTop: '2px' }}>
                    {comp.funding}
                  </div>
                </div>
              </div>

              <div className="comp-tags">
                {comp.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Market Position */}
        <div className="score-card" style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Market Position
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
                Competitive Advantage
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['AI-powered insights', 'Founder-focused UX', 'Real-time data'].map((item, i) => (
                  <li key={i} style={{ padding: '4px 0', fontSize: '13px', color: 'var(--text2)' }}>
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
                Market Gaps to Fill
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Affordable pricing', 'Offline functionality', 'Mobile-first design'].map((item, i) => (
                  <li key={i} style={{ padding: '4px 0', fontSize: '13px', color: 'var(--text2)' }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
