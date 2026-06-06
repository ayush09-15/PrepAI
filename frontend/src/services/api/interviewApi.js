import axios from "axios";

const API_URL =
  "http://localhost:8000/api/interviews";

export const uploadResume =
  async (formData) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API_URL}/upload-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const submitInterview =
  async (
    interviewId,
    answers
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API_URL}/${interviewId}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };