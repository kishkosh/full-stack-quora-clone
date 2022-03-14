const express = require("express");
const router = express.Router();

const questionsSubjectDB = require("../models/QuestionsSubject");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await questionsSubjectDB
      .create({
        questionsSubject : req.body.questionsSubject,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question Subject added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding question subject",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionsSubjectDB
      .aggregate([
        {
          $lookup: {
            from: "questionssubject", //collection to join
            localField: "_id", //field from input document
            foreignField: "questionssubjectId",
            as: "allquestionssubject", //output array field
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question subject details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

module.exports = router;
