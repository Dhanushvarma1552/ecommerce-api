
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware'); 

router.use(authMiddleware.authenticate);
router.use(roleMiddleware(['admin']));
router.get('/users', adminController.getAllUsers);
router.post('/staff', adminController.createStaff);
router.post('/products', adminController.createProduct);
router.get('/products', adminController.getAllProducts);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;