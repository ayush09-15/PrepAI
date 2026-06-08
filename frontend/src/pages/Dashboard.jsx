import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaCheckCircle, FaClock, FaBriefcase } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserInterviews, deleteInterview } from "../services/api/interviewApi";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
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

  //const totalInterviews = interviews.length;
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


  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this interview?")) return;
  try {
    await deleteInterview(id);
    setInterviews((prev) => prev.filter((i) => i._id !== id));
    toast.success("Interview deleted!");
  } catch (error) {
    toast.error("Failed to delete interview.");
  }
};

const getChartData = () => {
  const weeks = {};

  interviews.forEach((interview) => {
    const date = new Date(interview.createdAt);
    const week = `Week ${Math.ceil(date.getDate() / 7)}`;
    
    if (!weeks[week]) {
      weeks[week] = { week, completed: 0, pending: 0 };
    }

    if (interview.status === "Completed") {
      weeks[week].completed += 1;
    } else {
      weeks[week].pending += 1;
    }
  });

  return Object.values(weeks);
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

        {/* Progress Chart */}
{interviews.length > 0 && (
  <div style={{
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "28px",
    marginBottom: "40px",
  }}>
    <h2 style={{
      fontFamily: "var(--font-display)",
      fontSize: "1.2rem",
      fontWeight: 700,
      marginBottom: "24px",
    }}>
      Progress Overview
    </h2>

    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={getChartData()} barGap={8}>
        <XAxis
          dataKey="week"
          stroke="var(--text-muted)"
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--text-muted)"
          fontSize={13}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--text-primary)",
            fontSize: "13px",
          }}
          cursor={{ fill: "rgba(99,120,255,0.05)" }}
        />
        <Legend
    wrapperStyle={{
      fontSize: "13px",
      color: "var(--text-secondary)",
      paddingTop: "16px",
    }}
  />
        <Bar
          dataKey="completed"
          fill="var(--success)"
          radius={[6, 6, 0, 0]}
          name="Completed"
        />
        <Bar
          dataKey="pending"
          fill="var(--accent)"
          radius={[6, 6, 0, 0]}
          name="Pending"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
)}

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
                  <button
    className="btn btn-danger"
    onClick={() => handleDelete(interview._id)}
  >
    Delete
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