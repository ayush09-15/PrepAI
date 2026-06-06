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
} = require(
  "../controllers/interviewController"
);

const router = express.Router();

router.post(
  "/",
  protect,
  createInterview
);

router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;