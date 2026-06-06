const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generateQuestions = async (
  resumeText
) => {
  const prompt = `
You are a technical interviewer.

Based on the resume below, generate 10 interview questions.

Resume:
${resumeText}

Return only the questions.
`;

  const result =
    await model.generateContent(
      prompt
    );

  return result.response.text();
};

module.exports = {
  generateQuestions,
};