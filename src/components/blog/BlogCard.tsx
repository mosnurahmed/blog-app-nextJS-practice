// src/components/blog/BlogCard.tsx
// Replace ENTIRE file:

import Link from "next/link";
import Image from "next/image";

// কি করছি: Prisma generated types import করছি
// কেন করছি: Props এর proper typing এর জন্য
// কিভাবে: Database generated types থেকে
import { PostWithRelations } from "@/lib/blog/utils";

// Props interface
interface BlogCardProps {
  post: PostWithRelations;
}

// কি করছি: Single blog post এর card component
// কেন করছি: Reusable card যেটা posts list এ use হবে
// কিভাবে: Props হিসেবে post object নিয়ে display করছি

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Category Badge - Positioned on Image */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {post.category.name}
          </span>
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Meta Information */}
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

        {/* Date */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>📅</span>
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
    </Link>
  );
}
