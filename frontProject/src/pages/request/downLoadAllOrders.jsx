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
    <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 sm:gap-2 md:gap-3">
      {/* From Date */}
      <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-[#102E50]">
        <label
          htmlFor="fromDate"
          className="text-[10px] sm:text-sm font-semibold text-[#102E50]"
        >
          From:
        </label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-2 sm:px-2  py-1.5 bg-[#FFF6E9] border-2 border-[#102E50]
             text-[10px] sm:text-xs md:text-sm font-medium rounded-md
             focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F5C45E]
             focus:border-[#F5C45E] hover:border-[#F5C45E] transition-all 
             cursor-pointer h-9 sm:h-10 appearance-none bg-no-repeat bg-right
             pr-8 sm:pr-10 shadow-sm hover:shadow-md
             text-[#102E50]"
        />
      </div>

      {/* To Date */}
      <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-[#102E50]">
        <label
          htmlFor="toDate"
          className="text-[10px] sm:text-sm font-semibold text-[#102E50]"
        >
          To:
        </label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-1 sm:px-2 py-1.5 bg-[#FFF6E9] border-2 border-[#102E50]
             text-[10px] sm:text-xs md:text-sm font-medium rounded-md
             focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F5C45E]
             focus:border-[#F5C45E] hover:border-[#F5C45E] transition-all 
             cursor-pointer h-9 sm:h-10 appearance-none bg-no-repeat bg-right
             pr-8 sm:pr-10 shadow-sm hover:shadow-md
             text-[#102E50]"
        />
      </div>

      {/* Download Button */}
      <button
        onClick={downloadOrder}
        className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1
                 bg-[#F5C45E] text-[#102E50] text-[10px] sm:text-xs md:text-sm
                 rounded-md font-medium transition-all hover:bg-[#E78B48]
                 hover:shadow-md active:scale-95 disabled:opacity-50
                 h-8 sm:h-9"
      >
        <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span>Download EXCEL</span>
      </button>
    </div>
  );
}
