// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function MessagesSlice() {
//   const user = useSelector((state) => state.UserInfo);
//   const [Messages, setMessages] = useState([]);
//   const port = import.meta.env.VITE_PORT;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/Messages`, {
//           params: { userId: user.user.user_id },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [port, user.user.user_id]);

//   return (
//     <div className="flex flex-col gap-2 p-4 max-h-[80vh] overflow-y-auto">
//       {Messages.map((msg) => {
//         const isUserSender = msg.sender_id === user.user.user_id;
//         const chatSender = user.user;
//         const chatReciver = isUserSender
//           ? { user_id: msg.receiver_id, name: msg.receiver_name }
//           : { user_id: msg.sender_id, name: msg.sender_name };

//         return (
//           <div
//             key={msg.message_id}
//             onClick={() =>
//               navigate(`/LiveChat/${chatReciver.user_id}`, {
//                 state: { sender: chatSender, reciver: chatReciver },
//               })
//             }
//             className="flex items-center p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
//           >
            
//             <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mr-3">
//               {chatReciver.name?.charAt(0)}
//             </div>

            
//             <div className="flex flex-col w-full">
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold text-gray-800">
//                   {chatReciver.name}
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   {new Date(msg.created_at).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </div>
//               <p className="text-gray-600 text-sm truncate">{msg.text}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function MessagesSlice() {
//   const user = useSelector((state) => state.UserInfo);
//   const [Messages, setMessages] = useState([]);
//   const port = import.meta.env.VITE_PORT;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/Messages`, {
//           params: { userId: user.user.user_id },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [port, user.user.user_id]);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9]">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
//         <div className="mb-4">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50] font-extrabold">
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
//             Messages
//           </div>
//         </div>

//         {Messages.length === 0 ? (
//           <div className="grid place-items-center py-16">
//             <div className="text-center">
//               <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white grid place-items-center text-3xl font-bold shadow-md mb-4">💬</div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                 No messages yet
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-sm">
//             <div className="max-h-[70vh] overflow-y-auto divide-y divide-[#102E50]/10">
//               {Messages.map((msg) => {
//                 const isUserSender = msg.sender_id === user.user.user_id;
//                 const chatSender = user.user;
//                 const chatReciver = isUserSender
//                   ? { user_id: msg.receiver_id, name: msg.receiver_name }
//                   : { user_id: msg.sender_id, name: msg.sender_name };

//                 return (
//                   <button
//                     key={msg.message_id}
//                     onClick={() =>
//                       navigate(`/LiveChat/${chatReciver.user_id}`, {
//                         state: { sender: chatSender, reciver: chatReciver },
//                       })
//                     }
//                     className="w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-[#F5C45E]/10 transition"
//                   >
//                     <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white flex items-center justify-center font-extrabold">
//                       {chatReciver.name?.charAt(0)}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="font-extrabold text-[#102E50] truncate">
//                           {chatReciver.name}
//                         </span>
//                         <span className="text-[11px] sm:text-xs text-[#102E50]/70 shrink-0">
//                           {new Date(msg.created_at).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </span>
//                       </div>
//                       <p className="text-[#102E50]/80 text-sm truncate">
//                         {msg.text}
//                       </p>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function MessagesSlice() {
//   const user = useSelector((state) => state.UserInfo);
//   const [Messages, setMessages] = useState([]);
//   const port = import.meta.env.VITE_PORT;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/Messages`, {
//           params: { userId: user.user.user_id },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [port, user.user.user_id]);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9]">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
//         <div className="mb-4">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50] font-extrabold">
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
//             Messages
//           </div>
//         </div>

//         {Messages.length === 0 ? (
//           <div className="grid place-items-center py-16">
//             <div className="text-center">
//               <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white grid place-items-center text-3xl font-bold shadow-md mb-4">
//                 💬
//               </div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                 No messages yet
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-sm">
//             <div className="max-h-[70vh] overflow-y-auto divide-y divide-[#102E50]/10">
//               {Messages.map((msg) => {
//                 const isIncoming = msg.sender_id !== user.user.user_id;
//                 const hasIsRead = Object.prototype.hasOwnProperty.call(msg, "is_read");
//                 const isUnread = hasIsRead ? (isIncoming && !msg.is_read) : isIncoming;

//                 const chatSender = user.user;
//                 const chatReciver = isIncoming
//                   ? { user_id: msg.sender_id, name: msg.sender_name }
//                   : { user_id: msg.receiver_id, name: msg.receiver_name };

//                 return (
//                   <button
//                     key={msg.message_id}
//                     onClick={() =>
//                       navigate(`/LiveChat/${chatReciver.user_id}`, {
//                         state: { sender: chatSender, reciver: chatReciver },
//                       })
//                     }
//                     className={[
//                       "w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition",
//                       "hover:bg-[#F5C45E]/10",
//                       isUnread
//                         ? "bg-[#102E50]/[0.07] border-l-4 border-[#102E50]"
//                         : "bg-[#F5C45E]/[0.08] border-l-4 border-[#E78B48]"
//                     ].join(" ")}
//                   >
//                     <div className="relative shrink-0">
//                       <div
//                         className={[
//                           "w-12 h-12 rounded-full text-white flex items-center justify-center font-extrabold shadow-md",
//                           isUnread
//                             ? "bg-[#102E50]"
//                             : "bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]"
//                         ].join(" ")}
//                       >
//                         {chatReciver.name?.charAt(0)}
//                       </div>
//                       <span
//                         className={[
//                           "absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full ring-2 ring-white",
//                           isUnread ? "bg-[#102E50]" : "bg-[#E78B48]"
//                         ].join(" ")}
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-3">
//                         <span
//                           className={[
//                             "font-extrabold truncate",
//                             isUnread ? "text-[#102E50]" : "text-[#102E50]"
//                           ].join(" ")}
//                         >
//                           {chatReciver.name}
//                         </span>

//                         <div className="flex items-center gap-2 shrink-0">
//                           {isUnread ? (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#102E50] text-white font-bold">
//                               NEW
//                             </span>
//                           ) : (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E]/30 text-[#102E50] font-bold">
//                               Seen
//                             </span>
//                           )}
//                           <span className="text-[11px] sm:text-xs text-[#102E50]/70">
//                             {new Date(msg.created_at).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                       </div>

//                       <p
//                         className={[
//                           "text-sm truncate mt-0.5",
//                           isUnread ? "text-[#102E50] font-semibold" : "text-[#102E50]/80"
//                         ].join(" ")}
//                       >
//                         {isIncoming ? "" : "You: "}
//                         {msg.text}
//                       </p>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function MessagesSlice() {
//   const user = useSelector((state) => state.UserInfo);
//   const [Messages, setMessages] = useState([]);
//   const [locallyRead, setLocallyRead] = useState(() => new Set()); // محليًا: أي رسائل فتحتيها الآن
//   const port = import.meta.env.VITE_PORT;
//   const navigate = useNavigate();

//   const userId = user?.user?.user_id;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/Messages`, {
//           params: { userId },
//         });
//         setMessages(res.data || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [apiBase, userId]);

//   // عند فتح محادثة: علّميها مقروءة محليًا فورًا (بدون تغيير اللوجيك/الـ API)
//   function handleOpenChat(chatReciver, chatSender, msg) {
//     // علّمي الرسالة كمقروءة محليًا
//     setLocallyRead((prev) => {
//       const next = new Set(prev);
//       next.add(msg.message_id);
//       return next;
//     });

//     // تحديث تفاؤلي داخل القائمة (لو فيه is_read نخليه true)
//     setMessages((prev) =>
//       prev.map((m) =>
//         m.message_id === msg.message_id ? { ...m, is_read: true } : m
//       )
//     );

//     // افتحي الشات على نفس الرابط القديم
//     navigate(`/LiveChat/${chatReciver.user_id}`, {
//       state: { sender: chatSender, reciver: chatReciver },
//     });
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF6E9]">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
//         <div className="mb-4">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50] font-extrabold">
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
//             Messages
//           </div>
//         </div>

