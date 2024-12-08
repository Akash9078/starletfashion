export function generateProductSlug(title: string, brand: string): string {
  return `${title}-${brand}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findProductBySlug(products: any[], slug: string) {
  return products.find(p => 
    generateProductSlug(p.title, p.brand) === decodeURIComponent(slug)
  );
} 