const express = require("express");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
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
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rqg9kbv.mongodb.net/?retryWrites=true&w=majority";
module.exports = {
  connectToClient: function() {
    new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  } 
} 
