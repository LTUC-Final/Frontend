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
import defaultImg from "../../assets/NoImageUploaded.png";
import ChatBox from "../../component/Ai/chatBox";
import FeedbackCard from "../../component/ratingAndFeedback";
import useSummary from "../../hooks/useAnaliasisOrder";
import useLastDate from "../../hooks/useLastDate";
import useSupport from "../../hooks/useSupport";
import OrdersSummary from "./aiComponent";
const statusClasses = {
  pending: "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48]",
  "In Progress":
    "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48] shadow-md animate-pulse-subtle",
  "Ready for Delivery": "text-[#F5C45E] bg-[#102E50] border-2 border-[#F5C45E]",
  completed: "text-[#F5C45E] bg-[#102E50] border-2 border-[#F5C45E] shadow-lg",
  awaiting_approval: "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48]",
  on_progress:
    "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48] shadow-md animate-pulse-subtle",
  rejected: "text-[#BE3D2A] bg-[#FFF6E9] border-2 border-[#BE3D2A]",
};

const statusDotClasses = {
  pending: "bg-[#E78B48]",
  "In Progress": "bg-[#E78B48] animate-pulse",
  "Ready for Delivery": "bg-[#F5C45E]",
  completed: "bg-[#F5C45E]",
  awaiting_approval: "bg-[#E78B48]",
  on_progress: "bg-[#E78B48] animate-pulse",
  rejected: "bg-[#BE3D2A]",
};

const paymentStatusClasses = {
  Paid: "text-[#102E50] bg-[#F5C45E] font-semibold",
  "Partially Paid": "text-[#E78B48] bg-[#FFF6E9] border border-[#E78B48]",
  Unpaid: "text-[#BE3D2A] bg-[#FFF6E9] border border-[#BE3D2A]",
};