//         {Messages.length === 0 ? (
//           <div className="grid place-items-center py-16">
//             <div className="text-center">
//               <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white grid place-items-center text-3xl font-bold shadow-md mb-4">
//                 💬
//               </div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                 No messages yet
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-sm">
//             <div className="max-h-[70vh] overflow-y-auto divide-y divide-[#102E50]/10">
//               {Messages.map((msg) => {
//                 const isIncoming = msg.sender_id !== user.user.user_id;

//                 const hasIsRead = Object.prototype.hasOwnProperty.call(msg, "is_read");
//                 const isUnreadServer = hasIsRead ? (isIncoming && !msg.is_read) : isIncoming;
//                 const isUnreadLocal = isIncoming && !locallyRead.has(msg.message_id);
//                 const isUnread = hasIsRead ? (isIncoming && !msg.is_read && isUnreadLocal) : isUnreadLocal;

//                 const chatSender = user.user;
//                 const chatReciver = isIncoming
//                   ? { user_id: msg.sender_id, name: msg.sender_name }
//                   : { user_id: msg.receiver_id, name: msg.receiver_name };

//                 return (
//                   <button
//                     key={msg.message_id}
//                     onClick={() => handleOpenChat(chatReciver, chatSender, msg)}
//                     className={[
//                       "w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition",
//                       "hover:bg-[#F5C45E]/10",
//                       // غير مقروء: خلفية ذهبية خفيفة + حلقة لطيفة تعطي إحساس التوهج
//                       isUnread
//                         ? "bg-[#F5C45E]/[0.10] ring-2 ring-[#F5C45E]/60 ring-offset-1"
//                         : "bg-white"
//                     ].join(" ")}
//                   >
//                     <div className="relative shrink-0">
//                       <div
//                         className={[
//                           "w-12 h-12 rounded-full text-white flex items-center justify-center font-extrabold shadow-sm",
//                           // صورة/رمز الدائرة يبقى بتدرّجك المعتاد
//                           "bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]"
//                         ].join(" ")}
//                       >
//                         {chatReciver.name?.charAt(0)}
//                       </div>

