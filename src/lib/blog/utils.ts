// src/lib/blog/utils.ts
// Replace ENTIRE file:

// কি করছি: Blog related utility functions define করছি
// কেন করছি: Reusable logic centralize করতে, DRY principle follow করতে
// কিভাবে: Pure functions যেগুলো input নিয়ে output দেয়, side effects নাই

// Import Prisma types
// কি করছি: Database থেকে generate হওয়া types import করছি
// কেন করছি: Type safety ensure করতে, autocomplete পেতে
// কিভাবে: Prisma Client থেকে type definitions
import { Post, User, Category } from '@prisma/client'

// ============================================
// TYPE DEFINITIONS
// ============================================

// কি করছি: Custom type define করছি Post with relations এর জন্য
// কেন করছি: Posts যখন fetch করি include সহ, তখন এই type use হবে
// কিভাবে: Intersection types (&) দিয়ে combine করছি

// PostWithRelations type:
// - Base Post type (id, title, content, etc.)
// - PLUS author relation (User object)
// - PLUS category relation (Category object)
export type PostWithRelations = Post & {
  author: User
  category: Category
}

// Sort options type
// কি করছি: Valid sort options এর union type
// কেন করছি: TypeScript যাতে invalid options prevent করে
// কিভাবে: String literal union type
export type SortOption = 'newest' | 'oldest' | 'popular' | 'title' | 'most-viewed' | 'alphabetical'


// ============================================
// FUNCTION 1: Sort Posts
// ============================================

// কি করে: Posts array কে sort করে given option অনুযায়ী
// কখন use হবে: User dropdown থেকে sort option select করলে
// Input: posts array, sort option
// Output: Sorted posts array (new array, original unchanged)

export function sortPosts(
  posts: PostWithRelations[], 
  sortBy: SortOption
): PostWithRelations[] {
  
  const sortedPosts = [...posts]
  
  switch (sortBy) {
    case 'newest':
      return sortedPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    
    case 'oldest':
      return sortedPosts.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    
    case 'popular':
    case 'most-viewed':  // ✅ Add this case
      return sortedPosts.sort((a, b) => b.views - a.views)
    
    case 'title':
    case 'alphabetical':  // ✅ Add this case
      return sortedPosts.sort((a, b) => 
        a.title.localeCompare(b.title)
      )
    
    default:
      return sortedPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }
}
// ============================================
// FUNCTION 2: Paginate Posts
// ============================================

// কি করে: Posts array কে paginate করে (slice করে specific page এর জন্য)
// কখন use হবে: Pagination buttons click করলে
// Input: posts array, page number, posts per page
// Output: Object with paginated posts + pagination metadata

export function paginatePosts(
  posts: PostWithRelations[], 
  page: number, 
  postsPerPage: number
) {
  
  // ------------------------------------------
  // Calculate pagination values
  // ------------------------------------------
  
  // Total posts count
  const totalPosts = posts.length
  
  // Calculate total pages needed
  // Math.ceil rounds up - যদি 13 posts আর 6 per page হয়, তাহলে 3 pages
  // কেন ceil: Partial page ও count করতে হবে (13/6 = 2.16... → 3 pages)
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  
  // Validate current page
  // কি করছি: Page number valid range এ আছে কিনা check করছি
  // কেন করছি: Invalid page numbers handle করতে (user manually URL change করলে)
  // কিভাবে: Clamp করছি 1 এবং totalPages এর মধ্যে
  
  // Math.max(1, page): Ensures page >= 1 (no negative or zero pages)
  // Math.min(..., totalPages): Ensures page <= totalPages (no overflow)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  // ------------------------------------------
  // Calculate slice indices
  // ------------------------------------------
  
  // Start index for array slice
  // কি করছি: Calculate করছি কোন index থেকে slice শুরু হবে
  // কেন করছি: Correct page এর posts extract করতে
  // কিভাবে: (page - 1) * postsPerPage
  
  // Example: Page 1, 6 per page → (1-1)*6 = 0 (starts at index 0)
  // Example: Page 2, 6 per page → (2-1)*6 = 6 (starts at index 6)
  // Example: Page 3, 6 per page → (3-1)*6 = 12 (starts at index 12)
  const startIndex = (currentPage - 1) * postsPerPage
  
  // End index for array slice
  // Simply add postsPerPage to startIndex
  // Example: Page 1 → 0 + 6 = 6 (indices 0-5, total 6 items)
  const endIndex = startIndex + postsPerPage
  
  // ------------------------------------------
  // Slice the array
  // ------------------------------------------
  
  // কি করছি: Array slice করছি startIndex থেকে endIndex পর্যন্ত
  // কেন করছি: শুধু current page এর posts নিতে
  // কিভাবে: Array.slice(start, end) - end exclusive
  
  // slice() method:
  // - Returns new array (doesn't mutate original)
  // - start inclusive, end exclusive
  // - If end > array length, goes till end (no error)
  const paginatedPosts = posts.slice(startIndex, endIndex)
  
  // ------------------------------------------
  // Calculate navigation states
  // ------------------------------------------
  
  // Can go to previous page?
  const hasPrevPage = currentPage > 1
  
  // Can go to next page?
  const hasNextPage = currentPage < totalPages
  
  // Previous page number (null if no previous)
  const prevPage = hasPrevPage ? currentPage - 1 : null
  
  // Next page number (null if no next)
  const nextPage = hasNextPage ? currentPage + 1 : null
  
  // ------------------------------------------
  // Return complete pagination object
  // ------------------------------------------
  
  return {
    // Paginated posts for current page
    posts: paginatedPosts,
    
    // Pagination metadata
    pagination: {
      currentPage,     // Current page number
      totalPages,      // Total number of pages
      totalPosts,      // Total posts count
      postsPerPage,    // Posts per page (constant)
      hasPrevPage,     // Boolean: can go back?
      hasNextPage,     // Boolean: can go forward?
      prevPage,        // Previous page number or null
      nextPage,        // Next page number or null
      startIndex: startIndex + 1,  // Starting post number (1-indexed for display)
      endIndex: Math.min(endIndex, totalPosts),  // Ending post number
    }
  }
}

