import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function DeleteProfileImage({ onDeleted }) {
  const user = useSelector((state) => state.UserInfo.user);
  const userId = user?.user_id;

  const handleDelete = async () => {
    if (!userId) return;

    const confirm = await Swal.fire({
      title: "Delete Profile Image?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#BE3D2A",
      cancelButtonColor: "#102E50",
      background: "#FFF6E9",
      color: "#102E50",
      iconColor: "#E78B48",
      customClass: {
        popup: "rounded-2xl shadow-2xl border-2 border-[#F5C45E]",
        title: "text-[#102E50] font-bold",
        htmlContainer: "text-[#102E50]/80",
        confirmButton: "rounded-full px-6 py-2.5 font-semibold hover:scale-105 transition-transform shadow-lg",
        cancelButton: "rounded-full px-6 py-2.5 font-semibold hover:scale-105 transition-transform shadow-lg",
      },
    });

    if (!confirm.isConfirmed) return;
    // const port = import.meta.env.VITE_PORT;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/deleteProfileImage/${userId}`
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: res.data.message,
        timer: 1400,
        showConfirmButton: false,
        background: "#FFF6E9",
        color: "#102E50",
        iconColor: "#5cb85c",
        customClass: {
          popup: "rounded-2xl shadow-2xl border-2 border-[#5cb85c]",
          title: "text-[#102E50] font-bold",
          htmlContainer: "text-[#102E50]/80",
        },
      });

      if (onDeleted) onDeleted(); // tell parent to re-render
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.response?.data?.message || "Try again later",
        background: "#FFF6E9",
        color: "#102E50",
        iconColor: "#BE3D2A",
        confirmButtonColor: "#BE3D2A",
        customClass: {
          popup: "rounded-2xl shadow-2xl border-2 border-[#BE3D2A]",
          title: "text-[#102E50] font-bold",
          htmlContainer: "text-[#102E50]/80",
          confirmButton: "rounded-full px-6 py-2.5 font-semibold hover:scale-105 transition-transform shadow-lg",
        },
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      aria-label="Delete Profile Image"
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full 
             bg-[#FFF6E9] text-[#BE3D2A] 
             flex items-center justify-center 
             shadow-lg hover:scale-105 transition-transform
             border-2 border-[#BE3D2A] hover:bg-[#BE3D2A] hover:text-[#FFF6E9]
             active:scale-95"
    >
      <Trash2 size={16} className="sm:size-5" />
    </button>
  );
}