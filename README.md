# **E-commerce API**

This is a **Node.js** and **MySQL** based E-commerce API that supports multiple user roles: **Admin**, **Staff**, **Vendor**, and **Buyer**. The API provides functionalities for user authentication, product management, and role-based access control.

---

## **Features**
1. **User Roles:**
   - **Admin:** Full access to the system. Can create products and view all users.
   - **Staff:** Can add and view products for assigned vendors.
   - **Vendor:** Can add and view their own products.
   - **Buyer:** Can view all products with vendor information and expiry details.

2. **Authentication:**
   - User authentication using **JWT (JSON Web Tokens)**.
   - Passwords are hashed using **bcryptjs**.

3. **Product Management:**
   - Admins, staff, and vendors can create products.
   - Products include details like name, description, category, prices, start date, expiry date, delivery amount, and image URL.

4. **Discount Calculation:**
   - Discount percentage and amount are calculated dynamically based on old and new prices.

5. **Database:**
   - Uses **MySQL** as the relational database.
   - Tables: `users`, `vendors`, `products`.

---

## **Setup Instructions**

### **1. Prerequisites**
- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher)
- **Postman** (for testing the API)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Set Up the Database**
1. Create a MySQL database named `ecommerce`.
2. Run the following SQL script to create the required tables:
   ```sql
   CREATE DATABASE ecommerce;
   USE ecommerce;

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role ENUM('admin', 'staff', 'vendor', 'buyer') NOT NULL,
       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );

   CREATE TABLE vendors (
       id INT AUTO_INCREMENT PRIMARY KEY,
       userId INT NOT NULL,
       companyName VARCHAR(255) NOT NULL,
       contactEmail VARCHAR(255) NOT NULL,
       FOREIGN KEY (userId) REFERENCES users(id)
   );

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

   -- Add a default super-admin account
   INSERT INTO users (name, email, password, role)
   VALUES ('Super Admin', 'admin@example.com', '$2a$10$YourHashedPassword', 'admin');
   ```

### **5. Configure Environment Variables**
Create a `.env` file in the root directory and add the following:
```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
JWT_SECRET=yourjwtsecretkey
PORT=5000
```

### **6. Start the Server**
```bash
npm start
```
The server will start at `http://localhost:5000`.

---

## **API Documentation**

### **Auth Routes**
- **Signup (Buyer/Vendor):**
  - **Method:** `POST`
  - **URL:** `/auth/signup`
  - **Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "buyer" // or "vendor"
    }
    ```

- **Login (All Roles):**
  - **Method:** `POST`
  - **URL:** `/auth/login`
  - **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### **Admin Routes**
- **View All Users:**
  - **Method:** `GET`
  - **URL:** `/admin/users`
  - **Headers:** `Authorization: Bearer <JWT_TOKEN>`

- **Create a Product:**
  - **Method:** `POST`
  - **URL:** `/admin/products`
  - **Headers:** `Authorization: Bearer <JWT_TOKEN>`
  - **Body:**
    ```json
    {
      "name": "Laptop",
      "description": "High-performance laptop",
      "category": "Electronics",
      "oldPrice": 1200.00,
      "newPrice": 1000.00,
      "startDate": "2023-10-01",
      "expiryDate": "2023-10-08",
      "deliveryAmount": 20.00,
      "isFreeDelivery": false,
      "imageUrl": "http://example.com/laptop.jpg",
      "vendorId": 1
    }
    ```

### **User Routes**
- **View All Products:**
  - **Method:** `GET`
  - **URL:** `/user/products`
  - **Headers:** `Authorization: Bearer <JWT_TOKEN>`

---

## **Testing the API**
1. Use **Postman** to test the API endpoints.
2. Import the provided **Postman Collection** for easy testing.

---

## **Technologies Used**
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT, bcryptjs
- **API Testing:** Postman

---

## **Contributing**
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**
For any questions or feedback, please contact:
- **Name:** Your Name
- **Email:** your.email@example.com
- **GitHub:** [your-username](https://github.com/your-username)

---

Let me know if you need further assistance! 😊
