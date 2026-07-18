import User from "../models/User.js";

// Add Favorite Color
export const addFavoriteColor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.favoriteColors.includes(req.params.colorId)) {
      user.favoriteColors.push(req.params.colorId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      favoriteColors: user.favoriteColors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Favorite Pattern
export const addFavoritePattern = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.favoritePatterns.includes(req.params.patternId)) {
      user.favoritePatterns.push(req.params.patternId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      favoritePatterns: user.favoritePatterns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("favoriteColors")
      .populate("favoritePatterns");

    res.status(200).json({
      success: true,
      favoriteColors: user.favoriteColors,
      favoritePatterns: user.favoritePatterns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
