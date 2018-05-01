const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const mongouri = require('../config/mongodb');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: false, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, required: true}
});

userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
// mongoose.connect(mongouri);

// user = new userModel({email: "shirshendu_0@yahoo.co.in", password: "abc123", firstName: "Shirshendu", lastName: "Bhowmick", isActive: true});
// user.save().then((msg) => {
//     console.log(msg);
// }).catch((msg) => {
//     console.log(msg);
// });