// src/app/blog/[slug]/page.tsx
// Replace ENTIRE file:

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ✅ Correct imports from database.ts (NOT utils.ts)
import {
  getPostBySlugFromDB,
  incrementPostViewsFromDB,
} from "@/lib/blog/database";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function SinglePostPage({ params }: PageProps) {
  const post = await getPostBySlugFromDB(params.slug);

  if (!post) {
    notFound();
  }

  incrementPostViewsFromDB(post.id).catch(console.error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
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
              Back to Blog
            </Link>

            <div className="mb-4">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.category.name}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>{post.author.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{post.readTime} min read</span>
              </div>

              <div className="flex items-center gap-2">
                <span>👁️</span>
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <article className="prose prose-lg max-w-none">
          <div
            className="
              prose-headings:font-bold 
              prose-h1:text-4xl 
              prose-h2:text-3xl 
              prose-h3:text-2xl
              prose-p:text-gray-700 
              prose-p:leading-relaxed
              prose-a:text-blue-600 
              prose-a:no-underline 
              prose-a:hover:underline
              prose-strong:text-gray-900
              prose-code:bg-gray-100 
              prose-code:px-2 
              prose-code:py-1 
              prose-code:rounded
              prose-pre:bg-gray-900 
              prose-pre:text-gray-100
              prose-ul:list-disc
              prose-ol:list-decimal
              prose-li:text-gray-700
              prose-blockquote:border-l-4
              prose-blockquote:border-blue-600
              prose-blockquote:pl-4
              prose-blockquote:italic
              whitespace-pre-wrap
            "
          >
            {post.content}
          </div>
        </article>

        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex items-center gap-6 bg-white p-8 rounded-xl shadow-lg">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {post.author.name}
              </h3>
              {post.author.bio && (
                <p className="text-gray-600">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlugFromDB(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}
