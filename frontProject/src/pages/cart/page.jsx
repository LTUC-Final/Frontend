"use client";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementCartItem, setCartItem } from "../../redux/userInfo/userInfo";

function Button({ children, onClick, className = "", variant, size }) {
  let base =
    "inline-flex items-center justify-center px-4 py-ش2 rounded-xl font-semibold tracking-wide focus:outline-none transition duration-200 ease-in-out shadow-sm md:hover:shadow-lg active:scale-[.98] ";
  if (variant === "outline")
    base += "border border-[#102E50] text-[#102E50] md:hover:bg-[#FFF6E9] ";
  else if (variant === "secondary")
    base += "bg-[#F5C45E] text-[#102E50] md:hover:bg-[#E78B48] ";
  else if (variant === "destructive")
    base += "bg-[#BE3D2A] text-white md:hover:bg-[#9F3323] ";
  else base += "bg-[#102E50] text-white md:hover:bg-[#0C2340] ";

  if (size === "sm") base += "text-sm px-3 py-1.5 ";
  else if (size === "lg") base += "text-lg px-6 py-3 ";

  return (
    <button className={base + className} onClick={onClick}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white rounded-2xl shadow-lg ring-1 ring-[#F5C45E]/30 md:hover:ring-[#F5C45E]/50 md:hover:shadow-xl transition-all " +
        className
      }
    >
      {children}
    </div>
  );
}
function CardHeader({ children, className = "" }) {
  return (
    <div
      className={
        "px-4 sm:px-6 py-3 sm:py-4 border-b border-[#F5C45E]/40 bg-gradient-to-r from-[#FFF6E9] to-[#FFF6E9]/70 " +
        className
      }
    >
      {children}
    </div>
  );
}
function CardTitle({ children, className = "" }) {
  return (
    <h2
      className={
        "font-extrabold text-lg sm:text-xl text-[#102E50] tracking-tight " +
        className
      }
    >
      {children}
    </h2>
  );
}
function CardContent({ children, className = "" }) {
  return <div className={"p-4 sm:p-6 " + className}>{children}</div>;
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={
        "w-full min-h-[100px] rounded-xl border border-[#102E50]/50 bg-[#FFF6E9] px-3 py-2 text-[#102E50] placeholder-[#102E50]/50 focus:outline-none focus:ring-4 focus:ring-[#F5C45E]/40 transition " +
        className
      }
      {...props}
    />
  );
}

