const Hotel = require('../models/Hotel');

exports.createHotel = async function(req, res, next){

    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch(err){
        next(err);
    }
}

exports.updateHotel = async function(req, res, next){

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new : true});
        res.status(200).json(updatedHotel);
    } catch(err){
        next(err);
    }
}

exports.deleteHotel = async function(req, res, next){

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has ben deleted");
    } catch(err){
        next(err);
    }
}

exports.getHotel = async function(req, res, next){

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch(err){
        next(err);
    }
}

exports.getAllHotels = async function(req, res, next){

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch(err){
        next(err);
    }
}

exports.countByCity = async function(req, res, next){

    const cities = req.params.cities.split(',');

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city});
        }))
        res.status(200).json(list);
    } catch(err){
        next(err);
    }
}

exports.countByType = async function(req, res, next){

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch(err){
        next(err);
    }
}