const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("APP RUNNIN ON PORT 3001!!!!!!!!");
});

//mongoose.connect(MONGODB_URI, {
//  useNewUrlParser: true,
//  useFindAndModify: false,
//});

//app.use(require("./routes/api.js"));
