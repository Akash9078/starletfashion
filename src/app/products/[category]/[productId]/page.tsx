'use client';

import { useState, useEffect } from 'react';
import { getSheetData } from '@/lib/sheets';
import { Product } from '@/lib/sheets';
import { CATEGORIES, type Category } from '@/config/constants';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductDetails from '@/components/ProductDetails';
import ProductCard from '@/components/ProductCard';
import { findProductBySlug } from '@/utils/productUtils';

interface Props {
  params: {
    category: string;
    productId: string;
  };
}

export default function ProductPage({ params }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [collectionProducts, setCollectionProducts] = useState<Product[]>([]);
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate category
        if (!CATEGORIES.includes(params.category as Category)) {
          setError('Invalid category');
          return;
        }

        const products = await getSheetData(params.category as Category);
        
        if (!products || products.length === 0) {
          setError('No products found');
          return;
        }

        const currentProduct = findProductBySlug(products, params.productId);

        if (!currentProduct) {
          setError('Product not found');
          return;
        }

        setProduct(currentProduct);

        // Get collection products
        const sameCollection = products
          .filter(p => 
            p.collection === currentProduct.collection && 
            p.title !== currentProduct.title
          )
          .slice(0, 4);
        setCollectionProducts(sameCollection);

        // Get brand products
        const sameBrand = products
          .filter(p => 
            p.brand === currentProduct.brand && 
            p.title !== currentProduct.title
          )
          .slice(0, 4);
        setBrandProducts(sameBrand);

      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [params.category, params.productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb 
          category={params.category}
          productName={product.title}
        />

        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow-sm mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-6 lg:p-8">
            {/* Image Gallery */}
            <div className="w-full max-w-2xl mx-auto">
              <ProductImageGallery 
                images={[
                  product.image1,
                  product.image2,
                  product.image3
                ].filter((image): image is string => !!image)}
              />
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-4">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-12 mt-12">
          {collectionProducts.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6">
                More from {product.collection}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {collectionProducts.map((relatedProduct) => (
                  <ProductCard 
                    key={`${relatedProduct.title}-${relatedProduct.brand}`} 
                    product={relatedProduct}
                  />
                ))}
              </div>
            </section>
          )}

          {brandProducts.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6">
                More from {product.brand}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {brandProducts.map((product) => (
                  <ProductCard 
                    key={`${product.title}-${product.brand}`} 
                    product={product}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 