'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/sheets';
import Link from 'next/link';
import { generateProductSlug } from '@/utils/productUtils';

interface ProductCarouselProps {
  products: Product[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export default function ProductCarousel({ products, currentSlide, onSlideChange }: ProductCarouselProps) {
  useEffect(() => {
    if (!products || products.length === 0) return;

    const timer = setInterval(() => {
      onSlideChange((currentSlide + 1) % products.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [products, currentSlide, onSlideChange]);

  if (!products || products.length === 0) return null;

  const currentProduct = products[currentSlide];
  const productSlug = generateProductSlug(currentProduct.title, currentProduct.brand);

  return (
    <div className="relative rounded-xl lg:rounded-2xl overflow-hidden bg-pink-100 aspect-[4/5] shadow-lg group">
      <Link href={`/products/${currentProduct.category}/${productSlug}`}>
        <img
          src={currentProduct.image1}
          alt={currentProduct.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-pink-100/90 to-transparent">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2">
            {currentProduct.title}
          </h3>
          <p className="text-sm lg:text-base text-gray-700">{currentProduct.brand}</p>
          <p className="text-base lg:text-lg font-bold text-gray-900 mt-1 lg:mt-2">
            ${currentProduct.price.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onSlideChange((currentSlide - 1 + products.length) % products.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onSlideChange((currentSlide + 1) % products.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 