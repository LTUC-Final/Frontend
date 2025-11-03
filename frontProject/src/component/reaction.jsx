// "use client";

// import axios from "axios";
// import { AnimatePresence, motion } from "framer-motion";
// import { Award, Handshake, Heart, Sparkles } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// const reactionsList = [
//   {
//     type: "love",
//     label: "Love",
//     icon: Heart,
//     color: "text-red-500",
//     bgColor: "bg-red-50",
//     hoverBg: "hover:bg-red-100",
//     gradient: "from-red-400 to-pink-500",
//   },
//   {
//     type: "support",
//     label: "Support",
//     icon: Handshake,
//     color: "text-green-500",
//     bgColor: "bg-green-50",
//     hoverBg: "hover:bg-green-100",
//     gradient: "from-green-400 to-emerald-500",
//   },
//   {
//     type: "proud",
//     label: "Proud",
//     icon: Award,
//     color: "text-yellow-500",
//     bgColor: "bg-yellow-50",
//     hoverBg: "hover:bg-yellow-100",
//     gradient: "from-yellow-400 to-amber-500",
//   },
// ];

// const port = import.meta.env.VITE_PORT;

// export default function ReactionPicker({
//   product_id,
//   card,
//   userId,
//   onReactionUpdate,
// }) {
//   const [selectedReaction, setSelectedReaction] = useState(
//     card.selectedReaction
//   );
//   const [showReactions, setShowReactions] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [hoveredReaction, setHoveredReaction] = useState(null);
//   const pickerRef = useRef(null);

//   // Close popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setShowReactions(false);
//       }
//     };

//     if (showReactions)
//       document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showReactions]);

//   const handleReaction = async (type) => {
//     setIsAnimating(true);
//     await onReact(product_id, type);
//     setShowReactions(false);
//     setTimeout(() => setIsAnimating(false), 600);
//   };

//   const onReact = async (product_id, reactionType) => {
//     try {
//       const { data } = await axios.post(
//         `http://localhost:${port}/api/product/reaction`,
//         {
//           product_id,
//           userId,
//           type: reactionType,
//         }
//       );

//       setSelectedReaction(data.selectedReaction);

//       onReactionUpdate(product_id, data.reactionCounts, data.selectedReaction);
//     } catch (error) {
//       console.error("Reaction error:", error);
//     }
//   };

//   const totalReactions =
//     (card.reaction_counts?.love || 0) +
//     (card.reaction_counts?.proud || 0) +
//     (card.reaction_counts?.support || 0);

//   const selectedReactionData = reactionsList.find(
//     (r) => r.type === selectedReaction
//   );

//   return (
//     <div className="relative w-full" ref={pickerRef}>
//       <div className="flex items-center gap-3">
//         {/* Main Reaction Button */}
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className={`flex-1 relative overflow-hidden flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
//             selectedReaction
//               ? `${selectedReactionData?.bgColor} border-2 ${selectedReactionData?.color} border-current shadow-sm`
//               : "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
//           }`}
//           onClick={() => setShowReactions(!showReactions)}
//         >
//           {selectedReaction && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.1 }}
//               className={`absolute inset-0 bg-gradient-to-r ${selectedReactionData?.gradient}`}
//             />
//           )}

//           <AnimatePresence mode="wait">
//             {selectedReaction ? (
//               <motion.div
//                 key="selected"
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 exit={{ scale: 0, rotate: 180 }}
//                 transition={{ type: "spring", stiffness: 200, damping: 15 }}
//                 className="flex items-center gap-2 relative z-10"
//               >
//                 {selectedReactionData && (
//                   <>
//                     <motion.div
//                       animate={
//                         isAnimating
//                           ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
//                           : {}
//                       }
//                       transition={{ duration: 0.6 }}
//                     >
//                       <selectedReactionData.icon
//                         className={`w-5 h-5 ${selectedReactionData.color}`}
//                       />
//                     </motion.div>
//                     <span
//                       className={`font-semibold text-sm ${selectedReactionData.color}`}
//                     >
//                       {selectedReactionData.label}
//                     </span>
//                   </>
//                 )}
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="unselected"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex items-center gap-2 text-gray-600 relative z-10"
//               >
//                 <Sparkles className="w-4 h-4" />
//                 <span className="font-medium text-sm">React</span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.button>

//         {/* Reaction Count */}
//         {totalReactions > 0 && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-300 shadow-sm"
//           >
//             <motion.span
//               key={totalReactions}
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="font-bold text-sm bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
//             >
//               {totalReactions}
//             </motion.span>
//           </motion.div>
//         )}
//       </div>

