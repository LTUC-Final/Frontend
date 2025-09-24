import axios from "axios";
import { useState } from "react";

export default function ButtonStatus({ orderId, setOrders, port }) {
  const [selectedDate, setSelectedDate] = useState("");

  function updateOrderStatus(order_id, newStatus) {
    axios
      .put(
        `http://localhost:${port}/updateStatusOrder/${newStatus}/${order_id}`
      )
      .then((response) => {
        console.log(response.data);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === order_id
              ? { ...order, status: newStatus }
              : order
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  }

  function updateOrderDilvary(order_id, newStatus) {
    axios
      .put(
        `http://localhost:${port}/updateStatusOrder/${newStatus}/${order_id}`
      )
      .then((response) => {
        console.log(response.data);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === order_id
              ? { ...order, status: newStatus }
              : order
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        className="flex-1 sm:flex-auto bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        onClick={() => updateOrderStatus(orderId, "completed")}
      >
        Completed
      </button>

      <button
        className="flex-1 sm:flex-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        onClick={() => updateOrderStatus(orderId, "on_progress")}
      >
        On Progress
      </button>

      {/* <button
        className="flex-1 sm:flex-auto bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
        onClick={() => updateOrderDilvary(orderId, "Ready for Delivery")}
      >
        Delivered
      </button> */}

      {/* <button
        className="flex-1 sm:flex-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => updateOrderStatus(orderId, "rejected")}
      >
        Reject
      </button> */}
      <div className="flex items-center gap-2">
        <label htmlFor={`date-${orderId}`} className="text-sm font-medium">
          Date:
        </label>
        <input
          id={`date-${orderId}`}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
}
