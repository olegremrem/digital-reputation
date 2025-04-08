import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPost } from '../../lib/ghost'
import { formatDate } from '../../lib/utils' // Assuming you have a formatDate function
import { CalendarDaysIcon, UserCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

// Function to check if the image should be unoptimized
const shouldUnoptimize = (url: string) => {
  return url?.includes('89.111.169.80') || url?.includes('static.ghost.org')
}

// For dynamic metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found',
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  const publishedDate = formatDate(post.published_at)
  
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Post Header Section */}
      <div className="relative py-24 md:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        {post.feature_image && (
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized={shouldUnoptimize(post.feature_image)}
            />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="text-sm font-medium bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-white/70">
              {post.primary_author && (
                <Link href={`/author/${post.primary_author.slug}`} className="flex items-center hover:text-white">
                  {post.primary_author.profile_image ? (
                    <div className="relative h-7 w-7 rounded-full overflow-hidden mr-2 border border-white/50">
                      <Image
                        src={post.primary_author.profile_image}
                        alt={post.primary_author.name}
                        fill
                        sizes="28px"
                        className="object-cover"
                        unoptimized={shouldUnoptimize(post.primary_author.profile_image)}
                      />
                    </div>
                  ) : (
                    <UserCircleIcon className="h-5 w-5 mr-1" />
                  )}
                  <span>{post.primary_author.name}</span>
                </Link>
              )}
              <div className="flex items-center">
                <CalendarDaysIcon className="h-5 w-5 mr-1" />
                <time dateTime={post.published_at}>{publishedDate}</time>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-1" />
                <span>{post.reading_time} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 lg:p-16 relative -mt-16 md:-mt-20">
          {/* Post Content */}
          <div 
            className="prose prose-lg prose-indigo max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </div>
  )
} 