import { client } from "./server";

document.getElementById("attempt-login").onclick = function () {
    client.connect(err => {
        const collection = client.db("jaxson").collection("users");
        // perform actions on the collection object
        collection_find = collection.find();
        console.log(collection_find);
        client.close(); 
    })
  };
  