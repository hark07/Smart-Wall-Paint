import { useEffect, useState } from "react";
import API from "../api/axios";

const Colors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    hex: "#000000",
  });

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/colors");

      setColors(data.colors || []);
    } catch (error) {
      console.error(error);
      setColors([]);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return alert("Color name is required");
    }

    try {
      await API.post("/colors", form);

      alert("Color Added Successfully");

      setForm({
        name: "",
        hexCode: "#000000",
      });

      fetchColors();
    } catch (error) {
      console.error(error);
      alert("Failed to add color");
    }
  };

  const deleteColor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this color?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/colors/${id}`);

      setColors((prev) => prev.filter((color) => color._id !== id));

      alert("Color Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete color");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        {" "}
        <h2 className="text-xl font-semibold">Loading Colors... </h2>{" "}
      </div>
    );
  }

  return (
    <div className="p-6">
      {" "}
      <h1 className="text-3xl font-bold mb-6">Color Management </h1>
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Color</h2>

        <input
          type="text"
          placeholder="Color Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="border p-3 rounded-lg w-full mb-4"
          required
        />

        <div className="flex items-center gap-4 mb-4">
          <input
            type="color"
            value={form.hex}
            onChange={(e) =>
              setForm({
                ...form,
                hex: e.target.value,
              })
            }
            className="h-12 w-20 cursor-pointer"
          />

          <span className="font-medium">{form.hexCode}</span>
        </div>

        <button className="bg-slate-900 text-white px-6 py-3 rounded-lg">
          Add Color
        </button>
      </form>
      {colors.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">No colors found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {colors.map((color) => (
            <div key={color._id} className="bg-white p-5 rounded-xl shadow">
              <div
                className="h-28 rounded-lg border"
                style={{
                  backgroundColor: color.hexCode,
                }}
              />

              <h3 className="font-bold text-lg mt-4">{color.name}</h3>

              <p className="text-gray-500">{color.hexCode}</p>

              <button
                onClick={() => deleteColor(color._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Delete Color
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colors;
