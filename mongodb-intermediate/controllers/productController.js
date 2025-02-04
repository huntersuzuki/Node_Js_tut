const Product = require("../models/Product");

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          avgPrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          avgPrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 15,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];
    const result = await Product.insertMany(sampleProducts);
    res.status(200).json({
      success: true,
      data: `Inserted ${result.length} sample products`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
const updatePriceDataType = async (req, res) => {
  try {
    const result = await Product.updateMany({ price: { $exists: true } }, [
      {
        $set: {
          price: { $toDouble: "$price" }, // Convert price to Number
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: `Updated ${result.modifiedCount} documents`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Failed to update price data type.",
    });
  }
};

module.exports = {
  insertSampleProducts,
  getProductStats,
  updatePriceDataType,
  getProductAnalysis,
};
