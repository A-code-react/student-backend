const express = require("express");
const router = express.Router();
const State = require("../models/State");

// ✅ GET all states
 
router.get("/", async (req, res) => {
  const { stateId, districtId } = req.query;

  let filter = {};

  if (stateId) filter.stateId = Number(stateId);
  if (districtId) filter.districtId = Number(districtId);

  const data = await State.find(filter);

  res.json(data);
});
// ✅ GET districts by state ID
router.get("/:id", async (req, res) => {
  const state = await State.findOne({ id: req.params.id });

  if (!state) {
    return res.status(404).json({ message: "State not found" });
  }

  res.json(state);
});

// ✅ BULK insert (for your JSON)
router.post("/bulk", async (req, res) => {
  try {
    const data = await State.insertMany(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;