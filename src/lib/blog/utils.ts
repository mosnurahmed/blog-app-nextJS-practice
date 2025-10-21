// src/lib/blog/utils.ts
/**
 * Blog Utility Functions
 * Helper functions for blog operations
 */

import { BlogPost } from '@/types/blog.types'
import { mockBlogPosts } from '@/lib/data/blogPosts'

/**
 * Get all blog posts (sorted by date, newest first)
 */
export function getAllPosts(): BlogPost[] {
  return mockBlogPosts.sort((a, b) => 
    b.publishedAt.getTime() - a.publishedAt.getTime()
  )
}

/**
 * Get single post by slug
 * Used for individual post pages
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find(post => post.slug === slug)
}

/**
 * Get featured posts only
 */
export function getFeaturedPosts(): BlogPost[] {
  return mockBlogPosts
    .filter(post => post.featured)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') {
    return getAllPosts()
  }
  return mockBlogPosts
    .filter(post => post.category === category)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

/**
 * Search posts by title, excerpt, or tags
 */
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase()
  return mockBlogPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = mockBlogPosts.flatMap(post => post.tags)
  return Array.from(new Set(tags))
}
// src/lib/blog/utils.ts
// Add these functions at the bottom:

/**
 * Paginate posts
 */
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function paginatePosts(
  posts: BlogPost[],
  page: number = 1,
  postsPerPage: number = 6
): { posts: BlogPost[], pagination: PaginationInfo } {
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const currentPage = Math.max(1, Math.min(page, totalPages || 1))
  
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  
  const paginatedPosts = posts.slice(startIndex, endIndex)
  
  const pagination: PaginationInfo = {
    currentPage,
    totalPages,
    totalPosts,
    postsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  }
  
  return { posts: paginatedPosts, pagination }
}

/**
 * Sort posts
 */
export type SortOption = 'newest' | 'oldest' | 'most-viewed' | 'alphabetical'

export function sortPosts(posts: BlogPost[], sortBy: SortOption): BlogPost[] {
  const sorted = [...posts]
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    case 'oldest':
      return sorted.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime())
    case 'most-viewed':
      return sorted.sort((a, b) => b.views - a.views)
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}