import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page page-landing">
      <div className="hero-grid-bg"></div>
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Powered by GPT-4 + Market Intelligence
        </div>
        <h1 className="hero-h1">
          Validate your startup idea<br />
          <em>before you build it</em>
        </h1>
        <p className="hero-sub">
          CoFoundr AI analyzes market gaps, competitor landscapes, and growth trajectories —
          giving founders the insights they need to build with confidence.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/input')}>
            Analyze Idea →
          </button>
          <button className="btn-ghost" onClick={() => navigate('/dashboard')}>
            View Live Demo
          </button>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <div className="hstat-n">12,400+</div>
            <div className="hstat-l">Ideas analyzed</div>
          </div>
          <div className="hstat">
            <div className="hstat-n">3.2M</div>
            <div className="hstat-l">Data points indexed</div>
          </div>
          <div className="hstat">
            <div className="hstat-n">94%</div>
            <div className="hstat-l">Founder satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
