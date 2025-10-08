"use client";

import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Button({ children, onClick, className = "", variant, size }) {
  let base = "px-4 py-2 rounded-md font-medium focus:outline-none transition ";
  if (variant === "outline")
    base += "border border-gray-400 text-gray-700 hover:bg-gray-100 ";
  else if (variant === "secondary") base += "bg-gray-200 hover:bg-gray-300 ";
  else if (variant === "destructive")
    base += "bg-red-600 text-white hover:bg-red-700 ";
  else base += "bg-blue-600 text-white hover:bg-blue-700 ";

  if (size === "sm") base += "text-sm ";
  else if (size === "lg") base += "text-lg ";

  return (
    <button className={base + className} onClick={onClick}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={"bg-white rounded-lg shadow-md " + className}>
      {children}
    </div>
  );
}
function CardHeader({ children, className = "" }) {
  return <div className={"border-b px-4 py-2 " + className}>{children}</div>;
}
function CardTitle({ children, className = "" }) {
  return <h2 className={"font-bold text-lg " + className}>{children}</h2>;
}
function CardContent({ children, className = "" }) {
  return <div className={"p-4 " + className}>{children}</div>;
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={
        "w-full min-h-[80px] border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 " +
        className
      }
      {...props}
    />
  );
}

export default function CartPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      image: "/wireless-headphones.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      image: "/smart-fitness-watch.png",
      quantity: 2,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 89.99,
      image: "/bluetooth-speaker.jpg",
      quantity: 1,
    },
  ]);
  const CusData = useSelector((state) => state.UserInfo);

  const [cart, setCart] = useState([]);
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    const feactData = async () => {
      console.log(CusData.user.user_id);
      try {
        let res = await axios.get(
          `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
        );
        setCart(res.data.cards);
        console.log("sssssssssssssssssssss");

        console.log(res.data, "Sssssssssssssssssssssss");
        console.log("sssssssssssssssssssss");
      } catch (error) {
        console.log(error);
      }
    };

    feactData();
  }, []);

  const [responseProviders, setResponseProviders] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (cart_id, change) => {
    setCart(
      cart
        .map((p) =>
          p.cart_id === cart_id
            ? { ...p, quantity: Math.max(0, p.quantity + change) }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const toggleResponseProvider = (cart_id) => {
    setResponseProviders((prev) => ({
      ...prev,
      [cart_id]: {
        isVisible: !prev[cart_id]?.isVisible,
        content: prev[cart_id]?.content || "",
        sent: false,
      },
    }));
  };

  const updateResponseContent = (cart_id, content) => {
    setResponseProviders((prev) => ({
      ...prev,
      [cart_id]: { ...prev[cart_id], content },
    }));
  };

  async function sendTheCustomerReqAndToOrder({
    cart_id,
    custom_requirement,
    product_id,
    provider_id,
    quantity,
    cart_price,
    user_id,
  }) {
    try {
      console.log(
        "cart_id " +
          cart_id +
          "   custom_requirement   " +
          custom_requirement +
          " Prodact_id " +
          product_id +
          "  provider_id " +
          provider_id +
          "  quntity " +
          quantity +
          "   price " +
          cart_price
      );
      let res = await axios.put(
        `http://localhost:${port}/updateTheCustomReqAndToOrder`,
        {
          cart_id,
          custom_requirement,
          Prodact_id: product_id,
          provider_id,
          quntity: quantity,
          price: cart_price,
          user_id,
        }
      );
      setCart((prev) =>
        prev.map((item) =>
          item.cart_id === cart_id ? { ...item, sendedtoprovider: true } : item
        )
      );
      setResponseProviders((prev) => ({
        ...prev,
        [cart_id]: { ...prev[cart_id], sent: true },
      }));

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    return;
  }
  const handleApprove = async (cart_id, customer_id) => {
    alert(
      `Approved response for ${
        cart.find((p) => p.cart_id === cart_id)?.product_name
      }`
    );

    try {
      let res = await axios.put(
        `http://localhost:${port}/changeStatusPayOfProdactAfterApprove`,
        { cart_id, user_id: customer_id }
      );
      setCart((prevCart) =>
        prevCart.map((p) =>
          p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p
        )
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (cart_id, customer_id) => {
    alert(
      `Rejected response for ${
        cart.find((p) => p.cart_id === cart_id)?.product_name
      }`
    );
    try {
      let res = await axios.put(
        `http://localhost:${port}/changeStatusPayOfProdactAfterRejected/${cart_id}`,
        { cart_id, user_id: customer_id }
      );
      setCart((prevCart) =>
        prevCart.map((p) =>
          p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p
        )
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setCart((prevCart) => prevCart.filter((p) => p.cart_id !== cart_id));
  };
  const deleteItemCart = async (cart_id) => {
    const port = import.meta.env.VITE_PORT;
    const port = import.meta.env.VITE_PORT;
    try {
      const res = await axios.delete(
        `http://localhost:${port}/deleteCard/${cart_id}`
      );

      console.log(res.data);

      setCart((prevCart) =>
        prevCart.filter((item) => item.cart_id !== cart_id)
      );
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const subtotal = cart.reduce((sum, p) => sum + p.cart_price * p.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
console.log('Cart value:', cart);
  const handleCheckout = () => setShowCheckout(true);
  const completePayment = async () => {
    alert("Payment completed successfully!");
    setShowCheckout(false);
    try {
      let res = await axios.post(
        `http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`
      );
      console.log(res.data);
      let res12 = await axios.get(
        `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
      );
      setCart(res12.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="h-8 w-8" />
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((product) => (
              <Card key={product.cart_id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        // src={product.product_image || "/placeholder.svg"}

                        src={
                          product.product_image
                            ? product.product_image.startsWith("http")
                              ? product.product_image
                              : `http://localhost:${port}${product.product_image}`
                            : `../src/assets/cupcakes-1283247__340.jpg`
                        }
                        // src={product.product_image || "/placeholder.svg"}

                        src={
                          product.product_image
                            ? product.product_image.startsWith("http")
                              ? product.product_image
                              : `http://localhost:${port}${product.product_image}`
                            : `../src/assets/cupcakes-1283247__340.jpg`
                        }
                        alt={product.product_name}
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 space-y-4 relative">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {product.product_name}
                        </h3>
                        <p className="text-2xl font-bold">
                          ${product.cart_price}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-0 right-0"
                        onClick={() => deleteItemCart(product.cart_id)}
                      >
                        Delete
                      </Button>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">Quantity:</span>
                        {product.provider_response ? (
                        {product.provider_response ? (
                          <span className="w-8 text-center font-medium">
                            {product.quantity}
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(product.cart_id, -1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {product.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(product.cart_id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}{" "}
                      </div>
                      {product.provider_response &&
                      product.status_pay !== "Approve" ? (
                        <div>
                          {" "}
                          <h3 className="text-x font-semibold">
                            Provider Message : {product.provider_response}
                          </h3>
                          <Button
                            variant="default"
                            onClick={() =>
                              handleApprove(
                                product.cart_id,
                                product.customer_id
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {" "}
                            APPROVE{" "}
                          </Button>{" "}
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleReject(product.cart_id, product.customer_id)
                            }
                          >
                            {" "}
                            REJECT{" "}
                          </Button>
                        </div>
                      ) : product.custom_requirement &&
                        product.provider_response === null ? (
                        <p className="text-green-600 font-medium">
                          Wating provider response
                        </p>
                      ) : (
                        <div>
                          {" "}
                          <Button
                            variant="secondary"
                            onClick={() =>
                              toggleResponseProvider(product.cart_id)
                            }
                          >
                            RESPONSE PROVIDER
                          </Button>
                        </div>
                      )}

                      {responseProviders[product.cart_id]?.isVisible && (
                        <div className="space-y-3">
                          {!product.sendedtoprovider ? (
                            <>
                              <Textarea
                                placeholder="Enter your response..."
                                value={
                                  responseProviders[product.cart_id]?.content ||
                                  ""
                                }
                                onChange={(e) =>
                                  updateResponseContent(
                                    product.cart_id,
                                    e.target.value
                                  )
                                }
                                className="min-h-[100px]"
                              />

                              {responseProviders[product.cart_id]?.content && (
                                <div className="flex gap-3">
                                  <Button
                                    variant="default"
                                    onClick={() =>
                                      sendTheCustomerReqAndToOrder({
                                        cart_id: product.cart_id,
                                        product_id: product.product_id,
                                        provider_id: product.provider_id,
                                        cart_price: product.cart_price,
                                        custom_requirement:
                                          responseProviders[product.cart_id]
                                            ?.content,
                                        quantity: product.quantity,
                                        user_id: product.customer_id,
                                      })
                                    }
                                  >
                                    Send To Provider
                                  </Button>
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-green-600 font-medium">
                              Request Sent Successfully
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((product) => (
                  <div
                    key={product.cart_id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {product.product_name} × {product.quantity}
                    </span>
                    <span>
                      ${(product.cart_price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <hr className="border" />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>

                <hr className="border" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${subtotal}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full mt-6"
                >
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-lg font-semibold">Total Amount</p>
                  <p className="text-3xl font-bold">${subtotal}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Payment Information:</strong>
                  </p>
                  <p>• Secure payment processing</p>
                  <p>• Multiple payment methods accepted</p>
                  <p>• 30-day return policy</p>
                  <p>• Free shipping on orders over $100</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={completePayment} className="flex-1">
                    Complete Payment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
