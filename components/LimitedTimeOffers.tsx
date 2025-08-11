import { Clock } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

function LimitedTimeOffers() {
  return (
    <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">⚡ Flash Sale - Limited Time Only!</h2>
            <p className="text-xl mb-6">Up to 70% off on selected items</p>
            <div className="flex justify-center items-center gap-4 text-2xl font-bold">
              <div className="bg-white text-red-600 px-4 py-2 rounded">
                <Clock className="h-6 w-6 inline mr-2" />
                23:45:12
              </div>
              <span>Time Left</span>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Shop Flash Sale
            </Button>
          </div>
        </div>
      </section>
  )
}

export default LimitedTimeOffers