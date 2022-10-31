require('dotenv').config();
const uri = process.env.MONGO_URI;
const express = require("express");
const compression = require("compression");
const { MongoClient } = require("mongodb");
const uuid = require('uuid').v4;
const app = express();


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function run() {
   const client = new MongoClient(uri);
   try {
      const database = client.db('Jaxson');
      const users = database.collection('users');
   } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
   }
   console.log("connection success");
}
run().catch(console.dir);


app.post('/sign_up', function (req, res) {
   var signup_name = req.body.name;
   var signup_email = req.body.email;
   var signup_pass = req.body.password
   var data = {
      _id: uuid(),
      "name": signup_name,
      "email": signup_email,
      "password": signup_pass
   }
   console.log(`user name = ${signup_name}`);
   console.log(`user email = ${signup_email}`);
   console.log(`user password = ${signup_pass}`);
   const client = new MongoClient(uri);
   try {
      const db = client.db('Jaxson');
      // const users = db.collections('Jaxson.users');
      // db.collection('Jaxson.users').insertOne(data, function (err) {
      //    if (err) throw err;
      //    console.log("Record inserted Successfully");
      // });
      // var query = {"email": data.signup_email}
      var query = {"email": "corey@email.com"}
      db.collection("Jaxson.users").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);});
      // var emailExists = users.findOne({"email": email});
      // if (emailExists) {
      //    console.log(`${email} used for existing user`)
      // }
      // else {
      //    console.log(`${email} not found in database, continue to add user`)
      // }
   } finally {
      // Ensures that the client will close when you finish/error
      client.close();
   }
   
   return res.redirect('navigate.html');
}).listen(3000);


// app.get('/sign_up', function (req, res) {
//    res.render({
//       'Access-control-Allow-Origin': '*'
//    });
//    return res.redirect('index.html');
// }).listen(3000);
