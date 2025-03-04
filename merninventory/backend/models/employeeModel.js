// models/employeeModel.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // User reference

  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
