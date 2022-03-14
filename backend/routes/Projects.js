const express = require("express");
const router = express.Router();

const projectDB = require("../models/Projects");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await projectDB
      .create({
        projectName: req.body.projectName,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Project added successfully",
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
      message: "Error while adding project",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await projectDB
      .aggregate([
        {
          $lookup: {
            from: "projects", //collection to join
            localField: "_id", //field from input document
            foreignField: "projectId",
            as: "allprojects", //output array field
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
          message: "Unable to get the project details",
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
