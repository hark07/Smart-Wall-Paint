import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "smart-wall/rooms",
    });

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
