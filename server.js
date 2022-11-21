require('dotenv').config();
const uri = process.env.MONGO_URI;
const port = process.env.PORT;
const express = require("express");
const compression = require("compression");
const { MongoClient } = require("mongodb");
const uuid = require('uuid').v4;
const app = express();
// session stoage for node - testing
//const storage = require('node-sessionstorage');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/secretpages"));

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
app.listen(port);
console.log(`listening on port ${port}`);

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
   console.log(`INPUT: name = ${signup_name}, email = ${signup_email}, password = ${signup_pass}`);
   const client = new MongoClient(uri);
   try {
      const db = client.db('Jaxson');
      db.collection("Jaxson.users").find({ "email": String(signup_email) }).toArray(function (err, result) {
         if (err) throw err;
         if (result.length > 0) {
            console.log(`name= ${result[0].name}, email = ${result[0].email}, password = ${result[0].password}`);
            if (signup_email == result[0].email) {
               console.log(`email address, ${signup_email} already exists - ignoring signup - redirecting to login`)
               return res.redirect('login.html');
            }
         }
         else {
            console.log(`no record found for email: ${signup_email}. adding to database...`)
            db.collection('Jaxson.users').insertOne(data, function (err) {
               if (err) throw err;
               console.log("Record inserted Successfully");
               return res.redirect('./secretpages/secrethome.html');
            });
         }
      });
   }
   // Ensures that the client will close when you finish/error
   finally { client.close(); }
});


//testing login fuction
app.post('/login', function (req, res) {
   var login_name = req.body.name;
   var login_email = req.body.email;
   var login_pass = req.body.password
   console.log(`INPUT: name = ${login_name}, email = ${login_email}, password = ${login_pass}`);
   const client = new MongoClient(uri);
   try {
      const db = client.db('Jaxson');
      db.collection("Jaxson.users").find({ "email": String(login_email) }).toArray(function (err, result) {
         if (err) throw err;
         if (result.length > 0) {
            console.log(`name= ${result[0].name}, email = ${result[0].email}, password = ${result[0].password}`);
            if (login_email == result[0].email && login_pass == result[0].password) {
               console.log(`password match (${login_pass}) for email address: ${login_email}!`)
               // storage.setItem('username', login_name);
               // test we saved username
               //let storedUsername = storage.getItem('username');
               //console.log(`stored username: ${storedUsername}`);
               return res.redirect('./secretpages/secrethome.html');
            }
            else {
               console.log(`password does not match for email: ${login_email}.\n
               entered password: ${login_pass} / stored password: ${result[0].password}`)
               return res.redirect('login.html');
            }
         }
         else {
            console.log(`could not find login information for email: ${login_email}. redirecting to signup`);
            return res.redirect('signup.html');
         }
      });
   }
   // Ensures that the client will close when you finish/error
   finally { client.close(); }
});


