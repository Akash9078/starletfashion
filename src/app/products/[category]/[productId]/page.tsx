'use client';

import { useState, useEffect } from 'react';
import { getSheetData } from '@/lib/sheets';
import { Product } from '@/lib/sheets';
import { CATEGORIES, type Category } from '@/config/constants';
import { useRouter } from 'next/navigation';
import { findProductBySlug } from '@/utils/productUtils';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

interface Props {
  params: {
    category: string;
    productId: string;
  };
}

export default function ProductPage({ params }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate category
        if (!CATEGORIES.includes(params.category as Category)) {
          router.push('/404');
          return;
        }

        const products = await getSheetData(params.category as Category);
        
        if (!products || products.length === 0) {
          setError('No products found');
          return;
        }

        const currentProduct = findProductBySlug(products, params.productId);

        if (!currentProduct) {
          router.push('/404');
          return;
        }

        // Add category to the product
        const productWithCategory = {
          ...currentProduct,
          category: params.category
        };

        setProduct(productWithCategory);

        // Get similar products from the same brand
        const similar = products
          .filter(p => 
            p.brand === currentProduct.brand && 
            p.title !== currentProduct.title
          )
          .map(p => ({ ...p, category: params.category }))
          .slice(0, 8);

        setSimilarProducts(similar);

      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.category && params.productId) {
      fetchProductData();
    }
  }, [params.category, params.productId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Product not found'}
          </h1>
          <button
            onClick={() => router.back()}
            className="text-purple-600 hover:text-purple-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb 
          category={params.category}
          productName={product.title}
        />

        {/* Product Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => window.location.href = `mailto:sales@example.com?subject=Inquiry about ${product.title}`}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            Inquire Now
          </button>
        </div>

        {/* Product Gallery and Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Main Product Image */}
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image1}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
              }}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p>{product.description || 'No description available'}</p>
            </div>
            
            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Brand</h3>
                <p>{product.brand}</p>
              </div>
              {product.collection && (
                <div>
                  <h3 className="font-medium text-gray-700">Collection</h3>
                  <p>{product.collection}</p>
                </div>
              )}
              {product.material && (
                <div>
                  <h3 className="font-medium text-gray-700">Material</h3>
                  <p>{product.material}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Similar Products from {product.brand}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similarProducts.map((similarProduct) => (
                <Link
                  key={`${similarProduct.title}-${similarProduct.brand}`}
                  href={`/products/${params.category}/${findProductBySlug(similarProduct.title, similarProduct.brand)}`}
                  className="group"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={similarProduct.image1}
                      alt={similarProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium truncate">{similarProduct.title}</p>
                    <p className="text-sm text-gray-600">₹{similarProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 