//                       {/* النقطة تظهر فقط إذا في رسالة جديدة */}
//                       {isUnread && (
//                         <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#F5C45E] ring-2 ring-white animate-pulse" />
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="font-extrabold text-[#102E50] truncate">
//                           {chatReciver.name}
//                         </span>

//                         <div className="flex items-center gap-2 shrink-0">
//                           {isUnread ? (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E] text-white font-bold">
//                               NEW
//                             </span>
//                           ) : (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E]/25 text-[#102E50] font-bold">
//                               Seen
//                             </span>
//                           )}
//                           <span className="text-[11px] sm:text-xs text-[#102E50]/70">
//                             {new Date(msg.created_at).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                       </div>

//                       <p
//                         className={[
//                           "text-sm truncate mt-0.5",
//                           isUnread ? "text-[#102E50] font-semibold" : "text-[#102E50]/80"
//                         ].join(" ")}
//                       >
//                         {isIncoming ? "" : "You: "}
//                         {msg.text}
//                       </p>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function MessagesSlice() {
//   const user = useSelector((state) => state.UserInfo);
//   const [Messages, setMessages] = useState([]);
//   const [locallyRead, setLocallyRead] = useState(() => new Set());
//   const port = import.meta.env.VITE_PORT;
//   const navigate = useNavigate();

//   const userId = user?.user?.user_id;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/Messages`, {
//           params: { userId },
//         });
//         const data = Array.isArray(res.data) ? res.data.slice() : [];
//         data.sort((a, b) => {
//           const ta = a?.created_at ? new Date(a.created_at).getTime() : 0;
//           const tb = b?.created_at ? new Date(b.created_at).getTime() : 0;
//           return tb - ta;
//         });
//         setMessages(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [apiBase, userId]);

