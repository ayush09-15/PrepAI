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

module.exports = {
  createInterview,
};