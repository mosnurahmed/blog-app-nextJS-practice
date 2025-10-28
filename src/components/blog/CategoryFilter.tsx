// src/components/blog/CategoryFilter.tsx
// Replace ENTIRE file:

// কি করছি: Category filter buttons component
// কেন করছি: User কে specific category এর posts filter করতে দিতে
// কিভাবে: Button group যেটা categories display করে with counts

interface CategoryFilterProps {
  categories: string[]; // Array of category names
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  postCounts: Record<string, number>; // { "Next.js": 5, "React": 3 }
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  postCounts,
}: CategoryFilterProps) {
  // Add "All" option at the beginning
  const allCategories = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {allCategories.map((category) => {
        // Check if this category is selected
        const isSelected = category === selectedCategory;

        // Get post count for this category
        const count = postCounts[category] || 0;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-200
              ${
                isSelected
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
              }
            `}
          >
            {category} ({count})
          </button>
        );
      })}
    </div>
  );
}
