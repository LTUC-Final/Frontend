import axios from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";
const reactionsList = [
  { type: "love", label: "Love", emoji: <Heart />, color: "text-red-500" },
  { type: "support", label: "Support", emoji: "👏", color: "text-green-500" },
  { type: "proud", label: "Proud", emoji: "🏆", color: "text-yellow-500" },
];
const port = import.meta.env.VITE_PORT;

export default function ReactionPicker({
  product_id,
  card,
  userId,
  initialReaction,
  onReactionUpdate,
}) {
  console.log(card.reaction_counts);
  const [selectedReaction, setSelectedReaction] = useState(
    card.selectedReaction
  );
  const [showReactions, setShowReactions] = useState(false);
  const [count, setCount] = useState(0);
  const [rea, serRea] = useState(card.selectedReaction);

  const handleReaction = (type) => {
    if (selectedReaction === type) {
      setSelectedReaction(null);
      onReact(product_id, type);
      serRea(null);
      setCount(0);
    } else {
      setSelectedReaction(type);
      onReact(product_id, type);
    }
    setShowReactions(false);

    onReact(product_id, type);

    if (rea) {
      setCount(0);
    } else if (count === 0) setCount(1);
  };

  const onReact = async (product_id, reactionType) => {
    console.log("Product ID:", product_id, "Reaction:", reactionType);

    try {
      await axios.post(`http://localhost:${port}/api/product/reaction`, {
        product_id,
        userId: userId,
        type: reactionType,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2">
        <button
          className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-all duration-200 ${
            selectedReaction ? "font-semibold bg-gray-100" : "bg-gray-50"
          }`}
          onClick={() => setShowReactions(!showReactions)}
        >
          {selectedReaction ? (
            <>
              <span className="text-lg">
                {reactionsList.find((r) => r.type === selectedReaction)?.emoji}
              </span>
              <span
                className={
                  reactionsList.find((r) => r.type === selectedReaction)?.color
                }
              >
                {reactionsList.find((r) => r.type === selectedReaction)?.label}
              </span>
            </>
          ) : (
            <span>No Reaction</span>
          )}
        </button>
        <p>
          {(card.reaction_counts?.love || 0) +
            (card.reaction_counts?.proud || 0) +
            (card.reaction_counts?.support || 0) +
            count}
        </p>
      </div>

      {showReactions && (
        <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex gap-1 z-10">
          {reactionsList.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => handleReaction(reaction.type)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-110 ${
                selectedReaction === reaction.type ? "bg-gray-200" : ""
              }`}
            >
              <span className="text-2xl">{reaction.emoji}</span>
              <span className="text-xs font-medium">{reaction.label}</span>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {reaction.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
