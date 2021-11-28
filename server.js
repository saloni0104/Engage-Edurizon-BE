const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// env config
require("dotenv").config();
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  // res.header("Access-Control-Allow-Origin", "https://127.0.0.1:5500");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// requiring local modules
const open = require("./Routes/open");
const auth = require("./Routes/auth");
const courses = require("./Routes/courses");
const QandA = require("./Routes/QandA");
const assisgnments = require("./Routes/assignments");
const utilities = require("./Routes/utility");
const facultyUtility = require("./Routes/facultyUtility");
const notes = require("./Routes/notes");

//db connect
require("./Database/connection.js");

// presets
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// port declaration
const port = process.env.PORT || 3500;

// open routes
app.use("/", open);
app.use("/auth", auth);
app.use("/courses", courses);
app.use("/qanda", QandA);
app.use("/assignments", assisgnments);
app.use("/utility", utilities);
app.use("/facultyUtility", facultyUtility);
app.use("/notes", notes);

// Init the server
app.listen(port, () => {
  console.log("Server is up");
});
