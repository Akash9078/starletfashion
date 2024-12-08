import { Product } from '@/lib/sheets';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto p-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-3 break-words">{product.title}</h1>
          <p className="text-xl text-gray-600">{product.brand}</p>
        </div>

        <div className="border-t border-b py-6">
          <p className="text-3xl font-bold text-purple-600">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Collection</h2>
          <p className="text-gray-600 text-lg">{product.collection}</p>
        </div>

        {product.link && (
          <div className="pt-4">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors text-center text-lg font-semibold"
            >
              Buy on Amazon
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 