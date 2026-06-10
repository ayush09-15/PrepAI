import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          <div style={{ width: 40, height: 40, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          Loading profile…
        </div>
      </div>
    );
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Topbar */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-secondary)", position: "sticky", top: 0, zIndex: 50
      }}>
        <Link to="/" style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, textDecoration: "none", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
          Prep<span style={{ color: "var(--accent)" }}>AI</span>
        </Link>
        <button className="btn btn-ghost" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </header>

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "56px 32px" }}>
        {/* Avatar and name */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800,
            color: "white", margin: "0 auto 20px",
          }}>
            {user.name?.[0]?.toUpperCase()}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 6 }}>
            {user.name}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            {user.email}
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {/* Member since */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "24px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
                Member Since
              </p>
              <p style={{ fontSize: 18, fontWeight: 600 }}>{memberSince}</p>
            </div>
            <span style={{ fontSize: 28 }}>📅</span>
          </div>

          {/* Email */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "24px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
                Email
              </p>
              <p style={{ fontSize: 18, fontWeight: 600 }}>{user.email}</p>
            </div>
            <span style={{ fontSize: 28 }}>📧</span>
          </div>

          {/* Account status */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "24px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
                Account Status
              </p>
              <p style={{ fontSize: 18, fontWeight: 600, color: "var(--success)" }}>✓ Active</p>
            </div>
            <span style={{ fontSize: 28 }}>🔒</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/dashboard" style={{ flex: 1 }}>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Go to Dashboard
            </button>
          </Link>
          <button className="btn btn-danger" onClick={handleLogout} style={{ flex: 1, justifyContent: "center" }}>
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;