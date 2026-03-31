import Sidebar from '../components/Sidebar';

export default function Report() {
  return (
    <div className="dash-container">
      <Sidebar />
      <div className="dash-content">
        <div className="report-container">
          <div className="report-header">
            <h1 className="report-title">Full Analysis Report</h1>
            <p className="report-subtitle">
              Comprehensive startup validation analysis with market intelligence and recommendations
            </p>
          </div>

          {/* Executive Summary */}
          <div className="report-section">
            <h2 className="section-title">Executive Summary</h2>
            <div className="section-content">
              <p>
                This report provides a comprehensive analysis of your startup validation platform targeting
                solo founders and early-stage startups. The analysis combines market intelligence, competitive
                positioning, and growth projections to deliver a holistic view of your opportunity.
              </p>
              <p style={{ marginTop: '12px' }}>
                Overall Viability Score: <strong style={{ color: 'var(--accent)' }}>78/100</strong> — Your startup
                shows strong fundamentals with a proven market need, differentiated approach, and experienced team.
              </p>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="report-section">
            <h2 className="section-title">Market Analysis</h2>
            <div className="section-content">
              <p>Market Size & Growth</p>
              <div className="report-kpi-grid">
                <div className="kpi-box">
                  <div className="kpi-value">$2.4B</div>
                  <div className="kpi-label">TAM</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-value">24%</div>
                  <div className="kpi-label">Growth</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-value">1.2K</div>
                  <div className="kpi-label">Companies</div>
                </div>
              </div>

              <p style={{ marginTop: '16px' }}>Key Market Drivers</p>
              <ul className="section-list">
                <li>Increasing founder awareness of importance of validation before building</li>
                <li>Rising venture capital activity creating more founders annually</li>
                <li>Growing ecosystem of startup accelerators and incubators</li>
                <li>Demand for AI-powered insights and real-time market intelligence</li>
                <li>Globalization of startup movement creating worldwide opportunity</li>
              </ul>
            </div>
          </div>

          {/* Competitive Landscape */}
          <div className="report-section">
            <h2 className="section-title">Competitive Landscape</h2>
            <div className="section-content">
              <p>Direct Competitors Identified: 6</p>
              <p style={{ marginTop: '12px', marginBottom: '12px' }}>
                Primary competitors include Startup.ai (92% similarity), IdeaVault (78%), and ValidateHub (65%).
                However, none have achieved complete market dominance, creating opportunity for differentiation.
              </p>

              <div className="report-kpi-grid">
                <div className="kpi-box">
                  <div className="kpi-value">4.2</div>
                  <div className="kpi-label">Saturation</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-value">Moderate</div>
                  <div className="kpi-label">Competition</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-value">High</div>
                  <div className="kpi-label">Opportunity</div>
                </div>
              </div>

              <p style={{ marginTop: '16px' }}>Your Competitive Advantages</p>
              <ul className="section-list">
                <li>AI-powered analysis providing instant, actionable insights</li>
                <li>Founder-first approach and user experience design</li>
                <li>Real-time market data integration with proprietary models</li>
                <li>Seamless integration with founder tools ecosystem</li>
              </ul>
            </div>
          </div>

          {/* Business Model */}
          <div className="report-section">
            <h2 className="section-title">Business Model & Pricing</h2>
            <div className="section-content">
              <p>Recommended Business Model: Freemium SaaS</p>
              <ul className="section-list">
                <li>Free Tier: 1 analysis per month, basic market data</li>
                <li>Pro Tier ($99/month): Unlimited analyses, advanced insights, integrations</li>
                <li>Enterprise: Custom pricing for teams and corporations</li>
              </ul>

              <p style={{ marginTop: '16px' }}>Financial Projections (18 months)</p>
              <div className="report-kpi-grid">
                <div className="kpi-box">
                  <div className="kpi-value">$24K</div>
                  <div className="kpi-label">Current MRR</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-value">40%</div>
                  <div className="kpi-label">MoM Growth</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-value">$500K</div>
                  <div className="kpi-label">Projected ARR</div>
                </div>
              </div>
            </div>
          </div>

          {/* Go-To-Market Strategy */}
          <div className="report-section">
            <h2 className="section-title">Go-To-Market Strategy</h2>
            <div className="section-content">
              <p>Primary Channels</p>
              <ul className="section-list">
                <li>Founder communities (Reddit, Slack groups, Twitter)</li>
                <li>Startup accelerators and incubators (partnership model)</li>
                <li>Content marketing targeting founder pain points</li>
                <li>API integrations with founder tools (Notion, Slack, etc.)</li>
                <li>Influencer partnerships with prominent founders</li>
              </ul>

              <p style={{ marginTop: '16px' }}>Customer Acquisition Strategy</p>
              <ul className="section-list">
                <li>Initial 1,000 users through accelerator partnerships</li>
                <li>Viral loops incentivizing referrals</li>
                <li>Free tier driving freemium conversions</li>
                <li>Enterprise deals with accelerators and VCs</li>
              </ul>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="report-section">
            <h2 className="section-title">Risk Assessment</h2>
            <div className="section-content">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--amber)', marginBottom: '8px' }}>
                    ⚠️ Medium Risks
                  </div>
                  <ul className="section-list">
                    <li>Market education needed for adoption</li>
                    <li>Data accuracy and updates required</li>
                    <li>Competitive response from larger players</li>
                  </ul>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--green)', marginBottom: '8px' }}>
                    ✓ Low Risks
                  </div>
                  <ul className="section-list">
                    <li>Technical feasibility proven</li>
                    <li>Team has prior exit experience</li>
                    <li>Proven product-market fit signals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="report-section">
            <h2 className="section-title">Strategic Recommendations</h2>
            <div className="section-content">
              <ul className="section-list">
                <li>Focus on retention and expansion revenue before aggressive acquisition</li>
                <li>Build partnerships with top accelerators (Y Combinator, Techstars, etc.)</li>
                <li>Expand data integrations to cover emerging markets and verticals</li>
                <li>Consider horizontal expansion beyond startup validation</li>
                <li>Plan Series A fundraising for Q3 2024 with $1.5M target</li>
              </ul>
            </div>
          </div>

          {/* Conclusion */}
          <div className="report-section">
            <h2 className="section-title">Conclusion</h2>
            <div className="section-content">
              <p>
                Your startup idea demonstrates strong market fundamentals, clear competitive advantages, and a
                proven ability to execute. With a $2.4B TAM growing at 24% annually, low market saturation,
                and proven product-market fit, you are well-positioned for significant growth and venture backing.
              </p>
              <p style={{ marginTop: '12px' }}>
                The key to success lies in focused customer acquisition through accelerator partnerships,
                maintaining product-market fit through continuous iteration, and building a team capable of
                scaling operations to meet growing demand.
              </p>
            </div>
          </div>

          {/* Document Footer */}
          <div style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            fontSize: '12px',
            color: 'var(--text3)',
            textAlign: 'center'
          }}>
            <p>CoFoundr AI — Automated Startup Validation Analysis</p>
            <p style={{ marginTop: '4px' }}>Generated using GPT-4 + Market Intelligence Database</p>
            <p style={{ marginTop: '4px' }}>Last Updated: March 31, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
