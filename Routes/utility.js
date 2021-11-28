const router = require("express").Router();
const Students = require("../Database/Models/model.js").students;
const Teachers = require("../Database/Models/model.js").teachers;
const helpers = require("../Helpers/helpers.js");
const middleware = require("../Helpers/auth-middleware").session;
const { v4: uuidv4 } = require("uuid");

// add new student
router.post("/addStudent", middleware, (request, response) => {
  const { studentId, email, name } = request.body;
  const student = new Students({
    GEN_PASSWORD_TOKEN: uuidv4(),
    STUDENT_ID: studentId,
    NAME: name,
    EMAIL: email,
    COURSES: [],
  });
  student
    .save()
    .then(() => {
      response.status(200).json({
        message: "Student added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      helpers.handleError(err, response, "Internal Server Error");
    });
});

// add new teacher
router.post("/addTeacher", (request, response) => {
  const { teacherId, email, name } = request.body;
  const teachers = new Teachers({
    GEN_PASSWORD_TOKEN: uuidv4(),
    TEACHER_ID: teacherId,
    NAME: name,
    EMAIL: email,
  });
  teachers
    .save()
    .then(() => {
      response.status(200).json({
        message: "Teacher added successfully",
      });
    })
    .catch((err) => {
      helpers.handleError(err, response, "Internal Server Error");
    });
});

module.exports = router;
