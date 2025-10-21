// src/types/blog.types.ts
/**
 * Blog Application Types
 * All TypeScript interfaces for blog system
 */

// Main blog post interface
export interface BlogPost {
  id: string                // Unique identifier
  slug: string              // URL-friendly (e.g., "my-first-post")
  title: string             // Post title
  excerpt: string           // Short description (preview)
  content: string           // Full post content (markdown)
  coverImage: string        // Cover image URL
  author: Author            // Post author details
  category: Category        // Post category
  tags: string[]            // Array of tags
  publishedAt: Date         // Publication date
  readTime: number          // Reading time in minutes
  views: number             // View count
  featured: boolean         // Is featured post?
}

// Author interface
export interface Author {
  id: string
  name: string
  avatar: string            // Avatar image URL
  bio: string               // Short bio
}

// Category type (strict options)
export type Category = 
  | 'Next.js' 
  | 'React' 
  | 'TypeScript' 
  | 'JavaScript'
  | 'Web Development'
  | 'Tutorial'
