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
      alert("");
      return;
    }

    if (fromDate && toDate) {
      filteredOrders = order.filter((o) => {
        const date = new Date(o.orderDate);
        return date >= new Date(fromDate) && date <= new Date(toDate);
      });

      if (filteredOrders.length === 0) {
        alert("");
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
    <div className="flex items-center gap-4">
      {/* From Date */}
      <div className="flex items-center gap-2 text-sm text-[#102E50]">
        <label htmlFor="fromDate" className="font-medium">
          From Date:
        </label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded-md px-2 py-1 w-36 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
        />
      </div>

      {/* To Date */}
      <div className="flex items-center gap-2 text-sm text-[#102E50]">
        <label htmlFor="toDate" className="font-medium">
          To Date:
        </label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded-md px-2 py-1 w-36 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]"
        />
      </div>

      {/* Download Button */}
      <button
  onClick={downloadOrder}
  className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 bg-[#F5C45E] text-[#102E50] text-sm sm:text-base rounded-lg font-medium transition-all hover:bg-[#E78B48] hover:shadow-lg active:scale-95 disabled:opacity-50"
>
  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
  <span className="block sm:inline">Download EXCEL</span>
</button>
    </div>
  );
}