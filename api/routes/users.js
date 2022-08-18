const express = require('express');
const controller = require('../controllers/user');
const tokenHelper = require('../utils/tokenHelper');

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send('Hello user, you are authorized');
// });

// router.get('/checkuser/:id', verifyToken, (req, res, next) => {
//     res.send('Hello user, you are logged in and you can delete your account');
// });

// router.get('/checkadmin/:id', verifyToken, (req, res, next) => {
//     res.send('Hello user, you are logged in and you can delete all accounts');
// });

router.put('/:id', tokenHelper.verifyUser, controller.updateUser);
router.delete('/:id', tokenHelper.verifyUser, controller.deleteUser);
router.get('/:id', tokenHelper.verifyUser, controller.getUser);
router.get('/', tokenHelper.verifyAdmin, controller.getAllUsers);

module.exports = router;