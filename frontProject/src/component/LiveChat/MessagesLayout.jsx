// import { Outlet } from "react-router-dom";
// import MessagesSlice from "./MessagesSlice";

// export default function MessagesLayout() {
//   return (
//     <div className="min-h-screen bg-[#FFF6E9] flex flex-col sm:flex-row">
//       <div className="w-full sm:w-[40%] lg:w-[35%] border-b sm:border-b-0 sm:border-r border-[#102E50]/10 bg-[#FFF6E9]">
//         <MessagesSlice />
//       </div>
//       <div className="flex-1 bg-[#FFF6E9] overflow-hidden">
//         <Outlet />
//       </div>
//     </div>
//   );
// }
 





import { Outlet, useLocation } from "react-router-dom";
import MessagesSlice from "./MessagesSlice";

export default function MessagesLayout() {
  const location = useLocation();
  const path = String(location.pathname || "").replace(/\/+$/, "");
  const isMessagesIndex = path.endsWith("/messages");

  return (
    <div className="min-h-screen bg-[#FFF6E9] flex flex-col sm:flex-row">
      <div className="w-full sm:w-[30%] lg:w-[30%] border-b sm:border-b-0 sm:border-r border-[#102E50]/30 bg-[#FFF6E9]">
        <MessagesSlice />
      </div>
      <div className="flex-1 bg-[#FFF6E9] overflow-hidden relative">
        {isMessagesIndex ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-xl mx-auto text-center rounded-2xl bg-white/60 backdrop-blur-sm ring-1 ring-[#102E50]/10 shadow-[0_10px_30px_rgba(16,46,80,0.08)] p-10">
              <div className="mx-auto mb-5 h-14 w-14 rounded-2xl grid place-items-center ring-1 ring-[#102E50]/10 bg-[#FFF6E9]">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#F5C45E" strokeWidth="1.8">
                  <path d="M8 9h8M8 13h5" strokeLinecap="round" />
                  <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4.5 3.5a1 1 0 0 1-1.6-.8V17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102E50]">
                Start a Conversation
              </h1>
              <p className="mt-3 text-lg sm:text-xl text-[#102E50]/70">
                Select someone from the list on the left to view messages.
              </p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
