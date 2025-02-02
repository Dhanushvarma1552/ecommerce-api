const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    try {
        const { name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId } = req.body;
        const productId = await Product.create({ name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId });
        res.status(201).json({ success: true, message: 'Product created successfully.', productId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.findByVendorId(req.user.id); // Assuming staff is assigned to a vendor
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createProduct, getProducts };