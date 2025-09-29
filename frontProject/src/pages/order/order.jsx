import axios from "axios";
import {
  Bell,
  Calendar,
  DollarSign,
  Filter,
  Menu,
  MessageCircle,
  Search,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatBox from "../../component/Ai/chatBox";
import FeedbackCard from "../../component/ratingAndFeedback";

const statusClasses = {
  pending: "text-yellow-600 bg-yellow-50 border border-yellow-200",
  "In Progress": "text-blue-600 bg-blue-50 border border-blue-200",
  "Ready for Delivery": "text-purple-600 bg-purple-50 border border-purple-200",
  completed: "text-green-600 bg-green-50 border border-green-200",
  awaiting_approval: "text-orange-600 bg-orange-50 border border-orange-200",
  on_progress: "text-indigo-600 bg-indigo-50 border border-indigo-200",
  rejected: "text-red-600 bg-red-50 border border-red-200",
};

const statusDotClasses = {
  pending: "bg-yellow-500",
  "In Progress": "bg-blue-500",
  "Ready for Delivery": "bg-purple-500",
  completed: "bg-green-500",
  awaiting_approval: "bg-orange-500",
  on_progress: "bg-indigo-500",
  rejected: "bg-red-500",
};

const paymentStatusClasses = {
  Paid: "text-green-600 bg-green-50",
  "Partially Paid": "text-yellow-600 bg-yellow-50",
  Unpaid: "text-red-600 bg-red-50",
};

function OrdersManagementCustomer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

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
        console.log(response.data[0]);
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
          datedelivery: order.datedelivery
            ? new Date(order.created_at).toISOString().split("T")[0]
            : "",
        }));

        setOrders(mappedOrders);
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

  return (
    <div className="flex h-screen bg-background">
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center transition-transform duration-300 ${
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
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-foreground hover:text-primary"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-montserrat font-bold text-foreground">
                Orders Management
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Filters:
              </span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
              className="px-3 py-1 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
              className="px-3 py-1 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        order.productImage ||
                        "../src/assets/cupcakes-1283247__340.jpg"
                      }
                      alt={order.productName}
                      className="m-8 w-20 h-20 rounded-lg object-cover border border-border"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-montserrat font-semibold text-card-foreground">
                        {order.id}
                      </h3>
                      <div
                        className={
                          "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border " +
                          statusClasses[order.status]
                        }
                      >
                        <div
                          className={
                            "w-2 h-2 rounded-full " +
                            statusDotClasses[order.status]
                          }
                        />
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

                    <h4 className="text-base font-semibold text-card-foreground mb-2">
                      {order.productName}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {order.serviceDetails}
                    </p>
                    {order.response_from_provider && (
                      <p className="text-sm text-muted-foreground mb-4 italic">
                        Provider Response: {order.response_from_provider}
                      </p>
                    )}
                    {order.customNotes && (
                      <p className="text-sm text-muted-foreground mb-4 italic">
                        Customer Note: {order.customNotes}
                      </p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-card-foreground font-medium">
                          $
                          {(
                            order.totalAmount * order.quantity
                          ).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(
                            order.estimatedDelivery
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                          {order.category}
                        </span>
                      </div>
                    </div>
                    {order.status === "completed" &&
                    order.viewFedbackPost &&
                    !order.add_customer_review ? (
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
                      ></FeedbackCard>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <img
                      src={
                        order.provider_profile_image
                          ? `http://localhost:${port}${order.provider_profile_image}`
                          : `https://ui-avatars.com/api/?name=${order.provider_firstname}+${order.provider_lastname}&background=random&color=fff`
                      }
                      onClick={() => {
                        navigate(`/profile/${order.provider_user_id}`);
                      }}
                      alt={`${order.provider_firstname} ${order.provider_lastname}`}
                      className="w-25 h-25 rounded-full border border-border object-cover"
                    />
                    <span className="text-sm font-medium text-card-foreground mt-1">
                      {order.provider_firstname} {order.provider_lastname}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => {
                        navigate(`/profile/${order.provider_user_id}`);
                      }}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                    >
                      View Provider
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

export default OrdersManagementCustomer;
