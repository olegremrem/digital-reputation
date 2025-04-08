'use client'

import { Post } from '@/lib/ghost'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

interface PostGridProps {
  posts: Post[]
}

// Function to check if the image should be unoptimized
const shouldUnoptimize = (url: string) => {
  return url.includes('89.111.169.80') || url.includes('static.ghost.org')
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          {post.feature_image && (
            <Link href={`/${post.slug}`} className="block relative h-48 w-full">
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
                className="object-cover"
                unoptimized={shouldUnoptimize(post.feature_image)}
              />
            </Link>
          )}
          
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3 line-clamp-2">
              <Link href={`/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{formatDate(post.published_at)}</span>
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
} 