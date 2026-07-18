import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Colors from "./pages/Colors";
import Patterns from "./pages/Patterns";
import Projects from "./pages/Projects";
import Activities from "./pages/Activities";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AdminRoute from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="users" element={<Users />} />

          <Route path="colors" element={<Colors />} />

          <Route path="patterns" element={<Patterns />} />

          <Route path="projects" element={<Projects />} />

          <Route path="activities" element={<Activities />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
