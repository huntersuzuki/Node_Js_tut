const express = require("express");
const {
  insertSampleProducts,
  getProductStats,
  updatePriceDataType,
  getProductAnalysis,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", insertSampleProducts);
router.post("/update", updatePriceDataType);
router.get("/stats", getProductStats);
router.get("/analysis", getProductAnalysis);
module.exports = router;
