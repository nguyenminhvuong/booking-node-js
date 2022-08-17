const hotelModel = require('../models/Hotel');

exports.createHotel = async function(req, res, next){

    const newHotel = new hotelModel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch(err){
        next(err);
    }
}

exports.updateHotel = async function(req, res, next){

    try {
        const updatedHotel = await hotelModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new : true});
        res.status(200).json(updatedHotel);
    } catch(err){
        next(err);
    }
}

exports.deleteHotel = async function(req, res, next){

    try {
        await hotelModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has ben deleted");
    } catch(err){
        next(err);
    }
}

exports.getHotel = async function(req, res, next){

    try {
        const hotel = await hotelModel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch(err){
        next(err);
    }
}

exports.getAllHotels = async function(req, res, next){

    try {
        const hotels = await hotelModel.find();
        res.status(200).json(hotels);
    } catch(err){
        next(err);
    }
}