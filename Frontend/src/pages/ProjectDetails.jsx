import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Download,
  Palette,
  Calendar,
  Percent,
  Edit3,
} from "lucide-react";

import { Link, useParams, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

const ProjectDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const [slider, setSlider] = useState(50);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const { data } = await API.get(`/projects/${id}`);

      setProject(data.project);
    } catch (error) {
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");

    link.href = project.previewImage;

    link.download = "paint-design.png";

    link.click();
  };

  const editColor = () => {
    localStorage.setItem("roomImage", project.originalImage);

    localStorage.setItem(
      "wallCoordinates",
      JSON.stringify(project.wallCoordinates),
    );

    localStorage.setItem("editProjectId", project._id);

    navigate("/paint-preview");
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
        Loading...
      </div>
    );
  }

  if (!project) {
    return <div className="p-10 text-center">Project not found</div>;
  }

  return (
    <div
      className="
max-w-7xl
mx-auto
px-4
py-10
"
    >
      <div
        className="
flex
justify-between
items-center
mb-8
"
      >
        <Link
          to="/projects"
          className="
flex
items-center
gap-2
text-indigo-600
"
        >
          <ArrowLeft size={20} />
          Back
        </Link>

        <div
          className="
flex
gap-3
"
        >
          <button
            onClick={editColor}
            className="
flex
items-center
gap-2
bg-yellow-500
text-white
px-5
py-3
rounded-xl
"
          >
            <Edit3 size={18} />
            Edit Color
          </button>

          <button
            onClick={downloadImage}
            className="
flex
items-center
gap-2
bg-indigo-600
text-white
px-5
py-3
rounded-xl
"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      <h1
        className="
text-3xl
font-bold
mb-2
"
      >
        {project.projectName}
      </h1>

      <p
        className="
text-gray-500
mb-8
"
      >
        Before and after wall visualization
      </p>

      {/* BEFORE AFTER SLIDER */}

      <div
        className="
bg-white
rounded-3xl
border
shadow-sm
p-6
mb-8
"
      >
        <div
          className="
relative
overflow-hidden
rounded-2xl
h-[450px]
"
        >
          {/* Original Image */}

          <img
            src={project.originalImage}
            alt="before"
            className="
absolute
w-full
h-full
object-cover
"
          />

          {/* Painted Image */}

          <div
            className="
absolute
top-0
left-0
h-full
overflow-hidden
"
            style={{
              width: `${slider}%`,
            }}
          >
            <img
              src={project.previewImage}
              alt="after"
              className="
h-full
w-[100vw]
max-w-none
object-cover
"
            />
          </div>

          <div
            className="
absolute
top-0
bottom-0
"
            style={{
              left: `${slider}%`,
            }}
          >
            <div
              className="
h-full
w-1
bg-white
shadow
"
            />
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={slider}
          onChange={(e) => setSlider(e.target.value)}
          className="
w-full
mt-6
"
        />

        <div
          className="
flex
justify-between
text-sm
text-gray-500
mt-2
"
        >
          <span>Before</span>

          <span>After</span>
        </div>
      </div>

      {/* INFORMATION */}

      <div
        className="
grid
md:grid-cols-3
gap-6
"
      >
        <div
          className="
bg-white
border
rounded-2xl
p-5
flex
gap-3
items-center
"
        >
          <Palette className="text-indigo-600" />

          <div>
            <p
              className="
text-gray-500
text-sm
"
            >
              Color
            </p>

            <p
              className="
font-semibold
"
            >
              {project.color}
            </p>
          </div>
        </div>

        <div
          className="
bg-white
border
rounded-2xl
p-5
flex
gap-3
items-center
"
        >
          <Percent className="text-indigo-600" />

          <div>
            <p
              className="
text-gray-500
text-sm
"
            >
              Opacity
            </p>

            <p
              className="
font-semibold
"
            >
              {project.opacity}%
            </p>
          </div>
        </div>

        <div
          className="
bg-white
border
rounded-2xl
p-5
flex
gap-3
items-center
"
        >
          <Calendar className="text-indigo-600" />

          <div>
            <p
              className="
text-gray-500
text-sm
"
            >
              Created
            </p>

            <p
              className="
font-semibold
"
            >
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
