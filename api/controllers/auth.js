const User = require('../models/User');
const bcrypt = require('bcryptjs');
const errorHelper = require('../utils/errorHelper');
const jwt = require('jsonwebtoken');

exports.register = async function(req, res, next){
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        await newUser.save();

        res.status(200).send("User has been created");

    } catch(err){
        next(err);
    }
}

exports.login = async function(req, res, next) {
    try{

        const user = await User.findOne({
            username: req.body.username
        });

        if(!user) 
            return next(errorHelper.createError(404, "User not found"));

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if(!isPasswordCorrect)
            return next(errorHelper.createError(400, "Username or password is not correct"));

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY)

        res.cookie("access_token", token, {
            httpOnly: true
        })

        res.status(200).send(user);

    } catch (err){
        next(err);
    }
}