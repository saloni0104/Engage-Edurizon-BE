const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Students = require("../Database/Models/model.js").students;
const Teachers = require("../Database/Models/model.js").teachers;
const Courses = require("../Database/Models/model.js").courses;
const mail = require("../Helpers/mailer.js").mail;
const helpers = require("../Helpers/helpers.js");
const middleware = require("../Helpers/auth-middleware").session;
const { v4: uuidv4 } = require("uuid");

router.post("/postMessageOrSchedule", middleware, (request, response) => {
  const { courseId, message, schedule } = request.body;
  Courses.findOneAndUpdate(
    {
      COURSE_ID: courseId,
      TEACHER_ID: request.decode.teacherId,
    },
    {
      ...(message && {
        COURSE_FACULTY_MESSAGE: message,
        COURSE_FACULTY_MESSAGE_POSTED_ON: new Date(),
      }),
      ...(schedule && {
        COURSE_SCHEDULE: schedule,
        COURSE_SCHEDULE_POSTED_ON: new Date(),
      }),
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then(() => {
      response.status(200).json({
        message: "Successfully posted message/schedule",
      });
    })
    .catch((err) => {
      helpers.handleError(
        err,
        response,
        "There was error posting the message/schedule"
      );
    });
});

// update office hour start end time
router.post("/updateOfficeHour", middleware, (request, response) => {
  const { courseId, startTime, endTime, officeHourDay } = request.body;
  Courses.findOneAndUpdate(
    {
      COURSE_ID: courseId,
      TEACHER_ID: request.decode.teacherId,
    },
    {
      $set: {
        OFFICE_HOUR_START_TIME: startTime,
        OFFICE_HOUR_END_TIME: endTime,
        OFFICE_HOUR_DAY: officeHourDay,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then(() => {
      response.status(200).json({
        message: "Successfully updated office hour",
      });
    })
    .catch((err) => {
      helpers.handleError(
        err,
        response,
        "There was error updating the office hour"
      );
    });
});

module.exports = router;
