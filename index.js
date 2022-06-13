const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const leanerRoute = require("./app/api/routes/learner");
const courseRoute = require("./app/api/routes/course");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
app.set("secretKey", "hdjsakfhdjsk");
const learnerValidation = (req, res, next) => {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    (err, decoded) => {
      if (err) {
        res.json({
          message: err,
        });
      }
      next();
    }
  );
};
app.use(logger("dev"));
app.use(bodyParser.json());
app.use("/learner", leanerRoute);

app.use("/course", learnerValidation, courseRoute);

app.get("/", (req, res) => {
  res.json({
    APP: "JWT Based API Application",
    message: "Successfully Running the Application",
  });
});

const mongoURI =
  "mongodb+srv://vishwadipp17:vishwadip@cluster0.sjukjk7.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully Connected to the Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Successfully Running on the PORT: 5000");
});
