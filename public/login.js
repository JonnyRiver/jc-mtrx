function userSignUp(newUsername, newPassword) {
    //write/add user to db 
    // check if username already exists first, if not then add, if yes then terminate.
    console.log('user sign up selected!');    
}

document.getElementById("attempt-login").onclick = function () {
    console.log("login button clicked");
    let usernameLength = document.getElementById("input-username").value.length;
    let passwordLength = document.getElementById("input-password").value.length
    if (usernameLength > 3 && passwordLength > 0){
        let usernameValue = document.getElementById("input-username").value;
        let passwordValue = document.getElementById("input-password").value;
        var mongoClient = require("server");

        mongoClient.connectToClient(err => {
            if (err) {throw err}
            console.log('connected to db!');
            const collection = client.db("jaxson").collection("users");
            collection.findOne({}, function(err, result) {
                if (err) throw err;
                if (usernameValue === result.username && passwordValue === result.password) {
                    confirm(`successfully logged in! \n Welcome ${usernameValue}!`);
                }
                else if (confirm(`sorry we dont have any records of you. \n Would you like to sign up?`)) {
                    userSignUp(usernameValue, passwordValue);
                }})
            })
        }
        else {alert("pleaser enter a valid username and password")} 
    }  



