"use client";

import axios from "axios";
import {
  Bell,
  Calendar,
  CheckCircle2,
  DollarSign,
  Filter,
  Loader2,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSummary from "../../hooks/useAnaliasisOrder";
import useLastDate from "../../hooks/useLastDate";
import useSupportProvider from "../../hooks/useSupportProvider";
import OrdersSummary from "../order/aiComponent";
import ApprovalForm from "./approvalForm";
import ButtonStatus from "./ButtonStatues";
import DownLoadAllOrder from "./downLoadAllOrders";
import PrintInvoiceButton from "./printInvoice";

const statusClasses = {
  pending: "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48]",
  "In Progress": "text-[#102E50] bg-[#F5C45E]/20 border-2 border-[#102E50]",
  "Ready for Delivery": "text-[#F5C45E] bg-[#102E50] border-2 border-[#F5C45E]",
  completed: "text-[#F5C45E] bg-[#102E50] border-2 border-[#F5C45E] shadow-lg",
  awaiting_approval: "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48]",
  on_progress: "text-[#102E50] bg-[#F5C45E]/30 border-2 border-[#102E50]",
  rejected: "text-[#BE3D2A] bg-[#FFF6E9] border-2 border-[#BE3D2A]",
};

const statusDotClasses = {
  pending: "bg-[#E78B48]",
  "In Progress": "bg-[#102E50]",
  "Ready for Delivery": "bg-[#F5C45E]",
  completed: "bg-[#F5C45E]",
  awaiting_approval: "bg-[#E78B48]",
  on_progress: "bg-[#102E50]",
  rejected: "bg-[#BE3D2A]",
};

const paymentStatusClasses = {
  Paid: "text-[#102E50] bg-[#F5C45E] font-semibold",
  "Partially Paid": "text-[#E78B48] bg-[#FFF6E9] border border-[#E78B48]",
  Unpaid: "text-[#BE3D2A] bg-[#FFF6E9] border border-[#BE3D2A]",
};

function OrdersManagementProvider() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentLength, setCurrentLength] = useState(0);
  const [sortOrder, setSortOrder] = useState("newest");
  const { messages, sendMessage } = useSummary();
  const { messagesSupportProvider, sendMessageSupportProvider } =
    useSupportProvider();
  const { messagesss, sendMessagess, report, formatDateLocal } = useLastDate();
  const [buttonAi, setButtonAi] = useState(false);

  const assistantMessages = messages.filter((msg) => msg.role === "assistant");
  const assistantMessagesSupport = messagesSupportProvider.filter(
    (msg) => msg.role === "assistant"
  );
  const { user } = useSelector((state) => state.UserInfo);
  const provider_id = user?.provider?.provider_id;
  const port = import.meta.env.VITE_PORT;
  const navigate = useNavigate();

  useEffect(() => {
    if (provider_id) {
      fetchOrders();
    }
  }, [provider_id]);
  const persistedData = JSON.parse(localStorage.getItem("persist:UserInfo"));

  const token = JSON.parse(persistedData.token);
  const fetchOrders = async () => {
    if (!provider_id) return;
    try {
      console.log(
        'JSON.parse(JSON.parse(localStorage.getItem("persist:UserInfo")).token)'
      );
      console.log(
        JSON.parse(JSON.parse(localStorage.getItem("persist:UserInfo")).token)
      );
      console.log(
        'JSON.parse(JSON.parse(localStorage.getItem("persist:UserInfo")).token)'
      );

      const response = await axios.get(
        `http://localhost:${port}/getAllOrderProvider/${provider_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
          },
        }
      );

      const mappedOrders = response.data.orders.map((order) => ({
        order_id: order.order_id,
        status: order.status,
        productName: order.product_name,
        serviceDetails: order.product_description,
        customNotes: order.details_order_user || "",
        basePrice: order.base_price || 0,
        additionalServices: order.additional_services || 0,
        totalAmount: order.original_price || 0,
        estimatedDelivery: order.datedelivery || "",
        orderDate: order.created_at
          ? new Date(order.created_at).toISOString().split("T")[0]
          : "",
        paymentStatus: order.payment_status,
        category: order.categories_name,
        provider_id: order.provider_id,
        product_id: order.product_id,
        customer_id: order.customer_user_id,
        viewFedbackPost: true,
        add_customer_review: order.add_customer_review,
        provider_firstname: order.provider_firstname,
        provider_lastname: order.provider_lastname,
        provider_profile_image: order.provider_profile_image,
        customer_firstname: order.customer_firstname,
        customer_lastname: order.customer_lastname,
        customer_profile_image: order.customer_profile_image,
        response_from_provider: order.response_from_provider,
        cart_id: order.cart_id,
        quantity: order.quantity,
        product_image: order.product_image,
        location: order.location,
      }));

      setOrders(mappedOrders);
      sendMessage(mappedOrders);
      sendMessageSupportProvider();
      sendMessagess(mappedOrders);

      console.log("Fetched orders:", mappedOrders);

      console.log(mappedOrders);
    } catch (error) {
      if (error.response) {
        console.log(" Server error message:", error.response.data.message);

        if (error.response.status === 403) {
          console.log(" Token expired, please login again.");
        } else if (error.response.status === 401) {
          console.log(" Token not provided or invalid.");
        }
      } else if (error.request) {
        console.log(" No response from server:", error.request);
      } else {
        console.log(" Error setting up request:", error.message);
      }
    }
  };

  const filteredOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        String(order.order_id)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceDetails.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || order.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [orders, searchTerm, statusFilter, categoryFilter, sortOrder]);

  const categories = [...new Set(orders.map((order) => order.category))];
  const statuses = [...new Set(orders.map((order) => order.status))];

  function deleteOrder(order_id, cart_id) {
    try {
      axios.put(
        `http://localhost:${port}/updateStatusOrder/rejected/${order_id}/${cart_id}`
      );
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.order_id === order_id ? { ...o, status: "rejected" } : o
        )
      );
    } catch (error) {
      console.error("Error on reject:", error);
    }
  }

  function summarizeOrdersByStatus(orders) {
    const summary = {};
    orders.forEach((order) => {
      const status = order.status;
      const price = Number.parseFloat(order.totalAmount) || 0;
      const total = price * (order.quantity || 1);
      if (!summary[status]) {
        summary[status] = { count: 0, totalPrice: 0 };
      }
      summary[status].count += 1;
      summary[status].totalPrice += total;
    });
    return summary;
  }

  const summary = summarizeOrdersByStatus(orders);

  const data = Object.entries(summary).map(([status, values]) => ({
    name: status,
    value: values.totalPrice,
  }));
  const data2 = Object.entries(summary).map(([status, values]) => ({
    name: status,
    value: values.count,
  }));
  console.log("Sssssssssssssssssssssssssssssssssssssss");
  console.log(data2);
  console.log("Sssssssssssssssssssss");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FFF6E9]">
      {/* Sidebar overlay when open (for mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#102E50] border-b-4 border-[#F5C45E] px-6 py-5 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#FFF6E9] hover:text-[#E78B48] transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#FFF6E9] tracking-tight">
                Orders Management
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#102E50] h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-2.5 w-56 lg:w-96 bg-[#FFF6E9] border-2 border-[#F5C45E] text-[#102E50] text-base placeholder-[#102E50]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:border-[#E78B48] transition-all"
                />
              </div>
              <button className="p-2 hover:bg-[#F5C45E]/10 rounded-lg transition-colors">
                <Bell className="h-6 w-6 text-[#F5C45E] hover:text-[#E78B48] transition-colors" />
              </button>
            </div>
          </div>
        </header>

     <div className="bg-white border-b-2 border-[#E78B48] px-6 py-4 shadow-sm">
  <div className="flex items-center justify-between max-w-7xl mx-auto gap-4">
    {/* Left: Filters + Selects */}
    <div className="flex items-center gap-2">
      <Filter className="h-5 w-5 text-[#E78B48]" />
      <span className="text-base font-semibold text-[#102E50]">Filters:</span>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] text-base font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E] transition-all cursor-pointer"
      >
        <option value="All">All Status</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="px-4 py-2 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] text-base font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E] transition-all cursor-pointer"
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="px-4 py-2 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] text-base font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E] transition-all cursor-pointer"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    {/* Right: DownloadAllOrder */}
    <DownLoadAllOrder order={orders} />
  </div>
