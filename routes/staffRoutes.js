const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');


router.use(authMiddleware.authenticate);
router.use(checkRole(['staff']));

router.post('/products', staffController.createProduct);

router.get('/products', staffController.getProducts);

module.exports = router;