"use client"

import axios from "axios"
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
} from "lucide-react"

import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ChatBox from "../../component/Ai/chatBox"
import FeedbackCard from "../../component/ratingAndFeedback"
import useSummary from "../../hooks/useAnaliasisOrder"
import useLastDate from "../../hooks/useLastDate"
import useSupport from "../../hooks/useSupport"
import OrdersSummary from "./aiComponent"

const statusClasses = {
  pending: "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48]",
  "In Progress": "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48] shadow-md animate-pulse-subtle",
  "Ready for Delivery": "text-[#F5C45E] bg-[#102E50] border-2 border-[#F5C45E]",
  completed: "text-[#F5C45E] bg-[#102E50] border-2 border-[#F5C45E] shadow-lg",
  awaiting_approval: "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48]",
  on_progress: "text-[#E78B48] bg-[#FFF6E9] border-2 border-[#E78B48] shadow-md animate-pulse-subtle",
  rejected: "text-[#BE3D2A] bg-[#FFF6E9] border-2 border-[#BE3D2A]",
}

const statusDotClasses = {
  pending: "bg-[#E78B48]",
  "In Progress": "bg-[#E78B48] animate-pulse",
  "Ready for Delivery": "bg-[#F5C45E]",
  completed: "bg-[#F5C45E]",
  awaiting_approval: "bg-[#E78B48]",
  on_progress: "bg-[#E78B48] animate-pulse",
  rejected: "bg-[#BE3D2A]",
}

const paymentStatusClasses = {
  Paid: "text-[#102E50] bg-[#F5C45E] font-semibold",
  "Partially Paid": "text-[#E78B48] bg-[#FFF6E9] border border-[#E78B48]",
  Unpaid: "text-[#BE3D2A] bg-[#FFF6E9] border border-[#BE3D2A]",
}

