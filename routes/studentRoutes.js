const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const upload = require("../middleware/upload");
const cloudinary = require('cloudinary').v2;
const auth = require("../middleware/auth");
const path = require("path");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
const uploadPath = path.join(__dirname, "..", "uploads");

// ======================= GET ALL =======================
router.get("/", auth, async (req, res) => {
  try {
    const data = await Student.find();

    const formatted = data.map((item) => ({
      ...item._doc,
      id: item._id,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ======================= CHECK UPLOADS =======================
router.get("/check-uploads", (req, res) => {
  try {
    const files = fs.readdirSync(uploadPath);
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ======================= GET BY ID =======================
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      ...student._doc,
      id: student._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ======================= CREATE =======================
router.post("/", auth, upload.single("photo"), async (req, res) => {
  try {
    let activities = [];
    let subjects = {};

    try {
      activities = req.body.activities
        ? typeof req.body.activities === "string"
          ? JSON.parse(req.body.activities)
          : req.body.activities
        : [];

      subjects = req.body.subjects
        ? typeof req.body.subjects === "string"
          ? JSON.parse(req.body.subjects)
          : req.body.subjects
        : {};
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    const studentData = {
      ...req.body,
      activities,
      subjects,
      photo: req.file ? req.file.path : "", // Cloudinary URL
    };

    const student = new Student(studentData);
    const saved = await student.save();

    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ======================= UPDATE =======================
router.put("/:id", auth, upload.single("photo"), async (req, res) => {
  try {
    const existingStudent = await Student.findById(req.params.id);

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    let photoUrl = existingStudent.photo;

    // Handle new image upload and delete old from Cloudinary
    if (req.file) {
      if (existingStudent.photo) {
        // Extract public_id from Cloudinary URL (e.g., https://res.cloudinary.com/.../students/abc.jpg -> students/abc)
        const publicId = existingStudent.photo.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      photoUrl = req.file.path; // New Cloudinary URL
    }

    let activities = [];
    let subjects = {};

    try {
      activities = req.body.activities
        ? typeof req.body.activities === "string"
          ? JSON.parse(req.body.activities)
          : req.body.activities  
        : [];

      subjects = req.body.subjects
        ? typeof req.body.subjects === "string"
          ? JSON.parse(req.body.subjects)
          : req.body.subjects
        : {};
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    const { _id, id, ...rest } = req.body;
    const updatedData = {
      ...rest,
      activities,
      subjects,
      photo: photoUrl,
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

// ======================= DELETE =======================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================= BULK INSERT =======================
router.post("/bulk", auth, async (req, res) => {
  try {
    const students = await Student.insertMany(req.body);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
