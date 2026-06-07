import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api/authApi";
import "./Login.css"; 

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-panel">
        <div className="auth-panel-logo">Prep<span>AI</span></div>
        <h2>Your next offer <em>starts here</em></h2>
        <p>Create a free account and start generating personalised interview questions from your resume in minutes.</p>
        <div className="auth-panel-steps">
          <div className="auth-step">
            <div className="auth-step-num">1</div>
            Create your free account
          </div>
          <div className="auth-step">
            <div className="auth-step-num">2</div>
            Upload resume & set role
          </div>
          <div className="auth-step">
            <div className="auth-step-num">3</div>
            Ace your interviews
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="auth-form-area">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Create account</h1>
            <p>Already have one? <Link to="/login">Sign in</Link></p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p style={{ color: "var(--danger)", fontSize: "14px", marginBottom: "16px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;