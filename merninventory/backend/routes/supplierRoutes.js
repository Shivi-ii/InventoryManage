const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const InventoryItem = require('../models/InventoryItem');
const authMiddleware = require('../middlewares/authMiddleware');


// Get all suppliers with optional search and filter
router.get('/',authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const { search, filter } = req.query;
    let query = {userId};

    if (search) {
      query.supplierName = { $regex: search, $options: 'i' };
    }

    if (filter) {
      query.supplyProducts = { $regex: filter, $options: 'i' };
    }

    const suppliers = await Supplier.find(query);
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving suppliers', error: error.message });
  }
});

// Get supplier count
router.get('/count',authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const count = await Supplier.countDocuments({userId});
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }});
// Get a single supplier by ID
router.get('/:id', async (req, res) => {
  const userId = req.user.id;

  try {
    const supplier = await Supplier.findOne({ _id: req.params.id, userId });    
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier', error: error.message });
  }
});

router.post('/add',authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const { supplierName, email, supplyProduct, quantity } = req.body;

    // Check if the product exists in InventoryItems
    const product = await InventoryItem.findOne({ name: supplyProduct, userId });

    if (!product) {
      return res.status(400).json({ message: "You don't sell this product" });
    }

    // Calculate payment using costPrice from inventory
    const payment = product.costPrice * quantity;

    // Create new supplier with calculated payment
    const supplier = new Supplier({
      userId: userId,
      supplierName,
      email,
      supplyProduct,
      quantity,
      payment, // No need to take from frontend
    });

    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: 'Error creating supplier', error: error.message });
  }
});

module.exports = router;


// Update a supplier by ID
router.put('/:id',authMiddleware, async (req, res) => {

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedSupplier) {
      res.json(updatedSupplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating supplier', error: error.message });
  }
});

// Delete a supplier by ID
router.delete('/:id',authMiddleware, async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (deletedSupplier) {
      res.json({ message: 'Supplier deleted' });
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error: error.message });
  }
});

module.exports = router;
