import { useEffect, useState } from "react";
import API from "../api/axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/admin/projects");

      setProjects(data.projects || []);
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/projects/${id}`);

      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        {" "}
        <h2 className="text-xl font-semibold">Loading Projects... </h2>{" "}
      </div>
    );
  }

  return (
    <div className="p-6">
      {" "}
      <div className="flex justify-between items-center mb-8">
        {" "}
        <div>
          {" "}
          <h1 className="text-3xl font-bold">Projects Management </h1>{" "}
          <p className="text-gray-500">
            Total Projects: {projects.length}{" "}
          </p>{" "}
        </div>{" "}
      </div>
      
      {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            No Projects Found
          </h2>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={
                  project.originalImage || "https://via.placeholder.com/400x250"
                }
                alt={project.projectName}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">
                  {project.projectName}
                </h3>

                <p className="text-sm text-gray-600">
                  User: {project.user?.name || "Unknown User"}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Email: {project.user?.email || "N/A"}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Downloads: {project.downloadCount || 0}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Color: {project.color || "N/A"}
                </p>

                <div className="mt-5">
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
