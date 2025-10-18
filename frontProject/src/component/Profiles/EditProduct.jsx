import { ImageIcon, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import defaultImg from "../../assets/NoImageUploaded.png";
 
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
  text: "Make sure your product details are correct.",
  icon: "question",
  background: "#FFF6E9",
  color: "#102E50",
  iconColor: "#E78B48",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't Save`,
  cancelButtonText: "Cancel",
  confirmButtonColor: "#F5C45E",
  denyButtonColor: "#BE3D2A",
  cancelButtonColor: "#ccc",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm",
    denyButton: "swal2-custom-deny",
    cancelButton: "swal2-custom-cancel"
  }
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
 
Swal.fire({
  title: "Saved!",
  text: "Product updated successfully.",
  icon: "success",
  background: "#FFF6E9",
  color: "#102E50",
  iconColor: "#F5C45E",
  confirmButtonText: "OK",
  confirmButtonColor: "#F5C45E",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm"
  }
});
    } catch (err) {
      console.error("Error updating product:", err);
Swal.fire({
  title: "Error",
  text: "Failed to save product changes.",
  icon: "error",
  background: "#FFF6E9",
  color: "#102E50",
  iconColor: "#BE3D2A",
  confirmButtonText: "OK",
  confirmButtonColor: "#BE3D2A",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm"
  }
});
    }
  };
console.log("image: ",product.image);
 
return (
 <form onSubmit={handleSubmit} className="space-y-4 w-full text-[#102E50]">
  {/* IMAGE UPLOAD */}
  <div>
    <label className="block font-semibold mb-1">Product Image</label>
    <div className="flex items-center gap-3">
      <label
        className="flex items-center gap-2 cursor-pointer bg-[#F5C45E] hover:bg-[#e4b54d] text-[#102E50] px-4 py-2 rounded-lg transition"
      >
        <Upload className="w-4 h-4" />
        <span className="text-sm font-medium">Upload</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

    <div className="w-full max-w-[150px]">
  <img
    src={product.image ? `http://localhost:${port}${product.image}` : defaultImg}
    alt="Product"
    className="w-full h-auto object-contain rounded-lg border border-[#F5C45E] shadow-sm bg-white"
  />
</div>

    </div>
  </div>

  {/* NAME */}
  <div>
    <label className="block font-semibold mb-1">Product Name</label>
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      className="w-full border border-[#E78B48] bg-white p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
    />
  </div>

  {/* DESCRIPTION */}
  <div>
    <label className="block font-semibold mb-1">Description</label>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      rows={2}
      className="w-full border border-[#E78B48] bg-white p-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
    />
  </div>

  {/* PRICE */}
  <div>
    <label className="block font-semibold mb-1">Price</label>
    <input
      type="number"
      name="price"
      value={form.price}
      onChange={handleChange}
      className="w-full border border-[#E78B48] bg-white p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
    />
  </div>

  {/* LOCATION */}
  <div>
    <label className="block font-semibold mb-1">Location</label>
    <textarea
      name="location"
      value={form.location}
      onChange={handleChange}
      rows={1}
      className="w-full border border-[#E78B48] bg-white p-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
    />
  </div>

  {/* ACTION BUTTONS */}
  <div className="flex justify-end gap-2 pt-2 border-t border-[#F5C45E] mt-4">
    <button
      type="submit"
      className="bg-[#E78B48] hover:bg-[#d77932] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
    >
      Save
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="bg-[#BE3D2A] hover:bg-[#a63222] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
    >
      Cancel
    </button>
  </div>
</form>

);

}
 