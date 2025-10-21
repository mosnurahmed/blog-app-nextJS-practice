// src/components/blog/CategoryFilter.tsx
"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  postCounts?: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  postCounts = {},
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => {
        const count = postCounts[category] || 0;
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all duration-200
              flex items-center gap-2
              ${
                isSelected
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md border-2 border-gray-200"
              }
            `}
          >
            <span>{category}</span>
            <span
              className={`
              text-sm px-2 py-0.5 rounded-full
              ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }
            `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
