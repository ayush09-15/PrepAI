const express = require("express");

const protect = require(
  "../middlewares/authMiddleware"
);

const {
  createInterview,
} = require(
  "../controllers/interviewController"
);

const router = express.Router();

router.post(
  "/",
  protect,
  createInterview
);

module.exports = router;