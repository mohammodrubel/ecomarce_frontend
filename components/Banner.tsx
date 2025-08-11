import React from 'react'
import { Sidebar } from './Sidebar'
import { HeroSection } from './HeroSection'
import { SpecialOfferSlider } from './SpecialOfferSlider'

function Banner() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch w-full">
      {/* Sidebar - hidden on mobile, shown from lg breakpoint */}
      <div className="lg:w-1/6 hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <main className="flex-1 w-full p-2 sm:p-3 md:p-4 lg:p-4">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:grid-cols-4">
          {/* HeroSection - full width on mobile, 3/4 on xl+ */}
          <div className="xl:col-span-3">
            <HeroSection />
          </div>
          
          {/* SpecialOfferSlider - hidden on mobile, shown from lg breakpoint, 1/4 on xl+ */}
          <div className="hidden xl:block xl:col-span-1">
            <SpecialOfferSlider />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Banner