import axios from "axios";
import { useState } from "react";

export default function ApprovalForm({ orderId, port, onSuccess }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(port);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const textValue = formData.get("note");
    const priceValue = formData.get("price");

    console.log("Note:", textValue, "Price:", priceValue);

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:${port}/updatePriceAndResponse/${orderId}`,
        {
          response_from_provider: textValue,
          price: priceValue,
        }
      );
      if (onSuccess)
        onSuccess({
          order_id: orderId,
          response_from_provider: textValue,
          totalAmount: priceValue,
          status: "awaiting_approval",
        });
      console.log(" Server response:", response.data);

      e.target.reset();
      setSubmitted(true); 
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      console.error(" Error updating:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="note"
        type="text"
        placeholder="Enter your message"
        className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-full"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Enter new price"
        className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`m-5 px-5 py-2.5 text-white font-semibold rounded-xl shadow-md transition-all duration-200 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg active:scale-95"
          }`}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
