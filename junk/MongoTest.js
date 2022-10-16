
// original

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });



// testing
console.log('initializing....');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jonnyriver:ccymhjoTj2amivWR@cluster0.oquqv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  console.log('connected to jaxson database!');
  const collection = client.db("jaxson").collection("users");
  // perform actions on the collection object
  console.log('looking for a user...');
  collection.findOne({}, function(err, result) {
    if (err) throw err;
    console.log('username: ', result.user);
    console.log('password: ', result.password);
  })
  
  
  
});
// this never closes it? it just stays open? weird.
client.close();
console.log('it has been closed');
