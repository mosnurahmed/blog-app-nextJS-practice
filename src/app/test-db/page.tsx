// src/app/test-db/page.tsx
// কি করছি: Database থেকে data fetch করে display করছি
// কেন করছি: Verify করতে database connection working
// কিভাবে: Prisma Client দিয়ে findMany() query

import { prisma } from "@/lib/prisma/client";

// Server Component (Next.js 14 এ default)
// Server component মানে: এটা server এ execute হয়, client এ না
// Benefits: Direct database access, no API route needed, faster
export default async function TestDBPage() {
  // কি করছি: Database থেকে সব posts fetch করছি relationships সহ
  // কেন করছি: Check করতে data আছে কিনা এবং relationships কাজ করে কিনা
  // কিভাবে: prisma.post.findMany() - এটা SQL এ convert হয়ে database এ যায়

  const posts = await prisma.post.findMany({
    // include: Related tables এর data ও নিয়ে আসো (JOIN operation)
    include: {
      author: true, // Post লিখেছে কে - User table থেকে data
      category: true, // Post কোন category তে - Category table থেকে data
    },
    // orderBy: Results কিভাবে sort করবে
    // createdAt: 'desc' মানে newest first (latest posts উপরে)
    orderBy: {
      createdAt: "desc",
    },
  });

  // কি করছি: Count করছি কতজন users আছে
  // কেন করছি: Statistics দেখানোর জন্য
  // কিভাবে: prisma.user.count() - COUNT(*) SQL query run করে
  const userCount = await prisma.user.count();

  // কি করছি: Count করছি কতগুলো categories আছে
  const categoryCount = await prisma.category.count();

  // JSX return করছি - এটা HTML এর মতো দেখতে কিন্তু JavaScript এর ভিতরে
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section - Title এবং description */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            🗄️ Database Test Page
          </h1>
          <p className="text-xl text-gray-600">
            Testing Prisma connection to Vercel Postgres
          </p>
        </div>

        {/* Stats Cards - Database এর summary statistics */}
        {/* Grid layout: 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Users Count Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {userCount}
            </div>
            <div className="text-gray-600 text-lg">👥 Users</div>
          </div>

          {/* Categories Count Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold text-green-600 mb-2">
              {categoryCount}
            </div>
            <div className="text-gray-600 text-lg">📁 Categories</div>
          </div>

          {/* Posts Count Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold text-purple-600 mb-2">
              {posts.length}
            </div>
            <div className="text-gray-600 text-lg">📝 Posts</div>
          </div>
        </div>

        {/* Posts Section Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📚 Blog Posts from Database:
        </h2>

        {/* Posts List - প্রতিটা post একটা card এ show করবো */}
        <div className="space-y-6">
          {/* কি করছি: posts array loop করছি map() দিয়ে */}
          {/* কেন করছি: প্রতিটা post এর জন্য একটা card render করতে */}
          {/* কিভাবে: map() function প্রতিটা element এ call হয় এবং JSX return করে */}
          {posts.map((post) => (
            <div
              key={post.id} // React এর জন্য unique key দরকার list items এ
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >
              {/* Post Header - Title এবং badges */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800 flex-1">
                  {post.title}
                </h3>

                {/* কি করছি: Conditional rendering - featured হলে badge দেখাবো */}
                {/* কেন করছি: User কে highlight করতে কোনটা featured */}
                {/* কিভাবে: && operator - left side true হলে right side render হয় */}
                {post.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-semibold">
                    ⭐ Featured
                  </span>
                )}

                {/* Published status badge */}
                <span
                  className={`ml-2 text-sm px-3 py-1 rounded-full font-semibold ${
                    post.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {post.published ? "✅ Published" : "📝 Draft"}
                </span>
              </div>

              {/* Post Excerpt */}
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Post Meta Information - author, category, views, etc */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                {/* Author Info */}
                {/* কি করছি: post.author access করছি - এটা relationship data */}
                {/* কেন করছি: User কে বলতে post টা কে লিখেছে */}
                {/* কিভাবে: include: { author: true } করায় এই data পেয়েছি */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <span className="font-medium text-gray-700">
                    {post.author.name}
                  </span>
                </div>

                {/* Category Info */}
                {/* কি করছি: post.category access করছি - এটাও relationship data */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">📁</span>
                  <span className="font-medium text-gray-700">
                    {post.category.name}
                  </span>
                </div>

                {/* View Count */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">👁️</span>
                  <span>{post.views.toLocaleString()} views</span>
                </div>

                {/* Read Time */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  <span>{post.readTime} min read</span>
                </div>

                {/* Created Date */}
                {/* কি করছি: Date format করছি readable form এ */}
                {/* কেন করছি: User friendly date display */}
                {/* কিভাবে: toLocaleDateString() method use করে */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Message - সব ঠিক থাকলে এটা দেখাবে */}
        <div className="mt-10 bg-green-50 border-2 border-green-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">✅</span>
            <h3 className="text-2xl font-bold text-green-800">
              Database Connected Successfully!
            </h3>
          </div>
          <p className="text-green-700 text-lg">
            Prisma is successfully fetching data from Vercel Postgres database.
            All relationships are working correctly!
          </p>
        </div>
      </div>
    </div>
  );
}
