import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getInterviewById } from "../services/api/interviewApi";

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterviewById(id);
        setInterview(response.interview);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          <div style={{ width: 40, height: 40, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          Loading interview…
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", color: "var(--text-secondary)" }}>
        Interview not found. <Link to="/dashboard" style={{ color: "var(--accent)", marginLeft: 8 }}>Go back</Link>
      </div>
    );
  }

  const difficultyColor = interview.difficulty === "Easy"
    ? "var(--success)" : interview.difficulty === "Hard"
    ? "var(--danger)" : "var(--warning)";

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

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 32px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{
              padding: "4px 12px", borderRadius: 100, fontSize: 13, fontWeight: 600,
              background: interview.status === "Completed" ? "rgba(34,211,160,0.1)" : "rgba(245,158,11,0.1)",
              color: interview.status === "Completed" ? "var(--success)" : "var(--warning)",
              border: `1px solid ${interview.status === "Completed" ? "rgba(34,211,160,0.25)" : "rgba(245,158,11,0.25)"}`
            }}>
              {interview.status === "Completed" ? "✓ " : "○ "}{interview.status}
            </span>
            <span style={{ color: difficultyColor, fontSize: 13, fontWeight: 600 }}>
              ◆ {interview.difficulty}
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>
            {interview.title}
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>🧑‍💼 {interview.role}</p>
        </div>

        {/* Score card */}
        {interview.status === "Completed" && (
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "28px 32px",
            display: "flex", alignItems: "center", gap: 24, marginBottom: 32
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%", flexShrink: 0,
              background: `conic-gradient(var(--accent) ${interview.score * 3.6}deg, var(--bg-secondary) 0)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative"
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                background: "var(--bg-card)", display: "flex", alignItems: "center",
                justifyContent: "center", fontFamily: "var(--font-display)",
                fontWeight: 800, fontSize: 18
              }}>
                {interview.score}%
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>
                Completion Score
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                You answered {interview.answers?.filter(a => a && a.trim()).length || 0} of {interview.questions.length} questions
              </p>
            </div>
          </div>
        )}

        {/* Q&A list */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>
          Questions & Answers
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {interview.questions.map((question, index) => (
            <div key={index} style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", overflow: "hidden"
            }}>
              {/* Question */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                  Q{index + 1}
                </div>
                <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.65 }}>{question}</p>
              </div>
              {/* Answer */}
              <div style={{ padding: "20px 24px", background: "var(--bg-secondary)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
                  Your Answer
                </div>
                <p style={{
                  fontSize: 14, lineHeight: 1.7,
                  color: interview.answers?.[index] ? "var(--text-secondary)" : "var(--text-muted)",
                  fontStyle: interview.answers?.[index] ? "normal" : "italic"
                }}>
                  {interview.answers?.[index] || "No answer provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default InterviewDetails;