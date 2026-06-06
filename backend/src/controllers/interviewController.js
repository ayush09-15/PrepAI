const path = require("path");

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

    res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully",
      file: req.file.filename,
      resumeText,
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
};