import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getPostsByTag, getTagBySlug } from '../../../lib/ghost'
import PostGrid from '../../../components/blog/PostGrid'

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug)
  
  if (!tag) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag could not be found.',
    }
  }

  return {
    title: `${tag.name} - Ghost Blog`,
    description: `Posts tagged with ${tag.name}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  console.log(`Rendering tag page for slug: "${params.slug}"`)
  const tag = await getTagBySlug(params.slug)
  
  if (!tag) {
    console.log(`Tag not found for slug: "${params.slug}"`)
    // Try to find the tag with a trailing slash
    const tagWithSlash = await getTagBySlug(`${params.slug}/`)
    if (tagWithSlash) {
      console.log(`Found tag with trailing slash: "${params.slug}/"`)
      // Redirect to the correct URL
      redirect(`/tag/${params.slug}/`)
    }
    notFound()
  }

  console.log(`Found tag: ${tag.name} (${tag.slug})`)
  const posts = await getPostsByTag(tag.slug)
  console.log(`Found ${posts.length} posts for tag: ${tag.name}`)

  // Add debugging information in development
  const isDevMode = process.env.NODE_ENV === 'development'

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Posts tagged with: {tag.name}
      </h1>
      
      {tag.description && (
        <p className="text-gray-600 mb-8 max-w-3xl">
          {tag.description}
        </p>
      )}
      
      {isDevMode && posts.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-100 p-4 mb-8 rounded">
          <h2 className="font-bold text-yellow-700 mb-2">Debugging Information</h2>
          <p>No posts found for this tag. Here's some information that might help:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm font-mono">
            <li>Tag ID: {tag.id}</li>
            <li>Tag Slug: {tag.slug}</li>
            <li>Tag Description: {tag.description || 'None'}</li>
            <li>Posts Count: {tag.count?.posts || 0}</li>
          </ul>
          <p className="mt-3 text-sm">
            Check that your Ghost CMS has posts with this tag, and that the API key has access to them.
          </p>
        </div>
      )}
      
      <PostGrid posts={posts} />
    </div>
  )
} 