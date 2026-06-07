import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api/authApi";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const data = await loginUser(formData);
      login(data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-panel">
        <div className="auth-panel-logo">Prep<span>AI</span></div>
        <h2>Practice makes <em>perfect</em></h2>
        <p>Sign in to continue your interview preparation journey.</p>
        <div className="auth-panel-steps">
          <div className="auth-step">
            <div className="auth-step-num">1</div>
            Upload your resume
          </div>
          <div className="auth-step">
            <div className="auth-step-num">2</div>
            Get AI-generated questions
          </div>
          <div className="auth-step">
            <div className="auth-step-num">3</div>
            Practice and track progress
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="auth-form-area">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Welcome back</h1>
            <p>Don't have an account? <Link to="/register">Sign up free</Link></p>
          </div>

          <form onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                autoComplete="current-password"
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
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;