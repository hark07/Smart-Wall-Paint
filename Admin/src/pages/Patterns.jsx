import { useEffect, useState } from "react";
import API from "../api/axios";

const Patterns = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/patterns");

      setPatterns(data.patterns || []);
    } catch (error) {
      console.error(error);
      setPatterns([]);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/patterns", form);

      fetchPatterns();

      setForm({
        name: "",
        category: "",
        image: "",
      });

      alert("Pattern Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add pattern");
    }
  };

  const deletePattern = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pattern?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/patterns/${id}`);

      setPatterns((prev) => prev.filter((pattern) => pattern._id !== id));

      alert("Pattern Deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete pattern");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        {" "}
        <h2 className="text-xl font-semibold">Loading Patterns... </h2>{" "}
      </div>
    );
  }

  return (
    <div className="p-6">
      {" "}
      <h1 className="text-3xl font-bold mb-6">Pattern Management </h1>
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Pattern</h2>

        <input
          type="text"
          placeholder="Pattern Name"
          className="border p-3 rounded-lg w-full mb-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 rounded-lg w-full mb-3"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border p-3 rounded-lg w-full mb-4"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({
              ...form,
              imageUrl: e.target.value,
            })
          }
          required
        />

        <button className="bg-slate-900 text-white px-6 py-3 rounded-lg">
          Add Pattern
        </button>
      </form>
      {patterns.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">No patterns available.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {patterns.map((pattern) => (
            <div
              key={pattern._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={pattern.imageUrl || "https://via.placeholder.com/400x250"}
                alt={pattern.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-bold text-lg">{pattern.name}</h3>

                <p className="text-gray-500 mt-1">{pattern.category}</p>

                <button
                  onClick={() => deletePattern(pattern._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Delete Pattern
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patterns;
