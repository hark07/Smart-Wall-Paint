import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Line } from "react-konva";

import { Save, Download, Palette, ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

const PaintPreview = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [points, setPoints] = useState([]);

  const [color, setColor] = useState(
    localStorage.getItem("selectedColor") || "#2563eb",
  );

  const [opacity, setOpacity] = useState(60);

  const [saving, setSaving] = useState(false);

  const stageRef = useRef(null);

  const roomImage = localStorage.getItem("roomImage");

  useEffect(() => {
    if (!roomImage) {
      toast.error("Room image not found");

      navigate("/upload-room");

      return;
    }

    const img = new window.Image();

    img.crossOrigin = "anonymous";

    img.src = roomImage;

    img.onload = () => {
      setImage(img);
    };

    const savedPoints = JSON.parse(localStorage.getItem("wallCoordinates"));

    if (savedPoints) {
      const arr = [];

      savedPoints.forEach((point) => {
        arr.push(point.x);

        arr.push(point.y);
      });

      setPoints(arr);
    }
  }, []);

  const getCanvasImage = () => {
    if (!stageRef.current) {
      return null;
    }

    return stageRef.current.toDataURL({
      pixelRatio: 2,
    });
  };

  const downloadImage = () => {
    const imageData = getCanvasImage();

    if (!imageData) {
      toast.error("Preview not ready");

      return;
    }

    const link = document.createElement("a");

    link.download = "smart-wall-design.png";

    link.href = imageData;

    link.click();

    toast.success("Image downloaded");
  };

  const saveProject = async () => {
    try {
      if (!image) {
        toast.error("Image loading...");

        return;
      }

      setSaving(true);

      const previewImage = getCanvasImage();

      const projectData = {
        projectName: "My Wall Design",

        originalImage: roomImage,

        previewImage,

        wallCoordinates: JSON.parse(localStorage.getItem("wallCoordinates")),

        color,

        opacity: Number(opacity),
      };

      await API.post("/projects", projectData);

      toast.success("Design saved successfully");

      localStorage.removeItem("wallCoordinates");

      navigate("/projects");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="bg-white border rounded-3xl shadow-sm p-4 sm:p-6">
        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Palette className="text-indigo-600" size={28} />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Paint Preview</h1>

              <p className="text-gray-500 text-sm">Customize your wall color</p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Controls */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <label className="font-semibold">Choose Color</label>

            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-14 mt-3 cursor-pointer rounded-xl"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl">
            <label className="font-semibold">Opacity {opacity}%</label>

            <input
              type="range"
              min="10"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
              className="w-full mt-5"
            />
          </div>
        </div>

        {/* Canvas */}

        <div className="border rounded-3xl overflow-auto bg-gray-100">
          {image && (
            <Stage ref={stageRef} width={900} height={600} className="mx-auto">
              <Layer>
                <KonvaImage image={image} width={900} height={600} />

                <Line
                  points={points}
                  closed
                  fill={`${color}${Math.floor(opacity * 2.55).toString(16)}`}
                  stroke={color}
                  strokeWidth={3}
                />
              </Layer>
            </Stage>
          )}
        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={downloadImage}
            className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
          >
            <Download size={18} />
            Download
          </button>

          <button
            onClick={saveProject}
            disabled={saving}
            className="flex-1 flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl transition"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Design"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaintPreview;
