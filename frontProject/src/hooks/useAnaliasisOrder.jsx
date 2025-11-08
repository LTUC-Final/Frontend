import axios from "axios";
import { useState } from "react";

export default function useSummary() {
  //   const [messages, setmessages] = useState([
  //     {
  //       role: "system",
  //       content: `
  // You are a helpful assistant.
  // Your task:
  // - Count how many orders fall under each status (awaiting_approval, pending, completed, rejected).
  // - For each status, also calculate the total quantity and the total amount.
  // - If a status does not exist, return 0 for count, quantity, and amount.
  // - Always start the message with: "Analysis using AI:".
  // - End with a motivational summary that encourages the user based on the results (example: "You completed 5 orders successfully! Keep up the great work.").
  // - Keep the output concise and positive.
  //     `,
  //     },
  //   ]);

  const [messages, setmessages] = useState([
    {
      role: "system",
      content: `
You are a helpful assistant.

Task:
1. Summarize orders by status: awaiting_approval, pending, completed, rejected,on_proggres.
2. For each status, calculate:
   - Number of orders (count)
   - Total amount
3. If a status does not exist, return 0 for count, quantity, and amount.
4. Start the message with: "Analysis using AI:"
    `,
    },
  ]);

  const port = import.meta.env.VITE_PORT;

  async function sendMessage(text) {
    console.log("text");

     const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


    console.log(text);
    console.log("text");

    const status = text.map((st, index) => ({
      status: st.status,
      totalAmount: Number(st.totalAmount),
      quantity: Number(st.quantity),
      orderDate: st.orderDate,
    }));
    const summary = {};
    const lastOrders = {};
    console.log(status);
    status.forEach((order) => {
      const status = order.status;
      const priceString = order.totalAmount;
      const price = parseFloat(priceString) || 0;
      const totalPrice = price * (order.quantity || 1);
      if (!summary[status]) {
        summary[status] = { count: 0, totalPrice: 0 };
      }

      summary[status].count += 1;
      summary[status].totalPrice += totalPrice;
    });

    console.log("status");

    console.log(status);
    console.log("status");

    const userMessage = JSON.stringify(summary, null, 2);

    // alert(status);

    const newMessages = [...messages, { role: "user", content: userMessage }];

    setmessages(newMessages);
    console.log("llllllllllllllllll");

    console.log(messages);
    console.log("llllllllllllllllll");

    try {
      // const reply = await chat(newMessages);
      console.log("111111111");

      const reply = await axios.post(
        `https://backend-a2qq.onrender.com/ai`,
        {newMessages}, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }

      );
      console.log("2222222222222222");

      const replyText =
        typeof reply.data === "string"
          ? reply.data
          : JSON.stringify(reply.data, null, 2);
      console.log("3333333333333333333");

      setmessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: replyText },
      ]);
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssz"
      );
      console.log(messages);
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssz"
      );
    } catch (error) {
      console.log(error + " oooooooooooooooooo ");
    }
  }

  return { messages, sendMessage };
}
