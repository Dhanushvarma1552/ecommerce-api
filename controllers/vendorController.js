const Product = require('../models/productModel');
const Vendor = require('../models/vendorModel');    
const db = require('../config/db');

const createProduct = async (req, res) => {
    try {
        const { name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl } = req.body;

        const [vendor] = await db.query('SELECT id FROM vendors WHERE userId = ?', [req.user.id]);
        if (!vendor.length) {
            return res.status(403).json({ success: false, message: "Only vendors can create products." });
        }

        const vendorId = vendor[0].id;

        const productId = await Product.create({ name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId });

        res.status(201).json({ success: true, message: 'Product created successfully.', productId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        const vendorid=await Vendor.findByUserId(req.user.id);
        console.log(vendorid);
        const vendorproducts=products.filter(product=>product.vendorId===vendorid.id);
        res.status(200).json({ success: true, data: vendorproducts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createProduct, getProducts };