//   function handleOpenChat(chatReciver, chatSender, msg) {
//     setLocallyRead((prev) => {
//       const next = new Set(prev);
//       next.add(msg.message_id);
//       return next;
//     });
//     setMessages((prev) =>
//       prev.map((m) =>
//         m.message_id === msg.message_id ? { ...m, is_read: true } : m
//       )
//     );
//     navigate(`/LiveChat/${chatReciver.user_id}`, {
//       state: { sender: chatSender, reciver: chatReciver },
//     });
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF6E9]">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
//         <div className="mb-4">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50] font-extrabold">
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
//             Messages
//           </div>
//         </div>

//         {Messages.length === 0 ? (
//           <div className="grid place-items-center py-16">
//             <div className="text-center">
//               <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white grid place-items-center text-3xl font-bold shadow-md mb-4">
//                 💬
//               </div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                 No messages yet
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-sm">
//             <div className="max-h-[70vh] overflow-y-auto divide-y divide-[#102E50]/10">
//               {Messages.map((msg) => {
//                 const isIncoming = msg.sender_id !== user.user.user_id;
//                 const hasIsRead = Object.prototype.hasOwnProperty.call(msg, "is_read");
//                 const isUnreadServer = hasIsRead ? (isIncoming && !msg.is_read) : isIncoming;
//                 const isUnreadLocal = isIncoming && !locallyRead.has(msg.message_id);
//                 const isUnread = hasIsRead ? (isIncoming && !msg.is_read && isUnreadLocal) : isUnreadLocal;
//                 const chatSender = user.user;
//                 const chatReciver = isIncoming
//                   ? { user_id: msg.sender_id, name: msg.sender_name }
//                   : { user_id: msg.receiver_id, name: msg.receiver_name };

//                 return (
//                   <button
//                     key={msg.message_id}
//                     onClick={() => handleOpenChat(chatReciver, chatSender, msg)}
//                     className={[
//                       "w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition",
//                       "hover:bg-[#F5C45E]/10",
//                       isUnread
//                         ? "bg-[#F5C45E]/[0.10] ring-2 ring-[#F5C45E]/60 ring-offset-1"
//                         : "bg-white"
//                     ].join(" ")}
//                   >
//                     <div className="relative shrink-0">
//                       <div
//                         className={[
//                           "w-12 h-12 rounded-full text-white flex items-center justify-center font-extrabold shadow-sm",
//                           "bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]"
//                         ].join(" ")}
//                       >
//                         {chatReciver.name?.charAt(0)}
//                       </div>
//                       {isUnread && (
//                         <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#F5C45E] ring-2 ring-white animate-pulse" />
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="font-extrabold text-[#102E50] truncate">
//                           {chatReciver.name}
//                         </span>
//                         <div className="flex items-center gap-2 shrink-0">
//                           {isUnread ? (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E] text-white font-bold">
//                               NEW
//                             </span>
//                           ) : (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E]/25 text-[#102E50] font-bold">
//                               Seen
//                             </span>
//                           )}
//                           <span className="text-[11px] sm:text-xs text-[#102E50]/70">
//                             {new Date(msg.created_at).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                       <p
//                         className={[
//                           "text-sm truncate mt-0.5",
//                           isUnread ? "text-[#102E50] font-semibold" : "text-[#102E50]/80"
//                         ].join(" ")}
//                       >
//                         {isIncoming ? "" : "You: "}
//                         {msg.text}
//                       </p>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function MessagesSlice() {
//   const user = useSelector((state) => state.UserInfo);
//   const port = import.meta.env.VITE_PORT;
//   const navigate = useNavigate();

//   const userId = user?.user?.user_id;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);
//   const storageKey = useMemo(() => `bm_read_${userId || "anon"}`, [userId]);

//   const readFromStorage = () => {
//     try {
//       const raw = sessionStorage.getItem(storageKey);
//       if (!raw) return new Set();
//       const arr = JSON.parse(raw);
//       return new Set(Array.isArray(arr) ? arr : []);
//     } catch {
//       return new Set();
//     }
//   };

