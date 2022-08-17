const express = require('express');
const controller = require('../controllers/hotel');

const router = express.Router();

router.post('/', controller.createHotel);
router.put('/:id', controller.updateHotel);
router.delete('/:id', controller.deleteHotel);
router.get('/:id', controller.getHotel);
router.get('/', controller.getAllHotels);

module.exports = router;