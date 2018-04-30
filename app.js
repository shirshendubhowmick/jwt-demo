const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const userModel = require('./models/models');
const mongouri = require('./config/mongodb');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Hello");
});

app.post('/signup', (req, res) => {
    mongoose.connect(mongouri).then(() => {
        user = new userModel({email: req.body.email,
                              password: req.body.password,
                              firstName: req.body.firstName,
                              lastName: req.body.lastName,
                              phone: req.body.phone,
                              isActive: true});
        user.save().then((msg) => {
            res.send(msg);
        }).catch((errorObj) => {
            res.status(400).send({error: errorObj.message});
            // res.status(400).send(errorObj);
        });
    }).catch((errorObj) => {
        res.status(500).send({error: errorObj.name});
    });
});

app.listen(3000, () => {
    console.log("Server running on port localhost port 3000");
});