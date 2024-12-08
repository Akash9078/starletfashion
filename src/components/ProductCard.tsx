'use client';

import Link from 'next/link';
import { Product } from '@/lib/sheets';
import { generateProductSlug } from '@/utils/productUtils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const productSlug = generateProductSlug(product.title, product.brand);

  return (
    <Link 
      href={`/products/${product.category}/${productSlug}`}
      className="group cursor-pointer block"
    >
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
        <img
          src={imageError ? '/placeholder-image.jpg' : product.image1}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </Link>
  );
} 