//   const saveToStorage = (set) => {
//     try {
//       sessionStorage.setItem(storageKey, JSON.stringify([...set]));
//     } catch {}
//   };

//   const [Messages, setMessages] = useState([]);
//   const [locallyRead, setLocallyRead] = useState(() => readFromStorage());

//   useEffect(() => {
//     setLocallyRead(readFromStorage());
//   }, [storageKey]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/Messages`, {
//           params: { userId },
//         });
//         const data = Array.isArray(res.data) ? res.data.slice() : [];
//         data.sort((a, b) => {
//           const ta = a?.created_at ? new Date(a.created_at).getTime() : 0;
//           const tb = b?.created_at ? new Date(b.created_at).getTime() : 0;
//           return tb - ta;
//         });
//         setMessages(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [apiBase, userId]);

//   function handleOpenChat(chatReciver, chatSender, msg) {
//     setLocallyRead((prev) => {
//       const next = new Set(prev);
//       Messages.forEach((m) => {
//         if (m.sender_id === chatReciver.user_id) next.add(m.message_id);
//       });
//       saveToStorage(next);
//       return next;
//     });
//     setMessages((prev) =>
//       prev.map((m) =>
//         m.sender_id === chatReciver.user_id ? { ...m, is_read: true } : m
//       )
//     );
//     navigate(`/LiveChat/${chatReciver.user_id}`, {
//       state: { sender: chatSender, reciver: chatReciver },
//     });
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF6E9]">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
//         <div className="mb-4">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50] font-extrabold">
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
//             Messages
//           </div>
//         </div>

//         {Messages.length === 0 ? (
//           <div className="grid place-items-center py-16">
//             <div className="text-center">
//               <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white grid place-items-center text-3xl font-bold shadow-md mb-4">
//                 💬
//               </div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                 No messages yet
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-sm">
//             <div className="max-h-[70vh] overflow-y-auto divide-y divide-[#102E50]/10">
//               {Messages.map((msg) => {
//                 const isIncoming = msg.sender_id !== user.user.user_id;
//                 const hasIsRead = Object.prototype.hasOwnProperty.call(msg, "is_read");
//                 const isUnreadLocal = isIncoming && !locallyRead.has(msg.message_id);
//                 const isUnread = hasIsRead ? (isIncoming && !msg.is_read && isUnreadLocal) : isUnreadLocal;

//                 const chatSender = user.user;
//                 const chatReciver = isIncoming
//                   ? { user_id: msg.sender_id, name: msg.sender_name }
//                   : { user_id: msg.receiver_id, name: msg.receiver_name };

//                 return (
//                   <button
//                     key={msg.message_id}
//                     onClick={() => handleOpenChat(chatReciver, chatSender, msg)}
//                     className={[
//                       "w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition",
//                       "hover:bg-[#F5C45E]/10",
//                       isUnread
//                         ? "bg-[#F5C45E]/[0.10] ring-2 ring-[#F5C45E]/60 ring-offset-1"
//                         : "bg-white"
//                     ].join(" ")}
//                   >
//                     <div className="relative shrink-0">
//                       <div
//                         className={[
//                           "w-12 h-12 rounded-full text-white flex items-center justify-center font-extrabold shadow-sm",
//                           "bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]"
//                         ].join(" ")}
//                       >
//                         {chatReciver.name?.charAt(0)}
//                       </div>
//                       {isUnread && (
//                         <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#F5C45E] ring-2 ring-white animate-pulse" />
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="font-extrabold text-[#102E50] truncate">
//                           {chatReciver.name}
//                         </span>
//                         <div className="flex items-center gap-2 shrink-0">
//                           {isUnread ? (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E] text-white font-bold">
//                               NEW
//                             </span>
//                           ) : (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E]/25 text-[#102E50] font-bold">
//                               Seen
//                             </span>
//                           )}
//                           <span className="text-[11px] sm:text-xs text-[#102E50]/70">
//                             {new Date(msg.created_at).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                       <p
//                         className={[
//                           "text-sm truncate mt-0.5",
//                           isUnread ? "text-[#102E50] font-semibold" : "text-[#102E50]/80"
//                         ].join(" ")}
//                       >
//                         {isIncoming ? "" : "You: "}
//                         {msg.text}
//                       </p>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function MessagesSlice() {
//   const user = useSelector((state) => state.UserInfo);
//   const port = import.meta.env.VITE_PORT;
//   const navigate = useNavigate();

