// src/lib/data/blogPosts.ts
/**
 * Mock Blog Data
 * This simulates a database
 * Later we'll replace with real database
 */

import { BlogPost } from '@/types/blog.types'

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-nextjs',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with Next.js 14. A complete beginner-friendly guide.',
    content: `
# Getting Started with Next.js 14

Welcome to Next.js! This is an amazing framework.

## Why Next.js?

- Fast performance
- Great developer experience
- SEO friendly
- Easy deployment

## Installation

\`\`\`bash
npx create-next-app@latest
\`\`\`

That's it! You're ready to build.
    `,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'Next.js',
    tags: ['Next.js', 'Tutorial', 'Beginner'],
    publishedAt: new Date('2024-01-15'),
    readTime: 5,
    views: 1250,
    featured: true
  },
  {
    id: '2',
    slug: 'typescript-basics',
    title: 'TypeScript Basics Every Developer Should Know',
    excerpt: 'Master the fundamentals of TypeScript with practical examples and best practices.',
    content: `
# TypeScript Basics

TypeScript makes JavaScript better!

## What is TypeScript?

TypeScript adds types to JavaScript:

\`\`\`typescript
// JavaScript
let name = "John"

// TypeScript
let name: string = "John"
\`\`\`

## Benefits

- Catch errors early
- Better IDE support
- Self-documenting code
    `,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'TypeScript',
    tags: ['TypeScript', 'Tutorial'],
    publishedAt: new Date('2024-01-12'),
    readTime: 8,
    views: 890,
    featured: false
  },
  {
    id: '3',
    slug: 'react-hooks-guide',
    title: 'React Hooks: A Complete Guide',
    excerpt: 'Everything you need to know about React Hooks with real-world examples.',
    content: `
# React Hooks Guide

Hooks changed everything in React!

## useState

The most basic hook:

\`\`\`jsx
const [count, setCount] = useState(0)
\`\`\`

## useEffect

For side effects:

\`\`\`jsx
useEffect(() => {
  document.title = count
}, [count])
\`\`\`

Simple and powerful!
    `,
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'React',
    tags: ['React', 'Hooks', 'Tutorial'],
    publishedAt: new Date('2024-01-10'),
    readTime: 10,
    views: 2100,
    featured: true
  },
  {
    id: '4',
    slug: 'web-development-trends-2024',
    title: 'Web Development Trends in 2024',
    excerpt: 'Discover the latest trends and technologies shaping web development this year.',
    content: `
# Web Development Trends 2024

The web is evolving fast!

## Top Trends

1. **AI Integration**
   - ChatGPT APIs
   - AI-powered tools
   
2. **Edge Computing**
   - Faster performance
   - Better UX

3. **TypeScript Everywhere**
   - Industry standard now

Stay updated!
    `,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'Web Development',
    tags: ['Trends', '2024', 'Web Dev'],
    publishedAt: new Date('2024-01-08'),
    readTime: 6,
    views: 1580,
    featured: false
  },
  {
    id: '5',
    slug: 'javascript-array-methods',
    title: 'JavaScript Array Methods You Must Know',
    excerpt: 'Master essential JavaScript array methods like map, filter, reduce with practical examples.',
    content: `
# JavaScript Array Methods

Arrays are fundamental in JavaScript. Let's master the essential methods!

## map() - Transform Arrays

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)
// [2, 4, 6, 8, 10]
\`\`\`

## filter() - Filter Arrays

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const evens = numbers.filter(n => n % 2 === 0)
// [2, 4]
\`\`\`

## reduce() - Reduce to Single Value

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const sum = numbers.reduce((acc, n) => acc + n, 0)
// 15
\`\`\`

Master these and you'll be unstoppable!
    `,
    coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'JavaScript',
    tags: ['JavaScript', 'Arrays', 'Tutorial'],
    publishedAt: new Date('2024-01-18'),
    readTime: 7,
    views: 1420,
    featured: false
  },
  
  // NEW POST 6
  {
    id: '6',
    slug: 'css-flexbox-guide',
    title: 'CSS Flexbox: Complete Visual Guide',
    excerpt: 'Learn CSS Flexbox with visual examples and practical use cases for modern layouts.',
    content: `
# CSS Flexbox Complete Guide

Flexbox makes layout easy! Let's learn it visually.

## Display Flex

\`\`\`css
.container {
  display: flex;
}
\`\`\`

This creates a flex container!

## Justify Content

\`\`\`css
.container {
  justify-content: center; /* center items */
  justify-content: space-between; /* space items */
}
\`\`\`

## Align Items

\`\`\`css
.container {
  align-items: center; /* vertical center */
}
\`\`\`

Flexbox is powerful and essential!
    `,
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'Web Development',
    tags: ['CSS', 'Flexbox', 'Layout'],
    publishedAt: new Date('2024-01-20'),
    readTime: 9,
    views: 2340,
    featured: true
  },
  
  // NEW POST 7
  {
    id: '7',
    slug: 'git-commands-cheatsheet',
    title: 'Git Commands Cheatsheet for Developers',
    excerpt: 'Essential Git commands every developer should know with real-world examples.',
    content: `
# Git Commands Cheatsheet

Master these Git commands and boost your productivity!

## Basic Commands

\`\`\`bash
git init              # Initialize repo
git add .             # Stage all changes
git commit -m "msg"   # Commit changes
git push              # Push to remote
\`\`\`

## Branching

\`\`\`bash
git branch feature    # Create branch
git checkout feature  # Switch branch
git merge feature     # Merge branch
\`\`\`

## Advanced

\`\`\`bash
git stash            # Stash changes
git rebase           # Rebase branch
git cherry-pick      # Pick commit
\`\`\`

Save this cheatsheet!
    `,
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'Tutorial',
    tags: ['Git', 'Version Control', 'DevOps'],
    publishedAt: new Date('2024-01-22'),
    readTime: 5,
    views: 1890,
    featured: false
  },
  
  // NEW POST 8
  {
    id: '8',
    slug: 'async-await-javascript',
    title: 'Async/Await in JavaScript Explained',
    excerpt: 'Understand asynchronous JavaScript with async/await syntax and practical examples.',
    content: `
# Async/Await in JavaScript

Modern JavaScript async programming made simple!

## Promises (Old Way)

\`\`\`javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
\`\`\`

## Async/Await (Modern Way)

\`\`\`javascript
async function getData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
\`\`\`

Much cleaner, right?

## Error Handling

Always use try/catch with async/await!
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    author: {
      id: 'author-1',
      name: 'John Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js'
    },
    category: 'JavaScript',
    tags: ['JavaScript', 'Async', 'Promises'],
    publishedAt: new Date('2024-01-25'),
    readTime: 8,
    views: 1650,
    featured: true
  }
]

// Helper function to get all categories
export function getAllCategories(): string[] {
  const categories = mockBlogPosts.map(post => post.category)
  return ['All', ...Array.from(new Set(categories))]
}