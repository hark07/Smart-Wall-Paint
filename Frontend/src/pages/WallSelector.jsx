import { useEffect, useState } from "react";

import { Stage, Layer, Image as KonvaImage, Line, Circle } from "react-konva";

import {
  Trash2,
  Undo2,
  ArrowRight,
  ArrowLeft,
  MousePointer2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const WallSelector = () => {
  const navigate = useNavigate();

  const imageUrl = localStorage.getItem("roomImage");

  const [image, setImage] = useState(null);

  const [points, setPoints] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      toast.error("Room image not found");

      navigate("/upload-room");

      return;
    }

    const img = new window.Image();

    img.crossOrigin = "anonymous";

    img.src = imageUrl;

    img.onload = () => {
      setImage(img);

      setLoading(false);
    };
  }, []);

  const handleClick = (e) => {
    const stage = e.target.getStage();

    const pointer = stage.getPointerPosition();

    setPoints([...points, pointer.x, pointer.y]);
  };

  const clearSelection = () => {
    setPoints([]);
  };

  const undoPoint = () => {
    if (points.length === 0) {
      return;
    }

    setPoints(points.slice(0, -2));
  };

  const saveSelection = () => {
    if (points.length < 6) {
      toast.error("Select complete wall area");

      return;
    }

    const coordinates = [];

    for (let i = 0; i < points.length; i += 2) {
      coordinates.push({
        x: points[i],

        y: points[i + 1],
      });
    }

    localStorage.setItem(
      "wallCoordinates",

      JSON.stringify(coordinates),
    );

    toast.success("Wall selected successfully");

    navigate("/paint-preview");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />

          <p className="text-gray-500">Loading room image...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="bg-white border rounded-3xl shadow-sm p-4 sm:p-6">
        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Select Wall Area</h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Click points around the wall boundary
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Instruction */}

        <div className="bg-indigo-50 rounded-2xl p-4 mb-6 flex gap-3">
          <MousePointer2 className="text-indigo-600" />

          <p className="text-sm text-indigo-700">
            Click minimum 3 points around the wall area to select it.
          </p>
        </div>

        {/* Canvas */}

        <div className="border rounded-3xl overflow-auto bg-gray-100">
          <div className="min-w-[900px]">
            <Stage width={900} height={600} onClick={handleClick}>
              <Layer>
                <KonvaImage image={image} width={900} height={600} />

                {points.length > 0 && (
                  <Line
                    points={points}
                    closed
                    fill="rgba(79,70,229,0.35)"
                    stroke="#4f46e5"
                    strokeWidth={3}
                  />
                )}

                {points.map((_, index) => {
                  if (index % 2 === 0) {
                    return (
                      <Circle
                        key={index}
                        x={points[index]}
                        y={points[index + 1]}
                        radius={7}
                        fill="#4f46e5"
                      />
                    );
                  }

                  return null;
                })}
              </Layer>
            </Stage>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Selected Points: {points.length / 2}
        </p>

        {/* Buttons */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <button
            onClick={clearSelection}
            className="flex justify-center items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-xl"
          >
            <Trash2 size={18} />
            Clear
          </button>

          <button
            onClick={undoPoint}
            disabled={points.length === 0}
            className="flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 py-3 rounded-xl"
          >
            <Undo2 size={18} />
            Undo
          </button>

          <button
            onClick={saveSelection}
            className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallSelector;
