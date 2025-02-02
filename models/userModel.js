const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async create({ name, email, password, role, companyName }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const connection = await db.getConnection(); 
        try {
            await connection.beginTransaction(); 

            const [userResult] = await connection.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, hashedPassword, role]
            );

            const userId = userResult.insertId;

            if (role === 'vendor' && companyName) {
                await connection.execute(
                    'INSERT INTO vendors (userId, companyName, contactEmail) VALUES (?, ?, ?)',
                    [userId, companyName, email]
                );
            }

            await connection.commit(); 
            connection.release();

            return userId;
        } catch (error) {
            await connection.rollback(); 
            connection.release();
            throw error;
        }
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]; 
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0]; 
    }
}

module.exports = User;
