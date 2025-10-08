
"use client"

import easyinvoice from "easyinvoice"
import { Download } from "lucide-react"


export default function PrintInvoiceButton({ order }) {
  const printInvoice = async (order) => {
    const data = {
      sender: {
        address: `${order.location}`,

        company: `Provider Name : ${order.provider_firstname} ${order.provider_lastname}`,
        zip: "",
        city: "",
        country: "",
        custom1: `ID: ${order.provider_id}`,
      },
      client: {
        company: `Customer Name : ${order.customer_firstname} ${order.customer_lastname}`,

        address: "Irbid",

        zip: "",
        city: "",
        country: "",
        custom1: `ID: ${order.customer_id}`,
      },
      invoiceNumber: `INV-${order.cart_id || order.order_id}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: order.estimatedDelivery || "",
      products: [
        {
          quantity: order.quantity || 1,
          description: order.productName + order.serviceDetails,
          price: order.totalAmount,
          discount: 0,
          image: order.product_image
            ? order.product_image.startsWith("http")
              ? order.product_image
              : `http://localhost:3000${order.product_image}`
            : undefined,
        },
      ],
<<<<<<< HEAD
      "bottom-notice": "Thank you for choosing us – your satisfaction is our priority.",
=======
      "bottom-notice":
        "Thank you for choosing us – your satisfaction is our priority.",
>>>>>>> 22d74f0bf66793d11b60851362215560da304621
      logo: order.provider_profile_image
        ? order.provider_profile_image.startsWith("http")
          ? order.provider_profile_image
          : `http://localhost:3000${order.provider_profile_image}`
        : undefined,
<<<<<<< HEAD
    }

    easyinvoice.createInvoice(data, (result) => {
      easyinvoice.download("invoice.pdf", result.pdf)
    })
  }

  return (
    <button
      onClick={() => printInvoice(order)}
      className="
        inline-flex items-center gap-2
        px-4 py-2
        sm:px-5 sm:py-2.5
        text-sm sm:text-base
        bg-[#F5C45E] text-[#102E50] text-sm sm:text-base rounded-lg font-medium transition-all hover:bg-[#E78B48] hover:shadow-lg 
        active:scale-95
        disabled:opacity-50 disabled:pointer-events-none
      "
    >
      <Download className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden xs:inline">Download Invoice</span>
      <span className="inline xs:hidden">Download</span>
    </button>
  )
=======
    };

    easyinvoice.createInvoice(data, function (result) {
      easyinvoice.download("invoice.pdf", result.pdf);
    });
  };

  return (
    <button
      onClick={() => {
        printInvoice(order);
      }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
    >
      <Download className="h-4 w-4" />
      Download Invoice
    </button>
  );
>>>>>>> 22d74f0bf66793d11b60851362215560da304621
}
