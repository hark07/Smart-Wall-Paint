import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadRoom from "./pages/UploadRoom";
import WallSelector from "./pages/WallSelector";
import PaintPreview from "./pages/PaintPreview";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import ColorLibrary from "./pages/ColorLibrary";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/colors" element={<ColorLibrary />} />
      {/* <Route path="/colors" element={<Colors />} /> */}

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-room"
        element={
          <ProtectedRoute>
            <Layout>
              <UploadRoom />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/wall-selector"
        element={
          <ProtectedRoute>
            <Layout>
              <WallSelector />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/paint-preview"
        element={
          <ProtectedRoute>
            <Layout>
              <PaintPreview />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Layout>
              <Projects />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
