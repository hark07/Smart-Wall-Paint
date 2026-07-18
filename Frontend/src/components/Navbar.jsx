import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  PaintBucket,
  LogOut,
  Menu,
  X,
  User,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();

    navigate("/login");

    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <PaintBucket size={20} className="text-white" />
            </div>

            <span className="font-bold text-lg md:text-xl text-gray-800">
              Paint Visualizer
            </span>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/colors"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Colors
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 text-red-600 font-semibold"
                  >
                    <ShieldCheck size={18} />
                    Admin
                  </Link>
                )}

                {/* Profile Click */}

                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
                >
                  <User size={18} />

                  <span>{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 font-medium">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="md:hidden border-t py-4 flex flex-col gap-3">
            <Link
              to="/colors"
              onClick={closeMenu}
              className="px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              Colors
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="px-3 py-2 flex gap-2 items-center hover:bg-gray-100 rounded-lg"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="px-3 py-2 flex gap-2 items-center text-red-600 font-semibold hover:bg-red-50 rounded-lg"
                  >
                    <ShieldCheck size={18} />
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg"
                >
                  <User size={18} />

                  {user.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex justify-center items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg mx-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="px-3 py-2">
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="bg-indigo-600 text-white px-4 py-3 rounded-lg text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
