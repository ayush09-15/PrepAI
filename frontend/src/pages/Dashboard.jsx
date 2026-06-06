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
    <div>
      <h1>Dashboard</h1>

      <h2>
        Total Interviews:
        {totalInterviews}
      </h2>

      <h2>
        Completed:
        {completed}
      </h2>

      <h2>
  Pending:
  {pending}
</h2>

<h2>My Interviews</h2>

{interviews.map((interview) => (
  <div
    key={interview._id}
    style={{
      border: "1px solid gray",
      padding: "10px",
      marginBottom: "10px",
    }}
  >
    <h3>{interview.title}</h3>

    <p>
      Status: {interview.status}
    </p>

    <p>
      Difficulty:
      {" "}
      {interview.difficulty}
    </p>

    <button
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
  onClick={handleLogout}
>
  Logout
</button>
    </div>
  );
}

export default Dashboard;