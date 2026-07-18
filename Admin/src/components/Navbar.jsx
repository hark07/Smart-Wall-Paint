import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setOpen }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="h-16 px-3 sm:px-4 md:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-xl text-slate-700"
          >
            <FaBars />
          </button>

          <div className="min-w-0">
            <h1 className="font-bold text-sm sm:text-lg md:text-2xl text-slate-800 truncate">
              Smart Wall Paint Visualizer
            </h1>

            <p className="hidden sm:block text-xs text-gray-500">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* User Info */}
          <div className="hidden md:block text-right">
            <p className="font-semibold text-sm text-slate-800 truncate max-w-[180px]">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs text-gray-500 truncate max-w-[180px]">
              {user?.email || "admin@gmail.com"}
            </p>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm sm:text-base">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          {/* Logout */}
          <button
            onClick={logoutHandler}
            className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <FiLogOut size={18} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
