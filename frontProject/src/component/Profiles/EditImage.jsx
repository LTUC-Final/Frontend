import { useState } from "react";
import axios from "axios";
import { Camera } from "lucide-react"; 

const port = import.meta.env.VITE_PORT;

const EditImage = ({ userId, onUpdate }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("profile_image", image);

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:${port}/api/provider/updateProviderProfile/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onUpdate(response.data.updated.profile_image);
      setLoading(false);
    } catch (err) {
      console.error("Error uploading image:", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-3">
     
      <label className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        <Camera size={20} />
        <span>{image ? image.name : "Choose Image"}</span>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        onClick={handleUpload}
        disabled={loading || !image}
        className={`px-4 py-2 rounded text-white ${
          loading || !image ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        } transition`}
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default EditImage;
