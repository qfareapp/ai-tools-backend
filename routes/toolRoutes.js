const express = require("express");
const router = express.Router();
const Tool = require("../models/Tool");

// GET all tools
router.get("/", async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET a single tool by ID ✅ (this is what you need now)
router.get("/:id", async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    res.json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new tool
router.post("/", async (req, res) => {
  const newTool = new Tool(req.body);
  try {
    const saved = await newTool.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST add review to a tool
router.post("/:id/review", async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool) return res.status(404).json({ error: "Tool not found" });

  tool.reviews.push(req.body);
  await tool.save();
  res.json(tool);
});

module.exports = router;
