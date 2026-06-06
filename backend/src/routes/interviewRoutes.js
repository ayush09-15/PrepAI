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

module.exports = router;