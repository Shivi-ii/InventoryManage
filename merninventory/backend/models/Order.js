const mongoose = require('mongoose');

// Define the schema for sales
const orderSchema = new mongoose.Schema({
   userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  customerName: String,
  productName: String,
  quantity: Number,
  totalCostPrice: Number,
  totalSellingPrice: Number,
  totalProfit: Number,
}, { timestamps: true })


// Create and export the model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
