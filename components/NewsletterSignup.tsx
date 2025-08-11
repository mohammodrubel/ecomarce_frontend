import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

function NewsletterSignup() {
  return (
    <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8">Subscribe to our newsletter and get 10% off your first order!</p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email" className="bg-white text-black" />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>
  )
}

export default NewsletterSignup