const mongoose = require("mongoose");

const QuestionsSubjectSchema = new mongoose.Schema({
  questionsSubject: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
   user: Object,
});

module.exports = mongoose.model("questionsSubject", QuestionsSubjectSchema);
