import { useNavigate } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import { useState } from "react";
import {  Edit2,ShoppingCart,Heart } from "lucide-react";
import AddToCart from "../AddToCart";
import AddTOFav from "../AddToFav";
import { useSelector } from "react-redux";
import defaultImg from "../../assets/NoImage.jpg";
 
export default function ProductCard({ product, profile, user, onDelete ,onUpdate}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);
    const CusData = useSelector((state) => state.UserInfo);
const port = import.meta.env.VITE_PORT;
 
  console.log("role",CusData.user.role);
console.log("CURRENT PROD",currentProduct.image);
console.log(" PROD",product.image);
function getImageUrl(image) {
  if (!image) return defaultImg;
  if (image.startsWith("http")) return image;
  return `http://localhost:${port}${image}`;
} 
  return (
    <div className="bg-white/80 border border-gray-300/50 rounded-2xl shadow-md hover:shadow-xl transition p-4">
       {CusData.user.role==="customer"?( <div className="flex justify-between mb-2">
 
        <button
          onClick={() => AddTOFav(currentProduct, CusData)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          <Heart size={20} />
        </button>
 
        <button
          onClick={() => AddToCart(currentProduct, CusData)}
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          <ShoppingCart size={20} />
        </button>
      </div>):(<></>)}
 
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
   {/* <img
  src={
    currentProduct.image
      ? currentProduct.image.startsWith("http")
        ? currentProduct.image // Already a full URL, from fetch/edit
        : `http://localhost:${port}${currentProduct.image}` // Newly uploaded, just path
      : defaultImg // fallback
  }
  alt={currentProduct?.name || "Default Product"}
  className="w-full h-48 object-cover rounded-lg"
/> */}
   <img
  src={getImageUrl(currentProduct.image)}
  alt={currentProduct?.name || "Default Product"}
  className="w-full h-48 object-cover rounded-lg"
/>
 
          <h3 className="text-lg font-semibold text-gray-800">{currentProduct.name}</h3>
          <p className="text-sm text-gray-600">{currentProduct.description}</p>
          <p className="text-base font-medium text-gray-700">JD {currentProduct.price}</p>
          <p className="text-sm text-gray-500">{currentProduct.location}</p>
          <p className="text-xs text-gray-400">{currentProduct.created_at}</p>
 
          {user.email === profile.email && (
            <div className="flex gap-3 mt-4">
              <button
                className="text-blue-600"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={20} />
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
 
      <div className="mt-3 text-center">
        <button
          className="bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
          onClick={() => navigate(`/productdatails`, { state: product })}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
 