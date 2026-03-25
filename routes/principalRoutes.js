const express = require("express");
const router = express.Router();
const Principal = require("../models/Principal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey"; // later move to .env
// ✅ LOGIN API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const principal = await Principal.findOne({ email });

    if (!principal) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, principal.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: principal._id, email: principal.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const principal = new Principal({
      name,
      email,
      password: hashedPassword
    });

    const saved = await principal.save();

    res.json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Principal.findByIdAndDelete(req.params.id);
    res.json({ message: "Principal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;