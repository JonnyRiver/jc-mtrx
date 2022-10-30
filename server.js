const express = require("express");
const compression = require("compression");
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI
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
   var name = req.body.name;
   var email = req.body.email;
   var pass = req.body.password
   var data = {
      _id: uuid(),
      "name": name,
      "email": email,
      "password": pass
   }
   const client = new MongoClient(uri);
   try {
      const db = client.db('Jaxson');
      db.collection('Jaxson.users').insertOne(data, function (err) {
         if (err) throw err;
         console.log("Record inserted Successfully");
      });
   } finally {
      // Ensures that the client will close when you finish/error
      client.close();
   }
   return res.redirect('navigate.html');
})

app.get('/', function (req, res) {
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");
