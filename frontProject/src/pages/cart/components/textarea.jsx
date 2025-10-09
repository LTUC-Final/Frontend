import React from "react";

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      className={
        "flex min-h-[100px] w-full rounded-xl border-2 border-[#102E50]/40 bg-[#FFF6E9] px-4 py-3 text-[15px] text-[#102E50] placeholder-[#102E50]/50 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F5C45E]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF6E9] transition-all duration-200 ease-in-out hover:border-[#E78B48] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
