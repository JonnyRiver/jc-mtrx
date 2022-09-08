const express = require("express");
//const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
//const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log("APP RUNNIN ON PORT 3001!!!!!!!!");
});



// new mongo stuff
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:PASSWORD@sandbox.rqg9kbv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  console.log('connected to jaxson database!')});








//app.use(require("./routes/api.js"));
