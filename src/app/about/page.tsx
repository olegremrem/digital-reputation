import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About AFF4 Insights',
  description: 'Learn about AFF4 Insights and our mission to deliver insightful news and analysis.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-800">
          About AFF4 Insights
        </h1>
        
        <div className="prose prose-lg mx-auto prose-indigo">
          <p className="text-xl text-gray-700 mb-8 text-center">
            Welcome to AFF4 Insights, your trusted source for clear, concise, and insightful analysis
            of the latest news, technology trends, and current events shaping our world.
          </p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p className="mb-6">
            In an age of information overload, AFF4 Insights was founded on the principle of clarity.
            Our mission is to cut through the noise and provide our readers with well-researched,
            objective, and thought-provoking content that fosters understanding and informs decisions.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">What We Cover</h2>
          <p className="mb-6">
            We delve into a variety of topics, with a primary focus on:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Breaking news analysis and its implications</li>
            <li className="mb-2">In-depth reports on technology advancements and industry shifts</li>
            <li className="mb-2">Coverage of significant current events and global trends</li>
            <li className="mb-2">Expert commentary on complex issues</li>
          </ul>
          <p className="mb-6">
            Our dedicated team works tirelessly to deliver content that is not only informative
            but also engaging and easy to digest.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Accuracy and Objectivity</li>
            <li className="mb-2">Clarity and Conciseness</li>
            <li className="mb-2">Insightful Analysis</li>
            <li className="mb-2">Reader Trust and Transparency</li>
            <li className="mb-2">Adaptability in a changing world</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <p className="mb-6">
            AFF4 Insights is more than just a publication; it's a community for the curious and informed.
            We encourage you to engage with our content, share your perspectives, and join the conversation.
          </p>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">Have Questions or Feedback?</h3>
            <p className="mb-4 text-gray-700">
              We value your input. Reach out to our team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 