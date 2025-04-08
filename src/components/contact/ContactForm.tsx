'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    
    // Simulate form submission
    try {
      // In a real app, you'd submit to your backend or API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center text-gray-600 mb-8">
        Have a question or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
      </p>
      
      {submitSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-8">
          <p className="font-medium">Thank you for contacting us!</p>
          <p>We've received your message and will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Feedback">Feedback</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          
          {submitError && (
            <div className="text-red-600">
              {submitError}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
} 