function OrdersManagementCustomer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const { messages, sendMessage } = useSummary();
  const { messagesSuport, sendMessageSupport } = useSupport();
  const { messagesss, sendMessagess, report, formatDateLocal } = useLastDate();
  const [buttonAi, setButtonAi] = useState(false);

  console.log("77777777777777777777777");

  console.log(report);
  console.log("77777777777777777777777");

  const assistantMessages = messages.filter((msg) => msg.role === "assistant");
  const assistantMessagesSupport = messagesSuport.filter(
    (msg) => msg.role === "assistant"
  );

  const { user } = useSelector((state) => state.UserInfo);
  const userId = user?.user_id;
  const port = import.meta.env.VITE_PORT;
  const navigate = useNavigate();
  console.log("ssssssssssss");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${port}/getAllOrderInCustomer/${userId}`
        );
        console.log(response.data);
        const mappedOrders = response.data.map((order) => ({
          order_id: order.order_id,
          status: order.status,
          productName: order.product_name,
          serviceDetails: order.product_description,
          customNotes: order.response_from_provider || "",
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
          provider_user_id: order.provider_user_id,
          quantity: order.quantity,
          product_image: order.product_image,
          datedelivery: order.datedelivery
            ? new Date(order.created_at).toISOString().split("T")[0]
            : "",
        }));
        sendMessage(mappedOrders);
        setOrders(mappedOrders);
        sendMessageSupport();
        sendMessagess(mappedOrders);
        console.log("saaaaaaaaaa" + orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

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
  const [isOpen, setIsOpen] = useState(false);

  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:${port}/ai2`, {
        input: orders,
      });

      setReply(res.data.result);
      console.log(res.data.result);
    } catch (error) {
      console.error("Error:", error);
      setReply("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  function summarizeOrdersByStatus(orders) {
    const summary = {};
    console.log(orders);
    orders.forEach((order) => {
      const status = order.status;
      const priceString = order.totalAmount;
      const price = Number.parseFloat(priceString) || 0;
      const totalPrice = price * (order.quantity || 1);
      if (!summary[status]) {
        summary[status] = { count: 0, totalPrice: 0 };
      }

      summary[status].count += 1;
      summary[status].totalPrice += totalPrice;
    });
    return summary;
  }

  const summary = summarizeOrdersByStatus(orders);
  console.log(summary);
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
    <div className="flex h-screen bg-gradient-to-br from-[#FFF6E9] via-[#FFF6E9] to-[#F5C45E]/10">
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-[#102E50] to-[#102E50]/80 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[#F5C45E]/50 z-50 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MessageCircle size={24} />
      </button>

      <ChatBox isOpen={isOpen} setIsOpen={setIsOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gradient-to-r from-[#102E50] via-[#102E50] to-[#102E50]/90 border-b-4 border-[#F5C45E] px-4 sm:px-6 py-4 sm:py-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#FFF6E9] hover:text-[#E78B48] transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFF6E9] tracking-tight">
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
                  className="pl-10 pr-4 py-2 w-48 sm:w-80 bg-[#FFF6E9] border-2 border-[#F5C45E] text-[#102E50] placeholder-[#102E50]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:border-[#E78B48] transition-all"
                />
              </div>
              <Bell className="h-5 w-5 text-[#F5C45E] hover:text-[#E78B48] transition-colors cursor-pointer" />
            </div>
          </div>
        </header>

        <div className="bg-white/80 backdrop-blur-sm border-b-2 border-[#E78B48] px-4 sm:px-6 py-4 shadow-md">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-[#E78B48]" />
              <span className="text-sm font-semibold text-[#102E50]">
                Filters:
              </span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E] transition-all"
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
              className="px-3 py-2 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E] transition-all"
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
              className="px-3 py-2 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E] transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="space-y-6">
            <button
              onClick={() => {
                setButtonAi(!buttonAi);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F5C45E] to-[#E78B48] text-[#102E50] font-bold rounded-xl shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:ring-offset-2 hover:shadow-2xl hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              {buttonAi ? "Hide Analysis" : "Analyze using AI"}
            </button>
            {buttonAi ? (
              <OrdersSummary
                data={data}
                data2={data2}
                COLORS={COLORS}
                report={report}
                assistantMessagesSupport={assistantMessagesSupport}
                formatDateLocal={formatDateLocal}
              />
            ) : (
              <></>
            )}
            
            {/* Cards Grid - 2 per row on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-[#F5C45E] hover:border-[#E78B48] cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedOrder(order)}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#102E50] via-[#E78B48] to-[#F5C45E]"></div>
                
                <div className="p-5">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-extrabold text-[#102E50] leading-tight mb-2">
                        {order.productName}
                      </h4>
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#F5C45E] to-[#F5C45E]/80 text-[#102E50] text-xs font-bold rounded-full shadow-sm">
                        {order.category}
                      </span>
                    </div>
                    
                    {/* Provider Avatar */}
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={
                          order.provider_profile_image
                            ? `http://localhost:${port}${order.provider_profile_image}`
                            : `https://ui-avatars.com/api/?name=${order.provider_firstname}+${order.provider_lastname}&background=random&color=fff`
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${order.provider_user_id}`);
                        }}
                        alt={`${order.provider_firstname} ${order.provider_lastname}`}
                        className="w-16 h-16 rounded-full border-4 border-[#E78B48] object-cover hover:border-[#F5C45E] transition-all duration-300 shadow-lg hover:scale-110"
                      />
                      <span className="text-xs font-bold text-[#102E50] text-center max-w-[80px] truncate">
                        {order.provider_firstname}
                      </span>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div
                      className={
                        "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-extrabold border-2 shadow-md " +
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
                      <span className="uppercase tracking-wider">
                        {order.status}
                      </span>
                    </div>
                    <div
                      className={
                        "px-3 py-1.5 rounded-lg text-xs font-extrabold shadow-md " +
                        paymentStatusClasses[order.paymentStatus]
                      }
                    >
                      {order.paymentStatus}
                    </div>
                  </div>

                  {/* Product Section */}
                  <div className="flex gap-4 mb-5">
                    <div className="relative group/img">
                      <img
                        src={
                          order.product_image
                            ? order.product_image.startsWith("http")
                              ? order.product_image
                              : `http://localhost:${port}${order.product_image}`
                            : defaultImg
                        }
                        alt={order.productName}
                        className="w-32 h-32 rounded-xl border-3 border-[#E78B48] object-cover shadow-md group-hover/img:shadow-xl transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102E50]/20 to-transparent rounded-xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <p className="text-sm text-[#102E50]/70 leading-relaxed line-clamp-3 font-medium">
                        {order.serviceDetails}
                      </p>
                      
                      {/* Price Display */}
                      <div className="flex items-baseline gap-2 bg-gradient-to-r from-[#FFF6E9] to-transparent p-3 rounded-lg border-l-4 border-[#F5C45E]">
                        <DollarSign className="h-6 w-6 text-[#F5C45E]" />
                        <span className="text-3xl font-black text-[#102E50]">
                          {(order.totalAmount * order.quantity).toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-[#102E50]/60 self-end mb-1">
                          USD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  {order.response_from_provider && (
                    <div className="mb-3 bg-gradient-to-r from-[#FFF6E9] via-[#FFF6E9]/80 to-transparent p-2.5 rounded-lg border-l-4 border-[#E78B48] shadow-sm">
                      <p className="text-xs font-extrabold text-[#E78B48] mb-1 uppercase tracking-wider">
                        Provider Response
                      </p>
                      <p className="text-sm text-[#102E50] italic leading-relaxed line-clamp-2 font-medium">
                        {order.response_from_provider}
                      </p>
                    </div>
                  )}
                  {order.customNotes && (
                    <div className="mb-3 bg-gradient-to-r from-[#FFF6E9] via-[#FFF6E9]/80 to-transparent p-2.5 rounded-lg border-l-4 border-[#E78B48] shadow-sm">
                      <p className="text-xs font-extrabold text-[#E78B48] mb-1 uppercase tracking-wider">
                        Customer Note
                      </p>
                      <p className="text-sm text-[#102E50] italic leading-relaxed line-clamp-2 font-medium">
                        {order.customNotes}
                      </p>
                    </div>
                  )}

                  {/* Dates Section */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gradient-to-br from-[#FFF6E9]/50 to-transparent rounded-xl">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#E78B48]" />
                        <span className="text-xs font-bold text-[#102E50]/60 uppercase tracking-wider">
                          Ordered
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#102E50] pl-6">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-[#102E50]" />
                        <span className="text-xs font-bold text-[#102E50]/60 uppercase tracking-wider">
                          Delivery
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#102E50] pl-6">
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t-2 border-[#F5C45E]/30">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${order.provider_user_id}`);
                      }}
                      className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#102E50] to-[#102E50]/90 hover:from-[#E78B48] hover:to-[#E78B48]/90 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                    >
                      View Provider
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 text-[#102E50] hover:text-white bg-[#FFF6E9] hover:bg-[#E78B48] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Feedback Section */}
                  {order.status === "completed" &&
                  order.viewFedbackPost &&
                  !order.add_customer_review && (
                    <div className="mt-4">
                      <FeedbackCard
                        orderInfo={order}
                        onSubmit={() => {
                          setOrders((prev) =>
                            prev.map((o) =>
                              o.id === order.id
                                ? {
                                    ...o,
                                    viewFedbackPost: false,
                                  }
                                : o
                            )
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersManagementCustomer;