import prisma from "../prisma/client";




export  async function  getAllPostsFromDB() {

const  posts = await prisma.post.findMany({
    where:{
        published: true
    },
    include: {  
        author: true,
        category: true,
    },
    orderBy: {
        createdAt: "desc",
    },

})
return posts


}

export async function  getPostBySlugFromDB(slug: string) {

const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {author: true, category: true},
})
return post
}
export async function getPostsByCategoryFromDB(categorySlug: string) {
    const posts = await prisma.post.findMany({
        where: {
            category: { slug: categorySlug },
            published: true
        },
        include: {      
            author: true,
            category: true,
        },
        orderBy: {
            createdAt: "desc",  
        }
    })
    return posts
}

export async function getAllCategoriesFromDB() {
  // কি করছি: সব categories fetch করছি
  // কেন করছি: Filter UI তে show করতে হবে সব available categories
  // কিভাবে: findMany() with post count
  
  const categories = await prisma.category.findMany({
    // include with count: কতগুলো posts আছে প্রতিটা category তে
    include: {
      _count: {
        select: {
          posts: true,    // Count করো posts field
        },
      },
    },
    
    // orderBy: Alphabetically sort করো name দিয়ে
    orderBy: {
      name: 'asc',      // ascending = A to Z
    },
  })
  
  // কি return করছি: Categories with post counts
  // Frontend এ show করতে পারবো "Next.js (5 posts)"
  return categories
}
export async function searchPostsFromDB(query: string) {
  // কি করছি: Title, excerpt, content এ search করছি
  // কেন করছি: User যাতে সহজে posts খুঁজে পায়
  // কিভাবে: contains operator with case-insensitive search
  
  // Query খালি থাকলে সব posts return করো
  if (!query || query.trim() === '') {
    return getAllPostsFromDB()
  }
  
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      // OR: যেকোনো একটা condition match করলেই হবে
      OR: [
        {
          // title এ search term আছে কিনা (case insensitive)
          title: {
            contains: query,
            mode: 'insensitive',    // "Next" এবং "next" same
          },
        },
        {
          // excerpt এ search term আছে কিনা
          excerpt: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          // content এ search term আছে কিনা
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    
    include: {
      author: true,
      category: true,
    },
    
    orderBy: {
      createdAt: 'desc',
    },
  })
  
  return posts
}
export async function getFeaturedPostsFromDB(limit: number = 3) {
  // কি করছি: Featured posts fetch করছি limited number
  // কেন করছি: Homepage এ special section এ show করবো
  // কিভাবে: where featured: true আর take: limit
  
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      featured: true,       // শুধু featured posts
    },
    
    include: {
      author: true,
      category: true,
    },
    
    orderBy: {
      views: 'desc',        // Most viewed featured posts first
    },
    
    // take: কতগুলো results নিবো (LIMIT in SQL)
    take: limit,
  })
  
  return posts
}
export async function incrementPostViewsFromDB(postId: string) {
  // কি করছি: Post এর views field increment করছি
  // কেন করছি: Track করতে কতজন post পড়েছে
  // কিভাবে: update() with increment operator
  
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    
    // data: কি update করবো
    data: {
      views: {
        increment: 1,       // Current value + 1
      },
    },
  })
  
  return post
}
export type PostWithRelations = Awaited<ReturnType<typeof getAllPostsFromDB>>[0]
// এর মানে: getAllPostsFromDB() যে type return করে তার array এর একটা element

// Category type with post count
export type CategoryWithCount = Awaited<ReturnType<typeof getAllCategoriesFromDB>>[0]