</div>


        <div className="flex-1 overflow-auto p-6 lg:p-8 bg-[#FFF6E9]">
          <div className="max-w-7xl mx-auto space-y-6">
          <div className="max-w-7xl mx-auto">
  <button
    onClick={() => setButtonAi((prev) => !prev)}
    className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex items-center justify-center gap-3 px-6 py-3
      bg-[#F5C45E] text-[#102E50] text-lg font-bold rounded-lg shadow-md
      hover:bg-[#E78B48] hover:text-[#FFF6E9] transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:ring-offset-2"
  >
    <Sparkles className="h-6 w-6" />
    {buttonAi ? "Hide Analysis" : "Analyze using AI"}
  </button>
</div>


            {buttonAi && (
              <OrdersSummary
                data={data}
                data2={data2}
                COLORS={COLORS}
                report={report}
                assistantMessagesSupport={assistantMessagesSupport}
                formatDateLocal={formatDateLocal}
              />
            )}

            {filteredOrders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white border-2 border-[#F5C45E] rounded-xl p-5 hover:shadow-2xl hover:border-[#E78B48] transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        order.product_image
                          ? order.product_image.startsWith("http")
                            ? order.product_image
                            : `http://localhost:${port}${order.product_image}`
                          : "../src/assets/NoImage.png"
                      }
                      //comment
                    
                      alt={order.productName}
                      className="w-full lg:w-40 h-40 object-cover rounded-lg border-2 border-[#E78B48] shadow-sm"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-[#102E50]">
                        Order #{order.order_id}
                      </h3>

                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                          statusClasses[order.status]
                        }`}
                      >
                        {order.status === "completed" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : order.status === "In Progress" ||
                          order.status === "on_progress" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <div
                            className={`w-2 h-2 rounded-full ${
                              statusDotClasses[order.status]
                            }`}
                          />
                        )}
                        <span>{order.status}</span>
                      </div>

                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          paymentStatusClasses[order.paymentStatus]
                        }`}
                      >
                        {order.paymentStatus}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#102E50] mb-1">
                        {order.productName}
                      </h4>
                      <p className="text-sm text-[#102E50]/70 leading-relaxed line-clamp-2">
                        {order.serviceDetails}
                      </p>
                    </div>

                    {order.response_from_provider && (
                      <div className="bg-[#FFF6E9] p-3 rounded-lg border-l-4 border-[#E78B48]">
                        <p className="text-xs font-semibold text-[#E78B48] mb-1">
                          Provider Response:
                        </p>
                        <p className="text-sm text-[#102E50] leading-relaxed">
                          {order.response_from_provider}
                        </p>
                      </div>
                    )}

                    {order.customNotes && (
                      <div className="bg-[#FFF6E9] p-3 rounded-lg border-l-4 border-[#E78B48]">
                        <p className="text-xs font-semibold text-[#E78B48] mb-1">
                          Customer Note:
                        </p>
                        <p className="text-sm text-[#102E50] leading-relaxed">
                          {order.customNotes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4 text-[#F5C45E]" />
                        <span className="font-bold text-[#102E50]">
                          $
                          {(
                            order.totalAmount * order.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-[#E78B48]" />
                        <span className="text-[#102E50]/70">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Truck className="h-4 w-4 text-[#102E50]" />
                        <span className="text-[#102E50]/70">
                          {new Date(
                            order.estimatedDelivery
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#102E50]/70">Category:</span>
                        <span className="font-semibold text-[#102E50]">
                          {order.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#102E50]/70">Qty:</span>
                        <span className="font-bold text-[#E78B48]">
                          {order.quantity}
                        </span>
                      </div>
                      {order.status === "completed" && (
                        <div className="ml-auto">
                          <PrintInvoiceButton order={order} />
                        </div>
                      )}
                    </div>

                    {order.status === "awaiting_approval" &&
                      order.customNotes &&
                      !order.response_from_provider && (
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            className="px-4 py-2 bg-[#BE3D2A] text-white text-sm font-semibold rounded-lg hover:bg-[#BE3D2A]/90 transition-colors shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteOrder(order.order_id, order.cart_id);
                            }}
                          >
                            Reject
                          </button>
                          <ApprovalForm
                            orderId={order.order_id}
                            cart_id={order.cart_id}
                            port={port}
                            onSuccess={(updatedOrder) => {
                              setOrders((prevOrders) =>
                                prevOrders.map((o) =>
                                  o.order_id === updatedOrder.order_id
                                    ? { ...o, ...updatedOrder }
                                    : o
                                )
                              );
                            }}
                          />
                        </div>
                      )}

                    {order.status === "awaiting_approval" &&
                      order.response_from_provider && (
                        <div className="bg-[#FFF6E9] p-3 rounded-lg border-l-4 border-[#BE3D2A]">
                          <p className="text-sm font-semibold text-[#BE3D2A]">
                            Already sent message and updated your price
                          </p>
                        </div>
                      )}

                    {(order.status === "on_progress" ||
                      order.status === "pending") && (
                      <div>
                        <ButtonStatus
                          onSuccess={fetchOrders}
                          orderId={order.order_id}
                          setOrders={setOrders}
                          port={port}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col items-center justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#F5C45E]/30 lg:pl-5 lg:min-w-[140px]">
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={
                          order.customer_profile_image
                            ? `http://localhost:${port}${order.customer_profile_image}`
                            : `https://ui-avatars.com/api/?name=${order.customer_firstname}+${order.customer_lastname}&background=random&color=fff`
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${order.customer_id}`);
                        }}
                        alt={`${order.customer_firstname} ${order.customer_lastname}`}
                        className="w-16 h-16 rounded-full border-3 border-[#E78B48] object-cover hover:border-[#F5C45E] hover:scale-105 transition-all cursor-pointer shadow-md"
                      />
                      <span className="text-sm font-bold text-[#102E50] text-center leading-tight">
                        {order.customer_firstname} {order.customer_lastname}
                      </span>
                    </div>

                    <div className="flex lg:flex-col gap-2 w-full">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${order.customer_id}`);
                        }}
                        className="px-3 py-2 text-xs font-bold text-[#FFF6E9] bg-[#102E50] hover:bg-[#E78B48] rounded-lg transition-colors"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-[#102E50] hover:text-[#E78B48] hover:bg-[#FFF6E9] rounded-lg transition-colors border-2 border-[#102E50] hover:border-[#E78B48] flex items-center justify-center"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersManagementProvider;
