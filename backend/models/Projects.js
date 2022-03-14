const mongoose = require("mongoose");

const ProjectsSchema = new mongoose.Schema({
  projectName: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
   user: Object,
});

module.exports = mongoose.model("projects", ProjectsSchema);
