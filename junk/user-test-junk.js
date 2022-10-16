var mongoose = require(mongoose),
User = require('/user-model-junk');

console.log('connecting to mongo....');

// fill this in with mongo atlas uri
var uri = "mongodb+srv://jonnyriver:ccymhjoTj2amivWR@cluster0.oquqv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, function(err) {
    if (err) throw err;
    console.log('Successfully connected to mongodb');
});

//create a new user
var testUser = new User({
    username: test-username,
    password: test-password
});

//save to db
testUser.save(function(err) {
    if (err) throw err;

    //fetch user and test password verification
    User.findOne({username: 'test-username'}, function(err, user) {
        if (err) throw err;

        // test good password
        user.comparePassword('test-password', function(err, isMatch) {
            if (err) throw err;
            console.log('test-password:', isMatch);
        });

        // test bad password
        user.comparePassword('password-test', function(err, isMatch) {
            if (err) throw err;
            console.log('password-test:', isMatch);
        });
    });
});

