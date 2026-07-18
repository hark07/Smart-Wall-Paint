import { useEffect, useState } from "react";
import { Search, Palette } from "lucide-react";
import toast from "react-hot-toast";

import API from "../api/axios";

const Colors = () => {
  const [colors, setColors] = useState([]);

  const [filteredColors, setFilteredColors] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    const result = colors.filter((color) =>
      color.name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredColors(result);
  }, [search, colors]);

  const fetchColors = async () => {
    try {
      const { data } = await API.get("/colors");

      setColors(data.colors || []);

      setFilteredColors(data.colors || []);
    } catch (error) {
      toast.error("Failed to load colors");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
      text-center
      py-20
      text-gray-500
      "
      >
        Loading colors...
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
py-10
"
    >
      {/* Header */}

      <div
        className="
mb-10
"
      >
        <h1
          className="
text-4xl
font-bold
flex
items-center
gap-3
"
        >
          <Palette className="text-indigo-600" />
          Paint Colors
        </h1>

        <p
          className="
text-gray-500
mt-3
"
        >
          Explore beautiful wall paint colors
        </p>
      </div>

      {/* Search */}

      <div
        className="
bg-white
border
rounded-2xl
p-4
flex
items-center
gap-3
mb-8
"
      >
        <Search className="text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search color..."
          className="
w-full
outline-none
"
        />
      </div>

      {/* Colors Grid */}

      {filteredColors.length === 0 ? (
        <div
          className="
bg-white
border
rounded-3xl
p-10
text-center
"
        >
          No colors found
        </div>
      ) : (
        <div
          className="
grid
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
gap-6
"
        >
          {filteredColors.map((color) => (
            <div
              key={color._id}
              className="
bg-white
border
rounded-3xl
overflow-hidden
hover:shadow-lg
transition
"
            >
              <div
                className="
h-40
"
                style={{
                  backgroundColor: color.hexCode,
                }}
              />

              <div
                className="
p-5
"
              >
                <h2
                  className="
font-bold
text-xl
"
                >
                  {color.name}
                </h2>

                <p
                  className="
text-gray-500
mt-2
"
                >
                  {color.hexCode}
                </p>

                <button
                  className="
mt-5
w-full
bg-indigo-600
text-white
py-2
rounded-xl
hover:bg-indigo-700
"
                >
                  Try Color
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colors;
