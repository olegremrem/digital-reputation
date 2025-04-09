import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { getPosts, getPostsByTag, getTags } from '../lib/ghost'
import { Post, Tag } from '../lib/ghost'
import { formatDate } from '../lib/utils'
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// Function to check if the image should be unoptimized
const shouldUnoptimize = (url: string) => {
  return url?.includes('89.111.169.80') || url?.includes('static.ghost.org')
}

export const metadata: Metadata = {
  title: 'AFF4 Insights - Home',
  description: 'AFF4 Insights: Your source for insightful news, technology analysis, and current events.',
}

export default async function HomePage() {
  // Get featured posts
  const featuredPosts = await getPosts(5, 1, 'featured:true')
  const mainFeature = featuredPosts.length > 0 ? featuredPosts[0] : null
  
  // Get latest news posts
  const newsPosts = await getPostsByTag('news', 6) || await getPosts(6)
  
  // Get technology posts
  const techPosts = await getPostsByTag('technology', 3) || []
  
  // Get all tags for the navigation
  const tags = await getTags(6)
  
  // Today's date in proper format
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Hero Section */}
      {/*\n      <section className="hero py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">\n        <div className="container mx-auto px-4">\n          <div className="flex flex-col lg:flex-row gap-8">\n            {/* Hero Left - Small News Items */}\n            <div className="lg:w-1/4 space-y-6">\n              {featuredPosts.slice(1, 5).map((post: Post) => (\n                <Link key={post.id} href={`/${post.slug}`} className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">\n                  {post.feature_image && (\n                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">\n                      <Image\n                        src={post.feature_image}\n                        alt={post.title}\n                        fill\n                        sizes="80px"\n                        className="object-cover transition-transform duration-500 group-hover:scale-110"\n                        unoptimized={shouldUnoptimize(post.feature_image)}\n                      />\n                    </div>\n                  )}\n                  <div>\n                    <div className="text-xs mb-1 text-indigo-500 flex items-center space-x-2">\n                      <span>{post.primary_tag?.name || 'News'}</span>\n                      <span className="inline-block h-1 w-1 rounded-full bg-indigo-300"></span>\n                      <span>{formatDate(post.published_at)}</span>\n                    </div>\n                    <h6 className="text-sm font-medium group-hover:text-indigo-600 transition-colors leading-tight">\n                      {post.title}\n                    </h6>\n                  </div>\n                </Link>\n              ))}\n            </div>\n            \n            {/* Hero Right - Main Feature */}\n            {mainFeature && (\n              <div className="lg:w-3/4">\n                <Link href={`/${mainFeature.slug}`} className="group block">\n                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-4 shadow-lg">\n                    {mainFeature.feature_image && (\n                      <Image\n                        src={mainFeature.feature_image}\n                        alt={mainFeature.title}\n                        fill\n                        priority\n                        sizes="(max-width: 768px) 100vw, 75vw"\n                        className="object-cover transition-transform duration-700 group-hover:scale-105"\n                        unoptimized={shouldUnoptimize(mainFeature.feature_image)}\n                      />\n                    )}\n                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">\n                      <div className="flex space-x-2 mb-3">\n                        <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full uppercase font-medium">\n                          {mainFeature.primary_tag?.name || 'Featured'}\n                        </span>\n                        <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full uppercase font-medium">\n                          {formatDate(mainFeature.published_at)}\n                        </span>\n                      </div>\n                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">\n                        {mainFeature.title}\n                      </h2>\n                    </div>\n                  </div>\n                  <p className="text-gray-700 mb-4 line-clamp-2">\n                    {mainFeature.excerpt}\n                  </p>\n                </Link>\n              </div>\n            )}\n          </div>\n        </div>\n      </section>\n      */}\n      \n      {/* Editor's Pick Section */}
      <section className="py-16 bg-gradient-to-tr from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold relative inline-block text-indigo-900">
              Editor's Pick
              <span className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
            </h2>
            <Link href="/tag/news" className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {newsPosts[0] && (
                <Link href={`/${newsPosts[0].slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-4 shadow-lg">
                    {newsPosts[0].feature_image && (
                      <Image
                        src={newsPosts[0].feature_image}
                        alt={newsPosts[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized={shouldUnoptimize(newsPosts[0].feature_image)}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full uppercase font-medium">
                        {newsPosts[0].primary_tag?.name || 'News'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                    {newsPosts[0].title}
                  </h3>
                </Link>
              )}
            </div>
            
            <div className="space-y-6">
              {newsPosts.slice(1, 3).map((post: Post) => (
                <Link key={post.id} href={`/${post.slug}`} className="group block bg-white p-3 rounded-xl hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-3">
                    {post.feature_image && (
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={shouldUnoptimize(post.feature_image)}
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full uppercase font-medium">
                        {post.primary_tag?.name || 'News'}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h4>
                  <div className="text-xs text-indigo-400">
                    {formatDate(post.published_at)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold relative inline-block text-indigo-900">
              Latest News
              <span className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
            </h2>
            <Link href="/tag/news" className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsPosts.slice(0, 4).map((post: Post) => (
              <Link key={post.id} href={`/${post.slug}`} className="group block bg-gradient-to-br from-white to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {post.feature_image && (
                    <Image
                      src={post.feature_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={shouldUnoptimize(post.feature_image)}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-xs text-indigo-400 mb-2">
                    <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">{post.primary_tag?.name || 'News'}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Article with Author */}
      {newsPosts[4] && (
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          {newsPosts[4].feature_image && (
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <Image
                src={newsPosts[4].feature_image}
                alt={newsPosts[4].title}
                fill
                className="object-cover"
                unoptimized={shouldUnoptimize(newsPosts[4].feature_image)}
              />
            </div>
          )}
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full mb-4">
                Featured Article
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {newsPosts[4].title}
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Link href={`/${newsPosts[4].slug}`} className="group block">
                <div className="mb-6 flex items-center justify-center">
                  {newsPosts[4].primary_author?.profile_image && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden mr-3 border-2 border-white">
                      <Image
                        src={newsPosts[4].primary_author.profile_image}
                        alt={newsPosts[4].primary_author.name}
                        fill
                        className="object-cover"
                        unoptimized={shouldUnoptimize(newsPosts[4].primary_author.profile_image)}
                      />
                    </div>
                  )}
                  <div className="text-white">
                    <div className="text-lg font-medium">
                      {newsPosts[4].primary_author?.name || 'Staff Writer'}
                    </div>
                    <div className="text-sm text-white/70 flex items-center">
                      <span>{newsPosts[4].primary_tag?.name || 'News'}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(newsPosts[4].published_at)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 mb-8 text-lg text-center">
                  {newsPosts[4].excerpt}
                </p>
                
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-full group-hover:bg-indigo-100 transition-colors">
                    Read Article
                    <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Technology Section */}
      <section className="py-16 bg-gradient-to-bl from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold relative inline-block text-indigo-900">
              Technology
              <span className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
            </h2>
            <Link href="/tag/technology" className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techPosts.map((post: Post) => (
              <Link key={post.id} href={`/${post.slug}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  {post.feature_image && (
                    <Image
                      src={post.feature_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={shouldUnoptimize(post.feature_image)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs py-1 px-3 bg-indigo-100 text-indigo-600 rounded-full">
                      {post.primary_tag?.name || 'Technology'}
                    </span>
                    <span className="text-xs text-indigo-400">
                      {formatDate(post.published_at)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-sm font-medium flex items-center text-indigo-600">
                      Read article
                      <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Stay Ahead with AFF4 Insights
              </h2>
              <p className="text-indigo-100 mb-2">
                Get the latest news, tech analysis, and event coverage delivered to your inbox.
              </p>
              <p className="text-xl italic text-indigo-200 mb-6">
                "Informed decisions start with insight."
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-full hover:bg-indigo-100 transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
            <div className="hidden md:block">
              <div className="relative p-8">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl rotate-3"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl -rotate-3"></div>
                <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-center">
                  <div className="bg-indigo-500/30 backdrop-blur-sm inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
                    <span className="text-5xl">💡</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Get Insightful News</h3>
                  <p className="text-indigo-100 mb-6">Join our community and stay informed with AFF4 Insights.</p>
                  <div className="inline-flex space-x-2">
                    <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-indigo-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-pink-400 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 