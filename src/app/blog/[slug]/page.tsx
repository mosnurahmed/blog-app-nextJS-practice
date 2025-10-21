// src/app/blog/[slug]/page.tsx
// Replace ENTIRE file:

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, formatDate } from "@/lib/blog/utils";
import { mockBlogPosts } from "@/lib/data/blogPosts";

// ✅ Next.js 15: generateStaticParams is sync
export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ Next.js 15: generateMetadata receives async params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params (Next.js 15 requirement)
  const { slug } = await params;
  const post = getPostBySlug(slug);

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

// ✅ Next.js 15: Page component receives async params
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params (Next.js 15 requirement)
  const { slug } = await params;

  // Get post by slug
  const post = getPostBySlug(slug);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-flex items-center gap-2"
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

        {/* Featured Badge */}
        {post.featured && (
          <div className="mb-4">
            <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold inline-block">
              ⭐ Featured Post
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-medium">{post.author.name}</span>
          </div>

          <div className="flex items-center gap-2">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(post.publishedAt)}
          </div>

          <div className="flex items-center gap-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {post.readTime} min read
          </div>

          <div className="flex items-center gap-2">
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {post.views.toLocaleString()} views
          </div>
        </div>

        {/* Category & Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-96 mb-12 rounded-2xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-gray-800
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
            "
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br/>"),
            }}
          />
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            About the Author
          </h3>
          <div className="flex items-start gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {post.author.name}
              </h4>
              <p className="text-gray-600">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
