import { Download } from "lucide-react";
import * as XLSX from "xlsx";

export default function DownLoadAllOrder({ order }) {
  const downloadOrder = async (order) => {
    const worksheet = XLSX.utils.json_to_sheet(order);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "Orders.xlsx");
  };

  return (
    <button
      onClick={() => {
        downloadOrder(order);
      }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
    >
      <Download className="h-4 w-4" />
      Download EXCEL
    </button>
  );
}
