const express = require("express");
const Item = require("../models/Item");
const User = require("../models/User");

const router = express.Router();

// Middleware to check auth
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
}

// Add item (POST /api/items/add)
router.post("/add", isAuthenticated, async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const newItem = new Item({
      title,
      description,
      price,
      imageUrl,
      user: req.session.userId,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item" });
  }
});

// Get all items (GET /api/items)
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("user", "username").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

module.exports = router;
