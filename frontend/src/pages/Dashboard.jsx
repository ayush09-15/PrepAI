import { FaClipboardList, FaCheckCircle, FaClock, FaBriefcase } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserInterviews } from "../services/api/interviewApi";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await getUserInterviews();
        setInterviews(response.interviews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const totalInterviews = interviews.length;
  const completed = interviews.filter((i) => i.status === "Completed").length;
  const pending = interviews.filter((i) => i.status === "Pending").length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const difficultyClass = (d) => {
    if (d === "Easy") return "difficulty-easy";
    if (d === "Hard") return "difficulty-hard";
    return "difficulty-medium";
  };

  return (
    <div className="dashboard-page">
      {/* Topbar */}
      <header className="dashboard-topbar">
        <Link to="/" className="topbar-logo">Prep<span>AI</span></Link>
        <div className="topbar-actions">
          <Link to="/interview">
            <button className="btn btn-primary">+ New Interview</button>
          </Link>
          <div className="topbar-user">
            <div className="topbar-avatar">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <button className="btn btn-ghost" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Track your interview preparation progress</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <FaClipboardList />
            </div>
            <h3>Total</h3>
            <div className="stat-value">{totalInterviews}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <FaCheckCircle />
            </div>
            <h3>Completed</h3>
            <div className="stat-value">{completed}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <FaClock />
            </div>
            <h3>Pending</h3>
            <div className="stat-value">{pending}</div>
          </div>
        </div>

        {/* Interview list */}
        <div className="section-heading">
          <h2>My Interviews</h2>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-secondary)" }}>Loading…</p>
        ) : interviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>No interviews yet</h3>
            <p>Create your first interview to start practicing</p>
            <Link to="/interview">
              <button className="btn btn-primary">Start Your First Interview</button>
            </Link>
          </div>
        ) : (
          <div className="interviews-list">
            {interviews.map((interview) => (
              <div key={interview._id} className="interview-card">
                <div className="interview-card-icon">
                  <FaBriefcase />
                </div>
                <div className="interview-card-body">
                  <h3>{interview.title}</h3>
                  <div className="interview-card-meta">
                    <span>🧑‍💼 {interview.role}</span>
                    <span className={difficultyClass(interview.difficulty)}>
                      ◆ {interview.difficulty}
                    </span>
                    {interview.status === "Completed" && (
                      <span>📊 Score: {interview.score}%</span>
                    )}
                  </div>
                </div>
                <div className="interview-card-actions">
                  <span className={`badge ${interview.status === "Completed" ? "badge-completed" : "badge-pending"}`}>
                    {interview.status === "Completed" ? "✓" : "○"} {interview.status}
                  </span>
                  <button
                    className="btn btn-ghost"
                    onClick={() => navigate(`/interviews/${interview._id}`)}
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;