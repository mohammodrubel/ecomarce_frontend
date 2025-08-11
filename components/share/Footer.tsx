import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ShopHub</h3>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for all your shopping needs. Quality products, competitive prices, and
                exceptional service.
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost">
                  📘
                </Button>
                <Button size="icon" variant="ghost">
                  🐦
                </Button>
                <Button size="icon" variant="ghost">
                  📷
                </Button>
                <Button size="icon" variant="ghost">
                  💼
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white">
                  About Us
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white">
                  Contact
                </Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white">
                  FAQ
                </Link>
                <Link href="/shipping" className="block text-gray-400 hover:text-white">
                  Shipping Info
                </Link>
                <Link href="/returns" className="block text-gray-400 hover:text-white">
                  Returns
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2">
                <Link href="/electronics" className="block text-gray-400 hover:text-white">
                  Electronics
                </Link>
                <Link href="/fashion" className="block text-gray-400 hover:text-white">
                  Fashion
                </Link>
                <Link href="/home" className="block text-gray-400 hover:text-white">
                  Home & Garden
                </Link>
                <Link href="/sports" className="block text-gray-400 hover:text-white">
                  Sports
                </Link>
                <Link href="/books" className="block text-gray-400 hover:text-white">
                  Books
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <div className="space-y-2">
                <p className="text-gray-400">📞 1-800-SHOPHUB</p>
                <p className="text-gray-400">✉️ support@shophub.com</p>
                <p className="text-gray-400">🕒 Mon-Fri: 9AM-6PM EST</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 ShopHub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer