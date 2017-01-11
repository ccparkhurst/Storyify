var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// var passportLocalMongoose = require('passport-local-mongoose');
// var jwt = require ('jsonwebtoken');
// var Story    = require('./story');
// var Author   = require('./author');

var UserSchema = new mongoose.Schema({
local: {
    // firstName: String,
    // lastName : String,
    username: String,
    password: String

    // authors : [Author.schema]

    // stories : [Story.schema]
}
});

// UserSchema.methods.generateJwt = function() {
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);
//
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         name: this.name,
//         exp: parseInt(expiry.getTime() / 1000),
//     }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };
//
UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
