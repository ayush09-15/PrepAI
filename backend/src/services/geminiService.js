const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generateQuestions = async () => {
  return `
1. What is JavaScript hoisting?
2. What is a closure?
3. Explain promises.
4. What is the event loop?
5. Difference between let and const?
`;
};

module.exports = {
  generateQuestions,
};