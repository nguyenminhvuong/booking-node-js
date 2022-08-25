const express = require("express");
const controller = require("../controllers/room");
const tokenHelper = require("../utils/tokenHelper");

const router = express.Router();

router.post("/:hotelid", tokenHelper.verifyAdmin, controller.createRoom);
router.put("/:id", tokenHelper.verifyAdmin, controller.updateRoom);
router.delete("/:id/:hotelid", tokenHelper.verifyAdmin, controller.deleteRoom);
router.get("/:id", controller.getRoom);
router.get("/", controller.getAllRooms);
router.put("/availability/:id", controller.updateRoomAvailability);

module.exports = router;
