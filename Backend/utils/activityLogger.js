import Activity from "../models/Activity.js";

const logActivity = async (userId, action, projectId = null) => {
  try {
    await Activity.create({
      user: userId,
      action,
      project: projectId,
    });
  } catch (error) {
    console.log("Activity Log Error:", error.message);
  }
};

export default logActivity;
