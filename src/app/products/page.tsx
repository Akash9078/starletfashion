import Link from 'next/link';
import { CATEGORIES, type Category } from '@/config/constants';

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((category: Category) => (
          <Link 
            key={category}
            href={`/products/${category}`}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold capitalize">{category}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
} 