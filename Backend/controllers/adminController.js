import User from "../models/User.js";
import Project from "../models/Project.js";
import Color from "../models/Color.js";
import Pattern from "../models/Pattern.js";
import Activity from "../models/Activity.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProjects = await Project.countDocuments();

    const totalColors = await Color.countDocuments();

    const totalPatterns = await Pattern.countDocuments();

    const totalActivities = await Activity.countDocuments();

    const downloads = await Project.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$downloadCount",
          },
        },
      },
    ]);

    const totalDownloads = downloads.length > 0 ? downloads[0].total : 0;

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalProjects,
        totalColors,
        totalPatterns,
        totalActivities,
        totalDownloads,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
