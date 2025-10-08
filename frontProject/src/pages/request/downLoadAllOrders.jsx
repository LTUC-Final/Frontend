"use client"

import { Download } from "lucide-react"
import * as XLSX from "xlsx"

export default function DownLoadAllOrder({ order }) {
  const downloadOrder = async (order) => {
    const worksheet = XLSX.utils.json_to_sheet(order)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users")

    XLSX.writeFile(workbook, "Orders.xlsx")
  }

  return (
    <button
      onClick={() => downloadOrder(order)}
      className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#F5C45E] text-[#102E50] text-sm sm:text-base rounded-lg font-medium transition-all hover:bg-[#E78B48] hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
    >
      <Download className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="block sm:inline">Download EXCEL</span>
    </button>
  )
}
