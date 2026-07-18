import { User, Mail, Shield, Calendar, LogOut, ArrowLeft } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-500 text-lg">
        User not found
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-5 bg-white border shadow-sm hover:bg-gray-100 px-4 py-2 rounded-xl text-gray-700 text-sm sm:text-base transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Profile Card */}

      <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
        {/* Cover */}

        <div className="h-32 sm:h-40 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
          <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-indigo-600">
              <User size={45} className="sm:w-[55px] sm:h-[55px]" />
            </div>
          </div>
        </div>

        {/* Body */}

        <div className="pt-16 sm:pt-20 px-4 sm:px-8 pb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center break-words">
            {user.name}
          </h1>

          <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
            Smart Wall Paint User
          </p>

          {/* Information */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
            <ProfileItem
              icon={<User size={22} />}
              title="Full Name"
              value={user.name}
            />

            <ProfileItem
              icon={<Mail size={22} />}
              title="Email Address"
              value={user.email}
            />

            <ProfileItem
              icon={<Shield size={22} />}
              title="Account Role"
              value={user.role}
            />

            <ProfileItem
              icon={<Calendar size={22} />}
              title="Joined Date"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="mt-8 sm:mt-10 w-full sm:w-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition text-sm sm:text-base"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, title, value }) => {
  return (
    <div className="bg-gray-50 border rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>

        <h3 className="font-semibold mt-1 text-sm sm:text-base truncate">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default Profile;
