import "./Interview.css";
import { useState } from "react";
import {
  uploadResume,
  submitInterview,
} from "../services/api/interviewApi";
import { FaAlignCenter } from "react-icons/fa";

function Interview() {
  const [questions, setQuestions] =
    useState([]);

  const [interviewId,
    setInterviewId] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  const [started, setStarted] =
    useState(false);

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);

  const [formData, setFormData] =
    useState({
      title: "",
      role: "",
      difficulty: "Medium",
    });

  const [resume, setResume] =
    useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadData =
        new FormData();

      uploadData.append(
        "resume",
        resume
      );

      uploadData.append(
        "title",
        formData.title
      );

      uploadData.append(
        "role",
        formData.role
      );

      uploadData.append(
        "difficulty",
        formData.difficulty
      );

      const response =
        await uploadResume(
          uploadData
        );

      setQuestions(
        response.interview.questions
      );

      setInterviewId(
        response.interview._id
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="interview-container">
      <h1>Create Interview</h1>
      <p className="interview-subtitle">
       Upload your resume and
       generate personalized
       interview questions
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Interview Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="difficulty"
          value={
            formData.difficulty
          }
          onChange={handleChange}
        >
          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>

        <br />
        <br />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setResume(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        <button type="submit">
          Create Interview
        </button>
      </form>

      {questions.length > 0 &&
        !started && (
          <div>
            <h2>
              Generated Questions
            </h2>

            <ol>
              {questions.map(
                (
                  question,
                  index
                ) => (
                  <li
                    key={index}
                  >
                    {question}
                  </li>
                )
              )}
            </ol>

            <button
              onClick={() =>
                setStarted(
                  true
                )
              }
            >
              Start Interview
            </button>
          </div>
        )}

      {started && (
        <div className="question-card">
          <h2>
  Question {currentQuestion + 1}
  of {questions.length}
</h2>
<div className="progress-bar">
  <div
    className="progress-fill"
    style={{
      width: `${
        ((currentQuestion + 1) /
          questions.length) *
        100
      }%`,
    }}
  ></div>
</div>

          <p>
            {
              questions[
                currentQuestion
              ]
            }
          </p>

          <textarea
            className="answer-box"
            placeholder="Type your answer..."
            value={
              answers[
                currentQuestion
              ] || ""
            }
            onChange={(e) => {
              const updatedAnswers =
                [...answers];

              updatedAnswers[
                currentQuestion
              ] =
                e.target.value;

              setAnswers(
                updatedAnswers
              );
            }}
          />

          <br />
          <br />

          <div
  style={{
    display: "flex",
    justifyContent:
      "space-between",
    marginTop: "20px",
  }}
>
            <button
            className="nav-btn"
  onClick={() => {
    if (
      currentQuestion > 0
    ) {
      setCurrentQuestion(
        (prev) => prev - 1
      );
    }
  }}
  disabled={
    currentQuestion === 0
  }
>
   Previous Question
</button>

            {" "}

            {currentQuestion <
            questions.length -
              1 ? (
              <button
              className="nav-btn"
                onClick={() =>
                  setCurrentQuestion(
                    (
                      prev
                    ) =>
                      prev + 1
                  )
                }
              >
                Next Question
              </button>
            ) : (
              <button
              className="nav-btn"
                onClick={async () => {
                  try {
                    const response =
                      await submitInterview(
                        interviewId,
                        answers
                      );

                    console.log(
                      response
                    );

                    alert(
                      "Interview submitted successfully!"
                    );
                  } catch (
                    error
                  ) {
                    console.error(
                      error
                    );
                  }
                }}
              >
                Submit Interview
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Interview;