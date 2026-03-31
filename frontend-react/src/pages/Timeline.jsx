import Sidebar from '../components/Sidebar';

export default function Timeline() {
  const phases = [
    {
      name: 'Foundation',
      timeline: '0-3 months',
      items: ['MVP development', 'Team building', 'Initial market research'],
    },
    {
      name: 'Launch',
      timeline: '3-6 months',
      items: ['Beta testing', 'Community building', 'Go-to-market strategy'],
    },
    {
      name: 'Growth',
      timeline: '6-12 months',
      items: ['Customer acquisition', 'Product iteration', 'Series A preparation'],
    },
    {
      name: 'Scale',
      timeline: '12+ months',
      items: ['Market expansion', 'Team scaling', 'Series A fundraising'],
    },
  ];

  return (
    <div className="dash-container">
      <Sidebar />
      <div className="dash-content">
        <div className="dash-header">
          <h1 className="dash-title">Growth Timeline</h1>
          <p className="dash-subtitle">Strategic roadmap for your startup journey</p>
        </div>

        {/* Timeline Phases */}
        <div className="timeline-phases">
          {phases.map((phase, idx) => (
            <div key={idx} className="phase-card">
              <div className="phase-number">{idx + 1}</div>
              <div className="phase-name">{phase.name}</div>
              <div className="phase-timeline">{phase.timeline}</div>
              <div className="phase-items">
                {phase.items.map((item, i) => (
                  <div key={i} className="phase-item">
                    <span className="phase-item-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Milestones */}
        <div className="score-card" style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
            Critical Milestones
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { month: 'Month 2', goal: 'Complete MVP with core features' },
              { month: 'Month 4', goal: 'Launch beta with first 100 users' },
              { month: 'Month 6', goal: 'Achieve product-market fit signals' },
              { month: 'Month 9', goal: 'Reach 1,000 active users' },
              { month: 'Month 12', goal: 'Hit $10K MRR milestone' },
              { month: 'Month 15', goal: 'Begin Series A fundraising' },
            ].map((milestone, i) => (
              <div
                key={i}
                style={{
                  padding: '14px',
                  borderLeft: '3px solid var(--accent)',
                  backgroundColor: 'var(--accent-bg)',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)', marginBottom: '4px' }}>
                  {milestone.month}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text2)' }}>
                  {milestone.goal}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Factors */}
        <div className="score-card" style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Success Factors
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'Maintain regular communication with early adopters',
              'Iterate product based on user feedback',
              'Focus on customer acquisition efficiency',
              'Build sustainable unit economics early',
              'Document and share your progress with investors',
            ].map((factor, i) => (
              <li key={i} style={{ padding: '10px 0', fontSize: '14px', color: 'var(--text2)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--accent)', fontWeight: '700', minWidth: '20px' }}>→</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
