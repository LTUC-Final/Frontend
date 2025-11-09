"use client";

import axios from "axios";
import { useState } from "react";

export default function ButtonStatus({ orderId, setOrders, port, onSuccess }) {
  const [selectedDate, setSelectedDate] = useState("");

  function updateOrderStatus(order_id, newStatus) {
    axios
      .put(`https://backend-a2qq.onrender.com/updateStatusOrder/${newStatus}/${order_id}`)
      .then((response) => {
        console.log(response.data);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === order_id ? { ...order, status: newStatus } : order
          )
        );
        if (onSuccess) onSuccess();
      })
      .catch((error) => console.error("Error updating status:", error));
  }

  function updateOrderDilvary(order_id, selectedDate) {
    axios
      .put(`https://backend-a2qq.onrender.com/delivary/${selectedDate}/${order_id}`)
      .then((response) => {
        console.log(response.data);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === order_id ? { ...order, datedelivery: selectedDate } : order
          )
        );
        if (onSuccess) onSuccess();
      })
      .catch((error) => console.error("Error updating delivery date:", error));
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4 w-full">
      {/* Completed Button */}
      <button
        className="flex-1 min-w-[150px] bg-yellow-400 text-[#102E50] px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300 transition duration-200"
        onClick={() => updateOrderStatus(orderId, "completed")}
      >
        Completed
      </button>

      {/* On Progress Button */}
      <button
        className="flex-1 min-w-[150px] bg-[#102E50] text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-[#1a3c6a] transition duration-200"
        onClick={() => updateOrderStatus(orderId, "on_progress")}
      >
        On Progress
      </button>

      {/* Delivery Date and Button */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
        <label htmlFor={`date-${orderId}`} className="text-sm font-medium text-[#102E50]">
          Delivery Date:
        </label>

        <input
          id={`date-${orderId}`}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border-2 border-orange-400 rounded-lg px-3 py-2 text-[#102E50] bg-[#FFF6E9] focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
        />

        <button
          className="flex-1 sm:flex-none bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => updateOrderDilvary(orderId, selectedDate)}
          disabled={!selectedDate}
        >
          SET DATE
        </button>
      </div>
    </div>
  );
}