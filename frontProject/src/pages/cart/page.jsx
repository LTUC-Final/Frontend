"use client";

// import axios from "axios";
// import { Minus, Plus, ShoppingCart } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { decrementCartItem } from "../../redux/userInfo/userInfo";

// function Button({ children, onClick, className = "", variant, size }) {
//   let base =
//     "inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold tracking-wide focus:outline-none transition duration-200 ease-in-out shadow-sm md:hover:shadow-lg active:scale-[.98] ";
//   if (variant === "outline")
//     base += "border border-[#102E50] text-[#102E50] md:hover:bg-[#FFF6E9] ";
//   else if (variant === "secondary")
//     base += "bg-[#F5C45E] text-[#102E50] md:hover:bg-[#E78B48] ";
//   else if (variant === "destructive")
//     base += "bg-[#BE3D2A] text-white md:hover:bg-[#9F3323] ";
//   else base += "bg-[#102E50] text-white md:hover:bg-[#0C2340] ";

//   if (size === "sm") base += "text-sm px-3 py-1.5 ";
//   else if (size === "lg") base += "text-lg px-6 py-3 ";

//   return (
//     <button className={base + className} onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// function Card({ children, className = "" }) {
//   return (
//     <div
//       className={
//         "bg-white rounded-2xl shadow-lg ring-1 ring-[#F5C45E]/30 md:hover:ring-[#F5C45E]/50 md:hover:shadow-xl transition-all " +
//         className
//       }
//     >
//       {children}
//     </div>
//   );
// }
// function CardHeader({ children, className = "" }) {
//   return (
//     <div
//       className={
//         "px-4 sm:px-6 py-3 sm:py-4 border-b border-[#F5C45E]/40 bg-gradient-to-r from-[#FFF6E9] to-[#FFF6E9]/70 " +
//         className
//       }
//     >
//       {children}
//     </div>
//   );
// }
// function CardTitle({ children, className = "" }) {
//   return (
//     <h2
//       className={
//         "font-extrabold text-lg sm:text-xl text-[#102E50] tracking-tight " +
//         className
//       }
//     >
//       {children}
//     </h2>
//   );
// }
// function CardContent({ children, className = "" }) {
//   return <div className={"p-4 sm:p-6 " + className}>{children}</div>;
// }

// function Textarea({ className = "", ...props }) {
//   return (
//     <textarea
//       className={
//         "w-full min-h-[100px] rounded-xl border border-[#102E50]/50 bg-[#FFF6E9] px-3 py-2 text-[#102E50] placeholder-[#102E50]/50 focus:outline-none focus:ring-4 focus:ring-[#F5C45E]/40 transition " +
//         className
//       }
//       {...props}
//     />
//   );
// }

// export default function CartPage() {
//   const CusData = useSelector((state) => state.UserInfo);
//   const [cart, setCart] = useState([]);
//   const [ss, sss] = useState();

//   const [responseProviders, setResponseProviders] = useState({});
//   const [showCheckout, setShowCheckout] = useState(false);
//   const port = import.meta.env.VITE_PORT;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
//         );
//         setCart(res.data.cards);
//         console.log("sssssssssssssssssssss");

//         console.log(
//           res.data,
//           "Ssssssssssسسسسسسسسسسسسسسsppppppppppssssssssssss"
//         );
//         console.log("sssssssssssssssssssss");

//         console.log("sssssssssssssssssssss");

//         console.log(cart, "ppppppppppppppppppppppppp");
//         console.log("sssssssssssssssssssss");
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = showCheckout ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [showCheckout]);

//   const updateQuantity = (cart_id, change) => {
//     setCart(
//       cart
//         .map((p) =>
//           p.cart_id === cart_id
//             ? { ...p, quantity: Math.max(0, p.quantity + change) }
//             : p
//         )
//         .filter((p) => p.quantity > 0)
//     );
//   };

//   const toggleResponseProvider = (cart_id) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: {
//         isVisible: !prev[cart_id]?.isVisible,
//         content: prev[cart_id]?.content || "",
//         sent: false,
//       },
//     }));
//   };

//   const updateResponseContent = (cart_id, content) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: { ...prev[cart_id], content },
//     }));
//   };

//   async function sendTheCustomerReqAndToOrder({
//     cart_id,
//     custom_requirement,
//     product_id,
//     provider_id,
//     quantity,
//     cart_price,
//     user_id,
//   }) {
//     try {
//       setCart((prev) =>
//         prev.map((item) =>
//           item.cart_id === cart_id
//             ? { ...item, custom_requirement, provider_response: null }
//             : item
//         )
//       );
//       await axios.put(`http://localhost:${port}/updateTheCustomReqAndToOrder`, {
//         cart_id,
//         custom_requirement,
//         Prodact_id: product_id,
//         provider_id,
//         quntity: quantity,
//         price: cart_price,
//         user_id,
//       });
//       setCart((prev) =>
//         prev.map((item) =>
//           item.cart_id === cart_id ? { ...item, sendedtoprovider: true } : item
//         )
//       );
//       setResponseProviders((prev) => ({
//         ...prev,
//         [cart_id]: { ...prev[cart_id], sent: true },
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleApprove = async (cart_id, customer_id) => {
//     alert("Approved!");
//     try {
//       await axios.put(
//         `http://localhost:${port}/changeStatusPayOfProdactAfterApprove`,
//         { cart_id, user_id: customer_id }
//       );
//       setCart((prevCart) =>
//         prevCart.map((p) =>
//           p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p
//         )
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleReject = async (cart_id, customer_id) => {
//     alert("Rejected!");
//     try {
//       await axios.put(
//         `http://localhost:${port}/changeStatusPayOfProdactAfterRejected/${cart_id}`,
//         { cart_id, user_id: customer_id }
//       );
//       setCart((prevCart) => prevCart.filter((p) => p.cart_id !== cart_id));
//       dispatch(decrementCartItem({ number: 1 }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteItemCart = async (cart_id) => {
//     const port = import.meta.env.VITE_PORT;
//     try {
//       await axios.delete(`http://localhost:${port}/deleteCard/${cart_id}`);

//       setCart((prevCart) =>
//         prevCart.filter((item) => item.cart_id !== cart_id)
//       );
//       dispatch(decrementCartItem({number:1}));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // const subtotal = cart.reduce((sum, p) => sum + p.cart_price * p.quantity, 0);
//   const subtotal = (Array.isArray(cart) ? cart : []).reduce((sum, p) => {
//     if (p.provider_response) {
//       return sum + Number(p.cart_price);
//     } else {
//       return sum + Number(p.cart_price) * Number(p.quantity);
//     }
//   }, 0);

//   const tax = subtotal * 0.08;
//   const total = subtotal + tax;
//   console.log("Cart value:", cart);
//   const handleCheckout = () => setShowCheckout(true);
//   const completePayment = async () => {
//     alert("Payment completed successfully!");
//     setShowCheckout(false);
//     try {
//       const ress = await axios.post(
//         `http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`
//       );
//       const res = await axios.get(
//         `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
//       );
//       dispatch(decrementCartItem({ number: ress.data.length }));
//       console.log("ress.data.length");
//       console.log(ress.data.length);
//       console.log("ess.data.length");

//       setCart(res.data.cards);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(245,196,94,.18),transparent_55%),radial-gradient(900px_700px_at_100%_0%,rgba(231,139,72,.14),transparent_45%)] from-[#FFF6E9] to-[#FFF6E9] bg-[#FFF6E9] pt-20 md:pt-24 px-3 sm:px-4 md:px-6 py-6 md:py-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 md:mb-10 flex items-center gap-3 text-[#102E50] tracking-tight">
//           <span className="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F5C45E]/30 ring-2 ring-[#F5C45E]/60">
//             <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-[#E78B48]" />
//           </span>
//           Shopping Cart
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
//           <div className="lg:col-span-2 space-y-5 sm:space-y-8">
//             {Array.isArray(cart) &&
//               cart.map((product) => (
//                 <Card key={product.cart_id}>
//                   <CardContent className="p-4 sm:p-6">
//                     <div className="flex flex-col md:flex-row gap-5 md:gap-8">
//                       <div className="md:flex-shrink-0">
//                         <div className="relative">
//                           <div className="w-full md:w-48">
//                             <div className="w-full aspect-[1/1]">
//                               <img
//                                 src={
//                                   product.product_image
//                                     ? product.product_image.startsWith("http")
//                                       ? product.product_image
//                                       : `http://localhost:${port}${product.product_image}`
//                                     : `../src/assets/NoImage.png`
//                                 }
//                                 alt={product.product_name}
//                                 className="w-full h-full object-cover rounded-2xl border-2 border-[#F5C45E] shadow-md"
//                               />
//                             </div>
//                           </div>
//                           <span className="absolute -top-3 -left-3 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#102E50] text-white shadow">
//                             Item
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex-1 space-y-4 sm:space-y-5 relative">
//                         <div className="flex flex-col gap-1">
//                           <h3 className="text-lg sm:text-2xl font-extrabold text-[#102E50] leading-tight line-clamp-2">
//                             {product.product_name}
//                           </h3>
//                           <p className="inline-flex w-fit items-center gap-2 text-2xl sm:text-3xl font-black text-[#E78B48]">
//                             <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
//                             ${product.cart_price}
//                           </p>

//                           {product.provider_response &&
//                           product.status_pay === "Approve" ? (
//                             <div className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
//                               <span className="text-sm font-semibold">
//                                 Provider Message:
//                               </span>
//                               <div className="mt-1 text-sm sm:text-[15px] font-medium">
//                                 {product.provider_response}
//                               </div>
//                             </div>
//                           ) : (
//                             <></>
//                           )}
//                         </div>

//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           className="absolute top-0 right-0"
//                           onClick={() => deleteItemCart(product.cart_id)}
//                         >
//                           Delete
//                         </Button>

//                         <div className="flex items-center gap-3">
//                           <span className="text-sm text-[#102E50]">
//                             Quantity:
//                           </span>
//                           {product.provider_response ||
//                           product.status_pay !== "Approve" ? (
//                             <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">
//                               {product.quantity}
//                             </span>
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() =>
//                                   updateQuantity(product.cart_id, -1)
//                                 }
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </Button>
//                               <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">
//                                 {product.quantity}
//                               </span>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() =>
//                                   updateQuantity(product.cart_id, 1)
//                                 }
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           )}
//                         </div>

