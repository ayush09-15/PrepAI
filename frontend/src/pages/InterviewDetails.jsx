import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewById } from "../services/api/interviewApi";

function InterviewDetails() {
  const { id } = useParams();

  const [interview, setInterview] =
    useState(null);

  useEffect(() => {
    const fetchInterview =
      async () => {
        try {
          const response =
            await getInterviewById(id);

          setInterview(
            response.interview
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchInterview();
  }, [id]);

  if (!interview) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>
        {interview.title}
      </h1>

      <p>
        Status: {interview.status}
      </p>
      <p>
  Score: {interview.score}
</p>

      <p>
        Difficulty:
        {interview.difficulty}
      </p>

      <h2>Questions & Answers</h2>

      {interview.questions.map(
        (question, index) => (
          <div key={index}>
            <h4>
              {question}
            </h4>

            <p>
              Answer:
              {" "}
              {interview
                .answers?.[index] ||
                "No answer"}
            </p>

            <hr />
          </div>
        )
      )}
    </div>
  );
}

export default InterviewDetails;