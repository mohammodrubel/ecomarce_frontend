"use client"


import Banner from "@/components/Banner"
import BlogHighlights from "@/components/BlogHighlights"
import BrandLogo from "@/components/BrandLogo"
import CustomerTestimonials from "@/components/CustomerTestimonials"
import FeaturedProducts from "@/components/FeaturedProducts"
import { Header } from "@/components/Header"
import LimitedTimeOffers from "@/components/LimitedTimeOffers"
import { Navigation } from "@/components/Navigation"
import NewArrivals from "@/components/NewArrivals"
import NewsletterSignup from "@/components/NewsletterSignup"
import Footer from "@/components/share/Footer"
import TopCategories from "@/components/TopCategories"

export default function HomePage() {
  return (
    <>
      <Header />
      <Navigation />
      <div className="container mx-auto">
        <div className="min-h-screen bg-background">
          <Banner />
          <TopCategories />
          <FeaturedProducts />
          <LimitedTimeOffers />
          <NewArrivals />
          <CustomerTestimonials />
          <NewsletterSignup />
          <BrandLogo />
          <BlogHighlights />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}