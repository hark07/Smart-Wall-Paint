import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, Search, Check, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import API from "../api/axios";

const ColorLibrary = () => {
  const navigate = useNavigate();

  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const { data } = await API.get("/colors");

      setColors(data.colors || []);
      setFilteredColors(data.colors || []);
    } catch (error) {
      toast.error("Failed to load colors");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const result = colors.filter((color) =>
      color.name.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredColors(result);
  };

  const selectColor = (color) => {
    setSelected(color.hex);

    localStorage.setItem("selectedColor", color.hex);

    toast.success(`${color.name} selected`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="
flex
items-center
gap-2
mb-6
px-4
py-2
bg-slate-900
text-white
rounded-lg
hover:bg-slate-800
transition
"
      >
        {" "}
        <ArrowLeft size={18} />
        Back{" "}
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Palette size={35} className="text-indigo-600" />

          <h1 className="text-3xl font-bold">Paint Color Library</h1>
        </div>

        <p className="text-gray-500 mt-2">
          Choose perfect colors for your room.
        </p>
      </div>

      <div
        className="
    bg-white
    border
    rounded-2xl
    p-4
    mb-8
    flex
    items-center
    gap-3
    "
      >
        <Search className="text-gray-400" />

        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search color..."
          className="w-full outline-none"
        />
      </div>

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
            onClick={() => selectColor(color)}
            className="
        bg-white
        border
        rounded-3xl
        overflow-hidden
        cursor-pointer
        hover:shadow-lg
        transition
        relative
        "
          >
            <div
              className="h-40"
              style={{
                backgroundColor: color.hex,
              }}
            />

            {selected === color.hex && (
              <div
                className="
            absolute
            top-4
            right-4
            bg-white
            rounded-full
            p-2
            "
              >
                <Check className="text-green-600" />
              </div>
            )}

            <div className="p-5">
              <h2 className="font-bold text-lg">{color.name}</h2>

              <p className="text-gray-500 text-sm mt-1">{color.brand}</p>

              <p className="mt-3 font-mono text-sm">{color.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredColors.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-500">No colors found.</p>
        </div>
      )}
    </div>
  );
};

export default ColorLibrary;
