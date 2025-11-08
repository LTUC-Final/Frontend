import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { Trash2 } from "lucide-react";
export default function DeleteProduct({ productId, providerId, productName, onDelete }) {
  const token = useSelector((state) => state.UserInfo.token);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${productName}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const port = import.meta.env.VITE_PORT;
      const endpoint = `https://backend-a2qq.onrender.com/api/provider/deleteProduct/${providerId}/${productId}`;

      await axios.delete(endpoint)

      onDelete(productId);

      Swal.fire({
        title: "Deleted!",
        text: `"${productName}" has been deleted.`,
        icon: "success",
      });
    } catch (err) {
      console.error("Error deleting product", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete product!",
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
className="bg-[#102E50] hover:bg-[#E78B48] text-white px-3 py-1 rounded"
    >
       <Trash2 size={20} />
    </button>
  );
}
