import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Select2({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine display text
  let displayText = placeholder || "Select";

  if (typeof value === "object" && value !== null) {
    displayText = value.name;
  } else if (value !== null && value !== undefined) {
    // If value is ID, find the matching option to show its name
    const match = options.find(
      (opt) => (typeof opt === "object" ? opt.id : opt) === value
    );
    displayText = match ? (typeof match === "object" ? match.name : match) : placeholder;
  }

  return (
    <div className="relative w-full sm:w-60" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 bg-[white] border-2 border-[#E78B48] rounded-lg text-left font-medium text-[#102E50] h-10
                   hover:border-[#F5C45E] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F5C45E] shadow-sm flex justify-between items-center transition"
      >
        <span>{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white border-2 border-[#E78B48] rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
          {options.map((option) => {
            const optionValue = typeof option === "object" ? option.id : option;
            const optionLabel = typeof option === "object" ? option.name : option;

            const isSelected =
              value === optionValue ||
              (typeof value === "object" && value !== null && value.id === optionValue);

            return (
              <div
                key={optionValue}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer text-[#102E50] hover:bg-[#FFF6E9] ${
                  isSelected ? "font-bold" : ""
                }`}
              >
                {optionLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