//   const userId = user?.user?.user_id;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);
//   const storageKey = useMemo(() => `bm_read_${userId || "anon"}`, [userId]);

//   const readFromStorage = () => {
//     try {
//       const raw = sessionStorage.getItem(storageKey);
//       if (!raw) return new Set();
//       const arr = JSON.parse(raw);
//       return new Set(Array.isArray(arr) ? arr : []);
//     } catch {
//       return new Set();
//     }
//   };

//   const saveToStorage = (set) => {
//     try {
//       sessionStorage.setItem(storageKey, JSON.stringify([...set]));
//     } catch {}
//   };

//   const [Messages, setMessages] = useState([]);
//   const [locallyRead, setLocallyRead] = useState(() => readFromStorage());

//   useEffect(() => {
//     setLocallyRead(readFromStorage());
//   }, [storageKey]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/Messages`, {
//           params: { userId },
//         });
//         const data = Array.isArray(res.data) ? res.data.slice() : [];
//         data.sort((a, b) => {
//           const ta = a?.created_at ? new Date(a.created_at).getTime() : 0;
//           const tb = b?.created_at ? new Date(b.created_at).getTime() : 0;
//           return tb - ta;
//         });
//         setMessages(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [apiBase, userId]);

//   function handleOpenChat(chatReciver, chatSender, msg) {
//     setLocallyRead((prev) => {
//       const next = new Set(prev);
//       Messages.forEach((m) => {
//         if (m.sender_id === chatReciver.user_id) next.add(m.message_id);
//       });
//       saveToStorage(next);
//       return next;
//     });
//     setMessages((prev) =>
//       prev.map((m) =>
//         m.sender_id === chatReciver.user_id ? { ...m, is_read: true } : m
//       )
//     );
//     navigate(`/LiveChat/${chatReciver.user_id}`, {
//       state: { sender: chatSender, reciver: chatReciver },
//     });
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
//         <div className="mb-4">
//           <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] shadow-[0_12px_28px_rgba(16,46,80,0.10)]">
//             <div className="flex items-center justify-between rounded-[1rem] bg-[#FFF8EE] px-4 py-2.5 ring-1 ring-[#F5C45E]/40">
//               <div className="inline-flex items-center gap-2 font-extrabold">
//                 <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
//                 <span className="tracking-wide">Messages</span>
//               </div>
//               <div className="hidden sm:flex items-center gap-2 text-xs">
//                 <span className="px-2 py-1 rounded-lg bg-[#FFFDF6] ring-1 ring-[#102E50]/10">Inbox</span>
//                 <span className="px-2 py-1 rounded-lg bg-[#FFFDF6] ring-1 ring-[#102E50]/10">All</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {Messages.length === 0 ? (
//           <div className="grid place-items-center py-16">
//             <div className="text-center">
//               <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white grid place-items-center text-3xl font-bold shadow-md mb-4">
//                 💬
//               </div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                 No messages yet
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="rounded-2xl overflow-hidden bg-[#FFFDF6] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.06)]">
//             <div className="max-h-[72vh] overflow-y-auto divide-y divide-[#102E50]/10">
//               {Messages.map((msg) => {
//                 const isIncoming = msg.sender_id !== user.user.user_id;
//                 const hasIsRead = Object.prototype.hasOwnProperty.call(msg, "is_read");
//                 const isUnreadLocal = isIncoming && !locallyRead.has(msg.message_id);
//                 const isUnread = hasIsRead ? (isIncoming && !msg.is_read && isUnreadLocal) : isUnreadLocal;

