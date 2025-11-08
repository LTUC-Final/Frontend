"use client"

import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function ApprovalForm({ cart_id, orderId, port, onSuccess }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const textValue = formData.get("note")
    const priceValue = formData.get("price")

    console.log("Note:", textValue, "Price:", priceValue)

    try {
      setLoading(true)

      await axios.put(`https://backend-a2qq.onrender.com/updatePriceAndResponse/${orderId}`, {
        response_from_provider: textValue,
        price: priceValue,
      }
)

      await axios.put(`https://backend-a2qq.onrender.com/sendResponseProviderToCart`, {
        response_from_provider: textValue,
        price: priceValue,
        cart_id: cart_id,
      }
)

      if (onSuccess) {
        onSuccess({
          order_id: orderId,
          response_from_provider: textValue,
          totalAmount: priceValue,
          status: "awaiting_approval",
        })
      }

      e.target.reset()
      setSubmitted(true)
    } catch (err) {
      console.error("Error updating:", err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return null

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-6 p-6 bg-[#FFF6E9] rounded-lg border-2 border-[#F5C45E] max-w-lg w-full ml-2"
    >
      <input
        name="note"
        type="text"
        placeholder="Enter your message"
        className="px-4 py-3 border-2 border-[#102E50] bg-white text-[#102E50] placeholder-[#102E50]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:border-[#E78B48] w-full font-medium text-sm sm:text-base"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Enter new price"
        className="px-4 py-3 border-2 border-[#102E50] bg-white text-[#102E50] placeholder-[#102E50]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:border-[#E78B48] w-full font-medium text-sm sm:text-base"
        required
      />
    <div className="flex justify-end mt-4">
  <button
    type="submit"
    disabled={loading}
    className={`px-4 py-2 text-white text-sm font-medium rounded-md shadow transition-all duration-200
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#102E50] hover:bg-[#E78B48] hover:text-[#FFF6E9] hover:shadow-md active:scale-95"
      }`}
  >
    {loading ? "Sending..." : "Send"}
  </button>
</div>
    </form>
  )
}
