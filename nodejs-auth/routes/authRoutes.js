const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  changePassword,
} = require("../controllers/authController");
const authMiddelware = require("../middleware/authMiddleWare");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", authMiddelware, changePassword);

module.exports = router;
