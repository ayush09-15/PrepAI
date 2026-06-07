const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
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


const generateFeedback = async (questions, answers, retries=3) => {
  try { const qa = questions.map((q, i) => 
    `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "No answer provided"}`
  ).join("\n\n");

  const prompt = `
    You are an expert interview coach. Review the following interview Q&A and provide one overall feedback summary.
    Include:
    - Overall performance assessment
    - Key strengths shown
    - Main areas to improve
    - A final tip

    Keep it concise, constructive and encouraging. Plain text, no markdown.

    ${qa}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}catch(err){
    if (retries > 0 && error.message.includes("503")) {
      console.log(`Retrying... attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return generateFeedback(questions, answers, retries - 1);
}
throw error;
};
}
module.exports = { generateQuestions, generateFeedback };