const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

router.use(authMiddleware.authenticate);
router.use(checkRole(['vendor']));

// Add a product
router.post('/products', vendorController.createProduct);

// View own products
router.get('/products', vendorController.getProducts);

module.exports = router;