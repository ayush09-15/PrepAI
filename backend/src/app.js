const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const interviewRoutes = require(
  "./routes/interviewRoutes"
);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Interview API Running");
});

app.use("/api/auth", authRoutes);

app.use(
  "/api/interviews",
  interviewRoutes
);

module.exports = app;