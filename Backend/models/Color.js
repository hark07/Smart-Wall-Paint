import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    hex: {
      type: String,
      required: true,
    },

    rgb: {
      type: String,
    },

    brand: {
      type: String,
      default: "Smart Paint",
    },

    finish: {
      type: String,
      enum: ["Matte", "Glossy", "Satin", "Eggshell"],
      default: "Matte",
    },

    category: {
      type: String,
      default: "Living Room",
    },

    swatch: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  },
);

const Color = mongoose.model("Color", colorSchema);

export default Color;