//                         {product.provider_response &&
//                         product.status_pay !== "Approve" ? (
//                           <div className="space-y-3 sm:space-y-4">
//                             <div className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
//                               <span className="text-sm font-semibold">
//                                 Provider Message:
//                               </span>
//                               <div className="mt-1 text-sm sm:text-[15px] font-medium">
//                                 {product.provider_response}
//                               </div>
//                             </div>
//                             <div className="flex flex-wrap gap-2 sm:gap-3">
//                               <Button
//                                 onClick={() =>
//                                   handleApprove(
//                                     product.cart_id,
//                                     product.customer_id
//                                   )
//                                 }
//                                 className="bg-[#F5C45E] md:hover:bg-[#E78B48] text-[#102E50]"
//                               >
//                                 APPROVE
//                               </Button>
//                               <Button
//                                 variant="destructive"
//                                 onClick={() =>
//                                   handleReject(
//                                     product.cart_id,
//                                     product.customer_id
//                                   )
//                                 }
//                               >
//                                 REJECT
//                               </Button>
//                             </div>
//                           </div>
//                         ) : product.custom_requirement &&
//                           product.provider_response === null ? (
//                           <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
//                             <span className="h-2 w-2 rounded-full bg-[#E78B48]"></span>
//                             Waiting provider response
//                           </p>
//                         ) : product.custom_requirement &&
//                           product.provider_response ? (
//                           <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
//                             <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
//                             Request Sent Successfully
//                           </p>
//                         ) : (
//                           <Button
//                             variant="secondary"
//                             onClick={() =>
//                               toggleResponseProvider(product.cart_id)
//                             }
//                           >
//                             CUSTOM REQURMENT{" "}
//                           </Button>
//                         )}

//                         {responseProviders[product.cart_id]?.isVisible && (
//                           <div className="space-y-3">
//                             {!product.sendedtoprovider ? (
//                               <>
//                                 <Textarea
//                                   placeholder="Enter your response..."
//                                   value={
//                                     responseProviders[product.cart_id]
//                                       ?.content || ""
//                                   }
//                                   onChange={(e) =>
//                                     updateResponseContent(
//                                       product.cart_id,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 {responseProviders[product.cart_id]
//                                   ?.content && (
//                                   <div className="flex gap-3">
//                                     <Button
//                                       onClick={() =>
//                                         sendTheCustomerReqAndToOrder({
//                                           cart_id: product.cart_id,
//                                           product_id: product.product_id,
//                                           provider_id: product.provider_id,
//                                           cart_price: product.cart_price,
//                                           custom_requirement:
//                                             responseProviders[product.cart_id]
//                                               ?.content,
//                                           quantity: product.quantity,
//                                           user_id: product.customer_id,
//                                         })
//                                       }
//                                     >
//                                       Send To Provider
//                                     </Button>
//                                   </div>
//                                 )}
//                               </>
//                             ) : product.custom_requirement &&
//                               product.provider_response ? (
//                               <></>
//                             ) : (
//                               <></>
//                             )}{" "}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//           </div>