//       {/* Reactions Popup */}
//       <AnimatePresence>
//         {showReactions && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-40"
//               onClick={() => setShowReactions(false)}
//             />

//             <motion.div
//               initial={{ opacity: 0, y: 10, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 10, scale: 0.9 }}
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className="absolute bottom-full left-0 mb-3 bg-white/95 backdrop-blur-xl border-2 border-gray-200 rounded-2xl shadow-2xl p-2 z-50"
//             >
//               <div className="flex gap-2">
//                 {reactionsList.map((reaction, index) => {
//                   const Icon = reaction.icon;
//                   const isSelected = selectedReaction === reaction.type;
//                   const isHovered = hoveredReaction === reaction.type;
//                   const reactionCount =
//                     card.reaction_counts?.[reaction.type] || 0; 

//                   return (
//                     <motion.button
//                       key={reaction.type}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       onClick={() => handleReaction(reaction.type)}
//                       onMouseEnter={() => setHoveredReaction(reaction.type)}
//                       onMouseLeave={() => setHoveredReaction(null)}
//                       whileHover={{ scale: 1.15, y: -4 }}
//                       whileTap={{ scale: 0.95 }}
//                       className={`relative flex flex-col items-center gap-2 -bottom-0  p-4 rounded-xl transition-all duration-300 ${
//                         isSelected
//                           ? `${reaction.bgColor} ${reaction.color} shadow-lg`
//                           : `hover:bg-gray-50 ${reaction.hoverBg}`
//                       }`}
//                     >
//                       {" "}
//                       {reactionCount > 0 && ( 
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           className={`absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${reaction.gradient} shadow-md z-20`}
//                         >
//                           {reactionCount}
//                         </motion.div>
//                       )}
//                       {isHovered && (
//                         <motion.div
//                           layoutId="glow"
//                           className={`absolute inset-0   bg-gradient-to-r ${reaction.gradient} opacity-10 rounded-xl`}
//                           transition={{ type: "spring", stiffness: 300 }}
//                         />
//                       )}
//                       <motion.div
//                         animate={
//                           isHovered
//                             ? {
//                                 rotate: [0, -10, 10, -10, 0],
//                                 scale: [1, 1.1, 1],
//                               }
//                             : {}
//                         }
//                         transition={{ duration: 0.5 }}
//                         className="relative z-10 bottom-3 "
//                       >
//                         <Icon className={`w-7 h-7  ${reaction.color}`} />
//                       </motion.div>
//                       <span
//                         className={`text-xs font-semibold relative z-10 ${
//                           isSelected ? reaction.color : "text-gray-700 "
//                         }`}
//                       >
//                         {reaction.label}
//                       </span>
//                       {isSelected && (
//                         <motion.div
//                           layoutId="selected-indicator"
//                           className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${reaction.gradient}`}
//                           transition={{ type: "spring", stiffness: 300 }}
//                         />
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>
//               {/* <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-200 rotate-45" /> */}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }










// import axios from "axios";
// import { AnimatePresence, motion } from "framer-motion";
// import { Award, Handshake, Heart, Sparkles } from "lucide-react";
// import { useEffect, useRef, useState, useMemo } from "react";

// const reactionsList = [
//   {
//     type: "love",
//     label: "Love",
//     icon: Heart,
//     color: "text-red-500",
//     bgColor: "bg-red-50",
//     hoverBg: "hover:bg-red-100",
//     gradient: "from-red-400 to-pink-500",
//     emoji: "❤️",
//   },
//   {
//     type: "support",
//     label: "Support",
//     icon: Handshake,
//     color: "text-green-600",
//     bgColor: "bg-green-50",
//     hoverBg: "hover:bg-green-100",
//     gradient: "from-green-400 to-emerald-500",
//     emoji: "💪",
//   },
//   {
//     type: "proud",
//     label: "Proud",
//     icon: Award,
//     color: "text-amber-600",
//     bgColor: "bg-yellow-50",
//     hoverBg: "hover:bg-yellow-100",
//     gradient: "from-yellow-400 to-amber-500",
//     emoji: "🏅",
//   },
// ];

// const port = import.meta.env.VITE_PORT;

// export default function ReactionPicker({
//   product_id,
//   card,
//   userId,
//   onReactionUpdate,
//   variant = "popup",
// }) {
//   const [selectedReaction, setSelectedReaction] = useState(card.selectedReaction);
//   const [showReactions, setShowReactions] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [hoveredReaction, setHoveredReaction] = useState(null);
//   const pickerRef = useRef(null);

//   const totalReactions =
//     (card.reaction_counts?.love || 0) +
//     (card.reaction_counts?.proud || 0) +
//     (card.reaction_counts?.support || 0);

