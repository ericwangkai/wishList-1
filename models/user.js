/** User Schema for CrowdNotes **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passport = require('passport');
//var bcrypt = require('bcrypt');

// Define schema
var UserSchema = new Schema({
    email: { type: String, unique: true }
  , salt: { type: String, required: false }
  , hash: { type: String, required: true }
});

UserSchema.methods.setPassword = function (password, done){
	var that = this;
	that.hash = password;
	that.salt = 10;
	done(that);
}

UserSchema.method('verifyPassword', function(password, callback) {
	console.log("Password in DB -> " + this.hash);
	console.log("Password in parameter -> " + password);
	if(this.hash !== password){
		return false;
	}else{
		return true;
	}
});

/*
UserSchema.methods.setPassword = function (password, done) {
    var that = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            that.hash = hash;
            that.salt = salt;
            done(that);
        });
    });
};

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.hash, callback);
});

UserSchema.static('authenticate', function(email, password, callback) {
  this.findOne({ email: email }, function(err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      user.verifyPassword(password, function(err, passwordCorrect) {
        if (err) { return callback(err); }
        if (!passwordCorrect) { return callback(null, false); }
        return callback(null, user);
      });
    });
});
*/
module.exports = mongoose.model('User', UserSchema);