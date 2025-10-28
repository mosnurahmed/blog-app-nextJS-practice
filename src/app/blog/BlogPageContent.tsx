// src/app/blog/BlogPageContent.tsx
// Replace ENTIRE file:

"use client";

// কি করছি: React hooks এবং Next.js utilities import করছি
// কেন করছি: State management, routing, transitions এর জন্য
// কিভাবে: named imports দিয়ে specific functions নিচ্ছি

import { useState, useMemo, useTransition, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// UI Components import
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import SearchBar from "@/components/blog/SearchBar";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SortDropdown from "@/components/blog/SortDropdown";
import Pagination from "@/components/blog/Pagination";

// Utility functions (sorting, pagination logic)
import { sortPosts, paginatePosts, SortOption } from "@/lib/blog/utils";

// Types from Prisma
import { PostWithRelations, CategoryWithCount } from "@/lib/blog/database";

// Constants
const POSTS_PER_PAGE = 6;

// ============================================
// Props Interface
// ============================================
// কি করছি: Component এর props define করছি TypeScript দিয়ে
// কেন করছি: Type safety ensure করতে, bugs prevent করতে
// কিভাবে: interface declaration যেখানে প্রতিটা prop এর type specify করা

interface BlogPageContentProps {
  // initialPosts: Server থেকে pre-fetched posts data
  // এটা Server Component pass করবে এই Client Component কে
  initialPosts: PostWithRelations[];

  // initialCategories: Server থেকে pre-fetched categories
  // Post counts সহ আসবে (কোন category তে কতগুলো posts)
  initialCategories: CategoryWithCount[];
}

// ============================================
// Main Component
// ============================================
export default function BlogPageContent({
  initialPosts,
  initialCategories,
}: BlogPageContentProps) {
  // ------------------------------------------
  // Hooks Setup
  // ------------------------------------------

  // useRouter: URL programmatically change করার জন্য
  // useSearchParams: URL query parameters read করার জন্য
  // useTransition: Smooth UI transitions এর জন্য (loading states)
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // ------------------------------------------
  // State Management
  // ------------------------------------------
  // কি করছি: Component এর internal state manage করছি
  // কেন করছি: User interactions track করতে (search, filter, sort)
  // কিভাবে: useState hooks - প্রতিটা state একটা value store করে

  // Search query state - user কি search করছে
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Category filter state - কোন category selected
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sort option state - কিভাবে posts sorted (newest, oldest, popular)
  const initialSort = (searchParams.get("sort") as SortOption) || "newest";
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  // Pagination state - currently কোন page এ আছি
  const initialPage = parseInt(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Posts state - displayed posts (filtered, sorted, paginated)
  const posts = initialPosts;

  // ------------------------------------------
  // URL Update Function
  // ------------------------------------------
  // কি করছি: URL query parameters update করার helper function
  // কেন করছি: User এর selections URL এ reflect করতে (shareable, bookmarkable)
  // কিভাবে: URLSearchParams API use করে query string build করছি

  const updateURL = (updates: Record<string, string>) => {
    // Current search params থেকে শুরু করছি
    const params = new URLSearchParams(searchParams.toString());

    // Updates object loop করে প্রতিটা key-value set করছি
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "All") {
        // Value আছে এবং 'All' না → params এ add করো
        params.set(key, value);
      } else {
        // Value নাই বা 'All' → params থেকে remove করো
        params.delete(key);
      }
    });

    // startTransition দিয়ে wrap করছি smooth transition এর জন্য
    // এটা React 18 এর feature - UI responsive রাখে navigation এর সময়
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  // ------------------------------------------
  // Data Processing with useMemo
  // ------------------------------------------
  // কি করছি: Posts filter, sort, paginate করছি
  // কেন করছি: User এর selections অনুযায়ী posts display করতে
  // কিভাবে: useMemo hook - expensive calculations cache করে

  // useMemo কি করে:
  // - First time: Calculation run করে, result save করে
  // - Next times: Dependencies না বদলালে saved result return করে
  // - Dependencies বদলালে: Re-calculate করে
  // Benefits: Performance optimize, unnecessary re-calculations avoid করে

  const { paginatedPosts, pagination } = useMemo(() => {
    // Step 1: Start with all posts
    let filteredPosts = posts;

    // Step 2: Apply category filter
    // যদি 'All' না হয় তাহলে শুধু selected category এর posts নাও
    if (selectedCategory !== "All") {
      filteredPosts = filteredPosts.filter(
        (post) => post.category.name === selectedCategory
      );
    }

    // Step 3: Apply search filter
    // Search query খালি না হলে title/excerpt/content এ search করো
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    // Step 4: Sort posts
    // sortPosts utility function use করে (utils.ts এ defined)
    filteredPosts = sortPosts(filteredPosts, sortBy);

    // Step 5: Paginate
    // paginatePosts utility function current page অনুযায়ী slice করে
    const result = paginatePosts(filteredPosts, currentPage, POSTS_PER_PAGE);

    // Return both paginated posts and pagination info
    return {
      paginatedPosts: result.posts,
      pagination: result.pagination,
    };
  }, [posts, selectedCategory, searchQuery, sortBy, currentPage]);
  // Dependencies: এগুলো যেকোনো একটা change হলে re-calculate হবে

  // ------------------------------------------
  // Category Post Counts
  // ------------------------------------------
  // কি করছি: প্রতিটা category তে কতগুলো posts আছে calculate করছি
  // কেন করছি: Category buttons এ count show করতে "Next.js (5)"
  // কিভাবে: useMemo দিয়ে efficient calculation

  const postCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: posts.length, // 'All' এ total posts
    };

    // প্রতিটা post loop করে তার category count increase করো
    posts.forEach((post) => {
      const categoryName = post.category.name;
      counts[categoryName] = (counts[categoryName] || 0) + 1;
    });

    return counts;
  }, [posts]);

  // ------------------------------------------
  // Event Handlers
  // ------------------------------------------
  // এগুলো functions যেগুলো user actions handle করে

  // Handle Search
  // যখন user search bar এ type করে
  const handleSearch = (query: string) => {
    setSearchQuery(query); // State update করো
    setCurrentPage(1); // First page এ reset করো
    updateURL({ search: query, page: "1" }); // URL update করো
  };

  // Handle Category Change
  // যখন user category button click করে
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateURL({ category, page: "1" });
  };

  // Handle Sort Change
  // যখন user sort dropdown থেকে option select করে
  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
    updateURL({ sort, page: "1" });
  };

  // Handle Page Change
  // যখন user pagination button click করে
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page: page.toString() });
    // Scroll to top smoothly যাতে user নতুন content দেখে
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear All Filters
  // যখন user "Clear all" button click করে
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
    setCurrentPage(1);
    router.push("/blog"); // Clean URL এ navigate করো
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || sortBy !== "newest";

  // ------------------------------------------
  // JSX Return - UI Rendering
  // ------------------------------------------
  return (
    <>
      {/* Search Bar Section */}
      <div className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search posts by title, content, or tags..."
        />
      </div>

      {/* Category Filter Section */}
      <div className="mb-12">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
          Filter & Sort
        </h2>
        <CategoryFilter
          categories={initialCategories.map((cat) => cat.name)}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          postCounts={postCounts}
        />
      </div>

      {/* Sort & Stats Row */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <SortDropdown currentSort={sortBy} onSortChange={handleSortChange} />

        <div className="text-gray-600">
          Found{" "}
          <span className="font-bold text-blue-600">
            {pagination.totalPosts}
          </span>{" "}
          posts
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 bg-white rounded-lg p-4 shadow-md">
          <span className="text-gray-600 font-medium">Active filters:</span>

          {selectedCategory !== "All" && (
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              📁 {selectedCategory}
              <button
                onClick={() => handleCategoryChange("All")}
                className="hover:text-blue-600 text-lg leading-none"
              >
                ×
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              🔍 &apos;{searchQuery}&apos;
              <button
                onClick={() => handleSearch("")}
                className="hover:text-green-600 text-lg leading-none"
              >
                ×
              </button>
            </span>
          )}

          {sortBy !== "newest" && (
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              ⚡ {sortBy}
              <button
                onClick={() => handleSortChange("newest")}
                className="hover:text-purple-600 text-lg leading-none"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
          >
            Clear all ✕
          </button>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {!isPending && paginatedPosts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!isPending && paginatedPosts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? `No results for '${searchQuery}'`
              : `No posts in ${selectedCategory} category`}
          </p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
