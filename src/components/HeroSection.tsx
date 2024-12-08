'use client';

import { useState } from 'react';
import { Product } from '@/lib/sheets';
import ProductCarousel from './ProductCarousel';

interface HeroSectionProps {
  featuredProducts: Product[];
}

export default function HeroSection({ featuredProducts }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 lg:py-16 min-h-[500px] lg:min-h-[600px]">
      {/* Hero Text */}
      <div className="w-full md:w-1/2 max-w-2xl text-center md:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
          Discover <span className="text-purple-600">awesome</span><br />
          <span className="text-purple-600">products</span> from your<br />
          favourite <span className="text-purple-600">Insta</span> brands
        </h1>
        <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8">
          Search for clothes, jewellery, and accessories
        </p>
        <div className="relative max-w-md mx-auto md:mx-0">
          <input 
            type="search" 
            placeholder="What are you looking for ?" 
            className="w-full px-4 lg:px-6 py-3 lg:py-4 pr-16 rounded-full border-2 border-purple-100 focus:outline-none focus:border-purple-300"
          />
          <button className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 px-4 lg:px-6 py-1.5 lg:py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-sm lg:text-base">
            Search Products
          </button>
        </div>
      </div>

      {/* Featured Product Carousel */}
      <div className="w-full md:w-1/2 max-w-lg relative">
        <div className="relative aspect-[4/5]">
          <ProductCarousel 
            products={featuredProducts} 
            currentSlide={currentSlide}
            onSlideChange={setCurrentSlide}
          />
        </div>
        {/* Carousel Indicators */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 cursor-pointer ${
                index === currentSlide
                  ? 'w-8 h-2 bg-purple-600'
                  : 'w-2 h-2 bg-purple-300 hover:bg-purple-400'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 