//           <div className="lg:col-span-1">
//             <Card className="lg:sticky lg:top-24">
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 sm:space-y-5 text-[#102E50]">
//                 <div className="space-y-2">
//                   {cart.map((product) => (
//                     <div
//                       key={product.cart_id}
//                       className="flex justify-between text-xs sm:text-sm px-2 py-1.5 rounded-lg bg-[#FFF6E9] border border-[#F5C45E]/40"
//                     >
//                       <span className="font-medium line-clamp-1">
//                         {product.product_name} × {product.quantity}
//                       </span>
//                       <span className="font-semibold text-[#E78B48]">
//                         {product.provider_response
//                           ? product.cart_price
//                           : (product.cart_price * product.quantity).toFixed(2)}
//                         {/* ${(product.cart_price * product.quantity).toFixed(2)} */}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="border-t border-[#F5C45E]/50 pt-3 space-y-2">
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span>Subtotal</span>
//                     <span className="font-semibold">${subtotal}</span>
//                   </div>
//                 </div>
//                 <div className="border-t border-[#F5C45E]/50 pt-3">
//                   <div className="flex justify-between text-lg sm:text-xl font-extrabold">
//                     <span>Total</span>
//                     <span className="text-[#E78B48]">${subtotal}</span>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleCheckout}
//                   size="lg"
//                   className="w-full mt-3 sm:mt-4"
//                 >
//                   Checkout
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {showCheckout && (
//           <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <Card className="w-full max-w-md">
//               <CardHeader>
//                 <CardTitle>Checkout</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5 sm:space-y-6 text-[#102E50]">
//                 <div className="text-center">
//                   <p className="text-base sm:text-lg font-semibold">
//                     Total Amount
//                   </p>
//                   <p className="text-3xl sm:text-4xl font-extrabold text-[#E78B48]">
//                     ${subtotal}
//                   </p>
//                 </div>
//                 <div className="space-y-2 text-xs sm:text-sm">
//                   <p className="font-semibold">Payment Information:</p>
//                   <ul className="list-disc list-inside space-y-1 text-[#102E50]/80">
//                     <li>Secure payment processing</li>
//                     <li>Multiple payment methods accepted</li>
//                     <li>30-day return policy</li>
//                     <li>Free shipping on orders over $100</li>
//                   </ul>
//                 </div>
//                 <div className="flex gap-3 pt-1 sm:pt-2">
//                   <Button onClick={completePayment} className="flex-1">
//                     Complete Payment
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowCheckout(false)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }













// import axios from "axios";
// import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { decrementCartItem } from "../../redux/userInfo/userInfo";
// import { useNavigate } from "react-router-dom";

// function Button({ children, onClick, className = "", variant, size }) {
//   let base =
//     "inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold tracking-wide focus:outline-none transition duration-200 ease-in-out shadow-sm md:hover:shadow-lg active:scale-[.98] ";
//   if (variant === "outline")
//     base += "border border-[#102E50] text-[#102E50] md:hover:bg-[#FFF6E9] ";
//   else if (variant === "secondary")
//     base += "bg-[#F5C45E] text-[#102E50] md:hover:bg-[#E78B48] ";
//   else if (variant === "destructive")
//     base += "bg-[#BE3D2A] text-white md:hover:bg-[#9F3323] ";
//   else base += "bg-[#102E50] text-white md:hover:bg-[#0C2340] ";

//   if (size === "sm") base += "text-sm px-3 py-1.5 ";
//   else if (size === "lg") base += "text-lg px-6 py-3 ";

//   return (
//     <button className={base + className} onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// function Card({ children, className = "" }) {
//   return (
//     <div
//       className={
//         "bg-white rounded-2xl shadow-lg ring-1 ring-[#F5C45E]/30 md:hover:ring-[#F5C45E]/50 md:hover:shadow-xl transition-all " +
//         className
//       }
//     >
//       {children}
//     </div>
//   );
// }
// function CardHeader({ children, className = "" }) {
//   return (
//     <div
//       className={
//         "px-4 sm:px-6 py-3 sm:py-4 border-b border-[#F5C45E]/40 bg-gradient-to-r from-[#FFF6E9] to-[#FFF6E9]/70 " +
//         className
//       }
//     >
//       {children}
//     </div>
//   );
// }
// function CardTitle({ children, className = "" }) {
//   return (
//     <h2
//       className={
//         "font-extrabold text-lg sm:text-xl text-[#102E50] tracking-tight " +
//         className
//       }
//     >
//       {children}
//     </h2>
//   );
// }
// function CardContent({ children, className = "" }) {
//   return <div className={"p-4 sm:p-6 " + className}>{children}</div>;
// }

// function Textarea({ className = "", ...props }) {
//   return (
//     <textarea
//       className={
//         "w-full min-h-[100px] rounded-xl border border-[#102E50]/50 bg-[#FFF6E9] px-3 py-2 text-[#102E50] placeholder-[#102E50]/50 focus:outline-none focus:ring-4 focus:ring-[#F5C45E]/40 transition " +
//         className
//       }
//       {...props}
//     />
//   );
// }

// export default function CartPage() {
//   const CusData = useSelector((state) => state.UserInfo);
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [ss, sss] = useState();
//   const [responseProviders, setResponseProviders] = useState({});
//   const [showCheckout, setShowCheckout] = useState(false);
//   const port = import.meta.env.VITE_PORT;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
//         );
//         setCart(res.data.cards);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = showCheckout ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [showCheckout]);

//   const goToDetails = (product) =>
//     isLogged
//       ? navigate(`/productdatails?product_id=${product.product_id}`, {
//           state: { product_id: product.product_id },
//         })
//       : navigate("/login");

//   const updateQuantity = (cart_id, change) => {
//     setCart(
//       cart
//         .map((p) =>
//           p.cart_id === cart_id
//             ? { ...p, quantity: Math.max(0, p.quantity + change) }
//             : p
//         )
//         .filter((p) => p.quantity > 0)
//     );
//   };

//   const toggleResponseProvider = (cart_id) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: {
//         isVisible: !prev[cart_id]?.isVisible,
//         content: prev[cart_id]?.content || "",
//         sent: false,
//       },
//     }));
//   };

//   const updateResponseContent = (cart_id, content) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: { ...prev[cart_id], content },
//     }));
//   };

//   async function sendTheCustomerReqAndToOrder({
//     cart_id,
//     custom_requirement,
//     product_id,
//     provider_id,
//     quantity,
//     cart_price,
//     user_id,
//   }) {
//     try {
//       setCart((prev) =>
//         prev.map((item) =>
//           item.cart_id === cart_id
//             ? { ...item, custom_requirement, provider_response: null }
//             : item
//         )
//       );
//       await axios.put(`http://localhost:${port}/updateTheCustomReqAndToOrder`, {
//         cart_id,
//         custom_requirement,
//         Prodact_id: product_id,
//         provider_id,
//         quntity: quantity,
//         price: cart_price,
//         user_id,
//       });
//       setCart((prev) =>
//         prev.map((item) =>
//           item.cart_id === cart_id ? { ...item, sendedtoprovider: true } : item
//         )
//       );
//       setResponseProviders((prev) => ({
//         ...prev,
//         [cart_id]: { ...prev[cart_id], sent: true },
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleApprove = async (cart_id, customer_id) => {
//     alert("Approved!");
//     try {
//       await axios.put(
//         `http://localhost:${port}/changeStatusPayOfProdactAfterApprove`,
//         { cart_id, user_id: customer_id }
//       );
//       setCart((prevCart) =>
//         prevCart.map((p) =>
//           p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p
//         )
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleReject = async (cart_id, customer_id) => {
//     alert("Rejected!");
//     try {
//       await axios.put(
//         `http://localhost:${port}/changeStatusPayOfProdactAfterRejected/${cart_id}`,
//         { cart_id, user_id: customer_id }
//       );
//       setCart((prevCart) => prevCart.filter((p) => p.cart_id !== cart_id));
//       dispatch(decrementCartItem({ number: 1 }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteItemCart = async (cart_id) => {
//     const port = import.meta.env.VITE_PORT;
//     try {
//       const res = await Swal.fire({
//         title: "Are you sure?",
//         text: "This item will be removed from your cart.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#BE3D2A",
//         cancelButtonColor: "#102E50",
//         background: "#FFF6E9",
//         color: "#102E50",
//       });
//       if (!res.isConfirmed) return;

//       await axios.delete(`http://localhost:${port}/deleteCard/${cart_id}`);

//       setCart((prevCart) => prevCart.filter((item) => item.cart_id !== cart_id));
//       dispatch(decrementCartItem({ number: 1 }));

//       await Swal.fire({
//         title: "Deleted",
//         text: "Item removed from your cart.",
//         icon: "success",
//         timer: 1400,
//         showConfirmButton: false,
//         background: "#FFF6E9",
//         color: "#102E50",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const subtotal = (Array.isArray(cart) ? cart : []).reduce((sum, p) => {
//     if (p.provider_response) {
//       return sum + Number(p.cart_price);
//     } else {
//       return sum + Number(p.cart_price) * Number(p.quantity);
//     }
//   }, 0);

//   const tax = subtotal * 0.08;
//   const total = subtotal + tax;

//   const handleCheckout = () => setShowCheckout(true);
//   const completePayment = async () => {
//     alert("Payment completed successfully!");
//     setShowCheckout(false);
//     try {
//       const ress = await axios.post(
//         `http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`
//       );
//       const res = await axios.get(
//         `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
//       );
//       dispatch(decrementCartItem({ number: ress.data.length }));
//       setCart(res.data.cards);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(245,196,94,.18),transparent_55%),radial-gradient(900px_700px_at_100%_0%,rgba(231,139,72,.14),transparent_45%)] from-[#FFF6E9] to-[#FFF6E9] bg-[#FFF6E9] pt-20 md:pt-24 px-3 sm:px-4 md:px-6 py-6 md:py-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 md:mb-10 flex items-center gap-3 text-[#102E50] tracking-tight">
//           <span className="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F5C45E]/30 ring-2 ring-[#F5C45E]/60">
//             <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-[#E78B48]" />
//           </span>
//           Shopping Cart
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
//           <div className="lg:col-span-2 space-y-5 sm:space-y-8">
//             {Array.isArray(cart) &&
//               cart.map((product) => (
//                 <Card key={product.cart_id}>
//                   <CardContent className="p-4 sm:p-6">
//                     <div className="flex flex-col md:flex-row gap-5 md:gap-8">
//                       <div className="md:flex-shrink-0">
//                         <div className="relative">
//                           <div className="w-full md:w-48">
//                             <div
//                               className="w-full aspect-[1/1] cursor-pointer"
//                               onClick={() => goToDetails(product)}
//                             >
//                               <img
//                                 src={
//                                   product.product_image
//                                     ? product.product_image.startsWith("http")
//                                       ? product.product_image
//                                       : `http://localhost:${port}${product.product_image}`
//                                     : `../src/assets/NoImage.png`
//                                 }
//                                 alt={product.product_name}
//                                 className="w-full h-full object-cover rounded-2xl border-2 border-[#F5C45E] shadow-md"
//                               />
//                             </div>
//                           </div>
//                           <span className="absolute -top-3 -left-3 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#102E50] text-white shadow">
//                             Item
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex-1 space-y-4 sm:space-y-5 relative">
//                         <button
//                           onClick={() => deleteItemCart(product.cart_id)}
//                           aria-label="Delete item"
//                           className="absolute top-0 right-0 grid place-items-center w-9 h-9 rounded-full bg-[#BE3D2A] text-white shadow hover:bg-[#9F3323] active:scale-95 transition"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4.5 h-4.5" />
//                         </button>

//                         <div className="flex flex-col gap-1 pr-12">
//                           <h3
//                             className="text-lg sm:text-2xl font-extrabold text-[#102E50] leading-tight line-clamp-2 cursor-pointer"
//                             onClick={() => goToDetails(product)}
//                           >
//                             {product.product_name}
//                           </h3>
//                           <p
//                             className="inline-flex w-fit items-center gap-2 text-2xl sm:text-3xl font-black text-[#E78B48] cursor-pointer"
//                             onClick={() => goToDetails(product)}
//                           >
//                             <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
//                             ${product.cart_price}
//                           </p>

//                           {product.provider_response &&
//                           product.status_pay === "Approve" ? (
//                             <div className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
//                               <span className="text-sm font-semibold">
//                                 Provider Message:
//                               </span>
//                               <div className="mt-1 text-sm sm:text[15px] font-medium">
//                                 {product.provider_response}
//                               </div>
//                             </div>
//                           ) : (
//                             <></>
//                           )}
//                         </div>

//                         <div className="flex items-center gap-3">
//                           <span className="text-sm text-[#102E50]">Quantity:</span>
//                           {product.provider_response ||
//                           product.status_pay !== "Approve" ? (
//                             <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">
//                               {product.quantity}
//                             </span>
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() =>
//                                   updateQuantity(product.cart_id, -1)
//                                 }
//                                 className="!px-2 !py-1 rounded-lg"
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </Button>
//                               <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">
//                                 {product.quantity}
//                               </span>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() =>
//                                   updateQuantity(product.cart_id, 1)
//                                 }
//                                 className="!px-2 !py-1 rounded-lg"
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           )}
//                         </div>

//                         {product.provider_response &&
//                         product.status_pay !== "Approve" ? (
//                           <div className="space-y-3 sm:space-y-4">
//                             <div className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
//                               <span className="text-sm font-semibold">
//                                 Provider Message:
//                               </span>
//                               <div className="mt-1 text-sm sm:text-[15px] font-medium">
//                                 {product.provider_response}
//                               </div>
//                             </div>
//                             <div className="flex flex-wrap gap-2 sm:gap-3">
//                               <Button
//                                 onClick={() =>
//                                   handleApprove(
//                                     product.cart_id,
//                                     product.customer_id
//                                   )
//                                 }
//                                 className="bg-[#F5C45E] md:hover:bg-[#E78B48] text-[#102E50]"
//                               >
//                                 APPROVE
//                               </Button>
//                               <Button
//                                 variant="destructive"
//                                 onClick={() =>
//                                   handleReject(
//                                     product.cart_id,
//                                     product.customer_id
//                                   )
//                                 }
//                               >
//                                 REJECT
//                               </Button>
//                             </div>
//                           </div>
//                         ) : product.custom_requirement &&
//                           product.provider_response === null ? (
//                           <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
//                             <span className="h-2 w-2 rounded-full bg-[#E78B48]"></span>
//                             Waiting provider response
//                           </p>
//                         ) : product.custom_requirement &&
//                           product.provider_response ? (
//                           <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
//                             <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
//                             Request Sent Successfully
//                           </p>
//                         ) : (
//                           <Button
//                             variant="secondary"
//                             onClick={() =>
//                               toggleResponseProvider(product.cart_id)
//                             }
//                           >
//                             CUSTOM REQURMENT
//                           </Button>
//                         )}

//                         {responseProviders[product.cart_id]?.isVisible && (
//                           <div className="space-y-3">
//                             {!product.sendedtoprovider ? (
//                               <>
//                                 <Textarea
//                                   placeholder="Enter your response..."
//                                   value={
//                                     responseProviders[product.cart_id]?.content ||
//                                     ""
//                                   }
//                                   onChange={(e) =>
//                                     updateResponseContent(
//                                       product.cart_id,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 {responseProviders[product.cart_id]?.content && (
//                                   <div className="flex gap-3">
//                                     <Button
//                                       onClick={() =>
//                                         sendTheCustomerReqAndToOrder({
//                                           cart_id: product.cart_id,
//                                           product_id: product.product_id,
//                                           provider_id: product.provider_id,
//                                           cart_price: product.cart_price,
//                                           custom_requirement:
//                                             responseProviders[product.cart_id]
//                                               ?.content,
//                                           quantity: product.quantity,
//                                           user_id: product.customer_id,
//                                         })
//                                       }
//                                     >
//                                       Send To Provider
//                                     </Button>
//                                   </div>
//                                 )}
//                               </>
//                             ) : product.custom_requirement &&
//                               product.provider_response ? (
//                               <></>
//                             ) : (
//                               <></>
//                             )}{" "}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//           </div>

//           <div className="lg:col-span-1">
//             <Card className="lg:sticky lg:top-24">
//               <CardHeader className="flex items-center justify-between">
//                 <CardTitle>Order Summary</CardTitle>
//                 <span className="text-xs font-bold px-2 py-1 rounded-lg bg-[#F5C45E]/30 text-[#102E50]">
//                   {cart.length} items
//                 </span>
//               </CardHeader>
//               <CardContent className="space-y-4 sm:space-y-5 text-[#102E50]">
//                 <div className="space-y-2 max-h-[240px] overflow-auto pr-1">
//                   {cart.map((product) => (
//                     <div
//                       key={product.cart_id}
//                       className="flex justify-between items-center gap-3 text-xs sm:text-sm px-2 py-1.5 rounded-lg bg-[#FFF6E9] border border-[#F5C45E]/40"
//                     >
//                       <span className="font-medium line-clamp-1">
//                         {product.product_name} × {product.quantity}
//                       </span>
//                       <span className="font-semibold text-[#E78B48]">
//                         {product.provider_response
//                           ? product.cart_price
//                           : (product.cart_price * product.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="border-t border-[#F5C45E]/50 pt-3 space-y-2">
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span>Subtotal</span>
//                     <span className="font-semibold">${subtotal}</span>
//                   </div>
//                 </div>

//                 <div className="border-t border-[#F5C45E]/50 pt-3">
//                   <div className="flex justify-between text-lg sm:text-xl font-extrabold">
//                     <span>Total</span>
//                     <span className="text-[#E78B48]">${subtotal}</span>
//                   </div>
//                 </div>

//                 <Button onClick={() => setShowCheckout(true)} size="lg" className="w-full mt-3 sm:mt-4">
//                   Checkout
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {showCheckout && (
//           <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <Card className="w-full max-w-md">
//               <CardHeader>
//                 <CardTitle>Checkout</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5 sm:space-y-6 text-[#102E50]">
//                 <div className="text-center">
//                   <p className="text-base sm:text-lg font-semibold">Total Amount</p>
//                   <p className="text-3xl sm:text-4xl font-extrabold text-[#E78B48]">
//                     ${subtotal}
//                   </p>
//                 </div>
//                 <div className="space-y-2 text-xs sm:text-sm">
//                   <p className="font-semibold">Payment Information:</p>
//                   <ul className="list-disc list-inside space-y-1 text-[#102E50]/80">
//                     <li>Secure payment processing</li>
//                     <li>Multiple payment methods accepted</li>
//                     <li>30-day return policy</li>
//                     <li>Free shipping on orders over $100</li>
//                   </ul>
//                 </div>
//                 <div className="flex gap-3 pt-1 sm:pt-2">
//                   <Button onClick={completePayment} className="flex-1">
//                     Complete Payment
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowCheckout(false)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }













// import axios from "axios";
// import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { decrementCartItem } from "../../redux/userInfo/userInfo";
// import { useNavigate } from "react-router-dom";

// function Button({ children, onClick, className = "", variant, size }) {
//   let base = "inline-flex items-center justify-center rounded-2xl font-semibold tracking-wide focus:outline-none transition duration-200 ease-in-out shadow-sm md:hover:shadow-lg active:scale-[.98] ";
//   if (variant === "outline") base += "px-4 py-2 border border-[#102E50] text-[#102E50] md:hover:bg-[#FFF6E9] ";
//   else if (variant === "secondary") base += "px-4 py-2 bg-[#F5C45E] text-[#102E50] md:hover:bg-[#E78B48] ";
//   else if (variant === "destructive") base += "px-4 py-2 bg-[#BE3D2A] text-white md:hover:bg-[#9F3323] ";
//   else base += "px-4 py-2 bg-[#102E50] text-white md:hover:bg-[#0C2340] ";
//   if (size === "sm") base += "text-sm px-3 py-1.5 ";
//   else if (size === "lg") base += "text-lg px-6 py-3 ";
//   return <button className={base + className} onClick={onClick}>{children}</button>;
// }

// function Card({ children, className = "" }) {
//   return <div className={"bg-white rounded-3xl shadow-[0_14px_50px_rgba(16,46,80,0.08)] ring-1 ring-[#F5C45E]/30 md:hover:ring-[#F5C45E]/50 md:hover:shadow-2xl transition-all " + className}>{children}</div>;
// }
// function CardHeader({ children, className = "" }) {
//   return <div className={"px-6 py-4 border-b border-[#F5C45E]/40 bg-gradient-to-r from-[#FFF6E9] to-[#FFF6E9]/70 " + className}>{children}</div>;
// }
// function CardTitle({ children, className = "" }) {
//   return <h2 className={"font-extrabold text-xl sm:text-2xl text-[#102E50] tracking-tight " + className}>{children}</h2>;
// }
// function CardContent({ children, className = "" }) {
//   return <div className={"p-6 " + className}>{children}</div>;
// }
// function Textarea({ className = "", ...props }) {
//   return <textarea className={"w-full min-h-[110px] rounded-2xl border border-[#102E50]/30 bg-[#FFF6E9] px-4 py-3 text-[#102E50] placeholder-[#102E50]/50 focus:outline-none focus:ring-4 focus:ring-[#F5C45E]/40 transition " + className} {...props} />;
// }

// export default function CartPage() {
//   const CusData = useSelector((state) => state.UserInfo);
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [ss, sss] = useState();
//   const [responseProviders, setResponseProviders] = useState({});
//   const [showCheckout, setShowCheckout] = useState(false);
//   const port = import.meta.env.VITE_PORT;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/carts/products/${CusData.user.user_id}`);
//         setCart(res.data.cards);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = showCheckout ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [showCheckout]);

//   const goToDetails = (product) =>
//     isLogged
//       ? navigate(`/productdatails?product_id=${product.product_id}`, { state: { product_id: product.product_id } })
//       : navigate("/login");

//   const updateQuantity = (cart_id, change) => {
//     setCart(
//       cart
//         .map((p) => (p.cart_id === cart_id ? { ...p, quantity: Math.max(0, p.quantity + change) } : p))
//         .filter((p) => p.quantity > 0)
//     );
//   };

//   const toggleResponseProvider = (cart_id) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: { isVisible: !prev[cart_id]?.isVisible, content: prev[cart_id]?.content || "", sent: false },
//     }));
//   };

//   const updateResponseContent = (cart_id, content) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: { ...prev[cart_id], content },
//     }));
//   };

//   async function sendTheCustomerReqAndToOrder({ cart_id, custom_requirement, product_id, provider_id, quantity, cart_price, user_id }) {
//     try {
//       setCart((prev) => prev.map((item) => (item.cart_id === cart_id ? { ...item, custom_requirement, provider_response: null } : item)));
//       await axios.put(`http://localhost:${port}/updateTheCustomReqAndToOrder`, { cart_id, custom_requirement, Prodact_id: product_id, provider_id, quntity: quantity, price: cart_price, user_id });
//       setCart((prev) => prev.map((item) => (item.cart_id === cart_id ? { ...item, sendedtoprovider: true } : item)));
//       setResponseProviders((prev) => ({ ...prev, [cart_id]: { ...prev[cart_id], sent: true } }));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleApprove = async (cart_id, customer_id) => {
//     alert("Approved!");
//     try {
//       await axios.put(`http://localhost:${port}/changeStatusPayOfProdactAfterApprove`, { cart_id, user_id: customer_id });
//       setCart((prevCart) => prevCart.map((p) => (p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p)));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleReject = async (cart_id, customer_id) => {
//     alert("Rejected!");
//     try {
//       await axios.put(`http://localhost:${port}/changeStatusPayOfProdactAfterRejected/${cart_id}`, { cart_id, user_id: customer_id });
//       setCart((prevCart) => prevCart.filter((p) => p.cart_id !== cart_id));
//       dispatch(decrementCartItem({ number: 1 }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteItemCart = async (cart_id) => {
//     const port = import.meta.env.VITE_PORT;
//     try {
//       const res = await Swal.fire({
//         title: "Are you sure?",
//         text: "This item will be removed from your cart.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#BE3D2A",
//         cancelButtonColor: "#102E50",
//         background: "#FFF6E9",
//         color: "#102E50",
//       });
//       if (!res.isConfirmed) return;
//       await axios.delete(`http://localhost:${port}/deleteCard/${cart_id}`);
//       setCart((prevCart) => prevCart.filter((item) => item.cart_id !== cart_id));
//       dispatch(decrementCartItem({ number: 1 }));
//       await Swal.fire({
//         title: "Deleted",
//         text: "Item removed from your cart.",
//         icon: "success",
//         timer: 1400,
//         showConfirmButton: false,
//         background: "#FFF6E9",
//         color: "#102E50",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const subtotal = (Array.isArray(cart) ? cart : []).reduce((sum, p) => {
//     if (p.provider_response) {
//       return sum + Number(p.cart_price);
//     } else {
//       return sum + Number(p.cart_price) * Number(p.quantity);
//     }
//   }, 0);

//   const tax = subtotal * 0.08;
//   const total = subtotal + tax;

//   const handleCheckout = () => setShowCheckout(true);
//   const completePayment = async () => {
//     alert("Payment completed successfully!");
//     setShowCheckout(false);
//     try {
//       const ress = await axios.post(`http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`);
//       const res = await axios.get(`http://localhost:${port}/api/carts/products/${CusData.user.user_id}`);
//       dispatch(decrementCartItem({ number: ress.data.length }));
//       setCart(res.data.cards);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(245,196,94,.18),transparent_55%),radial-gradient(900px_700px_at_100%_0%,rgba(231,139,72,.14),transparent_45%)] from-[#FFF6E9] to-[#FFF6E9] bg-[#FFF6E9] pt-20 md:pt-24 px-4 md:px-6 py-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl md:text-5xl font-black mb-8 flex items-center gap-3 text-[#102E50] tracking-tight">
//           <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#F5C45E]/30 ring-2 ring-[#F5C45E]/60">
//             <ShoppingCart className="h-7 w-7 text-[#E78B48]" />
//           </span>
//           Shopping Cart
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
//           <div className="lg:col-span-2 space-y-6">
//             {Array.isArray(cart) && cart.map((product) => (
//               <Card key={product.cart_id}>
//                 <CardContent>
//                   <div className="flex flex-col md:flex-row gap-6 md:gap-8">
//                     <div className="md:flex-shrink-0">
//                       <div className="relative">
//                         <div className="w-full md:w-52">
//                           <div className="w-full aspect-[1/1] cursor-pointer" onClick={() => goToDetails(product)}>
//                             <img
//                               src={product.product_image ? (product.product_image.startsWith("http") ? product.product_image : `http://localhost:${port}${product.product_image}`) : `../src/assets/NoImage.png`}
//                               alt={product.product_name}
//                               className="w-full h-full object-cover rounded-2xl border-2 border-[#F5C45E] shadow-md"
//                             />
//                           </div>
//                         </div>
//                         <span className="absolute -top-3 -left-3 px-3 py-1 rounded-full text-xs font-bold bg-[#102E50] text-white shadow">Item</span>
//                       </div>
//                     </div>

//                     <div className="flex-1 space-y-5 relative">
//                       <button onClick={() => deleteItemCart(product.cart_id)} aria-label="Delete item" className="absolute top-0 right-0 grid place-items-center w-9 h-9 rounded-full bg-[#BE3D2A] text-white shadow hover:bg-[#9F3323] active:scale-95 transition" title="Remove">
//                         <Trash2 className="w-4.5 h-4.5" />
//                       </button>

//                       <div className="flex flex-col gap-1 pr-12">
//                         <h3 className="text-2xl font-extrabold text-[#102E50] leading-tight line-clamp-2 cursor-pointer" onClick={() => goToDetails(product)}>{product.product_name}</h3>
//                         <p className="inline-flex w-fit items-center gap-2 text-3xl font-black text-[#E78B48] cursor-pointer" onClick={() => goToDetails(product)}>
//                           <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
//                           ${product.cart_price}
//                         </p>
//                         {product.provider_response && product.status_pay === "Approve" ? (
//                           <div className="px-4 py-3 rounded-2xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
//                             <span className="text-sm font-semibold">Provider Message:</span>
//                             <div className="mt-1 text-[15px] font-medium">{product.provider_response}</div>
//                           </div>
//                         ) : <></>}
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <span className="text-sm text-[#102E50]">Quantity:</span>
//                         {product.provider_response || product.status_pay !== "Approve" ? (
//                           <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">{product.quantity}</span>
//                         ) : (
//                           <div className="flex items-center gap-2">
//                             <Button variant="outline" size="sm" onClick={() => updateQuantity(product.cart_id, -1)} className="!px-2 !py-1 rounded-lg"><Minus className="h-4 w-4" /></Button>
//                             <span className="w-10 text-center font-semibold text-[#102E50] bg-[#FFF6E9] rounded-lg border border-[#F5C45E]/50 py-1">{product.quantity}</span>
//                             <Button variant="outline" size="sm" onClick={() => updateQuantity(product.cart_id, 1)} className="!px-2 !py-1 rounded-lg"><Plus className="h-4 w-4" /></Button>
//                           </div>
//                         )}
//                       </div>

//                       {product.provider_response && product.status_pay !== "Approve" ? (
//                         <div className="space-y-4">
//                           <div className="px-4 py-3 rounded-2xl bg-[#FFF6E9] border border-[#F5C45E]/50 text-[#102E50]">
//                             <span className="text-sm font-semibold">Provider Message:</span>
//                             <div className="mt-1 text-[15px] font-medium">{product.provider_response}</div>
//                           </div>
//                           <div className="flex flex-wrap gap-3">
//                             <Button onClick={() => handleApprove(product.cart_id, product.customer_id)} className="bg-[#F5C45E] md:hover:bg-[#E78B48] text-[#102E50]">APPROVE</Button>
//                             <Button variant="destructive" onClick={() => handleReject(product.cart_id, product.customer_id)}>REJECT</Button>
//                           </div>
//                         </div>
//                       ) : product.custom_requirement && product.provider_response === null ? (
//                         <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
//                           <span className="h-2 w-2 rounded-full bg-[#E78B48]"></span>
//                           Waiting provider response
//                         </p>
//                       ) : product.custom_requirement && product.provider_response ? (
//                         <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold">
//                           <span className="h-2 w-2 rounded-full bg-[#F5C45E]"></span>
//                           Request Sent Successfully
//                         </p>
//                       ) : (
//                         <Button variant="secondary" onClick={() => toggleResponseProvider(product.cart_id)}>CUSTOM REQURMENT</Button>
//                       )}

//                       {responseProviders[product.cart_id]?.isVisible && (
//                         <div className="space-y-3">
//                           {!product.sendedtoprovider ? (
//                             <>
//                               <Textarea
//                                 placeholder="Enter your response..."
//                                 value={responseProviders[product.cart_id]?.content || ""}
//                                 onChange={(e) => updateResponseContent(product.cart_id, e.target.value)}
//                               />
//                               {responseProviders[product.cart_id]?.content && (
//                                 <div className="flex gap-3">
//                                   <Button
//                                     onClick={() =>
//                                       sendTheCustomerReqAndToOrder({
//                                         cart_id: product.cart_id,
//                                         product_id: product.product_id,
//                                         provider_id: product.provider_id,
//                                         cart_price: product.cart_price,
//                                         custom_requirement: responseProviders[product.cart_id]?.content,
//                                         quantity: product.quantity,
//                                         user_id: product.customer_id,
//                                       })
//                                     }
//                                   >
//                                     Send To Provider
//                                   </Button>
//                                 </div>
//                               )}
//                             </>
//                           ) : product.custom_requirement && product.provider_response ? (
//                             <></>
//                           ) : (
//                             <></>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div className="lg:col-span-1">
//             <Card className="lg:sticky lg:top-24">
//               <CardHeader className="flex items-center justify-between">
//                 <CardTitle>Order Summary</CardTitle>
//                 <span className="text-xs font-bold px-2 py-1 rounded-lg bg-[#F5C45E]/30 text-[#102E50]">{cart.length} items</span>
//               </CardHeader>
//               <CardContent className="space-y-5 text-[#102E50]">
//                 <div className="space-y-2 max-h-[240px] overflow-auto pr-1">
//                   {cart.map((product) => (
//                     <div key={product.cart_id} className="flex justify-between items-center gap-3 text-sm px-3 py-2 rounded-xl bg-[#FFF6E9] border border-[#F5C45E]/40">
//                       <span className="font-medium line-clamp-1">{product.product_name} × {product.quantity}</span>
//                       <span className="font-semibold text-[#E78B48]">
//                         {product.provider_response ? product.cart_price : (product.cart_price * product.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="border-t border-[#F5C45E]/50 pt-3 space-y-2">
//                   <div className="flex justify-between text-base"><span>Subtotal</span><span className="font-semibold">${subtotal}</span></div>
//                 </div>
//                 <div className="border-t border-[#F5C45E]/50 pt-3">
//                   <div className="flex justify-between text-xl font-extrabold"><span>Total</span><span className="text-[#E78B48]">${subtotal}</span></div>
//                 </div>
//                 <Button onClick={() => setShowCheckout(true)} size="lg" className="w-full mt-4">Checkout</Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {showCheckout && (
//           <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <Card className="w-full max-w-md">
//               <CardHeader>
//                 <CardTitle>Checkout</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6 text-[#102E50]">
//                 <div className="text-center">
//                   <p className="text-lg font-semibold">Total Amount</p>
//                   <p className="text-4xl font-extrabold text-[#E78B48]">${subtotal}</p>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <p className="font-semibold">Payment Information:</p>
//                   <ul className="list-disc list-inside space-y-1 text-[#102E50]/80">
//                     <li>Secure payment processing</li>
//                     <li>Multiple payment methods accepted</li>
//                     <li>30-day return policy</li>
//                     <li>Free shipping on orders over $100</li>
//                   </ul>
//                 </div>
//                 <div className="flex gap-3">
//                   <Button onClick={completePayment} className="flex-1">Complete Payment</Button>
//                   <Button variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">Cancel</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// import axios from "axios";
// import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { decrementCartItem } from "../../redux/userInfo/userInfo";
// import { useNavigate } from "react-router-dom";

// function Button({ children, onClick, className = "", variant, size }) {
//   let base = "inline-flex items-center justify-center rounded-xl font-semibold tracking-wide focus:outline-none transition duration-200 ease-in-out active:scale-[.98] shadow-sm ";
//   if (variant === "outline") base += "px-3 py-1.5 border border-[#102E50]/25 text-[#102E50] hover:bg-[#102E50]/5 ";
//   else if (variant === "secondary") base += "px-3 py-1.5 bg-[#F5C45E] text-[#102E50] hover:bg-[#E78B48] ";
//   else if (variant === "destructive") base += "px-3 py-1.5 bg-[#BE3D2A] text-white hover:bg-[#9F3323] ";
//   else base += "px-3 py-1.5 bg-[#102E50] text-white hover:bg-[#0B223C] ";
//   if (size === "sm") base += "text-xs px-2.5 py-1 ";
//   else if (size === "lg") base += "text-base px-5 py-2.5 ";
//   return <button className={base + className} onClick={onClick}>{children}</button>;
// }

// function Card({ children, className = "" }) {
//   return <div className={"bg-white/95 backdrop-blur-[2px] rounded-2xl border border-[#102E50]/10 shadow-[0_12px_40px_rgba(16,46,80,0.10)] " + className}>{children}</div>;
// }
// function CardHeader({ children, className = "" }) {
//   return <div className={"px-5 py-3.5 border-b border-[#102E50]/10 bg-gradient-to-r from-[#FFF6E9] via-white to-[#FFF6E9] " + className}>{children}</div>;
// }
// function CardTitle({ children, className = "" }) {
//   return <h2 className={"font-black text-lg sm:text-xl text-[#102E50] tracking-tight " + className}>{children}</h2>;
// }
// function CardContent({ children, className = "" }) {
//   return <div className={"p-5 " + className}>{children}</div>;
// }
// function Textarea({ className = "", ...props }) {
//   return <textarea className={"w-full min-h-[96px] rounded-xl border border-[#102E50]/20 bg-white px-3.5 py-2.5 text-[#102E50] placeholder-[#102E50]/50 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]/40 transition " + className} {...props} />;
// }

// export default function CartPage() {
//   const CusData = useSelector((state) => state.UserInfo);
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [responseProviders, setResponseProviders] = useState({});
//   const [showCheckout, setShowCheckout] = useState(false);
//   const port = import.meta.env.VITE_PORT;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/carts/products/${CusData.user.user_id}`);
//         setCart(res.data.cards);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = showCheckout ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [showCheckout]);

//   const goToDetails = (product) =>
//     isLogged
//       ? navigate(`/productdatails?product_id=${product.product_id}`, { state: { product_id: product.product_id } })
//       : navigate("/login");

//   const updateQuantity = (cart_id, change) => {
//     setCart(
//       cart
//         .map((p) => (p.cart_id === cart_id ? { ...p, quantity: Math.max(0, p.quantity + change) } : p))
//         .filter((p) => p.quantity > 0)
//     );
//   };

//   const toggleResponseProvider = (cart_id) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: { isVisible: !prev[cart_id]?.isVisible, content: prev[cart_id]?.content || "", sent: false },
//     }));
//   };

//   const updateResponseContent = (cart_id, content) => {
//     setResponseProviders((prev) => ({
//       ...prev,
//       [cart_id]: { ...prev[cart_id], content },
//     }));
//   };

//   async function sendTheCustomerReqAndToOrder({ cart_id, custom_requirement, product_id, provider_id, quantity, cart_price, user_id }) {
//     try {
//       setCart((prev) => prev.map((item) => (item.cart_id === cart_id ? { ...item, custom_requirement, provider_response: null } : item)));
//       await axios.put(`http://localhost:${port}/updateTheCustomReqAndToOrder`, { cart_id, custom_requirement, Prodact_id: product_id, provider_id, quntity: quantity, price: cart_price, user_id });
//       setCart((prev) => prev.map((item) => (item.cart_id === cart_id ? { ...item, sendedtoprovider: true } : item)));
//       setResponseProviders((prev) => ({ ...prev, [cart_id]: { ...prev[cart_id], sent: true } }));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleApprove = async (cart_id, customer_id) => {
//     alert("Approved!");
//     try {
//       await axios.put(`http://localhost:${port}/changeStatusPayOfProdactAfterApprove`, { cart_id, user_id: customer_id });
//       setCart((prevCart) => prevCart.map((p) => (p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p)));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleReject = async (cart_id, customer_id) => {
//     alert("Rejected!");
//     try {
//       await axios.put(`http://localhost:${port}/changeStatusPayOfProdactAfterRejected/${cart_id}`, { cart_id, user_id: customer_id });
//       setCart((prevCart) => prevCart.filter((p) => p.cart_id !== cart_id));
//       dispatch(decrementCartItem({ number: 1 }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteItemCart = async (cart_id) => {
//     const port = import.meta.env.VITE_PORT;
//     try {
//       const res = await Swal.fire({
//         title: "Are you sure?",
//         text: "This item will be removed from your cart.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#BE3D2A",
//         cancelButtonColor: "#102E50",
//         background: "#FFF6E9",
//         color: "#102E50",
//       });
//       if (!res.isConfirmed) return;
//       await axios.delete(`http://localhost:${port}/deleteCard/${cart_id}`);
//       setCart((prevCart) => prevCart.filter((item) => item.cart_id !== cart_id));
//       dispatch(decrementCartItem({ number: 1 }));
//       await Swal.fire({
//         title: "Deleted",
//         text: "Item removed from your cart.",
//         icon: "success",
//         timer: 1400,
//         showConfirmButton: false,
//         background: "#FFF6E9",
//         color: "#102E50",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const subtotal = (Array.isArray(cart) ? cart : []).reduce((sum, p) => {
//     if (p.provider_response) return sum + Number(p.cart_price);
//     return sum + Number(p.cart_price) * Number(p.quantity);
//   }, 0);

//   const handleCheckout = () => setShowCheckout(true);
//   const completePayment = async () => {
//     alert("Payment completed successfully!");
//     setShowCheckout(false);
//     try {
//       const ress = await axios.post(`http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`);
//       const res = await axios.get(`http://localhost:${port}/api/carts/products/${CusData.user.user_id}`);
//       dispatch(decrementCartItem({ number: ress.data.length }));
//       setCart(res.data.cards);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] bg-[radial-gradient(40rem_20rem_at_-20%_-10%,rgba(229,190,85,0.10),transparent),radial-gradient(40rem_20rem_at_120%_110%,rgba(16,46,80,0.08),transparent)] pt-20 md:pt-24 px-3 sm:px-4 md:px-6 py-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 flex items-center gap-3 text-[#102E50] tracking-tight">
//           <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#102E50] text-white shadow">
//             <ShoppingCart className="h-6 w-6" />
//           </span>
//           <span className="bg-gradient-to-r from-[#E78B48] via-[#F5C45E] to-[#102E50] bg-clip-text text-transparent">Shopping Cart</span>
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-4">
//             {Array.isArray(cart) && cart.map((product) => (
//               <Card key={product.cart_id} className="hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(16,46,80,0.14)] transition">
//                 <CardContent className="p-5">
//                   <div className="flex flex-col md:flex-row gap-5">
//                     <div className="md:flex-shrink-0">
//                       <div className="relative">
//                         <div className="w-full md:w-44">
//                           <div className="w-full aspect-square cursor-pointer rounded-xl overflow-hidden ring-1 ring-[#102E50]/10" onClick={() => goToDetails(product)}>
//                             <img
//                               src={product.product_image ? (product.product_image.startsWith("http") ? product.product_image : `http://localhost:${port}${product.product_image}`) : `../src/assets/NoImage.png`}
//                               alt={product.product_name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         </div>
//                         <span className="absolute -top-2.5 -left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#102E50] text-white">Item</span>
//                       </div>
//                     </div>

//                     <div className="flex-1 space-y-4 relative">
//                       <button onClick={() => deleteItemCart(product.cart_id)} aria-label="Delete item" className="absolute top-0 right-0 grid place-items-center w-9 h-9 rounded-full bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A] hover:bg-[#BE3D2A] hover:text-white transition">
//                         <Trash2 className="w-4 h-4" />
//                       </button>

//                       <div className="flex flex-col gap-1.5 pr-12">
//                         <h3 className="text-lg sm:text-xl font-extrabold text-[#102E50] leading-tight line-clamp-2 cursor-pointer" onClick={() => goToDetails(product)}>{product.product_name}</h3>
//                         <div className="flex items-center gap-3">
//                           <p className="inline-flex w-fit items-center gap-2 text-[22px] font-black text-[#102E50] cursor-pointer" onClick={() => goToDetails(product)}>
//                             <span className="h-1.5 w-1.5 rounded-full bg-[#F5C45E]"></span>
//                             ${product.cart_price}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <span className="text-xs text-[#102E50] font-semibold">Quantity</span>
//                         {product.provider_response || product.status_pay !== "Approve" ? (
//                           <span className="w-10 text-center font-semibold text-[#102E50] bg-white rounded-lg border border-[#102E50]/10 py-1">{product.quantity}</span>
//                         ) : (
//                           <div className="flex items-center gap-1.5 rounded-full bg-white ring-1 ring-[#102E50]/10 px-1.5 py-1">
//                             <Button variant="outline" size="sm" onClick={() => updateQuantity(product.cart_id, -1)} className="!px-2 !py-1 rounded-lg"><Minus className="h-3.5 w-3.5" /></Button>
//                             <span className="w-10 text-center font-bold text-[#102E50]">{product.quantity}</span>
//                             <Button variant="outline" size="sm" onClick={() => updateQuantity(product.cart_id, 1)} className="!px-2 !py-1 rounded-lg"><Plus className="h-3.5 w-3.5" /></Button>
//                           </div>
//                         )}
//                       </div>

//                       {product.provider_response && product.status_pay !== "Approve" ? (
//                         <div className="space-y-3">
//                           <div className="px-3 py-2 rounded-lg bg-[#FFF6E9] border border-[#102E50]/10">
//                             <span className="text-xs font-semibold text-[#102E50]">Provider Message:</span>
//                             <div className="mt-1 text-sm font-medium text-[#102E50]">{product.provider_response}</div>
//                           </div>
//                           <div className="flex flex-wrap gap-2">
//                             <Button size="sm" onClick={() => handleApprove(product.cart_id, product.customer_id)} className="bg-[#F5C45E] text-[#102E50]">APPROVE</Button>
//                             <Button size="sm" variant="destructive" onClick={() => handleReject(product.cart_id, product.customer_id)}>REJECT</Button>
//                           </div>
//                         </div>
//                       ) : product.custom_requirement && product.provider_response === null ? (
//                         <p className="inline-flex items-center gap-2 text-[#102E50] font-semibold text-sm">
//                           <span className="h-1.5 w-1.5 rounded-full bg-[#F5C45E]"></span>
//                           Waiting provider response
//                         </p>
//                       ) : product.custom_requirement && product.provider_response ? (
//                         <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold text-sm">
//                           <span className="h-1.5 w-1.5 rounded-full bg-[#F5C45E]"></span>
//                           Request Sent Successfully
//                         </p>
//                       ) : (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="!px-3 !py-1.5 text-[11px] rounded-full bg-white text-[#102E50] ring-1 ring-[#F5C45E]/60 hover:bg-[#FFF6E9] hover:ring-[#F5C45E] hover:shadow-[0_0_0_3px_rgba(245,196,94,0.25)]"
//                           onClick={() => toggleResponseProvider(product.cart_id)}
//                         >
//                           CUSTOM REQURMENT
//                         </Button>
//                       )}

//                       {responseProviders[product.cart_id]?.isVisible && (
//                         <div className="space-y-3">
//                           {!product.sendedtoprovider ? (
//                             <>
//                               <Textarea
//                                 placeholder="Enter your response..."
//                                 value={responseProviders[product.cart_id]?.content || ""}
//                                 onChange={(e) => updateResponseContent(product.cart_id, e.target.value)}
//                               />
//                               {responseProviders[product.cart_id]?.content && (
//                                 <div className="flex gap-2">
//                                   <Button onClick={() =>
//                                     sendTheCustomerReqAndToOrder({
//                                       cart_id: product.cart_id,
//                                       product_id: product.product_id,
//                                       provider_id: product.provider_id,
//                                       cart_price: product.cart_price,
//                                       custom_requirement: responseProviders[product.cart_id]?.content,
//                                       quantity: product.quantity,
//                                       user_id: product.customer_id,
//                                     })
//                                   }>
//                                     Send To Provider
//                                   </Button>
//                                 </div>
//                               )}
//                             </>
//                           ) : null}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div className="lg:col-span-1">
//             <Card className="lg:sticky lg:top-24">
//               <CardHeader className="flex items-center justify-between">
//                 <CardTitle>Order Summary</CardTitle>
//                 <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F5C45E] text-[#102E50] ring-1 ring-[#102E50]/10">{cart.length} items</span>
//               </CardHeader>
//               <CardContent className="space-y-4 text-[#102E50]">
//                 <div className="space-y-2 max-h-[260px] overflow-auto pr-1">
//                   {cart.map((product) => (
//                     <div key={product.cart_id} className="flex justify-between items-center gap-3 text-xs px-3 py-2 rounded-lg bg-white ring-1 ring-[#102E50]/10">
//                       <span className="font-semibold line-clamp-1">{product.product_name} × {product.quantity}</span>
//                       <span className="font-extrabold text-[#102E50]">
//                         {product.provider_response ? product.cart_price : (product.cart_price * product.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="border-t border-[#102E50]/10 pt-3 space-y-2">
//                   <div className="flex justify-between text-sm"><span className="text-[#102E50]/80">Subtotal</span><span className="font-bold">${subtotal}</span></div>
//                 </div>
//                 <div className="border-t border-[#102E50]/10 pt-3">
//                   <div className="flex justify-between text-lg font-black"><span>Total</span><span className="text-[#E78B48]">${subtotal}</span></div>
//                 </div>
//                 <Button variant="secondary" size="lg" className="w-full mt-2">Checkout</Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {showCheckout && (
//           <div className="fixed inset-0 bg-[#102E50]/60 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
//             <Card className="w-full max-w-sm">
//               <CardHeader>
//                 <CardTitle>Checkout</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5 text-[#102E50]">
//                 <div className="flex items-center justify-center gap-2 text-[11px]">
//                   <span className="px-2 py-0.5 rounded-full bg-[#F5C45E] text-[#102E50] ring-1 ring-[#102E50]/10">Review</span>
//                   <span className="w-8 h-[2px] bg-[#102E50]/15"></span>
//                   <span className="px-2 py-0.5 rounded-full bg-white text-[#102E50] ring-1 ring-[#102E50]/10">Payment</span>
//                   <span className="w-8 h-[2px] bg-[#102E50]/15"></span>
//                   <span className="px-2 py-0.5 rounded-full bg-white text-[#102E50] ring-1 ring-[#102E50]/10">Done</span>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-base font-semibold">Total Amount</p>
//                   <p className="text-3xl font-extrabold text-[#102E50]">${subtotal}</p>
//                 </div>
//                 <div className="space-y-1.5 text-xs">
//                   <p className="font-semibold">Payment Information:</p>
//                   <ul className="list-disc list-inside space-y-1 text-[#102E50]/80">
//                     <li>Secure payment processing</li>
//                     <li>Multiple payment methods accepted</li>
//                     <li>30-day return policy</li>
//                     <li>Free shipping on orders over $100</li>
//                   </ul>
//                 </div>
//                 <div className="flex gap-2.5">
//                   <Button onClick={completePayment} className="flex-1">Complete Payment</Button>
//                   <Button variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">Cancel</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import axios from "axios";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { decrementCartItem } from "../../redux/userInfo/userInfo";
import { useNavigate } from "react-router-dom";

function Button({ children, onClick, className = "", variant, size }) {
  let base = "inline-flex items-center justify-center rounded-xl font-semibold tracking-wide focus:outline-none transition duration-200 ease-in-out active:scale-[.98] shadow-sm ";
  if (variant === "outline") base += "px-3 py-1.5 border border-[#102E50]/25 text-[#102E50] hover:bg-[#102E50]/5 ";
  else if (variant === "secondary") base += "px-3 py-1.5 bg-[#F5C45E] text-[#102E50] hover:bg-[#E78B48] ";
  else if (variant === "destructive") base += "px-3 py-1.5 bg-[#BE3D2A] text-white hover:bg-[#9F3323] ";
  else base += "px-3 py-1.5 bg-[#102E50] text-white hover:bg-[#0B223C] ";
  if (size === "sm") base += "text-xs px-2.5 py-1 ";
  else if (size === "lg") base += "text-base px-5 py-2.5 ";
  return <button className={base + className} onClick={onClick}>{children}</button>;
}

function Card({ children, className = "" }) {
  return <div className={"bg-white/95 backdrop-blur-[2px] rounded-2xl border border-[#102E50]/10 shadow-[0_12px_40px_rgba(16,46,80,0.10)] " + className}>{children}</div>;
}
function CardHeader({ children, className = "" }) {
  return <div className={"px-5 py-3.5 border-b border-[#102E50]/10 bg-gradient-to-r from-[#FFF6E9] via-white to-[#FFF6E9] " + className}>{children}</div>;
}
function CardTitle({ children, className = "" }) {
  return <h2 className={"font-black text-lg sm:text-xl text-[#102E50] tracking-tight " + className}>{children}</h2>;
}
function CardContent({ children, className = "" }) {
  return <div className={"p-5 " + className}>{children}</div>;
}
function Textarea({ className = "", ...props }) {
  return <textarea className={"w-full min-h-[96px] rounded-xl border border-[#102E50]/20 bg-white px-3.5 py-2.5 text-[#102E50] placeholder-[#102E50]/50 focus:outline-none focus:ring-2 focus:ring-[#F5C45E]/40 transition " + className} {...props} />;
}

export default function CartPage() {
  const CusData = useSelector((state) => state.UserInfo);
  const token = useSelector((s) => s.UserInfo?.token);
  const isLogged = Boolean(token);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [responseProviders, setResponseProviders] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const port = import.meta.env.VITE_PORT;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:${port}/api/carts/products/${CusData.user.user_id}`);
        setCart(res.data.cards);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showCheckout ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCheckout]);

  const goToDetails = (product) =>
    isLogged
      ? navigate(`/productdatails?product_id=${product.product_id}`, { state: { product_id: product.product_id } })
      : navigate("/login");

  const updateQuantity = (cart_id, change) => {
    setCart(
      cart
        .map((p) => (p.cart_id === cart_id ? { ...p, quantity: Math.max(0, p.quantity + change) } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const toggleResponseProvider = (cart_id) => {
    setResponseProviders((prev) => ({
      ...prev,
      [cart_id]: { isVisible: !prev[cart_id]?.isVisible, content: prev[cart_id]?.content || "", sent: false },
    }));
  };

  const updateResponseContent = (cart_id, content) => {
    setResponseProviders((prev) => ({
      ...prev,
      [cart_id]: { ...prev[cart_id], content },
    }));
  };

  async function sendTheCustomerReqAndToOrder({ cart_id, custom_requirement, product_id, provider_id, quantity, cart_price, user_id }) {
    try {
      setCart((prev) => prev.map((item) => (item.cart_id === cart_id ? { ...item, custom_requirement, provider_response: null } : item)));
      await axios.put(`http://localhost:${port}/updateTheCustomReqAndToOrder`, { cart_id, custom_requirement, Prodact_id: product_id, provider_id, quntity: quantity, price: cart_price, user_id });
      setCart((prev) => prev.map((item) => (item.cart_id === cart_id ? { ...item, sendedtoprovider: true } : item)));
      setResponseProviders((prev) => ({ ...prev, [cart_id]: { ...prev[cart_id], sent: true } }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleApprove = async (cart_id, customer_id) => {
    alert("Approved!");
    try {
      await axios.put(`http://localhost:${port}/changeStatusPayOfProdactAfterApprove`, { cart_id, user_id: customer_id });
      setCart((prevCart) => prevCart.map((p) => (p.cart_id === cart_id ? { ...p, status_pay: "Approve" } : p)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (cart_id, customer_id) => {
    alert("Rejected!");
    try {
      await axios.put(`http://localhost:${port}/changeStatusPayOfProdactAfterRejected/${cart_id}`, { cart_id, user_id: customer_id });
      setCart((prevCart) => prevCart.filter((p) => p.cart_id !== cart_id));
      dispatch(decrementCartItem({ number: 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemCart = async (cart_id) => {
    const port = import.meta.env.VITE_PORT;
    try {
      const res = await Swal.fire({
        title: "Are you sure?",
        text: "This item will be removed from your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#BE3D2A",
        cancelButtonColor: "#102E50",
        background: "#FFF6E9",
        color: "#102E50",
      });
      if (!res.isConfirmed) return;
      await axios.delete(`http://localhost:${port}/deleteCard/${cart_id}`);
      setCart((prevCart) => prevCart.filter((item) => item.cart_id !== cart_id));
      dispatch(decrementCartItem({ number: 1 }));
      await Swal.fire({
        title: "Deleted",
        text: "Item removed from your cart.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
        background: "#FFF6E9",
        color: "#102E50",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = (Array.isArray(cart) ? cart : []).reduce((sum, p) => {
    if (p.provider_response) return sum + Number(p.cart_price);
    return sum + Number(p.cart_price) * Number(p.quantity);
  }, 0);

  const handleCheckout = () => setShowCheckout(true);
  const completePayment = async () => {
    alert("Payment completed successfully!");
    setShowCheckout(false);
    try {
      const ress = await axios.post(`http://localhost:${port}/moveApprovedCartToOrders/${CusData.user.user_id}`);
      const res = await axios.get(`http://localhost:${port}/api/carts/products/${CusData.user.user_id}`);
      dispatch(decrementCartItem({ number: ress.data.length }));
      setCart(res.data.cards);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] bg-[radial-gradient(40rem_20rem_at_-20%_-10%,rgba(229,190,85,0.10),transparent),radial-gradient(40rem_20rem_at_120%_110%,rgba(16,46,80,0.08),transparent)] pt-20 md:pt-24 px-3 sm:px-4 md:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 flex items-center gap-3 text-[#102E50] tracking-tight">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#102E50] text-white shadow">
            <ShoppingCart className="h-6 w-6" />
          </span>
          <span className="bg-gradient-to-r from-[#E78B48] via-[#F5C45E] to-[#102E50] bg-clip-text text-transparent">Shopping Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {Array.isArray(cart) && cart.map((product) => (
              <Card key={product.cart_id} className="hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(16,46,80,0.14)] transition">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="md:flex-shrink-0">
                      <div className="relative">
                        <div className="w-full md:w-44">
                          <div className="w-full aspect-square cursor-pointer rounded-xl overflow-hidden ring-1 ring-[#102E50]/10" onClick={() => goToDetails(product)}>
                            <img
                              src={product.product_image ? (product.product_image.startsWith("http") ? product.product_image : `http://localhost:${port}${product.product_image}`) : `../src/assets/NoImage.png`}
                              alt={product.product_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="absolute -top-2.5 -left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#102E50] text-white">Item</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 relative">
                      <button onClick={() => deleteItemCart(product.cart_id)} aria-label="Delete item" className="absolute top-0 right-0 grid place-items-center w-9 h-9 rounded-full bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A] hover:bg-[#BE3D2A] hover:text-white transition">
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex flex-col gap-1.5 pr-12">
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#102E50] leading-tight line-clamp-2 cursor-pointer" onClick={() => goToDetails(product)}>{product.product_name}</h3>
                        <div className="flex items-center gap-3">
                          <p className="inline-flex w-fit items-center gap-2 text-[22px] font-black text-[#102E50] cursor-pointer" onClick={() => goToDetails(product)}>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C45E]"></span>
                            ${product.cart_price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#102E50] font-semibold">Quantity</span>
                        {product.provider_response || product.status_pay !== "Approve" ? (
                          <span className="w-10 text-center font-semibold text-[#102E50] bg-white rounded-lg border border-[#102E50]/10 py-1">{product.quantity}</span>
                        ) : (
                          <div className="flex items-center gap-1.5 rounded-full bg-white ring-1 ring-[#102E50]/10 px-1.5 py-1">
                            <Button variant="outline" size="sm" onClick={() => updateQuantity(product.cart_id, -1)} className="!px-2 !py-1 rounded-lg"><Minus className="h-3.5 w-3.5" /></Button>
                            <span className="w-10 text-center font-bold text-[#102E50]">{product.quantity}</span>
                            <Button variant="outline" size="sm" onClick={() => updateQuantity(product.cart_id, 1)} className="!px-2 !py-1 rounded-lg"><Plus className="h-3.5 w-3.5" /></Button>
                          </div>
                        )}
                      </div>

                      {product.provider_response && product.status_pay !== "Approve" ? (
                        <div className="space-y-3">
                          <div className="px-3 py-2 rounded-lg bg-[#FFF6E9] border border-[#102E50]/10">
                            <span className="text-xs font-semibold text-[#102E50]">Provider Message:</span>
                            <div className="mt-1 text-sm font-medium text-[#102E50]">{product.provider_response}</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" onClick={() => handleApprove(product.cart_id, product.customer_id)} className="bg-[#F5C45E] text-[#102E50]">APPROVE</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(product.cart_id, product.customer_id)}>REJECT</Button>
                          </div>
                        </div>
                      ) : product.custom_requirement && product.provider_response === null ? (
                        <p className="inline-flex items-center gap-2 text-[#102E50] font-semibold text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C45E]"></span>
                          Waiting provider response
                        </p>
                      ) : product.custom_requirement && product.provider_response ? (
                        <p className="inline-flex items-center gap-2 text-[#E78B48] font-semibold text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C45E]"></span>
                          Request Sent Successfully
                        </p>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="!px-2 !py-1 text-[10px] rounded-full !bg-[#E78B48] !text-white ring-1 ring-[#102E50]/10 hover:!bg-[#D36F3A] hover:ring-[#102E50]/20 hover:shadow-[0_0_0_3px_rgba(16,46,80,0.08)]"
                          onClick={() => toggleResponseProvider(product.cart_id)}
                        >
                          Add Custom Request
                        </Button>
                      )}

                      {responseProviders[product.cart_id]?.isVisible && (
                        <div className="space-y-3">
                          {!product.sendedtoprovider ? (
                            <>
                              <Textarea
                                placeholder="Enter your response..."
                                value={responseProviders[product.cart_id]?.content || ""}
                                onChange={(e) => updateResponseContent(product.cart_id, e.target.value)}
                              />
                              {responseProviders[product.cart_id]?.content && (
                                <div className="flex gap-2">
                                  <Button onClick={() =>
                                    sendTheCustomerReqAndToOrder({
                                      cart_id: product.cart_id,
                                      product_id: product.product_id,
                                      provider_id: product.provider_id,
                                      cart_price: product.cart_price,
                                      custom_requirement: responseProviders[product.cart_id]?.content,
                                      quantity: product.quantity,
                                      user_id: product.customer_id,
                                    })
                                  }>
                                    Send To Provider
                                  </Button>
                                </div>
                              )}
                            </>
                          ) : null}
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
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Order Summary</CardTitle>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F5C45E] text-[#102E50] ring-1 ring-[#102E50]/10">{cart.length} items</span>
              </CardHeader>
              <CardContent className="space-y-4 text-[#102E50]">
                <div className="space-y-2 max-h-[260px] overflow-auto pr-1">
                  {cart.map((product) => (
                    <div key={product.cart_id} className="flex justify-between items-center gap-3 text-xs px-3 py-2 rounded-lg bg-white ring-1 ring-[#102E50]/10">
                      <span className="font-semibold line-clamp-1">{product.product_name} × {product.quantity}</span>
                      <span className="font-extrabold text-[#102E50]">
                        {product.provider_response ? product.cart_price : (product.cart_price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#102E50]/10 pt-3 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-[#102E50]/80">Subtotal</span><span className="font-bold">${subtotal}</span></div>
                </div>
                <div className="border-t border-[#102E50]/10 pt-3">
                  <div className="flex justify-between text-lg font-black"><span>Total</span><span className="text-[#E78B48]">${subtotal}</span></div>
                </div>
                <Button variant="secondary" size="lg" className="w-full mt-2" onClick={handleCheckout}>Checkout</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showCheckout && (
          <div className="fixed inset-0 bg-[#102E50]/60 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-[#102E50]">
                <div className="flex items-center justify-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-[#F5C45E] text-[#102E50] ring-1 ring-[#102E50]/10">Review</span>
                  <span className="w-8 h-[2px] bg-[#102E50]/15"></span>
                  <span className="px-2 py-0.5 rounded-full bg:white text-[#102E50] ring-1 ring-[#102E50]/10">Payment</span>
                  <span className="w-8 h-[2px] bg-[#102E50]/15"></span>
                  <span className="px-2 py-0.5 rounded-full bg:white text-[#102E50] ring-1 ring-[#102E50]/10">Done</span>
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold">Total Amount</p>
                  <p className="text-3xl font-extrabold text-[#102E50]">${subtotal}</p>
                </div>
                <div className="space-y-1.5 text-xs">
                  <p className="font-semibold">Payment Information:</p>
                  <ul className="list-disc list-inside space-y-1 text-[#102E50]/80">
                    <li>Secure payment processing</li>
                    <li>Multiple payment methods accepted</li>
                    <li>30-day return policy</li>
                    <li>Free shipping on orders over $100</li>
                  </ul>
                </div>
                <div className="flex gap-2.5">
                  <Button onClick={completePayment} className="flex-1">Complete Payment</Button>
                  <Button variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}









