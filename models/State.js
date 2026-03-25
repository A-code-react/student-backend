const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  id: Number,
  name: String
}, { _id: false });

const stateSchema = new mongoose.Schema({
  id: String,
  name: String,
  districts: [districtSchema]
});

module.exports = mongoose.model("State", stateSchema);