//   const selectedReactionData = reactionsList.find(
//     (r) => r.type === selectedReaction
//   );

//   useEffect(() => {
//     setSelectedReaction(card.selectedReaction);
//   }, [card?.selectedReaction]);

//   useEffect(() => {
//     if (variant !== "popup") return;
//     const handleClickOutside = (event) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setShowReactions(false);
//       }
//     };
//     if (showReactions) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showReactions, variant]);

//   const onReact = async (product_id, reactionType) => {
//     try {
//       const { data } = await axios.post(
//         `http://localhost:${port}/api/product/reaction`,
//         {
//           product_id,
//           userId,
//           type: reactionType,
//         }
//       );
//       setSelectedReaction(data.selectedReaction);
//       onReactionUpdate(
//         product_id,
//         data.reactionCounts,
//         data.selectedReaction
//       );
//     } catch (error) {
//       console.error("Reaction error:", error);
//     }
//   };

//   const handleReaction = async (type) => {
//     setIsAnimating(true);
//     await onReact(product_id, type);
//     setShowReactions(false);
//     setTimeout(() => setIsAnimating(false), 600);
//   };

//   if (variant === "inline") {
//     return (
//       <div className="w-full" ref={pickerRef} onClick={(e) => e.stopPropagation()}>
//         <div className="flex items-center justify-between gap-2">
//           <div className="flex items-center gap-2 sm:gap-3">
//             {reactionsList.map((r) => {
//               const count = card.reaction_counts?.[r.type] || 0;
//               const isActive = selectedReaction === r.type;
//               return (
//                 <button
//                   key={r.type}
//                   type="button"
//                   title={`${r.emoji} ${r.label}`}
//                   aria-label={r.label}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleReaction(r.type);
//                   }}
//                   className={[
//                     "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition",
//                     "ring-1",
//                     isActive
//                       ? `${r.bgColor} ${r.color} ring-current`
//                       : "bg-white text-[#102E50] ring-[#102E50]/15 hover:ring-[#F5C45E]"
//                   ].join(" ")}
//                 >
//                   <span className="text-base leading-none">{r.emoji}</span>
//                   <span className="tabular-nums">{count}</span>
//                 </button>
//               );
//             })}
//           </div>
//           {totalReactions > 0 && (
//             <div
//               title="Total reactions"
//               className="min-w-[2.25rem] h-8 px-2 grid place-items-center rounded-lg bg-white ring-1 ring-[#0f2a47]/10"
//             >
//               <span className="text-[11px] sm:text-xs font-bold">{totalReactions}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full" ref={pickerRef}>
//       <div className="flex items-center gap-3">
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className={`flex-1 relative overflow-hidden flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
//             selectedReaction
//               ? `${selectedReactionData?.bgColor} border-2 ${selectedReactionData?.color} border-current shadow-sm`
//               : "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
//           }`}
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowReactions(!showReactions);
//           }}
//         >
//           {selectedReaction && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.1 }}
//               className={`absolute inset-0 bg-gradient-to-r ${selectedReactionData?.gradient}`}
//             />
//           )}
//           <AnimatePresence mode="wait">
//             {selectedReaction ? (
//               <motion.div
//                 key="selected"
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 exit={{ scale: 0, rotate: 180 }}
//                 transition={{ type: "spring", stiffness: 200, damping: 15 }}
//                 className="flex items-center gap-2 relative z-10"
//                 title={`${selectedReactionData?.emoji} ${selectedReactionData?.label}`}
//               >
//                 {selectedReactionData && (
//                   <>
//                     <motion.div
//                       animate={
//                         isAnimating
//                           ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
//                           : {}
//                       }
//                       transition={{ duration: 0.6 }}
//                     >
//                       <selectedReactionData.icon
//                         className={`w-5 h-5 ${selectedReactionData.color}`}
//                       />
//                     </motion.div>
//                     <span
//                       className={`font-semibold text-sm ${selectedReactionData.color}`}
//                     >
//                       {selectedReactionData.label}
//                     </span>
//                   </>
//                 )}
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="unselected"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex items-center gap-2 text-gray-600 relative z-10"
//                 title="React"
//               >
//                 <Sparkles className="w-4 h-4" />
//                 <span className="font-medium text-sm">React</span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.button>
//         {totalReactions > 0 && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-300 shadow-sm"
//             title="Total reactions"
//           >
//             <motion.span
//               key={totalReactions}
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="font-bold text-sm bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
//             >
//               {totalReactions}
//             </motion.span>
//           </motion.div>
//         )}
//       </div>
//       <AnimatePresence>
//         {showReactions && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-40"
//               onClick={() => setShowReactions(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, y: 10, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 10, scale: 0.9 }}
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className="absolute bottom-full left-0 mb-3 bg-white/95 backdrop-blur-xl border-2 border-gray-200 rounded-2xl shadow-2xl p-2 z-50"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex gap-2">
//                 {reactionsList.map((reaction, index) => {
//                   const Icon = reaction.icon;
//                   const isSelected = selectedReaction === reaction.type;
//                   const isHovered = hoveredReaction === reaction.type;
//                   const reactionCount = card.reaction_counts?.[reaction.type] || 0;
//                   return (
//                     <motion.button
//                       key={reaction.type}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       onClick={() => handleReaction(reaction.type)}
//                       onMouseEnter={() => setHoveredReaction(reaction.type)}
//                       onMouseLeave={() => setHoveredReaction(null)}
//                       whileHover={{ scale: 1.15, y: -4 }}
//                       whileTap={{ scale: 0.95 }}
//                       className={`relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
//                         isSelected
//                           ? `${reaction.bgColor} ${reaction.color} shadow-lg`
//                           : `hover:bg-gray-50 ${reaction.hoverBg}`
//                       }`}
//                       title={`${reaction.emoji} ${reaction.label}`}
//                       aria-label={reaction.label}
//                     >
//                       {reactionCount > 0 && (
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           className={`absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${reaction.gradient} shadow-md z-20`}
//                         >
//                           {reactionCount}
//                         </motion.div>
//                       )}
//                       {isHovered && (
//                         <motion.div
//                           layoutId="glow"
//                           className={`absolute inset-0 bg-gradient-to-r ${reaction.gradient} opacity-10 rounded-xl`}
//                           transition={{ type: "spring", stiffness: 300 }}
//                         />
//                       )}
//                       <motion.div
//                         animate={
//                           isHovered
//                             ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }
//                             : {}
//                         }
//                         transition={{ duration: 0.5 }}
//                         className="relative z-10 -mb-1"
//                       >
//                         <Icon className={`w-7 h-7 ${reaction.color}`} />
//                       </motion.div>
//                       <span
//                         className={`text-xs font-semibold relative z-10 ${
//                           isSelected ? reaction.color : "text-gray-700"
//                         }`}
//                       >
//                         {reaction.label}
//                       </span>
//                       {isSelected && (
//                         <motion.div
//                           layoutId="selected-indicator"
//                           className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${reaction.gradient}`}
//                           transition={{ type: "spring", stiffness: 300 }}
//                         />
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }












