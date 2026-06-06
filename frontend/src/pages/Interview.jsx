import { useState } from "react";
import {
  uploadResume,
  submitInterview,
} from "../services/api/interviewApi";

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
    <div>
      <h1>Create Interview</h1>

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
        <div>
          <h2>
            Question{" "}
            {currentQuestion +
              1}
          </h2>

          <p>
            {
              questions[
                currentQuestion
              ]
            }
          </p>

          <textarea
            rows="5"
            cols="50"
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

          <div>
            <button
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