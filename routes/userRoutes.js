const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

router.use(authMiddleware.authenticate);
router.use(checkRole(['buyer']));

router.get('/products', userController.getAllProducts);

module.exports = router;