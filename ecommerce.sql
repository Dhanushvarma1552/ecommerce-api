CREATE DATABASE ecommerce;
USE ecommerce;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'vendor', 'buyer') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vendors Table
CREATE TABLE vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    companyName VARCHAR(255) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    oldPrice DECIMAL(10, 2) NOT NULL,
    newPrice DECIMAL(10, 2) NOT NULL,
    startDate DATE NOT NULL,
    expiryDate DATE NOT NULL,
    deliveryAmount DECIMAL(10, 2),
    isFreeDelivery BOOLEAN DEFAULT FALSE,
    imageUrl VARCHAR(255),
    vendorId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendorId) REFERENCES vendors(id)
);

-- Default Super Admin
INSERT INTO users (name, email, password, role)
VALUES ('Super Admin', 'admin@example.com', '$2a$10$YourHashedPassword', 'admin');


