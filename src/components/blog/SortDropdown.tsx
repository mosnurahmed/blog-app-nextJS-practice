// src/components/blog/SortDropdown.tsx
"use client";

import { SortOption } from "@/lib/blog/utils";

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortDropdown({
  currentSort,
  onSortChange,
}: SortDropdownProps) {
  const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: "newest", label: "Newest First", icon: "🆕" },
    { value: "oldest", label: "Oldest First", icon: "📅" },
    { value: "most-viewed", label: "Most Viewed", icon: "👁️" },
    { value: "alphabetical", label: "A-Z", icon: "🔤" },
  ];

  return (
    <div className="flex items-center gap-3">
      <label className="text-gray-700 font-medium">Sort by:</label>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.icon} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
