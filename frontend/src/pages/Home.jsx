import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-nav">
        <Link to="/" className="logo">
          Prep<span>AI</span>
        </Link>
        <div className="home-nav-links">
          <Link to="/login">
            <button className="btn btn-ghost">Sign In</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-badge">
          <span className="dot" />
          AI-Powered Interview Practice
        </div>

        <h1>
          Land Your Dream Job<br />
          <span className="highlight">With Confidence</span>
        </h1>

        <p>
          Upload your resume, get AI-generated questions tailored to your
          experience, and practice like it's the real thing.
        </p>

        <div className="home-cta">
          <Link to="/register">
            <button className="btn btn-primary">Start Practicing Free →</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-ghost">Sign In</button>
          </Link>
        </div>
      </section>

      {/* Feature chips */}
      <div className="home-features">
        <div className="feature-chip">
          <span className="icon">📄</span> Resume-based questions
        </div>
        <div className="feature-chip">
          <span className="icon">🤖</span> Gemini AI powered
        </div>
        <div className="feature-chip">
          <span className="icon">📊</span> Track your progress
        </div>
        <div className="feature-chip">
          <span className="icon">🎯</span> Role-specific prep
        </div>
      </div>
    </div>
  );
}

export default Home;