// ============================================
// FUNCTION 3: Calculate Read Time
// ============================================

// কি করে: Content এর length থেকে reading time estimate করে
// কখন use হবে: Post create/update করার সময় automatically calculate
// Input: content string (markdown)
// Output: minutes (number)

export function calculateReadTime(content: string): number {
  
  // কি করছি: Content এর words count করছি
  // কেন করছি: Reading time calculate করতে word count দরকার
  // কিভাবে: Split করে spaces দিয়ে, তারপর filter করে empty strings
  
  // Steps:
  // 1. trim() - leading/trailing whitespace remove
  // 2. split(/\s+/) - split by one or more whitespace characters
  //    \s = whitespace (space, tab, newline)
  //    + = one or more
  // 3. filter(word => word.length > 0) - remove empty strings
  const words = content
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
  
  const wordCount = words.length
  
  // Average reading speed calculation
  // কি করছি: Assume করছি average adult 200 words per minute পড়ে
  // কেন করছি: Industry standard estimate
  // কিভাবে: wordCount / 200, তারপর round up
  
  // Math.ceil ensures minimum 1 minute
  // Even short posts (100 words) show "1 min read"
  // 500 words = 500/200 = 2.5 → ceil = 3 minutes
  const minutes = Math.ceil(wordCount / 200)
  
  // Ensure minimum 1 minute
  // Very short content (< 200 words) still shows 1 min
  return Math.max(1, minutes)
}

// ============================================
// FUNCTION 4: Generate Slug from Title
// ============================================

// কি করে: Title থেকে URL-friendly slug generate করে
// কখন use হবে: New post create করার সময়
// Input: title string
// Output: slug string (lowercase, hyphenated, no special chars)

export function generateSlug(title: string): string {
  
  // কি করছি: Title কে clean, URL-safe slug এ convert করছি
  // কেন করছি: URLs এ spaces, special chars থাকতে পারে না
  // কিভাবে: Chain of transformations
  
  return title
    .toLowerCase()                    // Convert to lowercase
    .trim()                          // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '')       // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/--+/g, '-')           // Replace multiple hyphens with single
    .replace(/^-+/, '')             // Remove leading hyphens
    .replace(/-+$/, '')             // Remove trailing hyphens
  
  // Example:
  // Input: "Getting Started with Next.js 14!"
  // Steps:
  // 1. toLowerCase → "getting started with next.js 14!"
  // 2. trim → "getting started with next.js 14!"
  // 3. remove special → "getting started with nextjs 14"
  // 4. spaces to hyphens → "getting-started-with-nextjs-14"
  // 5. cleanup → "getting-started-with-nextjs-14"
  // Output: "getting-started-with-nextjs-14"
}

// ============================================
// FUNCTION 5: Format Date
// ============================================

// কি করে: Date object কে readable string এ convert করে
// কখন use হবে: Posts list এ date display করার জন্য
// Input: Date object or string
// Output: Formatted date string

export function formatDate(date: Date | string): string {
  
  // কি করছি: Date format করছি human-readable form এ
  // কেন করছি: "2024-10-27T10:30:00Z" readable না, "Oct 27, 2024" better
  // কিভাবে: Intl.DateTimeFormat API
  
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Format using Intl.DateTimeFormat
  // কি: Browser built-in internationalization API
  // কেন: Locale-aware, flexible, standard
  // কিভাবে: Specify locale and format options
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',    // Full year (2024)
    month: 'short',     // Abbreviated month (Oct)
    day: 'numeric'      // Day of month (27)
  }).format(dateObj)
  
  // Output examples:
  // "Oct 27, 2024"
  // "Jan 1, 2025"
  // "Dec 31, 2023"
}

// ============================================
// FUNCTION 6: Truncate Text
// ============================================

// কি করে: Long text কে truncate করে specified length এ
// কখন use হবে: Excerpt display করার সময় (preview)
// Input: text, max length
// Output: Truncated text with ellipsis

export function truncateText(text: string, maxLength: number): string {
  
  // কি করছি: Text length check করে truncate করছি if needed
  // কেন করছি: Long content cards এ fit করতে হবে
  // কিভাবে: substring + ellipsis
  
  if (text.length <= maxLength) {
    // Text already short enough, return as is
    return text
  }
  
  // Truncate and add ellipsis
  // কি করছি: maxLength characters নিচ্ছি + "..." add করছি
  // কেন করছি: User কে indicate করতে there's more content
  // কিভাবে: substring(0, maxLength) + '...'
  
  return text.substring(0, maxLength).trim() + '...'
  
  // Example:
  // Input: "This is a very long text that needs truncating", maxLength: 20
  // Output: "This is a very long..."
}
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
  startIndex: number
  endIndex: number
}
// ============================================
// SUMMARY
// ============================================

/*
Utils Functions Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. sortPosts(posts, sortBy)
   └── Sort posts by various criteria

2. paginatePosts(posts, page, perPage)
   └── Paginate posts array

3. calculateReadTime(content)
   └── Estimate reading time from word count

4. generateSlug(title)
   └── Create URL-friendly slug

5. formatDate(date)
   └── Format date for display

6. truncateText(text, maxLength)
   └── Truncate long text with ellipsis

All functions are pure (no side effects)
All functions are reusable across the app
All functions are properly typed (TypeScript)
*/