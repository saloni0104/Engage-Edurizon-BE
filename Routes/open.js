const router = require("express").Router();

router.get("/test", (request, response) => {
  response.status(200).json({
    message: "This project is developed by Saloni, Shreya and Nikhil.",
    projectName: "Edurizon",
  });
});

module.exports = router;
