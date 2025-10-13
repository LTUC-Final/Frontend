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
  // const { messagesSupport, generateMessage } = useSupport();
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

  const fetchOrders = async () => {
    if (!provider_id) return;
    try {
      const response = await axios.get(
        `http://localhost:${port}/getAllOrderProvider/${provider_id}`
      );

      const mappedOrders = response.data.map((order) => ({
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

      console.log("Fetched orders:", mappedOrders);

      console.log(mappedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

  function deleteOrder(order_id) {
    try {
      axios.put(
        `http://localhost:${port}/updateStatusOrder/rejected/${order_id}`
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
      const price = parseFloat(order.totalAmount) || 0;
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#FFF6E9]">
      {/* Sidebar overlay when open (for mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden  h-">
        {/* Header */}
        <header className="bg-[#102E50] border-b-4 border-[#F5C45E] px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#FFF6E9] hover:text-[#E78B48]"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-[#FFF6E9]">
                Orders Management
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#102E50] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 sm:w-80 bg-[#FFF6E9] border-2 border-[#F5C45E] text-[#102E50] placeholder-[#102E50]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:border-[#E78B48]"
                />
              </div>
              <Bell className="h-5 w-5 text-[#F5C45E] hover:text-[#E78B48] transition-colors cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border-b-2 border-[#E78B48] px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-[#E78B48]" />
              <span className="text-sm font-medium text-[#102E50]">
                Filters:
              </span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E]"
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
              className="px-3 py-1 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>{" "}
            <DownLoadAllOrder order={orders} />
          </div>
        </div>

        {/* Orders list / AI summary */}
        <div className="flex-1 overflow-auto p-4 sm:p-6   ">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setButtonAi((prev) => !prev)}
              className={`flex items-center justify-center gap-2 px-6 py-3 bg-[#F5C45E] text-[#102E50] font-semibold rounded-lg shadow-lg
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:ring-offset-2
              hover:bg-[#E78B48]`}
            >
              <Sparkles className="h-5 w-5" />
              {buttonAi ? "Hide Analysis" : "Analyze using AI"}
            </button>

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
                className="bg-white border-2 border-[#F5C45E] rounded-lg p-4 sm:p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex flex-col md:flex-row md:space-x-6">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={
                        order.product_image
                          ? order.product_image.startsWith("http")
                            ? order.product_image
                            : `http://localhost:${port}${order.product_image}`
                          : "../../assests/NoImage"
                      }
                      alt={order.productName}
                      className="w-full sm:w-48 h-48 object-cover rounded-lg border-2 border-[#E78B48]"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top section */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-lg font-montserrat font-semibold text-[#102E50]">
                          {order.order_id}
                        </h3>

                        <div
                          className={
                            "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border " +
                            statusClasses[order.status]
                          }
                        >
                          {order.status === "completed" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : order.status === "In Progress" ||
                            order.status === "on_progress" ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <div
                              className={
                                "w-2 h-2 rounded-full " +
                                statusDotClasses[order.status]
                              }
                            />
                          )}
                          <span>{order.status}</span>
                        </div>

                        <div
                          className={
                            "px-2 py-1 rounded-full text-xs font-medium " +
                            paymentStatusClasses[order.paymentStatus]
                          }
                        >
                          {order.paymentStatus}
                        </div>
                      </div>

                      <h4 className="text-base font-semibold text-[#102E50] mb-2">
                        {order.productName}
                      </h4>
                      <p className="text-sm text-[#102E50]/70 mb-3 line-clamp-2">
                        {order.serviceDetails}
                      </p>

                      {order.response_from_provider && (
                        <p className="text-sm text-[#E78B48] mb-4 italic bg-[#FFF6E9] p-2 rounded border-l-4 border-[#E78B48]">
                          Provider Response: {order.response_from_provider}
                        </p>
                      )}

                      {order.customNotes && (
                        <p className="text-sm text-[#E78B48] mb-4 italic bg-[#FFF6E9] p-2 rounded border-l-4 border-[#E78B48]">
                          Note Customer: {order.customNotes}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-[#102E50] font-medium">
                          Quantity:
                        </span>
                        <span className="w-8 text-center font-bold text-[#E78B48]">
                          {order.quantity}
                        </span>
                      </div>

                      {order.status === "awaiting_approval" &&
                        order.customNotes &&
                        !order.response_from_provider && (
                          <div className="flex flex-col sm:flex-row sm:items-start gap-1 mb-3">
                            <button
                              className="sm:mt-[24px] px-4 py-2 bg-[#BE3D2A] text-white rounded-lg hover:bg-[#BE3D2A]/80 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteOrder(order.order_id);
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
                          <p className="text-sm text-[#BE3D2A] font-medium bg-[#FFF6E9] p-2 rounded border-l-4 border-[#BE3D2A]">
                            Already sent message and updated your price
                          </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 text-sm mt-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-[#F5C45E]" />
                        <span className="text-[#102E50] font-bold">
                          {(
                            order.totalAmount * order.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-[#E78B48]" />
                        <span className="text-[#102E50]/70">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-[#102E50]" />
                        <span className="text-[#102E50]/70">
                          {new Date(
                            order.estimatedDelivery
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-3 py-1 text-[#F5C45E] rounded-full font-semibold">
                          {order.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {order.status === "completed" && (
                          <PrintInvoiceButton order={order} />
                        )}
                      </div>
                    </div>

                    {(order.status === "on_progress" ||
                      order.status === "pending") && (
                      <ButtonStatus
                        onSuccess={fetchOrders}
                        orderId={order.order_id}
                        setOrders={setOrders}
                        port={port}
                      />
                    )}
                  </div>

                  {/* Customer info */}
                  <div className="mt-4 md:mt-0 flex flex-col items-center">
                    <img
                      src={
                        order.customer_profile_image
                          ? `http://localhost:${port}${order.customer_profile_image}`
                          : `https://ui-avatars.com/api/?name=${order.customer_firstname}+${order.customer_lastname}&background=random&color=fff`
                      }
                      onClick={() => navigate(`/profile/${order.customer_id}`)}
                      alt={`${order.customer_firstname} ${order.customer_lastname}`}
                      className="w-10 h-10 rounded-full border-2 border-[#E78B48] object-cover hover:border-[#F5C45E] transition-colors cursor-pointer"
                    />
                    <span className="text-sm font-medium text-[#102E50] mt-2 text-center">
                      {order.customer_firstname} {order.customer_lastname}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => navigate(`/profile/${order.customer_id}`)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                    >
                      View Customer
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </button>
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
