import "./Interview.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadResume, submitInterview } from "../services/api/interviewApi";
import toast from "react-hot-toast";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function Interview() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [interviewId, setInterviewId] = useState("");
  const [answers, setAnswers] = useState([]);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ title: "", role: "", difficulty: "Medium" });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) { setError("Please upload your resume (PDF)."); return; }
    setError("");
    setLoading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("resume", resume);
      uploadData.append("title", formData.title);
      uploadData.append("role", formData.role);
      uploadData.append("difficulty", formData.difficulty);
      const response = await uploadResume(uploadData);
      setQuestions(response.interview.questions);
      setInterviewId(response.interview._id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate questions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    try {
      const cleanedAnswers = questions.map((_, i) => answers[i] || "");
      console.log("Submitting interview:", interviewId, answers);
      await submitInterview(interviewId, answers);
      toast.success("Interview submitted!");
      setSubmitted(true);
    } catch (err) {
      console.error("submit error: ", err);
    }
  };

  if (submitted) {
    return (
      <div className="interview-page">
        <div className="active-interview" style={{ textAlign: "center", paddingTop: "100px" }}>
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "12px" }}>
            Interview Submitted!
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
            Great work! Your answers have been recorded.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page">
      {/* Topbar */}
      <header className="interview-topbar">
        <Link to="/dashboard" className="interview-topbar-logo">Prep<span>AI</span></Link>
        <Link to="/dashboard">
          <button className="btn btn-ghost">← Dashboard</button>
        </Link>
      </header>

      {/* Setup Form */}
      {!started && questions.length === 0 && (
        <div className="interview-content">
          <div className="interview-page-header">
            <h1>New Interview</h1>
            <p>Upload your resume and let AI craft personalized questions</p>
          </div>

          <div className="setup-card">
            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label>Interview Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Google SWE Interview Prep"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-group">
                <label>Target Role</label>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Frontend Engineer, Product Manager"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-group">
                <label>Difficulty</label>
                <div className="difficulty-selector">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, difficulty: d }))}
                      className={`difficulty-btn ${formData.difficulty === d ? `active-${d.toLowerCase()}` : ""}`}
                    >
                      {d === "Easy" && "🟢 "}{d === "Medium" && "🟡 "}{d === "Hard" && "🔴 "}
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-group">
                <label>Resume (PDF)</label>
                <div className={`file-upload-area ${resume ? "has-file" : ""}`}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                  <div className="file-upload-icon">📄</div>
                  <p>Drag & drop or click to upload</p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>PDF only, max 5MB</p>
                  {resume && <p className="file-name">✓ {resume.name}</p>}
                </div>
              </div>

              {error && (
                <p style={{ color: "var(--danger)", fontSize: "14px", marginBottom: "16px" }}>
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn-primary setup-submit" disabled={loading}>
                {loading ? "Generating Questions…" : "Generate Interview Questions →"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Generating loader */}
      {loading && (
        <div className="interview-content">
          <div className="generating-state">
            <div className="generating-spinner" />
            <h2>Analyzing your resume…</h2>
            <p>AI is crafting personalized questions for {formData.role}</p>
          </div>
        </div>
      )}

      {/* Questions Preview */}
      {questions.length > 0 && !started && (
        <div className="interview-content">
          <div className="questions-preview">
            <div className="questions-preview-header">
              <h2>Generated Questions</h2>
              <span className="q-count">{questions.length} questions</span>
            </div>
            <div className="questions-list">
              {questions.map((q, i) => (
                <div key={i} className="question-preview-item">
                  <div className="q-num">{i + 1}</div>
                  <p>{q}</p>
                </div>
              ))}
            </div>
            <div className="questions-preview-footer">
              <button className="btn btn-primary" onClick={() => setStarted(true)}>
                Start Interview →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Interview */}
      {started && (
        <div className="active-interview">
          <div className="interview-progress-header">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="question-card">
            <div className="question-label">Question {currentQuestion + 1}</div>
            <p className="question-text">{questions[currentQuestion]}</p>
          </div>

          <div className="answer-card">
            <label>Your Answer</label>
            <textarea
              className="answer-box"
              placeholder="Type your answer here…"
              value={answers[currentQuestion] || ""}
              onChange={(e) => {
                const updated = [...answers];
                updated[currentQuestion] = e.target.value;
                setAnswers(updated);
              }}
            />
          </div>

          <div className="interview-nav">
            <button
              className="btn btn-ghost"
              onClick={() => setCurrentQuestion((p) => p - 1)}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQuestion((p) => p + 1)}
              >
                Next →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleFinish}>
                Submit Interview ✓
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Interview;