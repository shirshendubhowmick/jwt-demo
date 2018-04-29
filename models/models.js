const mongoose = require('mongoose');
const mongouri = require('../config/mongodb');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: false},
    password: {type: String, required: true},
    isActive: {type: Boolean, required: true}
});

const userModel = mongoose.model('user', userSchema);
// mongoose.connect(mongouri);

// user = new userModel({email: "shirshendu_0@yahoo.co.in", password: "abc123", firstName: "Shirshendu", lastName: "Bhowmick", isActive: true});
// user.save().then((msg) => {
//     console.log(msg);
// }).catch((msg) => {
//     console.log(msg);
// });