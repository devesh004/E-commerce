const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  // console.log(req.body);
  const newOrder = new Order(req.body);
  try {
    console.log("YOU TRIED WELL ENOUGH!");
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log("ERRRROOOORRRR  ", err);
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.status;
  // console.log(query);
  try {
    const updatedOrder = query
      ? await Order.findByIdAndUpdate(req.params.id, {
          $set: { status: query },
        })
      : await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
    console.log(updatedOrder);
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted!");
  } catch {
    res.status(500).json(err);
  }
});

router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(others);
  } catch {
    res.status(500).json(err);
  }
});

router.get("/allOrders", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const orders = query
      ? await Order.find().sort({ _id: -1 }).limit(5)
      : await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  // console.log(lastMonth);
  const prevMonth = new Date(date.setMonth(date.getMonth() - 1));
  // console.log(lastMonth, "  ", prevMonth);
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    // console.log(income);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
