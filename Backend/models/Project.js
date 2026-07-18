import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectName: {
      type: String,
      default: "Untitled Project",
      trim: true,
    },

    originalImage: {
      type: String,
      required: true,
    },

    previewImage: {
      type: String,
      required: true,
    },

    wallCoordinates: [
      {
        x: {
          type: Number,
        },
        y: {
          type: Number,
        },
      },
    ],

    color: {
      type: String,
      required: true,
    },

    opacity: {
      type: Number,
      default: 60,
      min: 0,
      max: 100,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
