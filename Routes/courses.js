const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Students = require("../Database/Models/model.js").students;
const Teachers = require("../Database/Models/model.js").teachers;
const Courses = require("../Database/Models/model.js").courses;
const mail = require("../Helpers/mailer.js").mail;
const helpers = require("../Helpers/helpers.js");
const middleware = require("../Helpers/auth-middleware").session;
const { v4: uuidv4 } = require("uuid");

// get all allocated courses for student and teacher
router.get("/getAllotedCourses", middleware, (request, response) => {
  const teacherId = request.decode?.teacherId;
  const studentId = request.decode?.studentId;
  if (teacherId) {
    Courses.find({
      ...(teacherId && { TEACHER_ID: teacherId }),
    })
      .then((res) => {
        response.status(200).json({ courses: res, message: "Success" });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  } else {
    Students.findOne({
      STUDENT_ID: studentId,
    })
      .then((student) => {
        const courseQueryPromises = [];
        student.COURSES.forEach((course) => {
          courseQueryPromises.push(
            Courses.findOne({
              COURSE_ID: course.COURSE_ID,
            })
          );
        });
        Promise.allSettled(courseQueryPromises)
          .then((res) => {
            response.status(200).json({
              courses: student.COURSES,
              courseMessages: res,
              message: "Success",
            });
          })
          .catch((err) => {
            helpers.handleError(err, response, "Internal Server Error");
          });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  }
});

// get details of the course
router.get("/getCourseDetails", middleware, (request, response) => {
  const teacherId = request.decode?.teacherId;
  const studentId = request.decode?.studentId;
  const courseId = request.query.courseId;
  if (teacherId) {
    Courses.findOne({
      TEACHER_ID: teacherId,
      COURSE_ID: courseId,
    })
      .then((courseDetails) => {
        response.status(200).json({ courseDetails, message: "Success" });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  } else {
    Students.findOne({
      STUDENT_ID: studentId,
    })
      .then((student) => {
        const courseDetails = student?.COURSES.find(
          (course) => course.COURSE_ID === courseId
        );
        Courses.findOne({
          COURSE_ID: courseId,
        })
          .then((course) => {
            response.status(200).json({
              courseDetailsOfStudent: courseDetails,
              courseDetails: course,
              message: "Success",
            });
          })
          .catch((err) => {
            helpers.handleError(err, response, "Internal Server Error");
          });
      })
      .catch((err) => {
        helpers.handleError(err, response, "Internal Server Error");
      });
  }
});

// Target: add student to course
router.post("/addStudentToCourse", middleware, (request, response) => {
  Students.findOne({
    STUDENT_ID: request.body?.studentId,
  })
    .then((student) => {
      if (
        !student.COURSES.find(
          (course) => course.COURSE_ID === request.body?.courseId
        )
      ) {
        // Add student to course
        Courses.findOneAndUpdate(
          {
            TEACHER_ID: request.decode?.teacherId,
            COURSE_ID: request.body.courseId,
          },
          {
            $push: {
              ENROLLED_STUDENTS: {
                STUDENT_ID: request.body.studentId,
                IS_DELETED: false,
                IS_ACTIVE: true,
                NAME: student.NAME,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .then((course) => {
            // Add course to student courses
            Students.findOneAndUpdate(
              {
                STUDENT_ID: request.body.studentId,
              },
              {
                $push: {
                  COURSES: {
                    TEACHER_ID: request.decode?.teacherId,
                    TEACHER_NAME: request.decode?.name,
                    COURSE_ID: request.body.courseId,
                    COURSE_NAME: course.COURSE_NAME,
                    IS_DELETED: false,
                    IS_ACTIVE: true,
                    ASSIGNMENT_SUBMISSION_STATUS: "Pending",
                    ASSIGNMENT_SUBMISSION_LINK: "",
                    ASSIGNMENT_SUBMISSION_FILE_ID: "",
                    ASSIGNMENT_SUBMISSION_DATE: "",
                    ASSIGNMENT_SUBMISSION_SCORE: NaN,
                  },
                },
              },
              {
                new: true,
                runValidators: true,
              }
            )
              .then(() => {
                response
                  .status(200)
                  .json({ message: "Student added to course successfully" });
              })
              .catch((err) => {
                helpers.handleError(err, response, "Internal Server Error");
              });
          })
          .catch((err) => {
            helpers.handleError(err, response, "Internal Server Error");
          });
      } else {
        helpers.handleError(
          err,
          response,
          "Student already registered for this course",
          400
        );
      }
    })
    .catch((err) => {
      helpers.handleError(err, response, "Internal Server Error");
    });
});

// remove student from the course
// Target: remove student from course
router.post("/removeStudentFromCourse", middleware, (request, response) => {
  Courses.findOneAndUpdate(
    {
      TEACHER_ID: request.decode?.teacherId,
      COURSE_ID: request.body.courseId,
    },
    {
      $pull: {
        ENROLLED_STUDENTS: {
          STUDENT_ID: request.body.studentId,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((course) => {
      // remove course from student courses
      Students.findOneAndUpdate(
        {
          STUDENT_ID: request.body.studentId,
        },
        {
          $pull: {
            COURSES: {
              TEACHER_ID: request.decode?.teacherId,
              TEACHER_NAME: request.decode?.name,
              COURSE_ID: request.body.courseId,
              COURSE_NAME: course.COURSE_NAME,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .then(() => {
          response.status(200).json({
            message: "Student removed from the course successfully",
          });
        })
        .catch((err) => {
          helpers.handleError(err, response, "Internal Server Error");
        });
    })
    .catch((err) => {
      helpers.handleError(err, response, "Internal Server Error");
    });
});

router.post("/addCourse", middleware, (request, response) => {
  const { teacherId, name } = request.decode;
  const { courseName, courseId } = request.body;
  const course = new Courses({
    TEACHER_ID: teacherId,
    COURSE_ID: courseId,
    COURSE_NAME: courseName,
    TEACHER_NAME: name,
    MEETING_ID: uuidv4(),
    ENROLLED_STUDENTS: [],
    OFFICE_HOUR_MEETING_ID: uuidv4(),
  });
  course
    .save()
    .then(() => {
      response.status(200).json({
        message: "Course added successfully",
      });
    })
    .catch((err) => {
      helpers.handleError(err, response, "Internal Server Error");
    });
});

router.get("/getPeers", middleware, (request, response) => {
  const courseId = request.query.courseId;
  Courses.findOne({
    COURSE_ID: courseId,
  })
    .then((course) => {
      response.status(200).json({
        students: course.ENROLLED_STUDENTS,
        message: "Success",
      });
    })
    .catch((err) => {
      helpers.handleError(err, response, "Internal Server Error");
    });
});

module.exports = router;
