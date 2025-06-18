const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const ImageKit = require('imagekit');
const app = express();
const PORT = 5002;

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: 'public_hOcXMyRcMv1gxe/58WiZAFu/Y2w=',
  privateKey: 'private_ok2x6nF3iWhV10GRjozYLoVU/kU=',
  urlEndpoint: 'https://ik.imagekit.io/makrofis'
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb+srv://catalog-app:vlVAbyhQsAh2lUgS@catalog-app.v0tfl.mongodb.net/makrofis?retryWrites=true&w=majority&appName=catalog-app&', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  console.log('Database:', mongoose.connection.db.databaseName);
})
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});

// Schemas
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{
    name: { type: String, required: true },
    imageUrl: String
  }],
  imageUrl: String,
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const itemSchema = new mongoose.Schema({
  barcode: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  subcategory: String,
  price: { type: Number, required: true },
  specs: [String],
  images: [String],
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

// Models
const Category = mongoose.model('Category', categorySchema);
const Item = mongoose.model('Item', itemSchema);

// Create indexes
itemSchema.index({ category: 1, subcategory: 1 });
categorySchema.index({ name: 1 });
itemSchema.index({ name: 'text', description: 'text' });

// API Endpoints

// ITEM ENDPOINTS
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch items',
      error: err.message 
    });
  }
});

app.get('/api/items/featured', async (req, res) => {
  try {
    const featuredItems = await Item.find({ isFeatured: true }).limit(8);
    res.json(featuredItems);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch featured items',
      error: err.message 
    });
  }
});

app.get('/api/items/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = await Item.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(results);
  } catch (err) {
    res.status(500).json({ 
      message: 'Search failed',
      error: err.message 
    });
  }
});

// ... [keep all your existing item endpoints] ...

// CATEGORY ENDPOINTS
app.get('/api/categories/featured', async (req, res) => {
  try {
    const featuredCategories = await Category.find({ isFeatured: true }).limit(6);
    res.json(featuredCategories);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch featured categories',
      error: err.message 
    });
  }
});

// ... [keep all your existing category endpoints] ...

// PRODUCTS ENDPOINTS
// ... [keep all your existing products endpoints] ...

// IMAGE UPLOAD ENDPOINT (ImageKit integration)
// ... [keep your existing image upload endpoint] ...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});