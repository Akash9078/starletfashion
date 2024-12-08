// Product categories
export const CATEGORIES = [
  'clothing',
  'jewellery',
  'accessories'
] as const;

// Google Sheets configuration
export const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

// Define category types
export type Category = (typeof CATEGORIES)[number]; 

// Category images mapping
export const CATEGORY_IMAGES = {
  clothing: 'https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/clothing.jpg',
  jewellery: 'https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/jewellery.jpg',
  accessories: 'https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/accessories.jpg'
} as const;

// Display names for categories (optional)
export const CATEGORY_DISPLAY_NAMES: Record<Category, string> = {
  clothing: 'Clothing',
  jewellery: 'Jewellery',
  accessories: 'Accessories'
};