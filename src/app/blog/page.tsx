// src/app/blog/page.tsx
// Replace ENTIRE file:

import { Suspense } from "react";
import Link from "next/link";
import BlogPageContent from "./BlogPageContent";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";

// কি করছি: Database functions import করছি
// কেন করছি: Server Component থেকে data fetch করতে
// কিভাবে: Named imports from database.ts file
import { getAllPostsFromDB, getAllCategoriesFromDB } from "@/lib/blog/database";

// Loading fallback component
function BlogPageLoading() {
  return (
    <>
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="h-14 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="mb-12">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-6 animate-pulse" />
        <div className="flex gap-3 justify-center flex-wrap">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-24 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

// কি করছি: Async wrapper component data fetch এর জন্য
// কেন করছি: Server Component এ async data loading করতে
// কিভাবে: async function যেটা database queries run করে

async function BlogPageData() {
  // কি করছি: Database থেকে posts এবং categories fetch করছি parallel এ
  // কেন করছি: Page render করার জন্য data দরকার
  // কিভাবে: Promise.all দিয়ে both queries simultaneously run করছি

  // Promise.all কি করে:
  // - দুইটা async operations একসাথে start করে
  // - দুইটাই complete হওয়ার জন্য wait করে
  // - দুইটা results একসাথে return করে
  // Benefits: Faster than sequential (এক এর পর এক)

  const [posts, categories] = await Promise.all([
    getAllPostsFromDB(), // Fetch all published posts
    getAllCategoriesFromDB(), // Fetch all categories with counts
  ]);

  // কি return করছি: BlogPageContent component with fetched data as props
  // Server Component থেকে Client Component এ data pass হচ্ছে
  return (
    <BlogPageContent initialPosts={posts} initialCategories={categories} />
  );
}

// Main page component
export default function BlogPage() {
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

        {/* 
          কি করছি: Suspense boundary with data fetching component
          কেন করছি: Async data loading gracefully handle করতে
          কিভাবে: Suspense shows fallback while BlogPageData fetches data
          
          Flow:
          1. BlogPageData component mount হয়
          2. Database queries start (await করে)
          3. Meanwhile, BlogPageLoading shows (skeleton UI)
          4. Queries complete হলে actual content replace করে loading UI
          5. User smooth experience পায় - no blank screen
        */}
        <Suspense fallback={<BlogPageLoading />}>
          <BlogPageData />
        </Suspense>
      </div>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: "Blog | Next.js Blog App",
  description:
    "Read our latest articles about web development, Next.js, React, and more.",
};
