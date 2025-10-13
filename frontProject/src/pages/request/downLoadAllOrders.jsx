"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function DownLoadAllOrder({ order }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const downloadOrder = () => {
    let filteredOrders = order;

    if ((fromDate && !toDate) || (!fromDate && toDate)) {
      alert(
        "Please select both the start and end dates, or leave them both empty."
      );
      return;
    }

    if (fromDate && toDate) {
      filteredOrders = order.filter((o) => {
        const date = new Date(o.orderDate);
        return date >= new Date(fromDate) && date <= new Date(toDate);
      });

      if (filteredOrders.length === 0) {
        alert("No orders found within the selected date range.");
        return;
      }
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const fileName =
      fromDate && toDate
        ? `Orders_${fromDate}_to_${toDate}.xlsx`
        : "All_Orders.xlsx";

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-lg sm:text-xl font-semibold text-[#102E50] mb-4 text-center">
          Download Orders
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <div className="flex flex-col text-sm text-[#102E50] w-full sm:w-1/3">
            <label htmlFor="fromDate" className="mb-1 font-medium">
              From Date{" "}
            </label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition-all"
            />
          </div>

          <div className="flex flex-col text-sm text-[#102E50] w-full sm:w-1/3">
            <label htmlFor="toDate" className="mb-1 font-medium">
              To Date:
            </label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition-all"
            />
          </div>

          <button
            onClick={downloadOrder}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F5C45E] text-[#102E50] font-medium text-sm sm:text-base rounded-lg shadow-sm hover:bg-[#E78B48] hover:shadow-lg active:scale-95 transition-all w-full sm:w-auto"
          >
            <Download className="h-5 w-5" />
            <span>Download EXCEL</span>
          </button>
        </div>
      </div>
    </div>
  );
}
