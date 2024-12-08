'use client';

interface SortOption {
  label: string;
  value: string;
}

interface ProductSortProps {
  collections: string[];
  brands: string[];
  onSortChange: (type: string, value: string) => void;
}

export default function ProductSort({ collections, brands, onSortChange }: ProductSortProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Collection Filter */}
      <div className="flex-1 min-w-[200px]">
        <select
          onChange={(e) => onSortChange('collection', e.target.value)}
          className="w-full p-2 border rounded-lg bg-white"
          defaultValue=""
        >
          <option value="">All Collections</option>
          {collections.map((collection) => (
            <option key={collection} value={collection}>
              {collection}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="flex-1 min-w-[200px]">
        <select
          onChange={(e) => onSortChange('brand', e.target.value)}
          className="w-full p-2 border rounded-lg bg-white"
          defaultValue=""
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Sort */}
      <div className="flex-1 min-w-[200px]">
        <select
          onChange={(e) => onSortChange('price', e.target.value)}
          className="w-full p-2 border rounded-lg bg-white"
          defaultValue=""
        >
          <option value="">Sort by Price</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="low-to-high">Price: Low to High</option>
        </select>
      </div>
    </div>
  );
} 