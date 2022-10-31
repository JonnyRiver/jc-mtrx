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
      "password": signup_pass }
   console.log(`user name = ${signup_name}`);
   console.log(`user email = ${signup_email}`);
   console.log(`user password = ${signup_pass}`);
   const client = new MongoClient(uri);
   try {
      const db = client.db('Jaxson');
      db.collection("Jaxson.users").find({"email": String(signup_email)}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
           console.log(`name= ${result[0].name}, email = ${result[0].email}, password = ${result[0].password}`);
           if (signup_email == result[0].email) {
              console.log(`email address, ${signup_email} already exists - ignoring signup - redirecting to login`)
              return res.redirect('login.html'); }}
         else {
            console.log(`no record found for email: ${signup_email}. adding to database...`)
            db.collection('Jaxson.users').insertOne(data, function (err) {
               if (err) throw err;
               console.log("Record inserted Successfully");
            });
         }});
   } finally {
      // Ensures that the client will close when you finish/error
      client.close();
   }
}).listen(3000);


// app.get('/sign_up', function (req, res) {
//    res.render({
//       'Access-control-Allow-Origin': '*'
//    });
//    return res.redirect('index.html');
// }).listen(3000);
