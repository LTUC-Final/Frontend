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
import FeedbackCard from "../../component/ratingAndFeedback";

// Sample data
const sampleOrders = [
  {
    id: "ORD-2024-001",
    status: "Pending",
    productName: "Premium Web Design Package",
    serviceDetails:
      "Custom website with 5 pages, responsive design, SEO optimization",
    customNotes: "Please include contact form and blog section",
    basePrice: 1200,
    additionalServices: 300,
    totalAmount: 1500,
    estimatedDelivery: "2024-01-15",
    orderDate: "2024-01-01",
    paymentStatus: "Paid",
    category: "Web Design",
  },
  {
    id: "ORD-2024-002",
    status: "In Progress",
    productName: "Mobile App Development",
    serviceDetails:
      "iOS and Android app with user authentication and payment integration",
    customNotes: "Focus on user-friendly interface",
    basePrice: 3500,
    additionalServices: 500,
    totalAmount: 4000,
    estimatedDelivery: "2024-02-20",
    orderDate: "2024-01-05",
    paymentStatus: "Partially Paid",
    category: "Development",
  },
  // باقي البيانات
];

const statusClasses = {
  pending: "text-yellow-600 bg-yellow-50 border border-yellow-200",
  "In Progress": "text-blue-600 bg-blue-50 border border-blue-200",
  "Ready for Delivery": "text-purple-600 bg-purple-50 border border-purple-200",
  completed: "text-green-600 bg-green-50 border border-green-200",
  awaiting_approval: "text-orange-600 bg-orange-50 border border-orange-200", // new
  on_progress: "text-indigo-600 bg-indigo-50 border border-indigo-200", // new
};

const statusDotClasses = {
  pending: "bg-yellow-500",
  "In Progress": "bg-blue-500",
  "Ready for Delivery": "bg-purple-500",
  completed: "bg-green-500",
  awaiting_approval: "bg-orange-500", // new
  on_progress: "bg-indigo-500", // new
};

const paymentStatusClasses = {
  Paid: "text-green-600 bg-green-50",
  "Partially Paid": "text-yellow-600 bg-yellow-50",
  Unpaid: "text-red-600 bg-red-50",
};

function OrdersManagementProvider() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.UserInfo);
  const userId = user?.user_id;
  const port = import.meta.env.VITE_PORT;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${port}/getAllOrderInCustomer/${userId}`
        );
        console.log("jjjjjjjjjjjjjjjj" + response.data[0]);
        const mappedOrders = response.data.map((order) => ({
          order_id: order.order_id,
          status: order.status,
          productName: order.product_name,
          serviceDetails: order.product_description,
          customNotes: order.response_from_provider || "",
          basePrice: order.base_price || 0,
          additionalServices: order.additional_services || 0,
          totalAmount: order.original_price || 0,
          estimatedDelivery: order.estimated_delivery,
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
    return orders.filter((order) => {
      const matchesSearch =
        String(order.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceDetails.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || order.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [orders, searchTerm, statusFilter, categoryFilter]);

  const categories = [...new Set(orders.map((order) => order.category))];
  const statuses = [...new Set(orders.map((order) => order.status))];

  return (
    <div className="flex h-screen bg-background">
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
                    {order.customNotes && (
                      <p className="text-sm text-muted-foreground mb-4 italic">
                        Note: {order.customNotes}
                      </p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-card-foreground font-medium">
                          ${order.totalAmount.toLocaleString()}
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
                      <></>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => {
                        navigate(`/profile/${order.provider_id}`);
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

export default OrdersManagementProvider;
