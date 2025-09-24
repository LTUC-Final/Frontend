import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";

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
      const endpoint = `http://localhost:${port}/api/provider/deleteProduct/${providerId}/${productId}`;

      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`, // remove extra quotes if any
        },
      });

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
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
}
