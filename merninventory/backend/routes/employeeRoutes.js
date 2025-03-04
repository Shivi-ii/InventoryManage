// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');
const authMiddleware = require('../middlewares/authMiddleware');

// get employee
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const employees = await Employee.find({userId});
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get employee count
router.get('/count',authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const count = await Employee.countDocuments({userId});
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add employee
router.post('/add',authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name, department, email, salary } = req.body;

    // Create a new employee
    const newEmployee = new Employee({
      userId: userId,
      name,
      department,
      email,
      salary,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/update/:id',authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email, salary } = req.body;

    // Find the employee by id and update it
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id, userId: req.user.id },
      { name, department, email, salary },
      { new: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//delete
router.delete('/:id',authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by id and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
