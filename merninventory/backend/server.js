const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Order = require('./models/Order'); // order schema
const Inventory = require('./models/InventoryItem.js'); // Inventory schema
const Employee = require('./models/employeeModel.js')

const supplierRoutes = require('./routes/supplierRoutes'); // Ensure this path is correct
const inventoryRoutes = require('./routes/inventoryRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes');
const authMiddleware = require('./middlewares/authMiddleware.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivaninegi0435:5Xv6VGvBjqJbKTM3@cluster0.bhtnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });


// Routes
app.use('/api/suppliers', supplierRoutes);

app.use('/api/inventory', inventoryRoutes);

// Routes
app.use('/api/employees', employeeRoutes);

app.use('/api/orders', orderRoutes)

app.use('/api/users', userRoutes);

app.post('/api/logout', (req, res) => {
  // Clear the token on the server-side (if using server-side sessions)
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
});


// Fetch Expense Data
app.get('/api/expenseChart/expense', authMiddleware, async (req, res) => { 
  try {
    const userId = req.user.id; // Get user ID from middleware

    // Calculate total product costs (costPrice * quantity) for the logged-in user
    const totalProductCosts = await Inventory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { 
        $group: { 
          _id: null, 
          total: { $sum: { $multiply: ["$costPrice", "$quantity"] } } 
        } 
      }
    ]);

    // Calculate total employee salaries for the logged-in user
    const totalSalaries = await Employee.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$salary" } } }
    ]);

    res.json({
      productCosts: totalProductCosts.length ? totalProductCosts[0].total : 0,
      employeeSalaries: totalSalaries.length ? totalSalaries[0].total : 0
    });

  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/expenseIncome',authMiddleware, async (req, res) => {
  const userId = req.user.id; // Get user ID from middleware

  try {
    const employees = await Employee.find({userId});
    const inventory = await Inventory.find({userId});

    // Calculate total employee salaries
    const totalSalaries = employees.reduce((sum, emp) => sum + emp.salary, 0);

    // Calculate total inventory selling price & cost price
    let totalSellingPrice = 0;
    let totalCostPrice = 0;

    inventory.forEach((item) => {
      totalSellingPrice += item.sellingPrice * item.quantity;
      totalCostPrice += item.costPrice * item.quantity;
    });

    const totalExpenses = totalSalaries + totalSellingPrice;
    const totalIncome = totalCostPrice;

    res.json({ totalIncome, totalExpenses });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/api/top-selling-products',authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID

    const products = await Order.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // No need for ObjectId conversion
      {
        $group: {
          _id: "$productName",
          totalQuantitySold: { $sum: "$quantity" },
        },
      },
      { $sort: { totalQuantitySold: -1 } }, // Sort in descending order
      { $limit: 5 }, // Get only top 5 products
    ]);

    res.json(products);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 // Function to get start and end dates for filtering
const getDateRange = (filter) => {
  const now = new Date();
  let startDate, endDate = new Date();

  if (filter === "week") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
  } else if (filter === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (filter === "year") {
      startDate = new Date(now.getFullYear(), 0, 1);
  }

  // Ensure endDate is the last second of the day
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
};

// API to get sales data for chart
app.get("/api/saleschart",authMiddleware, async (req, res) => {
  try {
      const filter = req.query.filter || "month"; // Default: month
      const { startDate, endDate } = getDateRange(filter);
      const userId = req.user.id; // Get logged-in user ID


      const salesData = await Order.aggregate([
          {
              $match: {
                userId,// Ensure it's an ObjectId
                createdAt: { $gte: startDate, $lte: endDate }
              }
          },
          {
              $group: {
                  _id: {
                      year: { $year: "$createdAt" },
                      ...(filter !== "year" && { month: { $month: "$createdAt" } }),
                      ...(filter === "week" && { day: { $dayOfMonth: "$createdAt" } })
                  },
                  totalSales: { $sum: "$totalSellingPrice" } 
              }
          },
          { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
      ]);

      res.json(salesData);
  } catch (err) {
      console.error("Error in saleschart API:", err);
      res.status(500).json({ error: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
