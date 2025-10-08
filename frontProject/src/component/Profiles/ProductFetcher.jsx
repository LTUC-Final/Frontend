import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function ProductFetcher({ profile, refreshTrigger }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.UserInfo.user);

  useEffect(() => {
    if (!profile) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const port = import.meta.env.VITE_PORT;
        const endpoint = `http://localhost:${port}/api/provider/getProductsByUser/${profile.user_id}`;
        const res = await axios.get(endpoint);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [profile, refreshTrigger]);

  const handleDeleteProduct = (deletedProductId) => {
    setProduct((prev) => prev.filter((p) => p.product_id !== deletedProductId));
  };

  const handleUpdate = (updatedProduct) => {
    setProduct((prev) =>
      prev.map((p) =>
        p.product_id === updatedProduct.product_id ? updatedProduct : p
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {loading && <p className="text-center text-[#102E50] my-4">Loading...</p>}
      {error && <p className="text-center text-red-500 my-4">{error}</p>}
      
      {!loading && !error && product.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-12 text-[#102E50]">
          <p className="text-xl font-semibold mb-2">No products found</p>
          <p className="text-sm opacity-70">You haven’t listed any products yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {product.map((p) => (
          <ProductCard
            key={p.product_id}
            product={p}
            profile={profile}
            user={user}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
