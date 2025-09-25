import axios from "axios";
import { ImageIcon, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ProductForm() {
  const { user } = useSelector((state) => state.UserInfo);

  const providerId = user?.provider?.provider_id;
  const [formData, setFormData] = useState({
    type: null,
    name: "",
    price: "",
    description: "",
    category_id: null,
    image: null,
    provider_id: providerId,
    location: "",
  });
  const port = import.meta.env.VITE_PORT;

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${port}/getAllCategory`
        );
        console.log(response.data);
        setCategories(response.data);
        if (response.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category_id: response.data[0].category_id,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("type", formData.type);
      submitData.append("name", formData.name);
      submitData.append("price", formData.price);
      submitData.append("description", formData.description);
      submitData.append("category_id", formData.category_id);
      submitData.append("location", formData.location);
      submitData.append("provider_id", providerId);

      if (formData.image) {
        submitData.append("image", formData.image);
      }
      console.log("submitData");

      console.log(submitData);
      console.log("submitData");
      console.log("formData");

      console.log(formData);
      console.log("formData");
      const response = await axios.post(
        `http://localhost:${port}/postItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setFormData({
          type: "",
          name: "",
          price: "",
          description: "",
          category_id: "",
          image: null,
        });
        setImagePreview(null);
        Swal.fire({
          title: "Prodact Posted",
          icon: "success",
          draggable: true,
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border-2 border-blue-600 rounded-xl shadow-md">
        <div className="bg-blue-50 p-4 rounded-t-xl">
          <h2 className="text-2xl font-bold text-blue-600">
            Add New Product or Service
          </h2>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Type
              </label>
              <select
                value={formData.type || "product"}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full border-2 border-blue-600 rounded-lg p-2 bg-white"
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full border-2 border-blue-600 rounded-lg p-2 bg-white"
                placeholder="Enter name"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Image
              </label>
              <div className="border-2 border-blue-600 border-dashed rounded-lg p-6 bg-gray-50 text-center">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center cursor-pointer space-y-2"
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                      <p className="text-sm">Click to upload or drag & drop</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="w-full border-2 border-blue-600 rounded-lg p-2 bg-white"
                placeholder="0.00"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full border-2 border-blue-600 rounded-lg p-2 bg-white min-h-[100px]"
                placeholder="Enter description"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={(e) =>
                  handleInputChange("category_id", e.target.value)
                }
                className="w-full border-2 border-blue-600 rounded-lg p-2 bg-white"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {" "}
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full border-2 border-blue-600 rounded-lg p-2 bg-white"
                placeholder="Enter location"
                required
              />
            </div>
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg"
            >
              {isLoading ? "Adding Post..." : "Add Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
