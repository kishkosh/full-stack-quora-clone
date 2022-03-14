const express = require("express");
const router = express.Router();
const projectRouter = require("./Projects");
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const questionsSubjectRouter = require("./QuestionsSubject");

router.get("/", (req, res) => {
  res.send("This api is reserved for startupbooster");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/projects", projectRouter);
router.use("/questionsSubject", questionsSubjectRouter);

module.exports = router;
