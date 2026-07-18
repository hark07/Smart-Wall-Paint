import Color from "../models/Color.js";

// GET ALL COLORS

export const getColors = async (req, res) => {
  try {
    const colors = await Color.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      colors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET SINGLE COLOR

export const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);

    if (!color) {
      return res.status(404).json({
        success: false,

        message: "Color not found",
      });
    }

    res.json({
      success: true,

      color,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// CREATE COLOR ADMIN

export const createColor = async (req, res) => {
  try {
    const color = await Color.create({
      ...req.body,

      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,

      color,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// UPDATE COLOR ADMIN

export const updateColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      },
    );

    res.json({
      success: true,

      color,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// DELETE COLOR ADMIN

export const deleteColor = async (req, res) => {
  try {
    await Color.findByIdAndDelete(req.params.id);

    res.json({
      success: true,

      message: "Color deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
