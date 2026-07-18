import { useState } from "react";
import API from "../api/axios";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.put("/settings/profile", profile);

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (password.newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await API.put("/settings/password", password);

      alert("Password Updated Successfully");

      setPassword({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {" "}
      <div>
        {" "}
        <h1 className="text-3xl font-bold">Settings </h1>
        <p className="text-gray-500">Manage your profile and security</p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Profile Information</h2>

        <form onSubmit={updateProfile} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>

            <input
              type="text"
              className="border p-3 rounded-lg w-full"
              placeholder="Enter Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>

            <input
              type="email"
              className="border p-3 rounded-lg w-full"
              placeholder="Enter Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
            />
          </div>

          <button
            disabled={loading}
            className="bg-slate-900 text-white px-5 py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Save Profile"}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        <form onSubmit={changePassword} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Current Password
            </label>

            <input
              type="password"
              className="border p-3 rounded-lg w-full"
              placeholder="Current Password"
              value={password.currentPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              className="border p-3 rounded-lg w-full"
              placeholder="New Password"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  newPassword: e.target.value,
                })
              }
            />
          </div>

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
