require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ Trust proxy (for Render / production)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ===================== MIDDLEWARE =====================
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clientUrl = process.env.CLIENT_URL || "*";

app.use(
  cors({
    origin: clientUrl,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ===================== ✅ STATIC UPLOAD FIX =====================

// Create uploads folder if not exists
const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Serve images publicly
app.use("/uploads", express.static(uploadPath));

// ===================== ROUTES =====================
app.use("/students", require("./routes/studentRoutes"));
app.use("/states", require("./routes/stateRoutes"));
app.use("/principals", require("./routes/principalRoutes"));

// ===================== HEALTH CHECK =====================
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

// ===================== 404 HANDLER =====================
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ===================== GLOBAL ERROR HANDLER =====================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// ===================== DB CONNECTION =====================
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI is not set");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  });

// ===================== SERVER =====================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ===================== GRACEFUL SHUTDOWN =====================
const shutdown = (signal) => {
  console.log(`\nShutting down due to ${signal}`);
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});