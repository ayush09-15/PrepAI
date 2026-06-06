import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import "./Dashboard.css";
import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getUserInterviews,
} from "../services/api/interviewApi";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { logout } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const [interviews,
    setInterviews] =
    useState([]);

  useEffect(() => {
    const fetchInterviews =
      async () => {
        try {
          const response =
            await getUserInterviews();

          setInterviews(
            response.interviews
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchInterviews();
  }, []);

  const totalInterviews =
    interviews.length;

  const completed =
    interviews.filter(
      (i) =>
        i.status ===
        "Completed"
    ).length;

  const pending =
    interviews.filter(
      (i) =>
        i.status ===
        "Pending"
    ).length;

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

return (
  <div className="dashboard-container">
    <h1>Dashboard</h1>

    <div className="stats-container">
  <div className="stat-card">
    <FaClipboardList
      className="stat-icon"
    />

    <h3>Total Interviews</h3>

    <p>{totalInterviews}</p>
  </div>

  <div className="stat-card">
    <FaCheckCircle
      className="stat-icon"
    />

    <h3>Completed</h3>

    <p>{completed}</p>
  </div>

  <div className="stat-card">
    <FaClock
      className="stat-icon"
    />

    <h3>Pending</h3>

    <p>{pending}</p>
  </div>
</div>

    <h2>My Interviews</h2>

    {interviews.map((interview) => (
      <div
  key={interview._id}
  className="interview-card"
>
  <div className="card-header">
    <h3>
      {interview.title}
    </h3>

    <span
      className={
        interview.status ===
        "Completed"
          ? "badge completed"
          : "badge pending"
      }
    >
      {interview.status}
    </span>
  </div>

  <p>
    Role:
    {" "}
    {interview.role}
  </p>

  <p>
    Difficulty:
    {" "}
    {interview.difficulty}
  </p>

  <button
    className="view-btn"
    onClick={() =>
      navigate(
        `/interviews/${interview._id}`
      )
    }
  >
    View Details
  </button>
</div>
    ))}

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
);

}

export default Dashboard;