const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require(
  "../middlewares/authMiddleware"
);

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

const User = require("../models/user");

router.get(
  "/profile",
  protect,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select("-password");
      
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;