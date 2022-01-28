const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { password, ...others } = product._doc;
    res.status(200).json(others);
  } catch {
    res.status(500).json(err);
  }
});

router.get("/allProducts", async (req, res) => {
  const queryNew = req.query.new;
  const qCategory = req.query.category;
  // console.log("HELLLLOOOO GUYS");
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory != "null") {
      // console.log(qCategory, "Helo");
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      // console.log("Hello no cat");
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
