import Link from 'next/link';
import { CATEGORIES, type Category } from '@/config/constants';

interface BreadcrumbProps {
  category: string;
  productName?: string;
}

export default function Breadcrumb({ category, productName }: BreadcrumbProps) {
  // Validate if the category exists in our defined categories
  const isValidCategory = CATEGORIES.includes(category as Category);
  const formattedCategory = isValidCategory ? category : 'products';

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: formattedCategory, href: `/products/${formattedCategory}` },
    ...(productName ? [{ label: productName, href: null }] : [])
  ].filter(Boolean);

  return (
    <nav className="mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap text-gray-600">
        {breadcrumbItems.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                /
              </span>
            )}
            {item.href ? (
              <Link 
                href={item.href}
                className={`hover:text-purple-600 ${
                  index === 0 ? '' : 'capitalize'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-purple-600 truncate max-w-[300px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 