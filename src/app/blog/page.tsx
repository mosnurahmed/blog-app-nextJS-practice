// src/app/blog/page.tsx
// Replace ENTIRE file with this (all quotes fixed):

"use client";

import { useState, useMemo, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import SearchBar from "@/components/blog/SearchBar";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SortDropdown from "@/components/blog/SortDropdown";
import Pagination from "@/components/blog/Pagination";
import {
  getAllPosts,
  sortPosts,
  paginatePosts,
  SortOption,
} from "@/lib/blog/utils";
import { getAllCategories } from "@/lib/data/blogPosts";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get initial values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialSort = (searchParams.get("sort") as SortOption) || "newest";
  const initialPage = parseInt(searchParams.get("page") || "1");

  const allPosts = getAllPosts();
  const categories = getAllCategories();

  // State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Update URL when filters change
  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "All") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  // Filter, sort, and paginate posts
  const { paginatedPosts, pagination } = useMemo(() => {
    let posts = allPosts;

    // Apply category filter
    if (selectedCategory !== "All") {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    posts = sortPosts(posts, sortBy);

    // Apply pagination
    const result = paginatePosts(posts, currentPage, POSTS_PER_PAGE);

    return {
      paginatedPosts: result.posts,
      pagination: result.pagination,
    };
  }, [allPosts, selectedCategory, searchQuery, sortBy, currentPage]);

  // Count posts per category
  const postCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allPosts.length };

    allPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });

    return counts;
  }, [allPosts]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateURL({ search: query, page: "1" });
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateURL({ category, page: "1" });
  };

  // Handle sort change
  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
    updateURL({ sort, page: "1" });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
    setCurrentPage(1);
    router.push("/blog");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Tutorials, tips, and insights about web development, Next.js, React,
            and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search posts by title, content, or tags..."
          />
        </div>

        {/* Filters Row */}
        <div className="mb-12">
          <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
            Filter & Sort
          </h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            postCounts={postCounts}
          />
        </div>

        {/* Sort & Stats */}
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

        {/* Active Filters */}
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
      </div>
    </div>
  );
}