//                 const chatSender = user.user;
//                 const chatReciver = isIncoming
//                   ? { user_id: msg.sender_id, name: msg.sender_name }
//                   : { user_id: msg.receiver_id, name: msg.receiver_name };

//                 return (
//                   <button
//                     key={msg.message_id}
//                     onClick={() => handleOpenChat(chatReciver, chatSender, msg)}
//                     className={[
//                       "group w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition",
//                       isUnread ? "bg-[#F5C45E]/10" : "bg-white",
//                       "hover:bg-[#F5C45E]/15"
//                     ].join(" ")}
//                   >
//                     <div className="relative shrink-0">
//                       <div className="w-12 h-12 rounded-full text-white flex items-center justify-center font-extrabold shadow-sm bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//                         {(chatReciver.name || "").charAt(0).toUpperCase()}
//                       </div>
//                       {isUnread && (
//                         <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#F5C45E] ring-2 ring-white animate-pulse" />
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="font-extrabold text-[#102E50] truncate inline-block border-b-2 border-[#102E50]/10 group-hover:border-[#F5C45E]/40">
//                           <span className="text-[#F5C45E]">{chatReciver.name}</span>
//                         </span>
//                         <div className="flex items-center gap-2 shrink-0">
//                           {isUnread ? (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E] text-white font-bold">
//                               NEW
//                             </span>
//                           ) : (
//                             <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E]/25 text-[#102E50] font-bold">
//                               Seen
//                             </span>
//                           )}
//                           <span className="text-[11px] sm:text-xs text-[#102E50]/70">
//                             {new Date(msg.created_at).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                       </div>

//                       <p
//                         className={[
//                           "mt-1 text-sm truncate",
//                           isUnread ? "text-[#102E50] font-semibold" : "text-[#102E50]/80"
//                         ].join(" ")}
//                       >
//                         {isIncoming ? "" : "You: "}
//                         {msg.text}
//                       </p>

