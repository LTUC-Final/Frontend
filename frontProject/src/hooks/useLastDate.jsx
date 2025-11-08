import axios from "axios";
import { useState } from "react";

export default function useLastDate() {
  const STATUSES = [
    "awaiting_approval",
    "pending",
    "completed",
    "rejected",
    "on_progress",
  ];

  const RECENT_DAYS = 7;
  const OLD_DAYS = 30;

  const systemContent = `
You are a helpful assistant.

Task:
1. Summarize orders by status: awaiting_approval, pending, completed, rejected, on_progress.
2. For each status, calculate:
   - Number of orders (count)
   - Total quantity
   - Total amount
   - Last order date
   - Generate a unique AI-written message for each status:
     * If the last order is recent (within 7 days), thank the customer and praise their support.
     * If the last order is old (more than 30 days), motivate them to place new orders to support skilled professionals and artisans.
     * If the last order is in-between, encourage them to stay active.
     * If no orders exist, invite them to place their first order.
3. Messages must be different in wording for each status (no repetition).
4. Start output with: "Analysis using AI:".
`;

  const [messages, setMessages] = useState([{ role: "system", content: systemContent }]);
  const [report, setReport] = useState({});

  const port = import.meta.env.VITE_PORT;

  function formatDateLocal(d) {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleString("en-GB", {
        timeZone: "Asia/Amman",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return new Date(d).toString();
    }
  }

  function daysBetween(fromDate, toDate = new Date()) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((toDate - new Date(fromDate)) / msPerDay);
  }

  async function sendMessagess(ordersInput) {
    const orders = Array.isArray(ordersInput) ? ordersInput : [];
    const now = new Date();

    const summary = {};
    STATUSES.forEach((s) => {
      summary[s] = {
        count: 0,
        totalQuantity: 0,
        totalAmount: 0,
        lastOrder: null,
        daysSinceLast: null,
        autoMessage: "",
      };
    });

    orders.forEach((order) => {
      const st = order.status || "unknown";
      const qty = Number(order.quantity) || 1;
      const amount = Number(order.totalAmount) || 0;
      const totalPrice = amount * qty;

      if (!summary[st]) {
        summary[st] = {
          count: 0,
          totalQuantity: 0,
          totalAmount: 0,
          lastOrder: null,
          daysSinceLast: null,
          autoMessage: "",
        };
      }

      summary[st].count += 1;
      summary[st].totalQuantity += qty;
      summary[st].totalAmount += totalPrice;

      if (order.orderDate) {
        const parsed = new Date(order.orderDate);
        if (!isNaN(parsed)) {
          const prev = summary[st].lastOrder ? new Date(summary[st].lastOrder) : null;
          if (!prev || parsed > prev) summary[st].lastOrder = parsed.toISOString();
        }
      }
    });

    STATUSES.forEach((s) => {
      const entry = summary[s];
      if (entry.lastOrder) {
        const days = daysBetween(entry.lastOrder, now);
        entry.daysSinceLast = days;
      }
      entry.totalAmount = Number(entry.totalAmount.toFixed(2));
    });

    setReport(summary);
     const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


    // إرسال كل البيانات للـ AI لتوليد رسائل مختلفة لكل status
    const userMessage = JSON.stringify(summary, null, 2);
    const userMsgObj = { role: "user", content: userMessage };
    const newMessagesForServer = [...messages, userMsgObj];

    try {
      const reply = await axios.post(`https://backend-a2qq.onrender.com/ai`, {newMessagesForServer}
);
      const replyText = typeof reply.data === "string" ? reply.data : JSON.stringify(reply.data, null, 2);
      setMessages((cur) => [...cur, userMsgObj, { role: "assistant", content: replyText }]);
    } catch (error) {
      console.error("AI request failed:", error);
      setMessages((cur) => [
        ...cur,
        {
          role: "assistant",
          content:
            "Failed to connect to AI service. Local summary was generated instead.",
        },
      ]);
    }
  }

  return { messages, sendMessagess, report, formatDateLocal };
}
