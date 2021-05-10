// 1. Load the Person model
var Person = require('../models/user.js');
var jwt = require('jwt-simple');
var bcrypt = require("bcryptjs");
const config = require("../config.js");

exports.signup = async function(req, res){

    const isEmailExist = await Person.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({error: 'Email ya registrado'})
    }

    var user = new Person({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    const savedUser = user.save(function(err){
    if (err) {
        res.status(500).send({ message: err });
        return;
    }

        return res.status(200).send(savedUser);
    });
};

exports.login = async function(req, res) {
    Person.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        user.comparePassword(
            req.body.password,
            function(err, isMatch) {
                if (err) throw err;
                if (!isMatch) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
                var token = jwt.encode({ id: user.id }, config.TOKEN_SECRET);
                return res.status(200).send({token: token});
            }
        );
        
    });
};