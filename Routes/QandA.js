const router = require("express").Router();
const mail = require("../Helpers/mailer.js").mail;
const QandA = require("../Database/Models/model.js").QandA;
const middleware = require("../Helpers/auth-middleware").session;
const helpers = require("../Helpers/helpers.js");
const Students = require("../Database/Models/model.js").students;
const { v4: uuidv4 } = require("uuid");

router.post("/add/question", middleware, (request, response) => {
  const questionId = uuidv4();
  const ques = new QandA({
    QUESTION_ID: questionId,
    QUESTION_TITLE: request.body.title,
    AUTHOR_NAME: request.decode.name,
    QUESTION_DESCRIPTION: request.body.description,
    AUTHOR_ID: request.decode.studentId,
    POSTED_ON: new Date(),
  });
  helpers
    .verifySentiment(`${request.body.description} ${request.body.title}`)
    .then(() => {
      ques.save((err) => {
        if (err) {
          helpers.handleError(err, response, "Error in adding question");
        } else {
          response.status(200).json({
            message: "The question was successfully added.",
          });
        }
      });
    })
    .catch((err) => {
      helpers.handleError(err, response, "Bad sentiments", 400);
    });
});

router.post("/add/answer", middleware, (request, response) => {
  helpers
    .verifySentiment(request.body.answer)
    .then(() => {
      QandA.findOneAndUpdate(
        {
          QUESTION_ID: request.body.questionId,
        },
        {
          $push: {
            ANSWERS: {
              ANSWER_ID: uuidv4(),
              ANSWER_AUTHOR_NAME: request.decode.name,
              ANSWER_DESCRIPTION: request.body.answer,
              ANSWER_POSTED_ON: new Date(),
              ANSWER_AUTHOR_ID: request.decode.studentId,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .then((doc) => {
          Students.findOne({
            STUDENT_ID: doc.AUTHOR_ID,
          })
            .then((res) => {
              const content = `Hello ${res.NAME}, ${request.decode.name} just posted an answer to your question with title - ${doc.QUESTION_TITLE}.`;
              mail(res.EMAIL, "New answer posted", content)
                .then(() => {
                  response.status(200).json({
                    message: " Your answer was successfully posted",
                    mailing: true,
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
              response.status(200).json({
                message: "Your answer was successfully added.",
                mailing: false,
              });
            });
        })
        .catch((err) => {
          helpers.handleError(err, response, "Failed to add answer");
        });
    })
    .catch((err) => {
      helpers.handleError(err, response, "Bad sentiments", 400);
    });
});

// TO GET MY QUESTIONS
router.get("/myquestions", middleware, (request, response) => {
  QandA.find({
    AUTHOR_ID: request.decode.studentId,
  })
    .then((doc) => {
      response.status(200).json({
        message: doc,
      });
    })
    .catch((err) => {
      helpers.handleError(err, response, "Failed to fetch list of questions");
    });
});

// TO DELETE QUESTIONS AND IT'S ANSWERS
router.post("/delete", middleware, (request, response) => {
  QandA.findOneAndRemove({
    QUESTION_ID: request.body.questionId,
  })
    .then((res) => {
      if (res) {
        response.status(200).json({
          message: "The question and it's answers were successfully deleted.",
        });
      } else {
        helpers.handleError(
          err,
          response,
          "No such question, please re-verify question id"
        );
      }
    })
    .catch((err) => {
      helpers.handleError(err, response, "Failed to delete the question");
    });
});

// SEARCH QUESTION
router.get("/search", async (request, response) => {
  const regex = new RegExp(helpers.escapeRegex(request.query.q), "gi");
  QandA.find({ QUESTION_TITLE: regex }, function (err, searchResults) {
    if (err) {
      helpers.handleError(err, response, "Failed to search");
    } else {
      response.status(200).json({
        message: searchResults,
      });
    }
  });
});

module.exports = router;
