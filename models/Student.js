const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  dob: String,
  department: String,
  gender: String,
  stateId: Number,
  districtId: Number,
  activities: [String],
  photo: String,
  subjects: Object,
  age: String,
  totalMarks: Number,
  percentage: Number
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);