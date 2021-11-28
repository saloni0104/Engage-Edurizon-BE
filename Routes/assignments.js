const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Students = require("../Database/Models/model.js").students;
const mail = require("../Helpers/mailer.js").mail;
const helpers = require("../Helpers/helpers.js");
const { v4: uuidv4 } = require("uuid");
const upload = require("./multer.js");
const Courses = require("../Database/Models/model.js").courses;
const middleware = require("../Helpers/auth-middleware").session;
const cloudinary = require("./cloudinary");
const fs = require("fs");

// For faculty - Add assignment for particular course by faculty
router.post(
  "/addAssignment",
  middleware,
  upload.any("file"),
  async (request, response) => {
    const { assignmentTitle, courseId, assignmentDeadline } = request.body;
    const uploader = async (path) => await cloudinary.uploads(path, "Question");
    const urls = [];
    const files = request.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    Courses.findOneAndUpdate(
      {
        TEACHER_ID: request.decode.teacherId,
        COURSE_ID: courseId,
      },
      {
        $set: {
          ASSIGNMENT_TITLE: assignmentTitle,
          ASSIGNMENT_DEADLINE: String(assignmentDeadline),
          ASSIGNMENT_QUESTION_LINK: urls[0].url,
          ASSIGNMENT_QUESTION_FILE_ID: urls[0].id,
          ASSIGNMENT_ID: uuidv4(),
          ASSIGNMENT_POSTED_ON: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((data) => {
        console.log({ data });
        response.status(200).json({ message: "Assignment added successfully" });
      })
      .catch((error) => {
        helpers.handleError(error, response, "Error in adding assignment");
      });
  }
);

// For student view - View asignments for particular course by faculty (seperate btn)
router.get("/viewAssignments", middleware, (request, response) => {
  Courses.findOne({
    COURSE_ID: request.query.courseId,
  })
    .then((course) => {
      response.status(200).json({ message: course });
    })
    .catch((error) => {
      helpers.handleError(
        error,
        response,
        "Error in fetching assignment details"
      );
    });
});

// For student view - Submit assignment for particular course by student
router.post(
  "/submitAssignment",
  middleware,
  upload.any("file"),
  async (request, response) => {
    const { courseId } = request.body;
    const uploader = async (path) => await cloudinary.uploads(path, "Answer");
    const urls = [];
    const files = request.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    Students.updateOne(
      {
        STUDENT_ID: request.decode.studentId,
        "COURSES.COURSE_ID": courseId,
      },
      {
        $set: {
          "COURSES.$.ASSIGNMENT_SUBMISSION_LINK": urls[0].url,
          "COURSES.$.ASSIGNMENT_SUBMISSION_FILE_ID": urls[0].id,
          "COURSES.$.ASSIGNMENT_SUBMISSION_DATE": new Date(),
          "COURSES.$.ASSIGNMENT_SUBMISSION_STATUS": "Submitted",
        },
      },
      { new: true }
    )
      .then((student) => {
        Courses.findOneAndUpdate(
          {
            COURSE_ID: courseId,
            "ENROLLED_STUDENTS.STUDENT_ID": request.decode.studentId,
          },
          {
            $set: {
              "ENROLLED_STUDENTS.$.ASSIGNMENT_SUBMISSION_LINK": urls[0].url,
              "ENROLLED_STUDENTS.$.ASSIGNMENT_SUBMISSION_FILE_ID": urls[0].id,
            },
          },
          { new: true }
        )
          .then((course) => {
            response.status(200).json({ message: "Assignment submitted" });
          })
          .catch((error) => {
            helpers.handleError(
              error,
              response,
              "Error in submitting assignment"
            );
          });
      })
      .catch((error) => {
        helpers.handleError(error, response, "Error in submitting assignment");
      });
  }
);

// For student view - View submission and score for particular assignment by student
router.get("/viewSubmission", middleware, (request, response) => {
  Students.findOne({
    STUDENT_ID: request.decode.studentId,
    "COURSES.COURSE_ID": request.query.courseId,
  })
    .then((data) => {
      response.status(200).json({ data, message: "Success" });
    })
    .catch((error) => {
      helpers.handleError(
        error,
        response,
        "Error in fetching submission details"
      );
    });
});

// For faculty view - Grading of assignment by faculty
router.post("/gradeAssignment", middleware, (request, response) => {
  Students.updateOne(
    {
      STUDENT_ID: request.body.studentId,
      "COURSES.COURSE_ID": request.body.courseId,
    },
    {
      $set: {
        "COURSES.$.ASSIGNMENT_SCORE": Number(request.body.score),
      },
    },
    { new: true }
  )
    .then((student) => {
      Courses.updateOne(
        {
          COURSE_ID: request.body.courseId,
          "ENROLLED_STUDENTS.STUDENT_ID": request.body.studentId,
        },
        {
          $set: {
            "ENROLLED_STUDENTS.$.ASSIGNMENT_SCORE": Number(request.body.score),
          },
        },
        {
          new: true,
        }
      )
        .then((course) => {
          response
            .status(200)
            .json({ message: "Assignment graded successfully" });
        })
        .catch((error) => {
          helpers.handleError(
            error,
            response,
            "Error in updating enrolled student details"
          );
        });
    })
    .catch((error) => {
      helpers.handleError(error, response, "Error in grading assignment");
    });
});

router.get("/student/allAssignments", middleware, (request, response) => {
  const { studentId } = request.decode;
  Students.findOne({
    STUDENT_ID: studentId,
  }).then((student) => {
    const courses = student.COURSES;
    const coursesPromise = [];
    courses.forEach((course) => {
      coursesPromise.push(
        Courses.findOne({
          COURSE_ID: course.COURSE_ID,
        })
      );
    });
    Promise.allSettled(coursesPromise)
      .then((course) => {
        response
          .status(200)
          .json({ studentCourses: courses, course, message: "Success" });
      })
      .catch((error) => {
        helpers.handleError(
          error,
          response,
          "Error in fetching assignment details"
        );
      });
  });
});

router.get("/teacher/allAssignments", middleware, (request, response) => {
  const { teacherId } = request.decode;
  Courses.find({
    TEACHER_ID: teacherId,
  })
    .then((courses) => {
      response
        .status(200)
        .json({ teacherCourses: courses, message: "Success" });
    })
    .catch((error) => {
      helpers.handleError(error, response, "Internal server error");
    });
});

module.exports = router;
