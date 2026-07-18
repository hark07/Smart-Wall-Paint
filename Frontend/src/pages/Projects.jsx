import { useEffect, useState } from "react";
import { Eye, Trash2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");

      setProjects(data.projects || []);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);

      setProjects(projects.filter((item) => item._id !== id));

      toast.success("Project deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Paint Projects</h1>

        <p className="text-gray-500 mt-2">Manage your saved room designs</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-3xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No Projects Yet</h2>

          <p className="text-gray-500 mt-2">
            Create your first wall paint design.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-3xl border shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={project.previewImage}
                alt="project"
                className="w-full h-60 object-cover"
              />

              <div className="p-5">
                <h2 className="font-bold text-xl">{project.projectName}</h2>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                  <Calendar size={16} />

                  {new Date(project.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span
                    className="w-6 h-6 rounded-full border"
                    style={{
                      backgroundColor: project.selectedColor,
                    }}
                  />

                  <span className="text-sm text-gray-600">
                    {project.selectedColor}
                  </span>
                </div>

                <div className="flex gap-3 mt-5">
                  <Link
                    to={`/projects/${project._id}`}
                    className="flex-1 flex justify-center items-center gap-2 bg-indigo-600 text-white py-2 rounded-xl"
                  >
                    <Eye size={18} />
                    View
                  </Link>

                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-500 text-white px-4 rounded-xl"
                  >
                    <Trash2 size={18} />
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