function OrdersManagementCustomer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [sortOrder, setSortOrder] = useState("newest")
  const { messages, sendMessage } = useSummary()
  const { messagesSuport, sendMessageSupport } = useSupport()
  const { messagesss, sendMessagess, report, formatDateLocal } = useLastDate()
  const [buttonAi, setButtonAi] = useState(false)

  console.log("77777777777777777777777")

  console.log(report)
  console.log("77777777777777777777777")

  const assistantMessages = messages.filter((msg) => msg.role === "assistant")
  const assistantMessagesSupport = messagesSuport.filter((msg) => msg.role === "assistant")

  const { user } = useSelector((state) => state.UserInfo)
  const userId = user?.user_id
  const port = import.meta.env.VITE_PORT
  const navigate = useNavigate()
  console.log("ssssssssssss")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/getAllOrderInCustomer/${userId}`)
        console.log(response.data)
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
          orderDate: order.created_at ? new Date(order.created_at).toISOString().split("T")[0] : "",
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
          datedelivery: order.datedelivery ? new Date(order.created_at).toISOString().split("T")[0] : "",
        }))
        sendMessage(mappedOrders)
        setOrders(mappedOrders)
        sendMessageSupport()
        sendMessagess(mappedOrders)
        console.log("saaaaaaaaaa" + orders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [userId])

  const filteredOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        String(order.order_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceDetails.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "All" || order.status === statusFilter
      const matchesCategory = categoryFilter === "All" || order.category === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.orderDate)
      const dateB = new Date(b.orderDate)
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return sorted
  }, [orders, searchTerm, statusFilter, categoryFilter, sortOrder])
  const categories = [...new Set(orders.map((order) => order.category))]
  const statuses = [...new Set(orders.map((order) => order.status))]
  const [isOpen, setIsOpen] = useState(false)

  const [input, setInput] = useState("")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`http://localhost:${port}/ai2`, {
        input: orders,
      })

      setReply(res.data.result)
      console.log(res.data.result)
    } catch (error) {
      console.error("Error:", error)
      setReply("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  function summarizeOrdersByStatus(orders) {
    const summary = {}
    console.log(orders)
    orders.forEach((order) => {
      const status = order.status
      const priceString = order.totalAmount
      const price = Number.parseFloat(priceString) || 0
      const totalPrice = price * (order.quantity || 1)
      if (!summary[status]) {
        summary[status] = { count: 0, totalPrice: 0 }
      }

      summary[status].count += 1
      summary[status].totalPrice += totalPrice
    })
    return summary
  }

  const summary = summarizeOrdersByStatus(orders)
  console.log(summary)
  const data = Object.entries(summary).map(([status, values]) => ({
    name: status,
    value: values.totalPrice,
  }))
  const data2 = Object.entries(summary).map(([status, values]) => ({
    name: status,
    value: values.count,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"]

  return (
    <div className="flex h-screen bg-[#FFF6E9]">
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#102E50] text-white shadow-lg flex items-center justify-center transition-transform duration-300 hover:bg-[#F5C45E] hover:text-[#102E50] ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MessageCircle size={24} />
      </button>

      <ChatBox isOpen={isOpen} setIsOpen={setIsOpen} />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#102E50] border-b-4 border-[#F5C45E] px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#FFF6E9] hover:text-[#E78B48]">
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-[#FFF6E9]">Orders Management</h2>
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

        <div className="bg-white border-b-2 border-[#E78B48] px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-[#E78B48]" />
              <span className="text-sm font-medium text-[#102E50]">Filters:</span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1 bg-[#FFF6E9] border-2 border-[#102E50] text-[#102E50] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-[#F5C45E]"
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
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="grid gap-4">
            <button
              onClick={() => {
                setButtonAi(!buttonAi)
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F5C45E] text-[#102E50] font-semibold rounded-lg shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E78B48] focus:ring-offset-2 hover:bg-[#E78B48]"
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
            {filteredOrders.map((order) => (
              <div
                key={order.id}
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
                          : `../src/assets/cupcakes-1283247__340.jpg`
                        order.product_image
                          ? order.product_image.startsWith("http")
                            ? order.product_image
                            : `http://localhost:${port}${order.product_image}`
                          : `../src/assets/cupcakes-1283247__340.jpg`
                      }
                      alt={order.productName}
                      className="w-full sm:w-48 h-48 object-cover rounded-lg border-2 border-[#E78B48]"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-lg font-montserrat font-semibold text-[#102E50]">{order.id}</h3>
                        <div
                          className={
                            "flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border " +
                            statusClasses[order.status]
                          }
                        >
                          {order.status === "completed" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : order.status === "In Progress" || order.status === "on_progress" ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <div className={"w-2 h-2 rounded-full " + statusDotClasses[order.status]} />
                          )}
                          <span>{order.status}</span>
                        </div>
                        <div
                          className={
                            "px-2 py-1 rounded-full text-xs font-medium " + paymentStatusClasses[order.paymentStatus]
                          }
                        >
                          {order.paymentStatus}
                        </div>
                      </div>

                      <h4 className="text-base font-semibold text-[#102E50] mb-2">{order.productName}</h4>
                      <p className="text-sm text-[#102E50]/70 mb-3 line-clamp-2">{order.serviceDetails}</p>
                      {order.response_from_provider && (
                        <p className="text-sm text-[#E78B48] mb-4 italic bg-[#FFF6E9] p-2 rounded border-l-4 border-[#E78B48]">
                          Provider Response: {order.response_from_provider}
                        </p>
                      )}
                      {order.customNotes && (
                        <p className="text-sm text-[#E78B48] mb-4 italic bg-[#FFF6E9] p-2 rounded border-l-4 border-[#E78B48]">
                          Customer Note: {order.customNotes}
                        </p>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 text-sm mt-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-[#F5C45E]" />
                          <span className="text-[#102E50] font-bold">
                            ${(order.totalAmount * order.quantity).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-[#E78B48]" />
                          <span className="text-[#102E50]/70">{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-[#102E50]" />
                          <span className="text-[#102E50]/70">
                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs px-3 py-1 text-[#F5C45E] rounded-full font-semibold">
                            {order.category}
                          </span>
                        </div>
                      </div>
                      {order.status === "completed" && order.viewFedbackPost && !order.add_customer_review ? (
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
                                  : o,
                              ),
                            )
                          }}
                        ></FeedbackCard>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-col items-center">
                    <img
                      src={
                        order.provider_profile_image
                          ? `http://localhost:${port}${order.provider_profile_image}`
                          : `https://ui-avatars.com/api/?name=${order.provider_firstname}+${order.provider_lastname}&background=random&color=fff`
                      }
                      onClick={() => {
                        navigate(`/profile/${order.provider_user_id}`)
                      }}
                      alt={`${order.provider_firstname} ${order.provider_lastname}`}
                      className="w-10 h-10 rounded-full border-2 border-[#E78B48] object-cover hover:border-[#F5C45E] transition-colors cursor-pointer"
                    />
                    <span className="text-sm font-medium text-[#102E50] mt-2 text-center">
                      {order.provider_firstname} {order.provider_lastname}
                    </span>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => {
                          navigate(`/profile/${order.provider_user_id}`)
                        }}
                        className="px-3 py-1 text-[#FFF6E9] bg-[#102E50] hover:bg-[#E78B48] rounded-lg transition-colors"
                      >
                        View Provider
                      </button>
                      <button className="p-2 text-[#102E50] hover:text-[#E78B48] hover:bg-[#FFF6E9] rounded-lg transition-colors">
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
  )
}

export default OrdersManagementCustomer
