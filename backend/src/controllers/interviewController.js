const path = require("path");

const {
  generateQuestions,
} = require("../services/geminiService");

const {
  extractTextFromPDF,
} = require("../services/pdfService");
const Interview = require("../models/Interview");

const createInterview = async (req, res) => {
  try {
    const { title, role, difficulty } = req.body;

    const interview = await Interview.create({
      title,
      role,
      difficulty,
      user: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const uploadResume = async (
  req,
  res
) => {
  try {
    const {
  title,
  role,
  difficulty,
} = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file required",
      });
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      req.file.filename
    );

    const resumeText =
      await extractTextFromPDF(
        filePath
      );
      const questions =
  await generateQuestions(
    resumeText
  );
  const interview =
  await Interview.create({
    title,
    role,
    difficulty,
    questions:
      typeof questions === "string"
        ? questions
            .split("\n")
            .filter((q) => q.trim())
        : [],
    resumeFile: req.file.filename,
    user: req.user.userId,
  });

    res.status(200).json({
  success: true,
  message:
    "Resume uploaded successfully",
  interview,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const submitInterview = async (
  req,
  res
) => {
  try {
    const { answers } = req.body;

    const interview =
      await Interview.findByIdAndUpdate(
        req.params.id,
        {
          answers,
          status: "Completed",
        },
        { new: true }
      );

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserInterviews = async (
  req,
  res
) => {
  try {
    const interviews =
      await Interview.find({
        user: req.user.userId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInterviewById = async (
  req,
  res
) => {
  try {
    const interview =
  await Interview.findOne({
    _id: req.params.id,
    user: req.user.userId,
  });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message:
          "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createInterview,
  uploadResume,
  submitInterview,
  getUserInterviews,
  getInterviewById,
};