// src/components/blog/SortDropdown.tsx
// Replace ENTIRE file for consistency:

"use client";

import { useState } from "react";
import { SortOption } from "@/lib/blog/utils";

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortDropdown({
  currentSort,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ All sort options with proper types
  const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: "newest", label: "Newest First", icon: "🆕" },
    { value: "oldest", label: "Oldest First", icon: "📅" },
    { value: "most-viewed", label: "Most Viewed", icon: "👁️" },
    { value: "alphabetical", label: "A-Z", icon: "🔤" },
  ];

  const currentOption =
    sortOptions.find((opt) => opt.value === currentSort) || sortOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold text-gray-700"
      >
        <span>{currentOption.icon}</span>
        <span>Sort: {currentOption.label}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl z-20 min-w-[200px] overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-6 py-3 hover:bg-blue-50 transition-colors text-left
                  ${
                    option.value === currentSort
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700"
                  }
                `}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
                {option.value === currentSort && (
                  <span className="ml-auto">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
