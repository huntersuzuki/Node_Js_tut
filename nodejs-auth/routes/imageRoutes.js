const express = require("express");
const authMiddelware = require("../middleware/authMiddleWare");
const adminMiddleware = require("../middleware/adminMiddleWare");
const uploadMiddleware = require("../middleware/uploadImageMiddleware");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/imageController");
const router = express.Router();

router.post(
  "/upload",
  authMiddelware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage,
);
router.get("/images", authMiddelware, getImages);
router.delete("/delete/:id", authMiddelware, adminMiddleware, deleteImage);
module.exports = router;
