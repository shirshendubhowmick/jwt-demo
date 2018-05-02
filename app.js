const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const userModel = require('./models/models');
const mongouri = require('./config/mongodb');
const bcrypt = require('bcryptjs');

const app = express();
const secret_key = "thats_really_a_secret";

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    try {
        decoded = jwt.verify(token, secret_key);
        mongoose.connect(mongouri).then(() => {
            userModel.findById(decoded._id).then((user) => {
                if(user) {
                    req.user = user;
                    next();
                }
                else {
                    res.status(401).send({error: "User doesn't exists, access denied."});
                }
            }).catch((errorObj) => {
                res.status(401).send({error: errorObj.name});
            });
        }).catch((errorObj) => {
            res.status(500).send({error: errorObj.name});
        });
    }
    catch (error) {
        res.status(401).send({error: "Invalid token, access denied."});
    }
};

app.get('/users', authenticate, (req, res) => {
    res.send({id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email});
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

app.post('/login', (req, res) => {
    mongoose.connect(mongouri).then(() => {
        userModel.findOne({email: req.body.email}).then((user) => {
            if(user && req.body.password) {
                if(! bcrypt.compareSync(req.body.password, user.password)) {
                    mongoose.connection.close();
                    res.status(401).send({error: "Authentication unsuccessful, access denied."});
                }
                let token = jwt.sign({email: user.email, _id: user._id}, secret_key);
                user.tokens.push(token);
                user.save().then((msg) => {
                    mongoose.connection.close();
                    res.header('x-auth', token).send({id: msg._id, firstName: msg.firstName, lastName: msg.lastName, email: msg.email});
                }).catch((errorObj) => {
                    mongoose.connection.close();
                    res.status(400).send({error: errorObj.message});
                });
            }
            else {
                mongoose.connection.close();
                res.status(401).send({error: "User doesn't exists or invalid password, access denied."});
            }
        }).catch((errorObj) => {
            res.status(400).send({error: errorObj.message});
        });
    }).catch((errorObj) => {
        res.status(500).send({error: errorObj.name});
    });
});

app.listen(3000, () => {
    console.log("Server running on localhost port 3000");
});