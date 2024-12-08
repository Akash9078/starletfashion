'use client';

import { useState, useEffect } from 'react';
import { getSheetData } from '@/lib/sheets';
import { CATEGORIES, type Category } from '@/config/constants';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import ProductSort from '@/components/ProductSort';
import type { Product } from '@/lib/sheets';

interface Props {
  params: {
    category: Category;
  };
}

export default function CategoryPage({ params }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate category
        if (!CATEGORIES.includes(params.category)) {
          notFound();
        }

        const fetchedProducts = await getSheetData(params.category);
        
        // Add category to each product
        const productsWithCategory = fetchedProducts.map(product => ({
          ...product,
          category: params.category
        }));

        setProducts(productsWithCategory);
        setFilteredProducts(productsWithCategory);

        // Extract unique collections and brands
        const uniqueCollections = Array.from(new Set(productsWithCategory.map(p => p.collection))).filter(Boolean);
        const uniqueBrands = Array.from(new Set(productsWithCategory.map(p => p.brand))).filter(Boolean);
        
        setCollections(uniqueCollections);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [params.category]);

  const handleSortChange = (type: string, value: string) => {
    let sorted = [...products];

    // Apply collection filter
    if (type === 'collection' && value) {
      sorted = sorted.filter(p => p.collection === value);
    }

    // Apply brand filter
    if (type === 'brand' && value) {
      sorted = sorted.filter(p => p.brand === value);
    }

    // Apply price sorting
    if (type === 'price') {
      if (value === 'high-to-low') {
        sorted.sort((a, b) => b.price - a.price);
      } else if (value === 'low-to-high') {
        sorted.sort((a, b) => a.price - b.price);
      }
    }

    setFilteredProducts(sorted);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Breadcrumb category={params.category} />
      
      <h1 className="text-3xl font-bold mb-8 capitalize">{params.category}</h1>
      
      <ProductSort
        collections={collections}
        brands={brands}
        onSortChange={handleSortChange}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={`${product.title}-${product.brand}`} 
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
} 