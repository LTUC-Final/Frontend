import { useNavigate } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";

export default function ProductCard({ product, profile, user, onDelete }) {
  console.log(product);

  
const navigate=useNavigate();


console.log("prod",product);

  return (
    <div className="bg-white/80 border border-gray-300/50 rounded-2xl shadow-md hover:shadow-xl transition p-4">
      <img
        src={product.image || `https://placehold.co/150x150?text=No+Image`}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />

      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-base font-medium text-gray-700">JD {product.price}</p>
      <p className="text-sm text-gray-500">{product.location}</p>
     <p className="text-xs text-gray-400">{product.created_at}</p>

      {user.email === profile.email && (
        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 transition">
            Edit
          </button>
          <DeleteProduct
            productId={product.product_id}
            providerId={product.provider_id}
            productName={product.name}
            onDelete={onDelete}
          />
        </div>
      )}

      <div className="mt-3 text-center">
        <button className="bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
        onClick={()=>{navigate(`/productdatails`,{state:product})}
}>
          View Details
        </button>
      </div>
    </div>
  );
}
