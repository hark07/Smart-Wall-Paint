import { useEffect, useState } from "react";

import { FaUsers, FaPalette, FaProjectDiagram } from "react-icons/fa";

import { BsGridFill } from "react-icons/bs";
import API from "../api/axios";
import Loader from "../components/Loader";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500">Welcome back Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon={<FaUsers />}
        />

        <StatsCard
          title="Projects"
          value={stats.totalProjects || 0}
          icon={<FaProjectDiagram />}
        />

        <StatsCard
          title="Colors"
          value={stats.totalColors || 0}
          icon={<FaPalette />}
        />

        <StatsCard
          title="Patterns"
          value={stats.totalPatterns || 0}
          icon={<BsGridFill />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
