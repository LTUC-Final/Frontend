import { Camera, Upload } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";

export default function EditImage({ userId, onUpdate }) {
  const inputRef = useRef(null);
  const port = import.meta.env.VITE_PORT;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profile_image", selectedFile); // ✅ matches your API

    try {
      setIsUploading(true);
      const response = await axios.put(
        `http://localhost:${port}/api/provider/updateProviderProfile/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onUpdate(response.data.updated.profile_image);
      setSelectedFile(null); // ✅ reset after upload
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* 📸 Camera Button Overlay — fixed in image corner */}
      <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 z-30">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => inputRef.current.click()}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFF6E9] text-[#102E50] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          style={{ border: "2px solid #102E50" }}
          aria-label="Change Profile Picture"
        >
          <Camera size={16} className="sm:size-5" />
        </button>
      </div>

      {/* ⬆️ Upload button — below image, not affecting camera */}
      {selectedFile && (
        <div className="flex justify-center mt-2 z-20 relative">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-105 ${
              isUploading ? "opacity-50 cursor-not-allowed" : "shadow-lg"
            }`}
            style={{
              backgroundColor: "#BE3D2A",
              color: "white",
              border: "2px solid white",
            }}
            aria-label="Upload Selected Image"
          >
            <Upload size={18} />
          </button>
        </div>
      )}
    </>
  );
}
