import Pattern from "../models/Pattern.js";

// Create Pattern
export const createPattern = async (req, res) => {
  try {
    const { name, category, image, imageUrl, description } = req.body;

    const pattern = await Pattern.create({
      name,
      category,
      description,
      imageUrl: imageUrl || image,
    });

    res.status(201).json({
      success: true,
      pattern,
    });
  } catch (error) {
    console.log("PATTERN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Patterns
export const getPatterns = async (req, res) => {
  try {
    const patterns = await Pattern.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: patterns.length,
      patterns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Pattern
export const getPatternById = async (req, res) => {
  try {
    const pattern = await Pattern.findById(req.params.id);

    if (!pattern) {
      return res.status(404).json({
        success: false,
        message: "Pattern not found",
      });
    }

    res.status(200).json({
      success: true,
      pattern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Pattern
export const updatePattern = async (req, res) => {
  try {
    const pattern = await Pattern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pattern) {
      return res.status(404).json({
        success: false,
        message: "Pattern not found",
      });
    }

    res.status(200).json({
      success: true,
      pattern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Pattern
export const deletePattern = async (req, res) => {
  try {
    const pattern = await Pattern.findById(req.params.id);

    if (!pattern) {
      return res.status(404).json({
        success: false,
        message: "Pattern not found",
      });
    }

    await pattern.deleteOne();

    res.status(200).json({
      success: true,
      message: "Pattern deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