export default function CartPage() {
  const CusData = useSelector((state) => state.UserInfo);
  const [cart, setCart] = useState([]);
  const [hideCounterQuntity, setHideCounterQuntity] = useState(false);

  const [responseProviders, setResponseProviders] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const port = import.meta.env.VITE_PORT;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
        );
        setCart(res.data.cards);
        console.log("sssssssssssssssssssss");
        dispatch(
          setCartItem({
            cartItem: Number(res.data.length),
          })
        );
        console.log(
          res.data,
          "Ssssssssssسسسسسسسسسسسسسسsppppppppppssssssssssss"
        );
        console.log("sssssssssssssssssssss");

        console.log("sssssssssssssssssssss");

        console.log(cart, "ppppppppppppppppppppppppp");
        console.log("sssssssssssssssssssss");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const { user } = useSelector((state) => state.UserInfo);

  useEffect(() => {
    document.body.style.overflow = showCheckout ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCheckout]);

  const updateQuantity = (cart_id, change) => {
    setCart(
      cart.map((p) =>
        p.cart_id === cart_id
          ? { ...p, quantity: Math.max(1, p.quantity + change) }
          : p
      )
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
      setCart((prev) =>
        prev.map((item) =>
          item.cart_id === cart_id
            ? {
                ...item,
                custom_requirement,
                provider_response: null,
                quantityLocked: true,

                // sendedtoprovider: true,
              }
            : item
        )
      );
      await axios.put(`http://localhost:${port}/updateTheCustomReqAndToOrder`, {
        cart_id,
        custom_requirement,
        Prodact_id: product_id,
        provider_id,
        quntity: quantity,
        price: cart_price,
        user_id,
      });
      setCart((prev) =>
        prev.map((item) =>
          item.cart_id === cart_id ? { ...item, sendedtoprovider: true } : item
        )
      );
      setResponseProviders((prev) => ({
        ...prev,
        [cart_id]: { ...prev[cart_id], sent: true },
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleApprove = async (cart_id, customer_id) => {
    alert("Approved!");
    try {
      await axios.put(
        `http://localhost:${port}/changeStatusPayOfProdactAfterApprove`,
        { cart_id, user_id: customer_id }
      );
      setCart((prevCart) =>
        prevCart.map((p) =>
          p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (cart_id, customer_id) => {
    alert("Rejected!");
    try {
      await axios.put(
        `http://localhost:${port}/changeStatusPayOfProdactAfterRejected/${cart_id}`,
        { cart_id, user_id: customer_id }
      );
      setCart((prevCart) => prevCart.filter((p) => p.cart_id !== cart_id));
      dispatch(decrementCartItem({ number: 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemCart = async (cart_id) => {
    const port = import.meta.env.VITE_PORT;
    try {
      await axios.delete(`http://localhost:${port}/deleteCard/${cart_id}`);

      setCart((prevCart) =>
        prevCart.filter((item) => item.cart_id !== cart_id)
      );
      dispatch(decrementCartItem({ number: 1 }));
    } catch (error) {
      console.error(error);
    }
  };

  // const subtotal = cart.reduce((sum, p) => sum + p.cart_price * p.quantity, 0);
  const subtotal = (Array.isArray(cart) ? cart : []).reduce((sum, p) => {
    if (p.provider_response) {
      return sum + Number(p.cart_price);
    } else {
      return sum + Number(p.cart_price) * Number(p.quantity);
    }
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  console.log("Cart value:", cart);
  const handleCheckout = () => setShowCheckout(true);

  const completePayment = async () => {
    alert("Payment completed successfully!");
    setShowCheckout(false);
    try {
      const ress = await axios.post(
        `http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`
      );
      const res = await axios.get(
        `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
      );
      dispatch(decrementCartItem({ number: ress.data.length }));
      console.log("ress.data.length");
      console.log(ress.data.length);
      console.log("ess.data.length");

      setCart(res.data.cards);
    } catch (error) {
      console.log(error);
    }
  };

  const completePayment2 = async () => {
    const stripe = await loadStripe(
      "pk_test_51SLmeU7XNof7c0LK21QyvjJxb28OZnQ9uOo3leNgWR3PHE7agxDJforXF2no1WQrRg29jAP4K4iMoodJPTL7ClpT00Gbwg0TCH"
    );
    // const body = { products: cart };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `http://localhost:${port}/api/payments/create-checkout-session`,
      {
        products: cart,
        email: user.email,
        customer_id: user.user_id,
      }
    );
    const session = response.data;
    const resulte = await stripe.redirectToCheckout({ sessionId: session.id });
    if (resulte.error) {
      console.log(resulte.error);
    }

    // try {
    //   const ress = await axios.post(
    //     `http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`
    //   );
    //   const res = await axios.get(
    //     `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
    //   );
    //   dispatch(decrementCartItem({ number: ress.data.length }));
    //   console.log("ress.data.length");
    //   console.log(ress.data.length);
    //   console.log("ess.data.length");

    //   setCart(res.data.cards);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const completePayment3 = async () => {
    const stripe = await loadStripe(
      "pk_test_51SLmeU7XNof7c0LK21QyvjJxb28OZnQ9uOo3leNgWR3PHE7agxDJforXF2no1WQrRg29jAP4K4iMoodJPTL7ClpT00Gbwg0TCH"
    );

    try {
      const response = await axios.post(
        `http://localhost:${port}/api/payments/create-multi-provider-sessions`,
        {
          products: cart,
          email: user.email,
          customer_id: user.user_id,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const sessions = response.data.sessions;

      if (!sessions.length) {
        alert("No Stripe sessions were created.");
        return;
      }

      for (const s of sessions) {
        console.log(` Provider ${s.provider_id} checkout: ${s.url}`);
        window.open(s.url, "_blank");
      }
    } catch (error) {
      console.error("Error creating Stripe sessions:", error);
      alert("Failed to start payment process");
    }
  };
  const completePayment4 = async () => {
    const stripe = await loadStripe(
      "pk_test_51SLmeU7XNof7c0LK21QyvjJxb28OZnQ9uOo3leNgWR3PHE7agxDJforXF2no1WQrRg29jAP4K4iMoodJPTL7ClpT00Gbwg0TCH"
    );

    try {
      const response = await axios.post(
        `http://localhost:${port}/api/payments/create-multi-provider-sessions`,
        {
          products: cart,
          email: user.email,
          customer_id: user.user_id,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const sessions = response.data.sessions;

      if (!sessions?.length) {
        alert("No Stripe sessions were created.");
        return;
      }

      const openedTabs = sessions.map(() => window.open("", "_blank"));

      sessions.forEach((s, idx) => {
        if (openedTabs[idx]) {
          openedTabs[idx].location.href = s.url;
        }
      });

      console.log(` Opened ${sessions.length} Stripe checkout pages`);
    } catch (error) {
      console.error("Error creating Stripe sessions:", error);
      alert("Failed to start payment process");
    }
  };
  const completePaymentMultiProvider = async () => {
    const stripe = await loadStripe(
      "pk_test_51SLmeU7XNof7c0LK21QyvjJxb28OZnQ9uOo3leNgWR3PHE7agxDJforXF2no1WQrRg29jAP4K4iMoodJPTL7ClpT00Gbwg0TCH"
    );

    try {
      const fakeTabs = [];
      const expectedProviders = [...new Set(cart.map((p) => p.provider_id))];
      expectedProviders.forEach(() => {
        const newTab = window.open("", "_blank");
        fakeTabs.push(newTab);
      });

      const response = await axios.post(
        `http://localhost:${port}/api/payments/create-multi-provider-sessions`,
        {
          products: cart,
          email: user.email,
          customer_id: user.user_id,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const sessions = response.data.sessions;
      if (!sessions?.length) {
        alert("No Stripe sessions were created.");
        fakeTabs.forEach((t) => t.close());
        return;
      }

      // ⚡️ 3. نربط كل Tab بالـURL الصحيح
      sessions.forEach((s, idx) => {
        if (fakeTabs[idx]) {
          fakeTabs[idx].location.href = s.url;
        }
      });

      console.log(`✅ Opened ${sessions.length} Stripe checkout pages`);
    } catch (error) {
      console.error("Error creating Stripe sessions:", error);
      alert("Failed to start payment process");
    }
  };
  // const completePaymentAll = async () => {
  //   const stripe = await loadStripe("pk_test_...");
  //   try {
  //     const { data } = await axios.post(
  //       `http://localhost:${port}/api/payments/create-checkout-session-all`,
  //       {
  //         products: cart,
  //         email: user.email,
  //         customer_id: user.user_id,
  //       },
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     await stripe.redirectToCheckout({ sessionId: data.id });
  //   } catch (error) {
  //     console.error("Error creating Stripe session:", error);
  //     alert("Failed to start payment process");
  //   }
  // };
  const completePaymentAll = async () => {
    const stripe = await loadStripe(
      "pk_test_51SLmeU7XNof7c0LK21QyvjJxb28OZnQ9uOo3leNgWR3PHE7agxDJforXF2no1WQrRg29jAP4K4iMoodJPTL7ClpT00Gbwg0TCH"
    );
    try {
      const { data } = await axios.post(
        `http://localhost:${port}/api/payments/create-checkout-session-all`,
        {
          products: cart,
          email: user.email,
          customer_id: user.user_id,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to start payment process");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(245,196,94,.18),transparent_55%),radial-gradient(900px_700px_at_100%_0%,rgba(231,139,72,.14),transparent_45%)] from-[#FFF6E9] to-[#FFF6E9] bg-[#FFF6E9] pt-20 md:pt-24 px-3 sm:px-4 md:px-6 py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 md:mb-10 flex items-center gap-3 text-[#102E50] tracking-tight">
          <span className="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F5C45E]/30 ring-2 ring-[#F5C45E]/60">
            <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-[#E78B48]" />
          </span>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-5 sm:space-y-8">
            {Array.isArray(cart) &&
              cart.map((product) => (
                <Card key={product.cart_id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                      <div className="md:flex-shrink-0">
                        <div className="relative">
                          <div className="w-full md:w-48">
                            <div className="w-full aspect-[1/1]">
                              <img
                                src={
                                  product.product_image
                                    ? product.product_image
                                    : `../src/assets/NoImage.png`
                                }
                                alt={product.product_name}
                                className="w-full h-full object-cover rounded-2xl border-2 border-[#F5C45E] shadow-md"
                              />
                            </div>
                          </div>
                          <span className="absolute -top-3 -left-3 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#102E50] text-white shadow">
                            Item
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4 sm:space-y-5 relative">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg sm:text-2xl font-extrabold text-[#102E50] leading-tight line-clamp-2">
                            {product.product_name}
                          </h3>
                          <p className="inline-flex w-fit items-center gap-2 text-2xl sm:text-3xl font-black text-[#E78B48]">
                            <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
                            ${product.cart_price}
                          </p>

                          {product.provider_response &&
                          product.status_pay === "Approve" ? (
                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
                              <span className="text-sm font-semibold">
                                Provider Message:
                              </span>
                              <div className="mt-1 text-sm sm:text-[15px] font-medium">
                                {product.provider_response}
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
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
                          <span className="text-sm text-[#102E50]">
                            Quantity:
                          </span>
                          {product.provider_response ||
                          product.status_pay !== "Approve" ||
                          product.sendedtoprovider ||
                          product.quantityLocked ? (
                            <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">
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
                              <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">
                                {product.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(product.cart_id, 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {product.provider_response &&
                        product.status_pay !== "Approve" ? (
                          <div className="space-y-3 sm:space-y-4">
                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
                              <span className="text-sm font-semibold">
                                Provider Message:
                              </span>
                              <div className="mt-1 text-sm sm:text-[15px] font-medium">
                                {product.provider_response}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                              <Button
                                onClick={() =>
                                  handleApprove(
                                    product.cart_id,
                                    product.customer_id
                                  )
                                }
                                className="bg-[#F5C45E] md:hover:bg-[#E78B48] text-[#102E50]"
                              >
                                APPROVE
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() =>
                                  handleReject(
                                    product.cart_id,
                                    product.customer_id
                                  )
                                }
                              >
                                REJECT
                              </Button>
                            </div>
                          </div>
                        ) : product.custom_requirement &&
                          product.provider_response === null ? (
                          <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
                            <span className="h-2 w-2 rounded-full bg-[#E78B48]"></span>
                            Waiting provider response
                          </p>
                        ) : product.custom_requirement &&
                          product.provider_response ? (
                          <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
                            <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
                            Request Sent Successfully
                          </p>
                        ) : (
                          <Button
                            variant="secondary"
                            onClick={() =>
                              toggleResponseProvider(product.cart_id)
                            }
                          >
                            CUSTOM REQURMENT{" "}
                          </Button>
                        )}

                        {responseProviders[product.cart_id]?.isVisible && (
                          <div className="space-y-3">
                            {!product.sendedtoprovider ? (
                              <>
                                <Textarea
                                  placeholder="Enter your response..."
                                  value={
                                    responseProviders[product.cart_id]
                                      ?.content || ""
                                  }
                                  onChange={(e) =>
                                    updateResponseContent(
                                      product.cart_id,
                                      e.target.value
                                    )
                                  }
                                />
                                {responseProviders[product.cart_id]
                                  ?.content && (
                                  <div className="flex gap-3">
                                    <Button
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
                            ) : product.custom_requirement &&
                              product.provider_response ? (
                              <></>
                            ) : (
                              <></>
                            )}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-5 text-[#102E50]">
                <div className="space-y-2">
                  {cart.map((product) => (
                    <div
                      key={product.cart_id}
                      className="flex justify-between text-xs sm:text-sm px-2 py-1.5 rounded-lg bg-[#FFF6E9] border border-[#F5C45E]/40"
                    >
                      <span className="font-medium line-clamp-1">
                        {product.product_name} × {product.quantity}
                      </span>
                      <span className="font-semibold text-[#E78B48]">
                        {product.provider_response
                          ? product.cart_price
                          : (product.cart_price * product.quantity).toFixed(2)}
                        {/* ${(product.cart_price * product.quantity).toFixed(2)} */}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#F5C45E]/50 pt-3 space-y-2">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal}</span>
                  </div>
                </div>
                <div className="border-t border-[#F5C45E]/50 pt-3">
                  <div className="flex justify-between text-lg sm:text-xl font-extrabold">
                    <span>Total</span>
                    <span className="text-[#E78B48]">${subtotal}</span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full mt-3 sm:mt-4"
                >
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showCheckout && (
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 sm:space-y-6 text-[#102E50]">
                <div className="text-center">
                  <p className="text-base sm:text-lg font-semibold">
                    Total Amount
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#E78B48]">
                    ${subtotal}
                  </p>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-semibold">Payment Information:</p>
                  <ul className="list-disc list-inside space-y-1 text-[#102E50]/80">
                    <li>Secure payment processing</li>
                    <li>Multiple payment methods accepted</li>
                    <li>30-day return policy</li>
                    <li>Free shipping on orders over $100</li>
                  </ul>
                </div>
                <div className="flex gap-3 pt-1 sm:pt-2">
                  <Button
                    onClick={
                      // completePayment
                      // completePayment2
                      // completePayment3
                      // completePayment4
                      // completePaymentMultiProvider
                      completePaymentAll
                    }
                    className="flex-1"
                  >
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