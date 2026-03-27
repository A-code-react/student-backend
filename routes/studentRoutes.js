const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/auth");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// ✅ GET all
router.get("/", auth, async (req, res) => {
  const data = await Student.find();

  const formatted = data.map(item => ({
    ...item._doc,
    id: item._id
  }));

  res.json(formatted);
});

// ✅ GET by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      ...student._doc,
      id: student._id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/check-uploads", (req, res) => {
  const files = fs.readdirSync(uploadPath);
  res.json(files);
});
// ✅ CREATE (WITH IMAGE UPLOAD)
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const studentData = {
      ...req.body,
      activities: req.body.activities ? JSON.parse(req.body.activities) : [],
      subjects: req.body.subjects ? JSON.parse(req.body.subjects) : {},
      photo: req.file ? req.file.path : ""
    };

    const student = new Student(studentData);
    const saved = await student.save();

    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE (FIXED WITH IMAGE HANDLING)
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const existingStudent = await Student.findById(req.params.id);

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    let photoUrl = existingStudent.photo;

    // ✅ If new image uploaded
    if (req.file) {
      // delete old image
      if (existingStudent.photo) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          existingStudent.photo.replace(BASE_URL, "")
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // set new image
      photoUrl = `${BASE_URL}/uploads/${req.file.filename}`;
    }

    const updatedData = {
      ...req.body,
      activities: req.body.activities
        ? JSON.parse(req.body.activities)
        : [],
      subjects: req.body.subjects
        ? JSON.parse(req.body.subjects)
        : {},
      photo: photoUrl
    };

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ✅ BULK INSERT
router.post("/bulk", async (req, res) => {
  try {
    const students = await Student.insertMany(req.body);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;