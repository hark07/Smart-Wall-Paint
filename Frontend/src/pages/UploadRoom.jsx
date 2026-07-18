import { useState } from "react";
import { UploadCloud, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

const UploadRoom = () => {
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      return toast.error("Please select an image");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);

      const { data } = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("roomImage", data.imageUrl);

      toast.success("Image uploaded successfully");

      navigate("/wall-selector");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Upload Room Image</h1>

          <p className="text-gray-500 mt-2">
            Upload a clear image of your room to start visualizing paint colors.
          </p>
        </div>

        {!preview ? (
          <label className="border-2 border-dashed border-indigo-300 rounded-3xl h-80 flex flex-col justify-center items-center cursor-pointer hover:bg-indigo-50 transition">
            <UploadCloud size={70} className="text-indigo-500 mb-4" />

            <h3 className="font-semibold text-xl">Click to Upload</h3>

            <p className="text-gray-500 mt-2">JPG, PNG, WEBP</p>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <div>
            <img
              src={preview}
              alt="preview"
              className="rounded-2xl w-full max-h-[500px] object-cover"
            />

            <div className="flex flex-wrap gap-4 mt-6">
              <label className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl cursor-pointer">
                Change Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition"
              >
                {loading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border shadow-sm mt-8 p-6">
        <div className="flex items-center gap-3 mb-3">
          <ImagePlus className="text-indigo-600" />

          <h2 className="font-bold text-xl">Tips for Better Results</h2>
        </div>

        <ul className="space-y-2 text-gray-600">
          <li>• Upload a high-quality room image.</li>

          <li>• Ensure walls are clearly visible.</li>

          <li>• Avoid blurry or dark photos.</li>

          <li>• Good lighting improves paint visualization.</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadRoom;
