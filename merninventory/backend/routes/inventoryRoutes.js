const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to get all inventory items
router.get('/',authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const items = await InventoryItem.find({userId});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inventory items' });
  }
});

// Route to add a new inventory item
router.post('/add', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { name, quantity, costPrice, sellingPrice } = req.body;
  try {
    // Check if the inventory item already exists
    const itemExists = await InventoryItem.findOne({ name, userId });
    if (itemExists) {
      console.log("Item already exists:", name);
      return res.status(400).json({ success: false, message: 'Item already exists' });
    }
    const profit = sellingPrice - costPrice;
    const newItem = new InventoryItem({ userId, name, quantity, costPrice, sellingPrice, profit });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error); 
    res.status(500).json({ error: 'Error adding item' });
  }
});


// Get inventory count
router.get('/count', authMiddleware, async (req, res) => {
  try {
    const count = await InventoryItem.countDocuments({userId: req.user.id});
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Route to update an inventory item
router.put('/:id',authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, quantity, costPrice, sellingPrice } = req.body;
  
  try {
    const profit = sellingPrice - costPrice;
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      id,
      { name, quantity, costPrice, sellingPrice, profit },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem)
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

// Route to delete an inventory item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
});

router.get('/product/:productName',authMiddleware, async (req, res) => {
  const { productName } = req.params;
  const userId = req.user.id;

  try {
    const product = await InventoryItem.findOne({ name: productName, userId });
    if (product) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
