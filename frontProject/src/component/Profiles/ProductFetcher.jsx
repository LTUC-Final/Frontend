import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function ProductFetcher({ profile }) {
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
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [profile]);

  // Remove deleted product from state
  const handleDeleteProduct = (deletedProductId) => {
    setProduct((prev) => prev.filter((p) => p.product_id !== deletedProductId));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && product.length === 0 && <p>No products found</p>}

      <div className="grid grid-cols-3 gap-4 m-6">
        {product.map((p) => (
          <ProductCard
            key={p.product_id}
            product={p}
            profile={profile}
            user={user}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}
