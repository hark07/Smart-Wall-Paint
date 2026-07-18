import {
  Upload,
  Palette,
  Sparkles,
  FolderOpen,
  ArrowRight,
  PaintBucket,
} from "lucide-react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-4
      lg:px-8
      py-16
      lg:py-24
      grid
      lg:grid-cols-2
      gap-12
      items-center
      "
      >
        {/* Left Content */}

        <div>
          <div
            className="
          inline-flex
          items-center
          gap-2
          bg-indigo-100
          text-indigo-700
          px-4
          py-2
          rounded-full
          text-sm
          font-medium
          mb-6
          "
          >
            <Sparkles size={16} />
            AI Powered Paint Visualization
          </div>

          <h1
            className="
          text-4xl
          md:text-5xl
          lg:text-6xl
          font-bold
          text-gray-900
          leading-tight
          "
          >
            Design Your Dream Room With
            <span
              className="
            text-indigo-600
            block
            "
            >
              Smart Paint Visualizer
            </span>
          </h1>

          <p
            className="
          mt-6
          text-lg
          text-gray-600
          max-w-xl
          "
          >
            Upload your room image, select wall areas, try different paint
            colors, and create beautiful interior designs before painting.
          </p>

          <div
            className="
          flex
          flex-wrap
          gap-4
          mt-8
          "
          >
            <Link
              to="/upload-room"
              className="
            flex
            items-center
            gap-2
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            transition
            "
            >
              Upload Room
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/colors"
              className="
            flex
            items-center
            gap-2
            bg-white
            border
            hover:bg-gray-100
            px-6
            py-3
            rounded-xl
            font-medium
            "
            >
              Explore Colors
              <Palette size={18} />
            </Link>
          </div>
        </div>

        {/* Right Illustration */}

        <div
          className="
        bg-white
        rounded-3xl
        shadow-xl
        border
        p-8
        "
        >
          <div
            className="
          bg-gradient-to-br
          from-indigo-500
          to-purple-600
          rounded-3xl
          h-80
          flex
          flex-col
          items-center
          justify-center
          text-white
          "
          >
            <PaintBucket size={80} />

            <h2
              className="
            text-2xl
            font-bold
            mt-5
            "
            >
              Virtual Wall Design
            </h2>

            <p
              className="
            text-center
            px-8
            mt-3
            text-indigo-100
            "
            >
              Visualize colors before applying them
            </p>
          </div>
        </div>
      </section>

      {/* Features */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-4
      lg:px-8
      pb-20
      "
      >
        <h2
          className="
        text-3xl
        font-bold
        text-center
        mb-10
        "
        >
          Everything You Need
        </h2>

        <div
          className="
        grid
        md:grid-cols-3
        gap-6
        "
        >
          <FeatureCard
            icon={<Upload />}
            title="Upload Room"
            desc="Upload your room photo and start designing."
          />

          <FeatureCard
            icon={<Palette />}
            title="Try Colors"
            desc="Apply unlimited paint colors instantly."
          />

          <FeatureCard
            icon={<FolderOpen />}
            title="Save Projects"
            desc="Save and manage your favorite designs."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div
      className="
bg-white
border
rounded-3xl
p-6
hover:shadow-lg
transition
"
    >
      <div
        className="
w-12
h-12
bg-indigo-100
rounded-xl
flex
items-center
justify-center
text-indigo-600
mb-5
"
      >
        {icon}
      </div>

      <h3
        className="
text-xl
font-bold
"
      >
        {title}
      </h3>

      <p
        className="
text-gray-600
mt-2
"
      >
        {desc}
      </p>
    </div>
  );
};

export default Home;
