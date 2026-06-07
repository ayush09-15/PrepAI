const express = require("express");

const protect = require(
  "../middlewares/authMiddleware"
);


const upload = require(
  "../middlewares/uploadMiddleware"
);

const {
  createInterview,
  uploadResume,
  submitInterview,
  getUserInterviews,
  getInterviewById,
  deleteInterview,
} = require(
  "../controllers/interviewController"
);

const router = express.Router();

router.post(
  "/",
  protect,
  createInterview
);

router.get(
  "/",
  protect,
  getUserInterviews
);

router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

router.post(
  "/:id/submit",
  protect,
  submitInterview
);

router.get(
  "/:id",
  protect,
  getInterviewById
);

router.delete(
  "/:id",
  protect,
  deleteInterview
);

module.exports = router;