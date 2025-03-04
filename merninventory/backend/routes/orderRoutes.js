const express = require('express');
const router = express.Router();

const Order = require('../models/Order')
const Inventory = require('../models/InventoryItem');
const authMiddleware = require('../middlewares/authMiddleware');

// API to handle order creation
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { customerName, productName, quantity } = req.body;
        const userId = req.user.id; 

        // Find product in inventory
        const product = await Inventory.findOne({ name: productName, userId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        // Calculate total price
        const totalCostPrice = product.costPrice * quantity;
        const totalSellingPrice = product.sellingPrice * quantity;
        const totalProfit = product.profit * quantity;

        // Create new order with user ID
        const newOrder = new Order({
            userId: userId, // Attach user ID
            customerName,
            productName,
            quantity,
            totalCostPrice,
            totalSellingPrice,
            totalProfit
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});


// API to get all orders
router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.user.id});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Update an order
router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        const { customerName, productName, quantity } = req.body;
        const userId = req.user.id

        // Find product in inventory
        const product = await Inventory.findOne({ name: productName, userId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        // Find the order
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the logged-in user owns the order
        if (order.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only update your own orders' });
        }

        // Calculate new total price
        const totalCostPrice = product.costPrice * quantity;
        const totalSellingPrice = product.sellingPrice * quantity;
        const totalProfit = product.profit * quantity;

        // Update the order
        order.customerName = customerName;
        order.productName = productName;
        order.quantity = quantity;
        order.totalCostPrice = totalCostPrice;
        order.totalSellingPrice = totalSellingPrice;
        order.totalProfit = totalProfit;

        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API to delete an order
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the logged-in user is the owner of the order
        if (order.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own orders' });
        }

        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted successfully' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


  module.exports = router;
