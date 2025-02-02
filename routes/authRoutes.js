const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



router.get('/' , (req, res,next) => {
    res.send('You are in Login Page');
    next();
});
router.post('/signup', authController.signup);

router.post('/login', authController.login);

module.exports = router;