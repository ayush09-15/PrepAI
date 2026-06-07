const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    questions: [
      {
        type: String,
      },
    ],

    answers: [
  {
    type: String,
  },
],

    resumeFile: {
  type: String,
},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    score: {
      type: Number,
      default: 0,
    },
    feedback: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);