const User = require('../models/userModel');
const Product = require('../models/productModel');
const db = require('../config/db');


const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId } = req.body;

        const [vendor] = await db.query('SELECT id FROM vendors WHERE id = ?', [vendorId]);
        if (vendor.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid vendorId. Vendor does not exist.' });
        }

        const [result] = await db.execute(
            `INSERT INTO products (name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId]
        );

        res.status(201).json({ success: true, message: 'Product created successfully.', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
        await db.execute('DELETE FROM products WHERE id = ?', [id]);

        res.status(200).json({ success: true, message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const createStaff = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        const userId = await User.create({ name, email, password, role: 'staff' });
        res.status(201).json({ success: true, message: 'Staff created successfully.', userId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { getAllUsers, createProduct, getAllProducts, createStaff ,deleteProduct};
