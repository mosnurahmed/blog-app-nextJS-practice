// src/app/page.tsx
// Replace ENTIRE file:

import Link from "next/link";
import Image from "next/image";

// কি করছি: Database functions import করছি
// কেন করছি: Real data fetch করতে featured posts এর জন্য
// কিভাবে: database.ts থেকে function import
import { getFeaturedPostsFromDB } from "@/lib/blog/database";

// কি করছি: Home page component - Server Component (async)
// কেন করছি: Database থেকে data fetch করতে পারে
// কিভাবে: async function declare করে await করছি
export default async function Home() {
  // কি করছি: Featured posts fetch করছি database থেকে
  // কেন করছি: Homepage এ highlight করতে best posts
  // কিভাবে: getFeaturedPostsFromDB() call করে, default 3 posts নিবে
  const featuredPosts = await getFeaturedPostsFromDB(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to My Blog
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Exploring web development, Next.js, React, and modern JavaScript.
            Join me on this journey of continuous learning!
          </p>
          <Link
            href="/blog"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            Explore All Posts →
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Featured Posts Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              ⭐ Featured Posts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out our most popular and featured articles
            </p>
          </div>

          {/* Featured Posts Grid */}
          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Post Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>{post.author.name}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span>👁️</span>
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl text-gray-600">
                No featured posts yet. Check back soon!
              </p>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              View All Posts →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About This Blog
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            This blog is built with{" "}
            <span className="font-bold text-blue-600">Next.js 14</span>,
            featuring Server Components, App Router, and{" "}
            <span className="font-bold text-purple-600">Prisma</span> for
            database management. I write about web development, share tutorials,
            and document my learning journey.
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Prisma",
              "PostgreSQL",
              "Tailwind CSS",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-white px-6 py-3 rounded-full font-semibold text-gray-700 shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl"
          >
            Start Reading →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-lg">
            Built with ❤️ using Next.js 14 & Prisma
          </p>
          <p className="text-gray-500 mt-2">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: "Home | Next.js Blog",
  description:
    "A modern blog built with Next.js 14, featuring tutorials and articles about web development.",
};
