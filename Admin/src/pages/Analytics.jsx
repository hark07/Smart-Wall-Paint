import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
);

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await API.get("/analytics");

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        {" "}
        <h2 className="text-xl font-semibold">Loading Analytics... </h2>{" "}
      </div>
    );
  }

  const userGrowth = {
    labels: analytics?.userGrowth?.labels || [],
    datasets: [
      {
        label: "Users",
        data: analytics?.userGrowth?.data || [],
      },
    ],
  };

  const projectStats = {
    labels: ["Projects", "Downloads", "Patterns"],
    datasets: [
      {
        data: [
          analytics?.totalProjects || 0,
          analytics?.totalDownloads || 0,
          analytics?.totalPatterns || 0,
        ],
      },
    ],
  };

  const colorUsage = {
    labels: analytics?.colorUsage?.labels || [],
    datasets: [
      {
        label: "Color Usage",
        data: analytics?.colorUsage?.data || [],
      },
    ],
  };

  return (
    <div className="space-y-8 p-6">
      {" "}
      <div>
        {" "}
        <h1 className="text-3xl font-bold">Analytics Dashboard </h1>
        <p className="text-gray-500">System performance overview</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Users</h3>

          <p className="text-3xl font-bold mt-2">
            {analytics?.totalUsers || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Projects</h3>

          <p className="text-3xl font-bold mt-2">
            {analytics?.totalProjects || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Downloads</h3>

          <p className="text-3xl font-bold mt-2">
            {analytics?.totalDownloads || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Patterns</h3>

          <p className="text-3xl font-bold mt-2">
            {analytics?.totalPatterns || 0}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">User Growth</h2>

          <Line data={userGrowth} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Project Statistics</h2>

          <Doughnut data={projectStats} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Most Used Colors</h2>

        <Bar data={colorUsage} />
      </div>
    </div>
  );
};

export default Analytics;
