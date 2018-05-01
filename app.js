const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const userModel = require('./models/models');
const mongouri = require('./config/mongodb');

const app = express();
const secret_key = "thats_really_a_secret";

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    try {
        decoded = jwt.verify(token, secret_key);
        req.decoded = decoded;
    }
    catch (error) {
        res.status(401).send({error: "Invalid token, access denied"});
    }
    next();
};

app.get('/users', authenticate, (req, res) => {
    res.send(req.decoded);
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
            let token = jwt.sign({email: req.body.email, _id: msg._id}, secret_key)
            res.header('x-auth', token).send({email: req.body.email});
            mongoose.connection.close();
        }).catch((errorObj) => {
            res.status(400).send({error: errorObj.message});
            // res.status(400).send(errorObj);
        });
    }).catch((errorObj) => {
        res.status(500).send({error: errorObj.name});
    });
});

app.listen(3000, () => {
    console.log("Server running on localhost port 3000");
});