import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Handshake, Heart, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

const reactionsList = [
  {
    type: "love",
    label: "Love",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    hoverBg: "hover:bg-red-100",
    gradient: "from-red-400 to-pink-500",
    emoji: "❤️",
  },
  {
    type: "support",
    label: "Support",
    icon: Handshake,
    color: "text-green-600",
    bgColor: "bg-green-50",
    hoverBg: "hover:bg-green-100",
    gradient: "from-green-400 to-emerald-500",
    emoji: "💪",
  },
  {
    type: "proud",
    label: "Proud",
    icon: Award,
    color: "text-amber-600",
    bgColor: "bg-yellow-50",
    hoverBg: "hover:bg-yellow-100",
    gradient: "from-yellow-400 to-amber-500",
    emoji: "🏅",
  },
];

const port = import.meta.env.VITE_PORT;

export default function ReactionPicker({
  product_id,
  card,
  userId,
  onReactionUpdate,
  variant = "popup",
}) {
  const [selectedReaction, setSelectedReaction] = useState(card.selectedReaction);
  const [showReactions, setShowReactions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState(null);
  const pickerRef = useRef(null);

  const totalReactions =
    (card.reaction_counts?.love || 0) +
    (card.reaction_counts?.proud || 0) +
    (card.reaction_counts?.support || 0);

  const selectedReactionData = reactionsList.find(
    (r) => r.type === selectedReaction
  );

  useEffect(() => {
    setSelectedReaction(card.selectedReaction);
  }, [card?.selectedReaction]);

  useEffect(() => {
    if (variant !== "popup") return;
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowReactions(false);
      }
    };
    if (showReactions) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showReactions, variant]);

  const onReact = async (product_id, reactionType) => {
    try {
      const { data } = await axios.post(
        `http://localhost:${port}/api/product/reaction`,
        {
          product_id,
          userId,
          type: reactionType,
        }
      );
      setSelectedReaction(data.selectedReaction);
      onReactionUpdate(
        product_id,
        data.reactionCounts,
        data.selectedReaction
      );
    } catch (error) {
      console.error("Reaction error:", error);
    }
  };

  const handleReaction = async (type) => {
    setIsAnimating(true);
    await onReact(product_id, type);
    setShowReactions(false);
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (variant === "inline") {
    return (
      <div className="w-full" ref={pickerRef} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {reactionsList.map((r) => {
              const count = card.reaction_counts?.[r.type] || 0;
              const isActive = selectedReaction === r.type;
              return (
                <button
                  key={r.type}
                  type="button"
                  title={`${r.emoji} ${r.label}`}
                  aria-label={r.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReaction(r.type);
                  }}
                  className={[
                    "group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition",
                    "ring-1",
                    isActive
                      ? `${r.bgColor} ${r.color} ring-current`
                      : "bg-white text-[#102E50] ring-[#102E50]/15 hover:ring-[#F5C45E]"
                  ].join(" ")}
                >
                  <span className="text-base leading-none">{r.emoji}</span>
                  <span className="tabular-nums">{count}</span>
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-bold bg-[#102E50] text-white opacity-0 group-hover:opacity-100 shadow transition">
                    {r.label}
                  </span>
                </button>
              );
            })}
          </div>
          {totalReactions > 0 && (
            <div
              title="Total reactions"
              className="min-w-[2.25rem] h-8 px-2 grid place-items-center rounded-lg bg-white ring-1 ring-[#0f2a47]/10"
            >
              <span className="text-[11px] sm:text-xs font-bold">{totalReactions}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={pickerRef}>
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 relative overflow-hidden flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
            selectedReaction
              ? `${selectedReactionData?.bgColor} border-2 ${selectedReactionData?.color} border-current shadow-sm`
              : "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setShowReactions(!showReactions);
          }}
        >
          {selectedReaction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              className={`absolute inset-0 bg-gradient-to-r ${selectedReactionData?.gradient}`}
            />
          )}
          <AnimatePresence mode="wait">
            {selectedReaction ? (
              <motion.div
                key="selected"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex items-center gap-2 relative z-10"
                title={`${selectedReactionData?.emoji} ${selectedReactionData?.label}`}
              >
                {selectedReactionData && (
                  <>
                    <motion.div
                      animate={
                        isAnimating
                          ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                    >
                      <selectedReactionData.icon
                        className={`w-5 h-5 ${selectedReactionData.color}`}
                      />
                    </motion.div>
                    <span
                      className={`font-semibold text-sm ${selectedReactionData.color}`}
                    >
                      {selectedReactionData.label}
                    </span>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="unselected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-gray-600 relative z-10"
                title="React"
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-medium text-sm">React</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        {totalReactions > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-300 shadow-sm"
            title="Total reactions"
          >
            <motion.span
              key={totalReactions}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-bold text-sm bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
            >
              {totalReactions}
            </motion.span>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {showReactions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowReactions(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-full left-0 mb-3 bg-white/95 backdrop-blur-xl border-2 border-gray-200 rounded-2xl shadow-2xl p-2 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2">
                {reactionsList.map((reaction, index) => {
                  const Icon = reaction.icon;
                  const isSelected = selectedReaction === reaction.type;
                  const isHovered = hoveredReaction === reaction.type;
                  const reactionCount = card.reaction_counts?.[reaction.type] || 0;
                  return (
                    <motion.button
                      key={reaction.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleReaction(reaction.type)}
                      onMouseEnter={() => setHoveredReaction(reaction.type)}
                      onMouseLeave={() => setHoveredReaction(null)}
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? `${reaction.bgColor} ${reaction.color} shadow-lg`
                          : `hover:bg-gray-50 ${reaction.hoverBg}`
                      }`}
                      title={`${reaction.emoji} ${reaction.label}`}
                      aria-label={reaction.label}
                    >
                      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-bold bg-[#102E50] text-white opacity-0 group-hover:opacity-100 shadow transition">
                        {reaction.label}
                      </span>
                      {reactionCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${reaction.gradient} shadow-md z-20`}
                        >
                          {reactionCount}
                        </motion.div>
                      )}
                      {isHovered && (
                        <motion.div
                          layoutId="glow"
                          className={`absolute inset-0 bg-gradient-to-r ${reaction.gradient} opacity-10 rounded-xl`}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                      <motion.div
                        animate={
                          isHovered
                            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                        className="relative z-10 -mb-1"
                      >
                        <Icon className={`w-7 h-7 ${reaction.color}`} />
                      </motion.div>
                      <span
                        className={`text-xs font-semibold relative z-10 ${
                          isSelected ? reaction.color : "text-gray-700"
                        }`}
                      >
                        {reaction.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          layoutId="selected-indicator"
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${reaction.gradient}`}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
