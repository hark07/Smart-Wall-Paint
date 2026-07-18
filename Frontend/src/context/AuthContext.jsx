import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");

      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (formData) => {
    try {
      const { data } = await API.post("/auth/register", formData);

      localStorage.setItem("token", data.token);

      setUser(data.user);

      toast.success("Registration Successful");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Register Failed");
      return false;
    }
  };

  const login = async (formData) => {
    try {
      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      setUser(data.user);

      toast.success("Login Successful");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);

    toast.success("Logged Out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
