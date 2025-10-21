// src/components/blog/BlogCard.tsx
/**
 * Blog Card Component
 * Displays blog post preview
 */

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog.types";
import { formatDate } from "@/lib/blog/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300">
        {/* Cover Image */}
        <div className="relative h-48 bg-gray-200">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category & Read Time */}
          <div className="flex items-center justify-between mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readTime} min
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>

            <div className="text-gray-500 text-sm flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {post.views.toLocaleString()}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
