const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
   userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  supplierName: String,
  email: String,
  supplyProduct: String,
  quantity: Number,
  payment: Number
});

module.exports = mongoose.model('Supplier', SupplierSchema);
