const express = require("express");
const authMiddelware = require("../middleware/authMiddleWare");
const adminMiddleware = require("../middleware/adminMiddleWare");
const router = express.Router();

router.get("/welcome", authMiddelware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the admin page",
  });
});

module.exports = router;
