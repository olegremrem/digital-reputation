// Type definitions for Ghost content
export interface Post {
  id: string
  title: string
  slug: string
  html: string
  excerpt: string
  feature_image: string
  published_at: string
  updated_at: string
  tags: Tag[]
  primary_author: Author
  primary_tag?: Tag
  reading_time: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  description: string
  feature_image: string
  count?: {
    posts: number
  }
}

export interface Author {
  id: string
  name: string
  slug: string
  profile_image: string
  cover_image: string
  bio: string
  website: string
  location: string
  facebook: string
  twitter: string
  count?: {
    posts: number
  }
}

// Ghost API Configuration
const ghostUrl = process.env.GHOST_API_URL || 'http://localhost:2368'
const possibleApiUrls = [
  `${ghostUrl.replace(/\/+$/, '')}/ghost/api/content`,  // Correct format per docs
  `${ghostUrl.replace(/\/+$/, '')}/ghost/api/v5/content`,
  `${ghostUrl.replace(/\/+$/, '')}/ghost/api/v4/content`,
  `${ghostUrl.replace(/\/+$/, '')}/ghost/api/v3/content`
]
// Default to the correct format per docs
const apiUrl = possibleApiUrls[0]
const apiKey = process.env.GHOST_CONTENT_API_KEY || ''

console.log('Ghost Base URL:', ghostUrl)
console.log('Using API URL:', apiUrl)
console.log('API Key available:', apiKey ? 'Yes (masked)' : 'No')

// Helper function to build Ghost API URL
function buildUrl(endpoint: string, params: Record<string, string | number | boolean>) {
  const url = new URL(`${apiUrl}/${endpoint}/`)
  
  // Add API key with the proper format to query parameters
  if (apiKey) {
    url.searchParams.append('key', apiKey)
  }
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })
  
  console.log('Debug - Building URL:', url.toString())
  return url.toString()
}

// Helper function to clean slugs
function cleanSlug(slug: string): string {
  return slug.replace(/\/$/, '') // Remove trailing slash
}

// Post functions
export async function getPosts(limit = 10, page = 1, filter?: string) {
  try {
    const params: Record<string, string | number | boolean> = {
      limit,
      page,
      include: 'tags,authors',
      fields: 'id,title,slug,html,excerpt,feature_image,published_at,updated_at,reading_time',
    }
    
    // Add filter if provided
    if (filter) {
      params.filter = filter
    }
    
    const url = buildUrl('posts', params)
    
    console.log(`Fetching posts with limit: ${limit}, page: ${page}, filter: ${filter || 'none'}`)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const url = buildUrl('posts/slug/' + slug, {
      include: 'tags,authors',
    })
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.posts[0] || null
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error)
    return null
  }
}

export async function getPostsByTag(tagSlug: string, limit = 20, page = 1) {
  try {
    const cleanSlugValue = cleanSlug(tagSlug)
    const url = buildUrl('posts', {
      limit,
      page,
      filter: `tag:${cleanSlugValue}`,
      include: 'tags,authors',
      fields: 'id,title,slug,feature_image,published_at,excerpt,primary_tag,primary_author,reading_time',
    })
    
    console.log(`Fetching posts for tag '${cleanSlugValue}' from URL:`, url)
    
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 60 } // Revalidate every minute
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts by tag: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`Received ${data.posts?.length || 0} posts for tag '${cleanSlugValue}'`)
    return data.posts || []
  } catch (error) {
    console.error(`Error fetching posts by tag ${tagSlug}:`, error)
    return []
  }
}

// Add an alias for backward compatibility
export const getPost = getPostBySlug;

// Tag functions
export async function getTags(limit = 20) {
  try {
    const url = buildUrl('tags', {
      limit,
      include: 'count.posts',
    })
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.tags || []
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export async function getTagBySlug(slug: string) {
  try {
    const cleanSlugValue = cleanSlug(slug)
    const url = buildUrl('tags/slug/' + cleanSlugValue, {
      include: 'count.posts',
    })
    
    console.log(`Fetching tag '${cleanSlugValue}' from URL:`, url)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tag: ${response.statusText}`)
    }
    
    const data = await response.json()
    if (data.tags && data.tags.length > 0) {
      console.log(`Found tag '${cleanSlugValue}': ${data.tags[0].name}`)
    } else {
      console.log(`Tag '${cleanSlugValue}' not found`)
    }
    return data.tags[0] || null
  } catch (error) {
    console.error(`Error fetching tag ${slug}:`, error)
    return null
  }
}

// Author functions
export async function getAuthors(limit = 20) {
  try {
    const url = buildUrl('authors', {
      limit,
      include: 'count.posts',
    })
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch authors: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.authors || []
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

export async function getAuthorBySlug(slug: string) {
  try {
    const url = buildUrl('authors/slug/' + slug, {
      include: 'count.posts',
    })
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch author: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.authors[0] || null
  } catch (error) {
    console.error(`Error fetching author ${slug}:`, error)
    return null
  }
}

export async function getPostsByAuthor(authorSlug: string, limit = 10, page = 1) {
  try {
    const url = buildUrl('posts', {
      limit,
      page,
      filter: `author:${authorSlug}`,
      include: 'tags,authors',
    })
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts by author: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error(`Error fetching posts by author ${authorSlug}:`, error)
    return []
  }
} 