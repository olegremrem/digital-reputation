'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            AFF4 Insights
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/tag/news" className="text-gray-700 hover:text-primary transition-colors">
              News
            </Link>
            <Link href="/tag/technology" className="text-gray-700 hover:text-primary transition-colors">
              Technology
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden space-y-3 pb-3">
            <Link href="/" className="block text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/tag/news" className="block text-gray-700 hover:text-primary transition-colors">
              News
            </Link>
            <Link href="/tag/technology" className="block text-gray-700 hover:text-primary transition-colors">
              Technology
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
} 