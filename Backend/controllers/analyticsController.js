import User from "../models/User.js";
import Project from "../models/Project.js";
import Pattern from "../models/Pattern.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalPatterns = await Pattern.countDocuments();

    res.json({
      success: true,
      totalUsers,
      totalProjects,
      totalPatterns,
      totalDownloads: 0,

      userGrowth: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        data: [10, 20, 30, 50, 70, 90],
      },

      colorUsage: {
        labels: ["Blue", "White", "Gray", "Green"],
        data: [40, 25, 20, 15],
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
