const express = require('express');
const controller = require('../controllers/hotel');
const tokenHelper = require('../utils/tokenHelper');

const router = express.Router();

router.post('/', tokenHelper.verifyAdmin, controller.createHotel);
router.put('/find/:id', tokenHelper.verifyAdmin, controller.updateHotel);
router.delete('/find/:id', tokenHelper.verifyAdmin, controller.deleteHotel);
router.get('/find/:id', controller.getHotel);
router.get('/', controller.getAllHotels);
router.get('/countByCity', controller.countByCity);
router.get('/countByType', controller.countByType);

module.exports = router;