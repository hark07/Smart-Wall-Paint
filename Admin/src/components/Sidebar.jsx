import {
  FaUsers,
  FaPalette,
  FaProjectDiagram,
  FaTimes,
  FaCog,
  FaChartBar,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/admin/dashboard",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      name: "Colors",
      icon: <FaPalette />,
      path: "/admin/colors",
    },
    {
      name: "Patterns",
      icon: <FaPalette />,
      path: "/admin/patterns",
    },
    {
      name: "Projects",
      icon: <FaProjectDiagram />,
      path: "/admin/projects",
    },
    {
      name: "Activities",
      icon: <BiHistory />,
      path: "/admin/activities",
    },
    {
      name: "Analytics",
      icon: <FaChartBar />,
      path: "/admin/analytics",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50
        h-screen w-72
        bg-slate-900 text-white
        border-r border-slate-800
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold">Paint Admin</h2>

        <button onClick={() => setOpen(false)} className="lg:hidden text-lg">
          <FaTimes />
        </button>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200
              ${
                isActive
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-700 p-4 bg-slate-900">
        <p className="text-xs text-center text-slate-400">
          Smart Wall Paint Visualizer
        </p>

        <p className="text-xs text-center text-slate-500 mt-1">
          Admin Panel v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
