require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db.config');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler'); // Middleware for error handling
const requestLogger = require('./src/middlewares/requestLogger'); // Custom middleware example

// Initialize DB connection
connectDB();

// Initialize Express app
const app = express();

// Global middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // Custom request logger middleware

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});

// src/config/db.config.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

// src/routes/index.js
const express = require('express');
const productRoutes = require('./product.routes');
const invoiceRoutes = require('./invoice.routes');
const inventoryRoutes = require('./inventory.routes');

const router = express.Router();

router.use('/products', productRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/inventory', inventoryRoutes);

module.exports = router;

// src/routes/product.routes.js
const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const validateProduct = require('../middlewares/validateProduct');
const router = express.Router();

router.get('/', getProducts);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

// src/routes/invoice.routes.js
const express = require('express');
const { getInvoices, createInvoice, updateInvoice, deleteInvoice } = require('../controllers/invoice.controller');
const validateInvoice = require('../middlewares/validateInvoice');
const router = express.Router();

router.get('/', getInvoices);
router.post('/', validateInvoice, createInvoice);
router.put('/:id', validateInvoice, updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;

// src/routes/inventory.routes.js
const express = require('express');
const { getInventory, updateInventory } = require('../controllers/inventory.controller');
const validateInventory = require('../middlewares/validateInventory');
const router = express.Router();

router.get('/', getInventory);
router.put('/:id', validateInventory, updateInventory);

module.exports = router;

// src/controllers/product.controller.js
const getProducts = (req, res) => {
    res.status(200).json({ message: 'List of products' });
};

const createProduct = (req, res) => {
    res.status(201).json({ message: 'Product created' });
};

const updateProduct = (req, res) => {
    res.status(200).json({ message: Product ${ req.params.id } updated });
};

const deleteProduct = (req, res) => {
    res.status(200).json({ message: Product ${ req.params.id } deleted });
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };

// src/controllers/invoice.controller.js
const getInvoices = (req, res) => {
    res.status(200).json({ message: 'List of invoices' });
};

const createInvoice = (req, res) => {
    res.status(201).json({ message: 'Invoice created' });
};

const updateInvoice = (req, res) => {
    res.status(200).json({ message: Invoice ${ req.params.id } updated });
};

const deleteInvoice = (req, res) => {
    res.status(200).json({ message: Invoice ${ req.params.id } deleted });
};

module.exports = { getInvoices, createInvoice, updateInvoice, deleteInvoice };

// src/controllers/inventory.controller.js
const getInventory = (req, res) => {
    res.status(200).json({ message: 'Inventory list' });
};

const updateInventory = (req, res) => {
    res.status(200).json({ message: Inventory ${ req.params.id } updated });
};

module.exports = { getInventory, updateInventory };

// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;

// src/middlewares/requestLogger.js
const requestLogger = (req, res, next) => {
    console.log(${ req.method } ${ req.url });
    next();
};

module.exports = requestLogger;

// src/middlewares/validateProduct.js
const validateProduct = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }
    next();
};

module.exports = validateProduct;

// src/middlewares/validateInvoice.js
const validateInvoice = (req, res, next) => {
    const { customerName, items } = req.body;
    if (!customerName || !items || !items.length) {
        return res.status(400).json({ message: 'Customer name and items are required' });
    }
    next();
};

module.exports = validateInvoice;

// src/middlewares/validateInventory.js
const validateInventory = (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId || quantity == null) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
    }
    next();
};

module.exports = validateInventory;