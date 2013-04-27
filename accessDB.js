var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	mongoose = require('mongoose');

var User = require('./models/user');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  function(email, password, done) {
    console.log("Authentication -> Email : " + email + " , password : " + password);
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
	  console.log("Passed Password verification.");
      return done(null, user);
    });
  }
));

// serialize user on login
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

// deserialize user on logout
passport.deserializeUser(function(email, done) {
  User.findOne(email, function (err, user) {
    done(err, user);
  });
});

module.exports = {
  // initialize DB
  startup: function(dbToUse) {
    mongoose.connect(dbToUse);
    // Check connection to mongoDB
    mongoose.connection.on('open', function() {
      console.log('We have connected to mongodb');
    });
  },
  
  // save a user
  /*
  saveUser: function(userInfo, callback) {
    console.log(JSON.stringify(userInfo));
	var newUser = new User ({
		email: userInfo.email,
		hash: userInfo.password
	}).save(function(err) {
        if (err) {throw err;}
        //console.log('Name: ' + newUser.name + '\nEmail: ' + newUser.email);
        callback(null, userInfo);
    });
  }
 */
  saveUser: function(userInfo, callback) {
    console.log(JSON.stringify(userInfo));
	var newUser = new User ({
		email: userInfo.email
	}).setPassword(userInfo.password, function(newUser) {
      newUser.save(function(err) {
        if (err) {throw err;}
        //console.log('Name: ' + newUser.name + '\nEmail: ' + newUser.email);
        callback(null, userInfo);
      });
    });
  },
  
  verifyCredential: function(emal, password, done){
	console.log("Authentication -> Email : " + email + " , password : " + password);
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
  
  
}