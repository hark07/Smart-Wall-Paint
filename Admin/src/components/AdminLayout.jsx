import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-100 overflow-hidden">
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <div className="flex h-full">
        {/* Fixed Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Content Area */}
        <div className="flex flex-col flex-1 lg:ml-72 min-w-0">
          {/* Sticky Navbar */}
          <Navbar setOpen={setOpen} />

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
