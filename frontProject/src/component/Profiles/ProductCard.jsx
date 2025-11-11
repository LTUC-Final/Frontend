"use client";
import { Edit2, Heart, MapPin, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../assets/NoImage.png";
import { useAddToCart } from "../AddToCart";
import AddTOFav from "../AddToFav";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export default function ProductCard({
  product,
  profile,
  user,
  onDelete,
  onUpdate,
  user_id,
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);
  const CusData = useSelector((state) => state.UserInfo);
  const port = import.meta.env.VITE_PORT;
  const { AddToCart } = useAddToCart();
  function getImageUrl(image) {
    if (!image) return defaultImg;
    return image;
  }

  console.log("ffffffffffffffffffffffffff");
  console.log(user_id);
  console.log("ffffffffffffffffffffffffffffffff");
  return (
    <div className="flex justify-center px-4">
      <div
        className="relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-full max-w-md overflow-hidden font-['Quicksand',sans-serif] m-2"
        style={{
          backgroundColor: "#FFF6E9",
          border: "3px solid #102E50",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background:
              "linear-gradient(90deg, #F5C45E 0%, #E78B48 50%, #BE3D2A 100%)",
          }}
        />

        <div className="p-4 sm:p-5 md:p-6 pt-6">
          {CusData.user.role === "customer" && (
            <div className="flex justify-between mb-4 gap-2">
              <button
                onClick={() => AddTOFav(currentProduct, CusData)}
                className="p-2.5 rounded-full transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                style={{ backgroundColor: "#BE3D2A" }}
              >
                <Heart
                  size={20}
                  className="text-[#FFF6E9]"
                  fill="currentColor"
                />
              </button>

              <button
                onClick={() => AddToCart(currentProduct, CusData)}
                className="p-2.5 rounded-full transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                style={{ backgroundColor: "#E78B48" }}
              >
                <ShoppingCart size={20} className="text-[#FFF6E9]" />
              </button>
            </div>
          )}

          {isEditing ? (
            <EditProduct
              product={currentProduct}
              productId={currentProduct.product_id}
              onCancel={() => setIsEditing(false)}
              onUpdate={(updatedProduct) => {
                onUpdate(updatedProduct);
                setCurrentProduct(updatedProduct);
                setIsEditing(false);
              }}
            />
          ) : (
            <>
              <div
                className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-xl mb-4 shadow-lg m-2"
                style={{ border: "2px solid #102E50" }}
              >
                <img
                  src={getImageUrl(currentProduct.image) || "/placeholder.svg"}
                  alt={currentProduct?.name || "Default Product"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full shadow-lg font-bold text-sm"
                  style={{
                    backgroundColor: "#F5C45E",
                    color: "#102E50",
                  }}
                >
                  JD {currentProduct.price}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight text-[#102E50]">
                {currentProduct.name}
              </h3>

              <div className="space-y-1.5 mb-4">
                <p className="text-sm sm:text-base font-semibold flex items-center gap-2 text-[#E78B48]">
                  <MapPin size={16} />
                  {currentProduct.location}
                </p>
                <div className="h-0.5 w-20 bg-[#F5C45E] rounded" />
                <p className="text-xs sm:text-sm text-[#102E50]/60">
                  {currentProduct.created_at}
                </p>
              </div>

              {user.email === profile.email && (
                <div
                  className="flex gap-3 pt-3 border-t-2"
                  style={{ borderColor: "#F5C45E" }}
                >
                  <button
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: "#F5C45E",
                      color: "#102E50",
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={18} />
                  </button>

                  <DeleteProduct
                    productId={currentProduct.product_id}
                    providerId={currentProduct.provider_id}
                    productName={currentProduct.name}
                    onDelete={onDelete}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-4 sm:px-5 pb-5">
          <button
            className="w-full py-3 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "#BE3D2A",
              color: "#FFF6E9",
            }}
            onClick={() => {
              navigate(`/productdatails`, { state: product });
              window.scrollTo(0, 0);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}