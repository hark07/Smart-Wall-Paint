import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import patternRoutes from "./routes/patternRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ================= ADMIN SEED =================

const createAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("Admin already exists");

      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",

      email: adminEmail,

      password: hashedPassword,

      role: "admin",
    });

    console.log("Default Admin Created");
  } catch (error) {
    console.log("Admin Seed Error:", error.message);
  }
};

// ================= SERVER =================

const startServer = async () => {
  try {
    await connectDB();

    await createAdmin();

    const app = express();

    // ================= CORS =================

    const allowedOrigins = [
      "https://smart-wall-paint.onrender.com",

      "http://localhost:5174"
    ];

    app.use(
      cors({
        origin: (origin, callback) => {
          console.log("REQUEST ORIGIN:", origin);

          if (!origin) {
            return callback(null, true);
          }

          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          }

          // development support
          return callback(null, true);
        },

        credentials: true,

        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      }),
    );

    // ================= BODY =================

    app.use(
      express.json({
        limit: "50mb",
      }),
    );

    app.use(
      express.urlencoded({
        extended: true,

        limit: "50mb",
      }),
    );

    // ================= STATIC =================

    app.use(
      "/uploads",

      express.static(path.join(process.cwd(), "uploads")),
    );

    // ================= ROOT =================

    app.get("/", (req, res) => {
      res.status(200).json({
        success: true,

        message: "Smart Wall Paint Visualizer API Running...",
      });
    });

    // ================= ROUTES =================

    app.use("/api/auth", authRoutes);

    app.use("/api/upload", uploadRoutes);

    app.use("/api/colors", colorRoutes);

    app.use("/api/patterns", patternRoutes);

    app.use("/api/admin", adminRoutes);

    app.use("/api/users", userRoutes);

    app.use("/api/projects", projectRoutes);

    app.use("/api/favorites", favoriteRoutes);

    app.use("/api/activities", activityRoutes);

    app.use("/api/settings", settingsRoutes);

    app.use("/api/analytics", analyticsRoutes);

    // ================= 404 =================

    app.use((req, res) => {
      res.status(404).json({
        success: false,

        message: "Route Not Found",
      });
    });

    // ================= ERROR =================

    app.use((err, req, res, next) => {
      console.error("SERVER ERROR:", err.message);

      res.status(err.status || 500).json({
        success: false,

        message: err.message || "Internal Server Error",
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server Startup Error:", error.message);

    process.exit(1);
  }
};

startServer();
