import { getPosts, getTags, getAuthors } from '../../lib/ghost'

export default async function ApiDebugPage() {
  // Fetch data from API
  const posts = await getPosts()
  const tags = await getTags()
  const authors = await getAuthors()
  
  // Get environment info
  const apiUrl = process.env.GHOST_API_URL || 'Not configured'
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ghost API Debug Page</h1>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Environment</h2>
          <div className="font-mono text-sm bg-gray-100 p-4 rounded">
            <p>GHOST_API_URL: {apiUrl}</p>
            <p>API Key Present: {process.env.GHOST_CONTENT_API_KEY ? 'Yes' : 'No'}</p>
            <p>Node Env: {process.env.NODE_ENV}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Posts ({posts.length})</h2>
          {posts.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {posts.map(post => (
                <li key={post.id}>
                  <strong>{post.title}</strong>
                  <span className="text-sm text-gray-500 ml-2">
                    [{post.tags.map(t => t.name).join(', ')}]
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No posts found!</p>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Tags ({tags.length})</h2>
          {tags.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {tags.map(tag => (
                <li key={tag.id}>
                  <strong>{tag.name}</strong> 
                  <code className="ml-2 text-sm bg-gray-100 px-1">({tag.slug})</code>
                  <span className="text-sm text-gray-500 ml-2">
                    [{tag.count?.posts || 0} posts]
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No tags found!</p>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Authors ({authors.length})</h2>
          {authors.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {authors.map(author => (
                <li key={author.id}>
                  <strong>{author.name}</strong>
                  <code className="ml-2 text-sm bg-gray-100 px-1">({author.slug})</code>
                  <span className="text-sm text-gray-500 ml-2">
                    [{author.count?.posts || 0} posts]
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No authors found!</p>
          )}
        </div>
      </div>
    </div>
  )
} 