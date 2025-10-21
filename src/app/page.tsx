// src/app/page.tsx
// Update করো:

import Link from "next/link";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedPosts } from "@/lib/blog/utils";

export default function Home() {
  const featuredPosts = getFeaturedPosts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Next.js Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Learn web development through practical tutorials and guides
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/blog">
              <Button
                variant="primary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Read Blog →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Posts
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular and recommended articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button variant="primary">View All Posts →</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
