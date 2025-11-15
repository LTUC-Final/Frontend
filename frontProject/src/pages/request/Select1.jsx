

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react"; 

export default function Select1({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="relative w-36 sm:w-44" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-1.5 bg-[#FFF6E9] border-2 border-[#102E50] rounded-md text-left font-medium text-[#102E50] h-9 sm:h-10
                   hover:border-[#F5C45E] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F5C45E] shadow-sm flex justify-between items-center"
      >
        <span>{value}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-[white] border-2 border-[#102E50] rounded-md shadow-lg z-10 max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer text-[#102E50] 
                          hover:bg-[#FFF6E9] 
                          ${option === value ? "font-bold bg-[white]" : ""}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
