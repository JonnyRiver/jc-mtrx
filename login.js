import { client } from "./server";


document.getElementById("attempt-login").onclick = function () {
    console.log('login button clicked, automatically logging you in...');
    client.connect(err => {
        console.log('connected to jaxson database!');
        const collection = client.db("jaxson").collection("users");
        inputUsername = alert("please enter your username");
        inputPassword = alert("please enter your password");
        console.log('looking for your login info. please wait...');
        collection.findOne({}, function(err, result) {
            if (err) throw err;
            console.log('username: ', result.username);
            console.log('password: ', result.password);
            if (inputUsername === result.username && inputPassword === result.password){
                return true;
            }
            return false;
            
        })
    })
  };
  

//module.exports = {client}
// module.exports = {
//     
// }


