import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostsByAuthor, getAuthorBySlug } from '../../../lib/ghost'
import PostGrid from '../../../components/blog/PostGrid'
import Image from 'next/image'

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    }
  }

  return {
    title: `${author.name} - Ghost Blog`,
    description: `Posts written by ${author.name}`,
  }
}

const shouldUnoptimize = (url: string) => {
  return url.includes('89.111.169.80') || url.includes('static.ghost.org')
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorBySlug(params.slug)
  
  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.slug)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {author.profile_image && (
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
              <Image
                src={author.profile_image}
                alt={author.name}
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                quality={85}
                unoptimized={shouldUnoptimize(author.profile_image)}
                className="object-cover"
              />
            </div>
          )}
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {author.name}
            </h1>
            
            {author.bio && (
              <p className="text-gray-600 mb-4">
                {author.bio}
              </p>
            )}
            
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-8">
        Posts by {author.name}
      </h2>
      
      <PostGrid posts={posts} />
    </div>
  )
} 