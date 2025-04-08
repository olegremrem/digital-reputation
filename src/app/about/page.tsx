import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us - Ghost Blog',
  description: 'Learn more about our blog and our mission',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          About Ghost Blog
        </h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-gray-600 mb-8 text-center">
            Welcome to Ghost Blog, where we share our thoughts, experiences, and insights
            with the world.
          </p>
          
          <div className="relative h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
            <Image
              src="/images/about-hero.jpg"
              alt="About Ghost Blog"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-6">
            Ghost Blog was founded with a simple mission: to create a platform where
            ideas can be shared freely and authentically. We believe in the power of
            storytelling and the importance of diverse perspectives in shaping our
            understanding of the world.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p className="mb-6">
            We publish articles on a wide range of topics, from technology and science
            to culture and personal development. Our team of writers and contributors
            are passionate about their subjects and committed to delivering high-quality
            content that informs, inspires, and engages our readers.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Authenticity in storytelling</li>
            <li className="mb-2">Quality over quantity</li>
            <li className="mb-2">Diversity of perspectives</li>
            <li className="mb-2">Continuous learning and growth</li>
            <li className="mb-2">Community engagement</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">
            We're always looking for new voices to join our community. Whether you're
            a writer, reader, or just someone who loves great content, we'd love to
            have you be part of our journey.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-4">
              Have questions or want to contribute? We'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 