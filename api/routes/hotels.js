const express = require('express');
const controller = require('../controllers/hotel');
const tokenHelper = require('../utils/tokenHelper');

const router = express.Router();

router.post('/', tokenHelper.verifyAdmin, controller.createHotel);
router.put('/:id', tokenHelper.verifyAdmin, controller.updateHotel);
router.delete('/:id', tokenHelper.verifyAdmin, controller.deleteHotel);
router.get('/:id', controller.getHotel);
router.get('/', controller.getAllHotels);

module.exports = router;