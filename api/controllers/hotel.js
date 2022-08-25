const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

exports.createHotel = async function (req, res, next) {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

exports.updateHotel = async function (req, res, next) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

exports.deleteHotel = async function (req, res, next) {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has ben deleted");
  } catch (err) {
    next(err);
  }
};

exports.getHotel = async function (req, res, next) {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

exports.getAllHotels = async function (req, res, next) {
  const { min, max, ...other } = req.query;
  try {
    const hotels = await Hotel.find({
      ...other,
      cheapestPrice: { $gt: min | 1, $lt: max || 99999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

exports.countByCity = async function (req, res, next) {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.countByType = async function (req, res, next) {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      {
        type: "hotels",
        count: hotelCount,
      },
      {
        type: "apartments",
        count: apartmentCount,
      },
      {
        type: "resorts",
        count: resortCount,
      },
      {
        type: "villas",
        count: villaCount,
      },
      {
        type: "cabins",
        count: cabinCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.getHotelRooms = async function (req, res, next) {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
