import Link from 'next/link'
import Image from 'next/image'

interface Author {
  name: string
  profile_image?: string
  slug: string
}

interface Tag {
  name: string
  slug: string
}

interface PostCardProps {
  post: {
    title: string
    excerpt: string
    feature_image?: string
    published_at: string
    reading_time: number
    slug: string
    primary_author?: Author
    tags?: Tag[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  // Format date
  const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      {/* Featured Image */}
      {post.feature_image && (
        <div className="relative h-48 w-full">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="text-xs font-medium text-primary bg-blue-50 px-2 py-1 rounded"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
          <Link href={`/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Post Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            {post.primary_author && (
              <>
                {post.primary_author.profile_image ? (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={post.primary_author.profile_image}
                      alt={post.primary_author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                      {post.primary_author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <Link href={`/author/${post.primary_author.slug}`} className="hover:text-primary">
                  {post.primary_author.name}
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <time dateTime={post.published_at}>{publishedDate}</time>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
      </div>
    </article>
  )
} 