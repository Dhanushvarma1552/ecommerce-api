const db = require('../config/db');

class Product {
    static async create({ name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId }) {
        const [result] = await db.query(
            'INSERT INTO products (name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, category, oldPrice, newPrice, startDate, expiryDate, deliveryAmount, isFreeDelivery, imageUrl, vendorId]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    }

    static async findByVendorId(vendorId) {
        const [rows] = await db.query('SELECT * FROM products WHERE vendorId = ?', [vendorId]);
        return rows;
    }
}

module.exports = Product;