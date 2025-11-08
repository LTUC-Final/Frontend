import axios from "axios";
import { ImageIcon, Gem, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import useSuggestions from "../../hooks/SuggestionsInputdesc";

export default function ProductForm() {
  const { user } = useSelector((state) => state.UserInfo);
  const { decText, SuggestionsInputdesc } = useSuggestions();
   const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


  const providerId = user?.provider?.provider_id;
  const [formData, setFormData] = useState({
    type: "product",
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
        const response = await axios.get(`https://backend-a2qq.onrender.com/getAllCategory`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }
);
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
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSuggestion = async () => {
    try {
      const newSuggestions = await SuggestionsInputdesc(formData.description);
      console.log("New suggestions:", newSuggestions);
    } catch (err) {
      console.error("AI suggestion error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) submitData.append(key, value);
      });

      const response = await axios.post(`https://backend-a2qq.onrender.com/postItem`, submitData,  {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }

      );

      if (response.status === 200) {
        setFormData((prev) => ({ ...prev, name: "", price: "", description: "", image: null, location: "" }));
        setImagePreview(null);
Swal.fire({
  title: "Product Posted",
  text: "Your item has been successfully listed.",
  icon: "success",
  background: "#FFF6E9",
  color: "#102E50",
  confirmButtonColor: "#F5C45E",
  confirmButtonText: "OK",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm",
  },
  buttonsStyling: false,
});
      } else throw new Error("Failed to submit");
    } catch (error) {
      console.error("Error submitting form:", error);
Swal.fire({
  title: "Error",
  text: "Failed to add post. Please try again.",
  icon: "error",
  background: "#FFF6E9",
  color: "#102E50",
  confirmButtonColor: "#BE3D2A",
  confirmButtonText: "OK",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm",
  },
  buttonsStyling: false,
});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#E78B48] max-w-4xl mx-auto">
        {/* Gradient Header */}
        <div
          className="rounded-t-xl p-4 sm:p-6 text-center text-white font-bold text-xl sm:text-2xl"
          style={{ background: "linear-gradient(90deg, #F5C45E 0%, #E78B48 50%, #BE3D2A 100%)" }}
        >
          Add New Product or Service
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-[#102E50] uppercase mb-1 sm:mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full border-2 border-[#E78B48] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#102E50] uppercase mb-1 sm:mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product/service name"
                required
                className="w-full border-2 border-[#E78B48] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-[#102E50] uppercase mb-1 sm:mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                required
                className="w-full border-2 border-[#E78B48] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-[#102E50] uppercase mb-1 sm:mb-2">Category</label>
              <select
                value={formData.category_id}
                onChange={(e) => handleInputChange("category_id", e.target.value)}
                className="w-full border-2 border-[#E78B48] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#102E50] uppercase mb-1 sm:mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter location"
                required
                className="w-full border-2 border-[#E78B48] rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#102E50] uppercase mb-1 sm:mb-2">Image</label>
              <div className="border-2 border-[#E78B48] border-dashed rounded-lg p-4 sm:p-6 bg-[#FFF6E9] text-center hover:bg-[#FFF6E9]/80 transition-colors">
                <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <label htmlFor="image" className="flex flex-col items-center justify-center cursor-pointer space-y-2">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-28 sm:h-32 w-full object-cover rounded-lg" />
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-[#E78B48]" />
                      <p className="text-sm text-[#102E50]">Click to upload or drag & drop</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#102E50] uppercase mb-1 sm:mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter description"
                required
                className="w-full border-2 border-[#E78B48] rounded-lg p-2 sm:p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
              />

              {/* AI Suggestions Trigger */}
              <button
                type="button"
                className="w-full mt-3 bg-[#FFF6E9] text-[#102E50] hover:bg-[#E78B48] font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              onClick={handleSuggestion}
            >
              <Wand2 className="h-5 w-5 text-[#E78B48]" /> Get AI Suggestions
              </button>

              {decText.length > 0 && (
                <div className="mt-4 p-4 sm:p-6 bg-[#FFF6E9] border-2 border-[#F5C45E] rounded-lg shadow-inner">
                  <h4 className="font-semibold text-[#102E50] mb-2 flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-[#F5C45E]" /> AI Description Suggestions
                  </h4>
                  <div className="space-y-2">
                    {decText.map((suggestion, idx) => (
                      <p key={idx} className="text-[#102E50] pl-4 border-l-2 border-[#E78B48]">{suggestion}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
             className="mt-6 w-full flex items-center justify-center gap-2 bg-[#102E50] hover:bg-[#0d243d] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          <Gem className="w-5 h-5 text-[#F5C45E]" />
            {isLoading ? "Adding Post..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
