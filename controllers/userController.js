const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        const productsWithDiscount = products.map(product => {
            const discountPercentage = ((product.oldPrice - product.newPrice) / product.oldPrice) * 100;
            const discountAmount = product.oldPrice - product.newPrice;

            return {
                ...product,
                discountPercentage: parseFloat(discountPercentage.toFixed(2)),
                discountAmount: parseFloat(discountAmount.toFixed(2))
            };
        });

        res.status(200).json({ success: true, data: productsWithDiscount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllProducts };