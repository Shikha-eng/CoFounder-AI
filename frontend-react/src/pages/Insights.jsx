import Sidebar from '../components/Sidebar';
import { MarketShareChart } from '../components/Charts';

export default function Insights() {
  return (
    <div className="dash-container">
      <Sidebar />
      <div className="dash-content">
        <div className="dash-header">
          <h1 className="dash-title">Market Insights</h1>
          <p className="dash-subtitle">Comprehensive market intelligence for your category</p>
        </div>

        {/* Market Share Chart */}
        <div className="chart-container">
          <h3 className="chart-title">Market Share Distribution</h3>
          <MarketShareChart />
        </div>

        {/* Market Stats */}
        <div className="insights-header" style={{ display: 'flex', gap: '20px', justifyContent: 'space-around' }}>
          <div className="insight-stat">
            <div className="insight-value">$2.4B</div>
            <div className="insight-label">Total Addressable Market</div>
          </div>
          <div className="insight-stat">
            <div className="insight-value">24%</div>
            <div className="insight-label">Annual Growth Rate</div>
          </div>
          <div className="insight-stat">
            <div className="insight-value">1.2K</div>
            <div className="insight-label">Active Companies</div>
          </div>
          <div className="insight-stat">
            <div className="insight-value">$48M</div>
            <div className="insight-label">Annual Funding</div>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-title">🎯 Market Opportunity</div>
            <div className="insight-text">
              The market for startup validation tools is experiencing rapid growth, driven by increasing founder awareness and the need for data-driven decision making.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-title">📊 Customer Trends</div>
            <div className="insight-text">
              Solo founders and early-stage startups are actively seeking tools to validate ideas before raising capital. SaaS adoption is accelerating across the segment.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-title">💡 Innovation Focus</div>
            <div className="insight-text">
              AI-powered analysis and real-time market intelligence are becoming table stakes. Integration with popular founder tools is increasingly expected.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-title">🌍 Geographic Growth</div>
            <div className="insight-text">
              Emerging markets in Southeast Asia and Latin America show the highest growth potential. North America remains the largest but most competitive region.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-title">💰 Pricing Trends</div>
            <div className="insight-text">
              Most successful competitors use freemium or subscription-based models. Average contract value ranges from $500-5000 annually per founder.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-title">📈 Growth Catalysts</div>
            <div className="insight-text">
              Increased venture capital activity, startup accelerators, and growing founder communities create tailwinds for market expansion and customer acquisition.
            </div>
          </div>
        </div>

        {/* Market Saturation */}
        <div className="score-card" style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Market Saturation Index
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--amber)', marginBottom: '8px' }}>
                4.2/10
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: '500' }}>
                Overall Saturation
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--green)', marginBottom: '8px' }}>
                ✓ Moderate
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: '500' }}>
                Competition Level
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent)', marginBottom: '8px' }}>
                2024
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: '500' }}>
                Market Entry Window
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