//                       <div className="mt-2 flex items-center gap-2">
//                         <span className="h-[1px] w-10 bg-gradient-to-r from-[#F5C45E] to-transparent" />
//                         <span className="h-[1px] flex-1 bg-[#102E50]/10" />
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MessagesSlice() {
  const user = useSelector((state) => state.UserInfo);
  const port = import.meta.env.VITE_PORT;
  const navigate = useNavigate();

  const userId = user?.user?.user_id;
  const apiBase = useMemo(() => `http://localhost:${port}`, [port]);
  const storageKey = useMemo(() => `bm_read_${userId || "anon"}`, [userId]);

  const readFromStorage = () => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  };

  const saveToStorage = (set) => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify([...set]));
    } catch {}
  };

  const [Messages, setMessages] = useState([]);
  const [locallyRead, setLocallyRead] = useState(() => readFromStorage());
  const [tab, setTab] = useState("all");

  useEffect(() => {
    setLocallyRead(readFromStorage());
  }, [storageKey]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`https://backend-a2qq.onrender.com/api/Messages`, {
          params: { userId },
        });
        const data = Array.isArray(res.data) ? res.data.slice() : [];
        data.sort((a, b) => {
          const ta = a?.created_at ? new Date(a.created_at).getTime() : 0;
          const tb = b?.created_at ? new Date(b.created_at).getTime() : 0;
          return tb - ta;
        });
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [apiBase, userId]);

  function handleOpenChat(chatReciver, chatSender, msg) {
    setLocallyRead((prev) => {
      const next = new Set(prev);
      Messages.forEach((m) => {
        if (m.sender_id === chatReciver.user_id) next.add(m.message_id);
      });
      saveToStorage(next);
      return next;
    });
    setMessages((prev) =>
      prev.map((m) =>
        m.sender_id === chatReciver.user_id ? { ...m, is_read: true } : m
      )
    );
    navigate(`/LiveChat/${chatReciver.user_id}`, {
      state: { sender: chatSender, reciver: chatReciver },
    });
  }

  const computed = Messages.map((msg) => {
    const isIncoming = msg.sender_id !== user.user.user_id;
    const hasIsRead = Object.prototype.hasOwnProperty.call(msg, "is_read");
    const isUnreadLocal = isIncoming && !locallyRead.has(msg.message_id);
    const isUnread = hasIsRead ? (isIncoming && !msg.is_read && isUnreadLocal) : isUnreadLocal;
    const chatSender = user.user;
    const chatReciver = isIncoming
      ? { user_id: msg.sender_id, name: msg.sender_name }
      : { user_id: msg.receiver_id, name: msg.receiver_name };
    return { msg, isIncoming, isUnread, chatSender, chatReciver };
  });

  const list = tab === "unread" ? computed.filter((x) => x.isUnread) : computed;

  return (
    <div className="min-h-screen bg-[#faead8] text-[#102E50]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-4">
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] shadow-[0_12px_28px_rgba(16,46,80,0.10)]">
            <div className="flex items-center justify-between rounded-[1rem] bg-[#fff7ec] px-4 py-2.5 ring-1 ring-[#F5C45E]/40">
              <div className="inline-flex items-center gap-2 font-extrabold">
                <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
                <span className="tracking-wide">Messages</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTab("all")}
                  className={[
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition ring-1",
                    tab === "all"
                      ? "bg-[#F5C45E] text-[#102E50] ring-[#F5C45E]/70"
                      : "bg-[#FFFDF6] text-[#102E50] ring-[#102E50]/10 hover:bg-[#F5C45E]/15"
                  ].join(" ")}
                >
                  All
                </button>
                <button
                  onClick={() => setTab("unread")}
                  className={[
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition ring-1",
                    tab === "unread"
                      ? "bg-[#F5C45E] text-[#102E50] ring-[#F5C45E]/70"
                      : "bg-[#FFFDF6] text-[#102E50] ring-[#102E50]/10 hover:bg-[#F5C45E]/15"
                  ].join(" ")}
                >
                  Unread
                </button>
              </div>
            </div>
          </div>
        </div>

        {Messages.length === 0 ? (
          <div className="grid place-items-center py-16">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-white grid place-items-center text-3xl font-bold shadow-md mb-4">
                💬
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
                No messages yet
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden bg-[#FFFDF6] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.06)]">
            <div className="max-h-[72vh] overflow-y-auto">
              {list.map(({ msg, isIncoming, isUnread, chatSender, chatReciver }, idx) => (
                <div key={msg.message_id}>
                  <button
                    onClick={() => handleOpenChat(chatReciver, chatSender, msg)}
                    className={[
                      "group w-full text-left flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition",
                      isUnread ? "bg-[#F5C45E]/10" : "from-[#F5C45E]",
                      "hover:bg-[#F5C45E]/15"
                    ].join(" ")}
                  >
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full text-white flex items-center justify-center font-extrabold shadow-sm bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
                        {(chatReciver.name || "").charAt(0).toUpperCase()}
                      </div>
                      {isUnread && (
                        <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#F5C45E] ring-2 ring-white animate-pulse" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-extrabold text-[#102E50] truncate inline-block">
                          {chatReciver.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {isUnread ? (
                            <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E] text-white font-bold">
                              NEW
                            </span>
                          ) : (
                            <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#F5C45E]/25 text-[#102E50] font-bold">
                              Seen
                            </span>
                          )}
                          <span className="text-[11px] sm:text-xs text-[#102E50]/70">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      <p
                        className={[
                          "mt-1 text-sm truncate",
                          isUnread ? "text-[#102E50] font-semibold" : "text-[#102E50]/80"
                        ].join(" ")}
                      >
                        {isIncoming ? "" : "You: "}
                        {msg.text}
                      </p>
                    </div>
                  </button>

                  {idx !== list.length - 1 && (
                    <div className="h-[1px] bg-[#102E50]/10 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}