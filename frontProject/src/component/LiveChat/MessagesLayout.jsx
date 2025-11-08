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
 





import { Outlet } from "react-router-dom";
import MessagesSlice from "./MessagesSlice";

export default function MessagesLayout() {
  return (
    <div className="min-h-screen bg-[#FFF6E9] flex flex-col sm:flex-row">
      <div className="w-full sm:w-[30%] lg:w-[30%] border-b sm:border-b-0 sm:border-r border-[#102E50]/30 bg-[#FFF6E9]">
        <MessagesSlice />
      </div>
      <div className="flex-1 bg-[#FFF6E9] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
