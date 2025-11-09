// src/pages/CancelPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cart"); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-#FFF6E9">
      <div className="p-10 bg-white shadow-2xl rounded-lg text-center max-w-md mx-4 border-t-4 border-[#BE3D2A]">
        <div className="w-16 h-16 bg-[#BE3D2A] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-[#102E50] mb-2">
          Payment Cancelled
        </h1>

        <p className="text-lg text-[#BE3D2A] font-semibold mb-4">
          Your payment has been cancelled.
        </p>

        <p className="text-gray-600 mb-6">
          You will be redirected back to your shopping cart...
        </p>
      </div>
    </div>
  );
}