import { useEffect, useState } from "react";

import {
  Upload,
  FolderOpen,
  Palette,
  ImageIcon,
  ArrowRight,
  Calendar,
} from "lucide-react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const [colors, setColors] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const projectResponse = await API.get("/projects");

      setProjects(projectResponse.data.projects || []);

      const colorResponse = await API.get("/colors");

      setColors(colorResponse.data.colors || []);
    } catch (error) {
      toast.error("Dashboard loading failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
      h-64 flex
      justify-center
      items-center
      "
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      className="
max-w-7xl
mx-auto
px-4
lg:px-8
py-8
"
    >
      {/* Header */}

      <div className="mb-10">
        <h1
          className="
text-4xl
font-bold
text-gray-900
"
        >
          Welcome {user?.name || "User"}
        </h1>

        <p
          className="
mt-2
text-gray-600
"
        >
          Manage your room visualization projects.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
mb-10
"
      >
        <StatCard
          icon={<Upload />}
          title="Uploaded Rooms"
          value={projects.length}
        />

        <StatCard
          icon={<FolderOpen />}
          title="Saved Projects"
          value={projects.length}
        />

        <StatCard
          icon={<Palette />}
          title="Available Colors"
          value={colors.length}
        />

        <StatCard
          icon={<ImageIcon />}
          title="Designs Created"
          value={projects.length}
        />
      </div>

      {/* Quick Actions */}

      <div
        className="
grid
lg:grid-cols-2
gap-6
mb-10
"
      >
        <ActionCard
          title="Upload Room Image"
          description="
Upload your room photo and apply different wall colors.
"
          button="Upload Now"
          link="/upload-room"
          color="indigo"
        />

        <ActionCard
          title="Saved Projects"
          description="
View and edit your previous designs.
"
          button="View Projects"
          link="/projects"
          color="green"
        />
      </div>

      {/* Recent Projects */}

      <div
        className="
bg-white
border
rounded-3xl
shadow-sm
"
      >
        <div
          className="
p-6
border-b
"
        >
          <h2
            className="
text-2xl
font-bold
"
          >
            Recent Projects
          </h2>
        </div>

        {projects.length === 0 ? (
          <div
            className="
p-12
text-center
"
          >
            <ImageIcon
              size={60}
              className="
mx-auto
text-gray-300
mb-4
"
            />

            <h3
              className="
text-xl
font-semibold
"
            >
              No Projects Yet
            </h3>

            <Link
              to="/upload-room"
              className="
inline-block
mt-5
bg-indigo-600
text-white
px-6
py-3
rounded-xl
"
            >
              Create Project
            </Link>
          </div>
        ) : (
          <div
            className="
grid
md:grid-cols-3
gap-6
p-6
"
          >
            {projects.slice(0, 3).map((project) => (
              <div
                key={project._id}
                className="
border
rounded-2xl
overflow-hidden
"
              >
                <img
                  src={project.previewImage}
                  alt="project"
                  className="
h-48
w-full
object-cover
"
                />

                <div
                  className="
p-4
"
                >
                  <h3
                    className="
font-bold
"
                  >
                    {project.projectName}
                  </h3>

                  <div
                    className="
flex
gap-2
items-center
text-sm
text-gray-500
mt-2
"
                  >
                    <Calendar size={15} />

                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>

                  <Link
                    to={`/projects/${project._id}`}
                    className="
text-indigo-600
flex
items-center
gap-2
mt-4
"
                  >
                    View
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div
      className="
bg-white
border
rounded-2xl
p-6
shadow-sm
"
    >
      <div
        className="
w-12
h-12
rounded-xl
bg-indigo-100
flex
items-center
justify-center
text-indigo-600
mb-4
"
      >
        {icon}
      </div>

      <p
        className="
text-gray-500
text-sm
"
      >
        {title}
      </p>

      <h2
        className="
text-3xl
font-bold
mt-2
"
      >
        {value}
      </h2>
    </div>
  );
};

const ActionCard = ({ title, description, button, link, color }) => {
  return (
    <div
      className="
bg-white
border
rounded-2xl
p-6
shadow-sm
"
    >
      <h2
        className="
text-2xl
font-bold
mb-3
"
      >
        {title}
      </h2>

      <p
        className="
text-gray-600
mb-6
"
      >
        {description}
      </p>

      <Link
        to={link}
        className={`
inline-flex
items-center
gap-2
text-white
px-5
py-3
rounded-xl

${color === "green" ? "bg-green-600" : "bg-indigo-600"}

`}
      >
        {button}

        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default Dashboard;
