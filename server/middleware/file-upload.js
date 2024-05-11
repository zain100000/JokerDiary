const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const HttpError = require("../models/http-error");
require("dotenv").config();

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new HttpError("Only images are allowed", 422), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryImageUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `jokerdiary/uploads/images`,
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new HttpError("Error uploading image to Cloudinary", 500);
  }
};

module.exports = {
  upload,
  cloudinaryImageUpload,
};
