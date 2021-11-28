const router = require("express").Router();
const Students = require("../Database/Models/model.js").students;
const Teachers = require("../Database/Models/model.js").teachers;
const middleware = require("../Helpers/auth-middleware").session;
const helpers = require("../Helpers/helpers.js");

//save notes in Students & Teachers collection
router.post("/saveNotes", middleware, (request, response) => {
  const teacherId = request.decode?.teacherId;
  const studentId = request.decode?.studentId;
  const notes = request.body.notes;
  if (teacherId) {
    Teachers.findOneAndUpdate(
      {
        TEACHER_ID: teacherId,
      },
      {
        $set: {
          NOTES: notes,
        },
      }
    )
      .then((data) => {
        response.status(200).json({ message: "Success" });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  } else {
    Students.findOneAndUpdate(
      {
        STUDENT_ID: studentId,
      },
      {
        $set: {
          NOTES: notes,
        },
      }
    )
      .then((data) => {
        response.status(200).json({ message: "Success" });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  }
});

// get notes from Students & Teachers collection
router.get("/getNotes", middleware, (request, response) => {
  const teacherId = request.decode?.teacherId;
  const studentId = request.decode?.studentId;
  if (teacherId) {
    Teachers.findOne({
      TEACHER_ID: teacherId,
    })
      .then((res) => {
        response.status(200).json({ notes: res.NOTES, message: "Success" });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  } else {
    Students.findOne({
      STUDENT_ID: studentId,
    })
      .then((res) => {
        response.status(200).json({ notes: res.NOTES, message: "Success" });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  }
});

module.exports = router;
