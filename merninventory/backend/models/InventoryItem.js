const mongoose = require('mongoose');

// Define the schema for inventory items
const inventoryItemSchema = new mongoose.Schema({
   userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  profit: { type: Number, required: true }
});


// Create and export the model
const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
