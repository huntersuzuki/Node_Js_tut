const Image = require("../models/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const cloudinary = require("../config/cloudinaryConfig");
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "File is required, please upload an image",
      });
    } else {
      const { url, publicId } = await uploadToCloudinary(req.file.path);
      const newlyUploadedImage = new Image({
        url,
        publicId,
        uploadedBy: req.userInfo.userID,
      });
      await newlyUploadedImage.save();
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        image: newlyUploadedImage,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);
    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (images) {
      res.status(200).json({
        success: true,
        message: "Images fetched successfully",
        currentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        images: images,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const deleteImage = async (req, res) => {
  try {
    const getCurrentImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userID;
    const image = await Image.findById(getCurrentImageToBeDeleted);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    } else {
      if (image.uploadedBy.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to make changes.",
        });
      } else {
        await cloudinary.uploader.destroy(image.publicId);
        await Image.findByIdAndDelete(getCurrentImageToBeDeleted);
        return res.status(200).json({
          success: true,
          message: "Image deleted successfully",
          image: image,
        });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = { uploadImage, getImages, deleteImage };
