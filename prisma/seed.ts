// prisma/seed.ts
// কি করছি: Database এ initial data insert করার script
// কেন করছি: Empty database এ test data add করতে
// কিভাবে: Prisma Client দিয়ে upsert() করে

import { PrismaClient } from '@prisma/client'

// Prisma Client instance create করছি
const prisma = new PrismaClient()

// Main seeding function
async function main() {
  console.log('🌱 Starting database seed...')
  
  // ============================================
  // SECTION 1: Create User (Blog Author)
  // ============================================
  console.log('\n👤 Creating user...')
  
  // কি করছি: User create/update করছি
  // কেন করছি: Blog posts এর জন্য author দরকার
  // কিভাবে: upsert() দিয়ে (safe, idempotent)
  
  const user = await prisma.user.upsert({
    // where: Unique field দিয়ে check করো exist করে কিনা
    where: { 
      email: 'john@example.com' 
    },
    
    // update: যদি exist করে, কি update করবে
    // {} = কিছু update করবো না, existing রাখবো
    update: {},
    
    // create: যদি না থাকে, নতুন create করো
    create: {
      name: 'John Developer',
      email: 'john@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer passionate about Next.js and web development.',
    },
  })
  
  console.log('✅ User created:', user.name)
  // Output: ✅ User created: John Developer
  
  // ============================================
  // SECTION 2: Create Categories
  // ============================================
  console.log('\n📁 Creating categories...')
  
  // কি করছি: Multiple categories create করছি
  // কেন করছি: Posts categorize করার জন্য
  // কিভাবে: Loop দিয়ে একটা একটা করে upsert
  
  // Categories array define করছি
  const categories = [
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'React', slug: 'react' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Tutorial', slug: 'tutorial' },
  ]
  
  // Created categories store করার জন্য array
  const createdCategories = []
  
  // Loop through each category
  for (const cat of categories) {
    // কি করছি: প্রতিটা category upsert করছি
    // কেন করছি: Duplicate avoid করতে
    
    const category = await prisma.category.upsert({
      // where: slug unique, so এটা দিয়ে check
      where: { slug: cat.slug },
      
      // update: existing থাকলে কিছু change করবো না
      update: {},
      
      // create: new হলে create করবো
      create: cat,
    })
    
    // Array তে save করছি (later posts create করার সময় দরকার)
    createdCategories.push(category)
    
    console.log(`✅ Category created: ${category.name}`)
  }
  // Output:
  // ✅ Category created: Next.js
  // ✅ Category created: React
  // ... (6 categories)
  
  // ============================================
  // SECTION 3: Create Blog Posts
  // ============================================
  console.log('\n📝 Creating blog posts...')
  
  // কি করছি: Sample blog posts create করছি
  // কেন করছি: Blog page test করার জন্য data দরকার
  // কিভাবে: Posts array define করে upsert করছি
  
  const posts = [
    // Post 1: Next.js Tutorial
    {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      excerpt: 'Learn how to build modern web applications with Next.js 14. A complete beginner-friendly guide.',
      content: `# Getting Started with Next.js 14

Welcome to Next.js! This is an amazing framework for building modern web applications.

## Why Next.js?

- **Fast performance**: Optimized for speed
- **Great developer experience**: Hot reload, error messages
- **SEO friendly**: Server-side rendering built-in
- **Easy deployment**: Deploy to Vercel with one click

## Installation

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features

### 1. App Router
The new App Router uses React Server Components by default.

### 2. Server Actions
Handle form submissions without API routes.

### 3. Streaming
Show content progressively as it loads.

That's it! You're ready to build amazing applications with Next.js.`,
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
      published: true,
      featured: true,
      readTime: 5,
      views: 1250,
      
      // Foreign Keys (relationships)
      authorId: user.id,  // Link to user we created
      categoryId: createdCategories.find(c => c.slug === 'nextjs')!.id,  // Find Next.js category
    },
    
    // Post 2: TypeScript Guide
    {
      title: 'TypeScript Basics Every Developer Should Know',
      slug: 'typescript-basics',
      excerpt: 'Master the fundamentals of TypeScript with practical examples and best practices.',
      content: `# TypeScript Basics

TypeScript makes JavaScript better by adding types!

## What is TypeScript?

TypeScript is JavaScript with syntax for types.

\`\`\`typescript
// JavaScript
let name = "John"

// TypeScript
let name: string = "John"
\`\`\`

## Why TypeScript?

1. **Catch errors early**: Before runtime
2. **Better IDE support**: Autocomplete, refactoring
3. **Self-documenting code**: Types explain what code does

## Basic Types

\`\`\`typescript
let age: number = 25
let name: string = "John"
let isActive: boolean = true
let numbers: number[] = [1, 2, 3]
\`\`\`

## Interfaces

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}

const user: User = {
  id: "1",
  name: "John",
  email: "john@example.com"
}
\`\`\`

Start using TypeScript today!`,
      coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop',
      published: true,
      featured: false,
      readTime: 8,
      views: 890,
      authorId: user.id,
      categoryId: createdCategories.find(c => c.slug === 'typescript')!.id,
    },
    
    // Post 3: React Hooks
    {
      title: 'React Hooks: A Complete Guide',
      slug: 'react-hooks-guide',
      excerpt: 'Everything you need to know about React Hooks with real-world examples.',
      content: `# React Hooks Guide

Hooks changed everything in React! Let's learn them.

## What are Hooks?

Hooks let you use state and other React features without writing a class.

## useState

The most basic hook for state management:

\`\`\`jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

## useEffect

For side effects (data fetching, subscriptions):

\`\`\`jsx
import { useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data))
  }, [userId])
  
  return <div>{user?.name}</div>
}
\`\`\`

## Custom Hooks

Create your own reusable hooks:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  return [value, setValue]
}
\`\`\`

Simple and powerful!`,
      coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop',
      published: true,
      featured: true,
      readTime: 10,
      views: 2100,
      authorId: user.id,
      categoryId: createdCategories.find(c => c.slug === 'react')!.id,
    },
    
    // Post 4: JavaScript Arrays
    {
      title: 'JavaScript Array Methods You Must Know',
      slug: 'javascript-array-methods',
      excerpt: 'Master essential JavaScript array methods like map, filter, reduce with practical examples.',
      content: `# JavaScript Array Methods

Essential methods every developer should know!

## map() - Transform Arrays

Transform each element:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)
console.log(doubled) // [2, 4, 6, 8, 10]
\`\`\`

## filter() - Select Items

Filter based on condition:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const evens = numbers.filter(n => n % 2 === 0)
console.log(evens) // [2, 4]
\`\`\`

## reduce() - Aggregate

Reduce to single value:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const sum = numbers.reduce((acc, n) => acc + n, 0)
console.log(sum) // 15
\`\`\`

## find() - Get First Match

\`\`\`javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]
const user = users.find(u => u.id === 2)
console.log(user) // { id: 2, name: 'Jane' }
\`\`\`

## Chaining Methods

Combine for powerful data processing:

\`\`\`javascript
const result = [1, 2, 3, 4, 5, 6]
  .filter(n => n % 2 === 0)  // [2, 4, 6]
  .map(n => n * 2)           // [4, 8, 12]
  .reduce((sum, n) => sum + n, 0)  // 24
\`\`\`

Master these and you'll be unstoppable!`,
      coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop',
      published: true,
      featured: false,
      readTime: 7,
      views: 1420,
      authorId: user.id,
      categoryId: createdCategories.find(c => c.slug === 'javascript')!.id,
    },
  ]
  
  // Loop through posts এবং create করো
  for (const postData of posts) {
    // কি করছি: প্রতিটা post upsert করছি
    // কেন করছি: Duplicate এড়াতে এবং safe seeding
    
    const post = await prisma.post.upsert({
      // where: slug unique field
      where: { slug: postData.slug },
      
      // update: existing থাকলে কিছু করবো না
      update: {},
      
      // create: নতুন হলে create করবো
      create: postData,
    })
    
    console.log(`✅ Post created: ${post.title}`)
  }
  // Output:
  // ✅ Post created: Getting Started with Next.js 14
  // ✅ Post created: TypeScript Basics Every Developer Should Know
  // ✅ Post created: React Hooks: A Complete Guide
  // ✅ Post created: JavaScript Array Methods You Must Know
  
  // ============================================
  // SECTION 4: Summary
  // ============================================
  console.log('\n🎉 Seeding complete!')
  console.log('\n📊 Database Summary:')
  
  // Count করো কতগুলো records আছে
  const userCount = await prisma.user.count()
  const categoryCount = await prisma.category.count()
  const postCount = await prisma.post.count()
  
  console.log(`  👥 Users: ${userCount}`)
  console.log(`  📁 Categories: ${categoryCount}`)
  console.log(`  📝 Posts: ${postCount}`)
  
  console.log('\n✅ Ready to use!')
}

// Execute main function
main()
  .catch((error) => {
    // যদি কোন error হয়
    console.error('❌ Seeding failed!')
    console.error(error)
    process.exit(1)  // Exit with error code
  })
  .finally(async () => {
    // সব শেষে database connection close করো
    await prisma.$disconnect()
  })