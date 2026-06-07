const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateQuestions = async (resumeText) => {
  const prompt = `
    Based on the following resume, generate 10 interview questions.
    Mix technical and behavioral questions relevant to the candidate's experience.
    Return ONLY a numbered list like:
    1. Question here
    2. Question here
    No extra text, no headings, just the numbered list.

    Resume:
    ${resumeText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};


module.exports = { generateQuestions };