'use client';

import Link from 'next/link'
import { CATEGORIES, CATEGORY_IMAGES, type Category } from '@/config/constants'
import { getSheetData, getHotProducts } from '@/lib/sheets'
import ProductCard from '@/components/ProductCard'
import ProductCarousel from '@/components/ProductCarousel'
import { useState } from 'react'
import HeroSection from '@/components/HeroSection'

async function getFeaturedProducts() {
  try {
    // Fetch up to 4 products from each category (instead of 2)
    const categoryProducts = await Promise.all(
      CATEGORIES.map(async (category) => {
        const products = await getSheetData(category);
        // Increase the slice limit to get more products
        return products.slice(0, 4).map(product => ({
          ...product,
          category
        }));
      })
    );

    // Combine and shuffle the products
    return categoryProducts.flat().sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const hotProducts = await getHotProducts(12);

  return (
    <div className="container mx-auto px-4">
      <HeroSection featuredProducts={featuredProducts} />
      {/* Categories Section */}
      <section className="mb-12 lg:mb-16">
        <h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-center lg:text-left">
          Experience more. <span className="text-purple-600">Find your next favorite category.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/products/${category}`}
              className="relative h-[200px] sm:h-[250px] lg:h-[280px] rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <img
                src={CATEGORY_IMAGES[category]}
                alt={category}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
              />
              {/* Category Name Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full">
                <span className="text-sm font-semibold text-gray-900 capitalize">
                  {category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Items Section */}
      <section className="mb-8 lg:mb-12">
        <h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-center lg:text-left">
          Hot Items. <span className="text-purple-600">Best selling products right now.</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
          {hotProducts.map((product) => (
            <ProductCard key={`${product.title}-${product.brand}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
} 