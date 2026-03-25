const mongoose = require("mongoose");

const principalSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model("Principal", principalSchema);