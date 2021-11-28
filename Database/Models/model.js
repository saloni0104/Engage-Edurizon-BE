const mongoose = require("mongoose");
const fuzzySearch = require("mongoose-fuzzy-searching");

const students = new mongoose.Schema({
  NAME: {
    type: String,
    required: true,
  },
  STUDENT_ID: {
    type: String,
    required: true,
    unique: true,
  },
  GEN_PASSWORD_TOKEN: {
    type: String,
  },
  EMAIL: {
    type: String,
    required: true,
    unique: true,
  },
  NOTES: {
    type: String,
  },
  COURSES: {
    type: [
      {
        ATTENDANCE: {
          type: Number,
        },
        TEACHER_ID: {
          type: String,
        },
        TEACHER_NAME: {
          type: String,
        },
        COURSE_ID: {
          type: String,
        },
        COURSE_NAME: {
          type: String,
        },
        IS_ACTIVE: {
          type: Boolean,
        },
        IS_DELETED: {
          type: Boolean,
        },
        IS_BACKLOG: {
          type: Boolean,
        },
        IS_PASSED: {
          type: Boolean,
        },
        IS_FAILED: {
          type: Boolean,
        },
        ASSIGNMENT_SUBMISSION_LINK: {
          type: String,
        },
        ASSIGNMENT_SUBMISSION_FILE_ID: {
          type: String,
        },
        ASSIGNMENT_SUBMISSION_DATE: {
          type: String,
        },
        ASSIGNMENT_SUBMISSION_STATUS: {
          type: String,
        },
        ASSIGNMENT_SCORE: {
          type: Number,
        },
      },
    ],
  },
  BRANCH: {
    type: String,
  },
  SEMESTER: {
    type: String,
  },
  YEAR: {
    type: String,
  },
  PASSWORD: {
    type: String,
  },
  IS_ACTIVE: {
    type: Boolean,
  },
});

const courses = new mongoose.Schema({
  COURSE_ID: {
    type: String,
    required: true,
    unique: true,
  },
  COURSE_NAME: {
    type: String,
  },
  TEACHER_ID: {
    type: String,
  },
  TEACHER_NAME: {
    type: String,
  },
  ENROLLED_STUDENTS: {
    type: [
      {
        STUDENT_ID: {
          type: String,
        },
        NAME: {
          type: String,
        },
        ASSIGNMENT_SCORE: {
          type: Number,
        },
        ASSIGNMENT_SUBMISSION_LINK: {
          type: String,
          default: "",
        },
        ASSIGNMENT_SUBMISSION_FILE_ID: {
          type: String,
          default: "",
        },
        IS_ACTIVE: {
          type: Boolean,
        },
        IS_DELETED: {
          type: Boolean,
        },
      },
    ],
  },
  ASSIGNMENT_ID: {
    type: String,
  },
  ASSIGNMENT_TITLE: {
    type: String,
  },
  ASSIGNMENT_QUESTION_LINK: {
    type: String,
  },
  ASSIGNMENT_QUESTION_FILE_ID: {
    type: String,
  },
  ASSIGNMENT_DEADLINE: {
    type: String,
  },
  ASSIGNMENT_POSTED_ON: {
    type: String,
  },
  COURSE_SCHEDULE: {
    type: String,
  },
  COURSE_SCHEDULE_POSTED_ON: {
    type: String,
  },
  COURSE_FACULTY_MESSAGE: {
    type: String,
  },
  COURSE_FACULTY_MESSAGE_POSTED_ON: {
    type: String,
  },
  MEETING_ID: {
    type: String,
  },
  OFFICE_HOUR_MEETING_ID: {
    type: String,
  },
  OFFICE_HOUR_START_TIME: {
    type: String,
  },
  OFFICE_HOUR_END_TIME: {
    type: String,
  },
  OFFICE_HOUR_DAY: {
    type: String,
  },
});

const teachers = new mongoose.Schema({
  NAME: {
    type: String,
    required: true,
  },
  GEN_PASSWORD_TOKEN: {
    type: String,
  },
  TEACHER_ID: {
    type: String,
    required: true,
    unique: true,
  },
  EMAIL: {
    type: String,
    required: true,
    unique: true,
  },
  PASSWORD: {
    type: String,
  },
  NOTES: {
    type: String,
  },
  IS_ACTIVE: {
    type: Boolean,
  },
});

const QandA = new mongoose.Schema({
  QUESTION_TITLE: {
    type: String,
    required: true,
  },
  AUTHOR_NAME: {
    type: String,
  },
  QUESTION_ID: {
    type: String,
    required: true,
    unique: true,
  },
  QUESTION_DESCRIPTION: {
    type: String,
  },
  AUTHOR_ID: {
    type: String,
  },
  POSTED_ON: {
    type: String,
  },
  ANSWERS: {
    type: [
      {
        ANSWER_ID: {
          type: String,
        },
        ANSWER_DESCRIPTION: {
          type: String,
        },
        ANSWER_AUTHOR_ID: {
          type: String,
        },
        ANSWER_AUTHOR_NAME: {
          type: String,
        },
        ANSWER_POSTED_ON: {
          type: String,
        },
      },
    ],
  },
});

students.plugin(fuzzySearch, { fields: ["NAME"] });
teachers.plugin(fuzzySearch, { fields: ["NAME"] });
QandA.plugin(fuzzySearch, { fields: ["QUESTION_TITLE"] });
module.exports.students = mongoose.model("students", students);
module.exports.teachers = mongoose.model("teachers", teachers);
module.exports.courses = mongoose.model("courses", courses);
module.exports.QandA = mongoose.model("QandA", QandA);
