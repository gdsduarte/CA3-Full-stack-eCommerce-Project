const express = require("express");
const { Product } = require("../Models/products");
const router = express.Router();

// Get all products
router.get("/", async(req, res) => {
  try {
    const productList = await Product.find();
    res.json(productList);
  } catch (err) {
    res.status(500).send("Server error while retrieving products.");
  }
});

// Get a single product by id
router.get("/:id", async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found.");
    }
    res.json(product);
  } catch (err) {
    res.status(500).send("Server error while retrieving the product.");
  }
});

// Post new product
router.post("/create", async(req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res
      .status(500)
      .send("Server error while creating the product: " + err.message);
  }
});

// Update a product
router.put("/update/:id", async(req, res) => {
  const updates = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(404).send("Product not found.");
    }
    res.json(updatedProduct);
  } catch (err) {
    res
      .status(500)
      .send("Server error while updating the product: " + err.message);
  }
});

// Delete a product
router.delete("/delete/:id", async(req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send("Product not found.");
    }
    res.send("Product deleted successfully!");
  } catch (err) {
    res.status(500).send("Server error while deleting the product.");
  }
});

module.exports = router;
