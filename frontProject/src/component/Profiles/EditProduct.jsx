import { ImageIcon, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import defaultImg from "../../assets/cupcakes-1283247__340.jpg";
 
export default function EditProduct({ product, productId, onCancel, onUpdate }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState(null);
 
  const port = import.meta.env.VITE_PORT;
 
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? "",
        price: product.price ?? "",
        description: product.description ?? "",
        location: product.location ?? "",
      });
    }
  }, [product]);
 
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });
 
    if (!result.isConfirmed) {
      if (result.isDenied && onCancel) onCancel();
      return;
    }
 
    try {
      const endpoint = `http://localhost:${port}/api/provider/updateProduct/${productId}`;
 
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (imageFile) formData.append("image", imageFile);
 
      const { data } = await axios.patch(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
 
      if (onUpdate) onUpdate(data);
 
      Swal.fire("Saved!", "", "success");
    } catch (err) {
      console.error("Error updating product:", err);
      Swal.fire("Error", "Failed to save changes.", "error");
    }
  };
console.log("image: ",product.image);
 
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
   
      <div>
        <label className="block font-bold mb-1">Product Image</label>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 cursor-pointer bg-gray-200 px-3 py-1 rounded">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
 
          <img
            src={
              product.image
                ? `http://localhost:${port}${product.image}`
                : defaultImg
            }
            alt="Product"
            className="w-24 h-24 object-cover rounded"
          />
        </div>
      </div>
 
      <div>
        <label className="block font-bold mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
 
      <div>
        <label className="block font-bold mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
 
      <div>
        <label className="block font-bold mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
 
      <div>
        <label className="block font-bold mb-1">Location</label>
        <textarea
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
 
      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
 