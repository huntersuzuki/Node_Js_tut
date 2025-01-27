const express = require("express");
const authMiddelware = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/welcome", authMiddelware, (req, res) => {
  const { userID, email, role } = req.userInfo;
  res.status(200).json({
    success: true,
    message: "Welcome to the home page",
    user: {
      userID,
      email,
      role,
    },
  });
});

module.exports = router;
