import { useEffect, useState } from "react";
import API from "../api/axios";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/activities");

      setActivities(data.activities || []);
    } catch (error) {
      console.error(error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        {" "}
        <h2 className="text-xl font-semibold">Loading Activities... </h2>{" "}
      </div>
    );
  }

  return (
    <div className="p-6">
      {" "}
      <div className="mb-8">
        {" "}
        <h1 className="text-3xl font-bold">Activity Logs </h1>
        <p className="text-gray-500 mt-1">
          Total Activities: {activities.length}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No activity logs found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-4">User</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id} className="border-b hover:bg-slate-50">
                    <td className="p-4">
                      {activity.user?.name || "Unknown User"}
                    </td>

                    <td className="p-4 font-medium">{activity.action}</td>

                    <td className="p-4">
                      {activity.details || "No details available"}
                    </td>

                    <td className="p-4">
                      {new Date(activity.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
