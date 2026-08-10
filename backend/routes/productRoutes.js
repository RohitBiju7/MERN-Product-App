const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// @route   GET /products/health
// @desc    Check MongoDB connection status
router.get('/health', (req, res) => {
  const state = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];

  if (state === 1) {
    return res.status(200).json({ status: 'OK', database: states[state] });
  }

  return res.status(503).json({ status: 'ERROR', database: states[state] });
});

// @route   GET /products
// @desc    Get all products from MongoDB
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /products
// @desc    Create a new product
router.post('/', async (req, res) => {
  try {
    const { title, price, image, rating } = req.body;
    const newProduct = new Product({ title, price, image, rating });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /products/:id
// @desc    Update an existing product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true } // Fixed deprecation warning
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /products/:id
// @desc    Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;