const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Students = require("../Database/Models/model.js").students;
const Teachers = require("../Database/Models/model.js").teachers;
const mail = require("../Helpers/mailer.js").mail;
const helpers = require("../Helpers/helpers.js");
const { v4: uuidv4 } = require("uuid");

// Generate password for teacher and student
router.post("/generatePassword", (request, response) => {
  const generatePasswordToken = uuidv4();
  const teacherId = request.body.teacherId;
  const studentId = request.body.studentId;
  if (teacherId) {
    Teachers.findOneAndUpdate(
      {
        TEACHER_ID: teacherId,
      },
      {
        GEN_PASSWORD_TOKEN: generatePasswordToken,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((teacher) => {
        const content = `<p>Click on the link below to generate a new password,</br> https://127.0.0.1:5500/setPasswordPage.html?token=${teacher.GEN_PASSWORD_TOKEN}&isTeacher=true</p>`;
        mail(teacher.EMAIL, "Generate Password Request", content)
          .then(() => {
            response.status(200).json({
              message: "Password reset link sent to your email",
            });
          })
          .catch((err) => {
            helpers.handleError(
              err,
              response,
              "Failed to send email try again"
            );
          });
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
        GEN_PASSWORD_TOKEN: generatePasswordToken,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((student) => {
        const content = `<p>Click on the link below to generate a new password,</br> https://127.0.0.1:5500/setPasswordPage.html?token=${student.GEN_PASSWORD_TOKEN}&isTeacher=false</p>`;
        mail(student.EMAIL, "Generate Password Request", content)
          .then(() => {
            response.status(200).json({
              message: "Password reset link sent to your email",
            });
          })
          .catch((err) => {
            helpers.handleError(
              err,
              response,
              "Failed to send email try again"
            );
          });
      })
      .catch((err) => {
        console.log({ err });
        helpers.handleError(err, response, "Internal Server Error");
      });
  }
});

// Set password for teacher and student
router.post("/setPassword", (request, response) => {
  const password = request.body.password;
  const passwordGenerationToken = request.body.passwordGenerationToken;
  const isTeacher = request.body.isTeacher;
  if (!passwordGenerationToken) {
    helpers.handleError(err, response, "Invalid token", 500);
  }
  if (isTeacher) {
    Teachers.findOneAndUpdate(
      {
        GEN_PASSWORD_TOKEN: passwordGenerationToken,
      },
      {
        PASSWORD: helpers.hashAndReturn(password),
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((teacher) => {
        if (teacher) {
          response.status(200).json({
            message: "Password updated successfully",
          });
        } else {
          helpers.handleError({errMessage: "invalid token"}, response, "Invalid token", 400);
        }
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  } else {
    Students.findOneAndUpdate(
      {
        GEN_PASSWORD_TOKEN: passwordGenerationToken,
      },
      {
        PASSWORD: helpers.hashAndReturn(password),
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((student) => {
        if (student) {
          response.status(200).json({
            message: "Password updated successfully",
          });
        } else {
          helpers.handleError({errMessage: "invalid token"}, response, "Invalid token", 400);
        }
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  }
});

// Login for teacher and student
router.post("/login", (request, response) => {
  const studentId = request.body.studentId;
  const teacherId = request.body.teacherId;
  const password = request.body?.password;
  console.log({ studentId, teacherId, password });
  if (teacherId) {
    Teachers.findOne({
      TEACHER_ID: teacherId,
    })
      .then((teacher) => {
        if (helpers.passwordAuth(teacher.PASSWORD, password)) {
          const payload = {
            name: teacher.NAME,
            teacherId: teacher.TEACHER_ID,
          };
          const token = jwt.sign(payload, process.env.PW_SECRET);
          response.status(200).json({
            token,
            id: teacherId,
            name: teacher.NAME,
            message: "Success, the password matched successfully",
          });
        } else {
          helpers.handleError(
            {
              message: "Invalid password",
            },
            response,
            "Invalid password",
            400
          );
        }
      })
      .catch((err) => {
        console.log("1", { err });
        helpers.handleError(err, response, "Internal Server Error");
      });
  } else {
    Students.findOne({
      STUDENT_ID: studentId,
    })
      .then((student) => {
        if (helpers.passwordAuth(student.PASSWORD, password)) {
          const payload = {
            name: student.NAME,
            studentId: student.STUDENT_ID,
          };
          const token = jwt.sign(payload, process.env.PW_SECRET);
          response.status(200).json({
            token,
            name: student.NAME,
            id: studentId,
            message: "Success, the password matched successfully",
          });
        } else {
          helpers.handleError(
            {
              message: "Invalid password",
            },
            response,
            "Invalid password",
            400
          );
        }
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  }
});

module.exports = router;
