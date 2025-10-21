// src/components/blog/BlogCardSkeleton.tsx

export default function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300" />

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Category & Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 w-20 bg-gray-300 rounded-full" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-6 bg-gray-300 rounded w-3/4" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="space-y-1">
              <div className="h-4 w-20 bg-gray-300 rounded" />
              <div className="h-3 w-24 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
