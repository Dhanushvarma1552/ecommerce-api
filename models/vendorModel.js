const db = require('../config/db');

class Vendor {
    static async create({ userId, companyName, contactEmail }) {
        const [result] = await db.query(
            'INSERT INTO vendors (userId, companyName, contactEmail) VALUES (?, ?, ?)',
            [userId, companyName, contactEmail]
        );
        return result.insertId;
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM vendors WHERE userId = ?', [userId]);
        return rows[0];
    }

    static async findById(vendorId) {
        const [rows] = await db.query('SELECT * FROM vendors WHERE id = ?', [vendorId]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM vendors');
        return rows;
    }

    static async update(vendorId, { companyName, contactEmail }) {
        const [result] = await db.query(
            'UPDATE vendors SET companyName = ?, contactEmail = ? WHERE id = ?',
            [companyName, contactEmail, vendorId]
        );
        return result.affectedRows > 0;
    }

    static async delete(vendorId) {
        const [result] = await db.query('DELETE FROM vendors WHERE id = ?', [vendorId]);
        return result.affectedRows > 0;
    }
}

module.exports = Vendor;