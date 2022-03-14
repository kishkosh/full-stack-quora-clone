const mongoose = require("mongoose");

const url =
  "mongodb+srv://seanbogner:booster1234@cluster0.ts4ci.mongodb.net/db?retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => console.log("Error: ", error));
};
