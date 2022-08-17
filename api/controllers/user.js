const userModel = require('../models/User');

exports.createUser = async function(req, res, next){

    const newUser = new userModel(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err){
        next(err);
    }
}

exports.updateUser = async function(req, res, next){

    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new : true});
        res.status(200).json(updatedUser);
    } catch(err){
        next(err);
    }
}

exports.deleteUser = async function(req, res, next){

    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has ben deleted");
    } catch(err){
        next(err);
    }
}

exports.getUser = async function(req, res, next){

    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(err){
        next(err);
    }
}

exports.getAllUsers = async function(req, res, next){

    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch(err){
        next(err);
    }
}