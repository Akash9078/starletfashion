import { SPREADSHEET_ID, CATEGORIES, type Category } from '@/config/constants';

export interface Product {
  title: string;
  collection: string;
  brand: string;
  price: number;
  link: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  category: Category;
}

class SheetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SheetError';
  }
}

export async function getSheetData(category: Category): Promise<Product[]> {
  try {
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(category)}`;
    console.log(`[DEBUG] Fetching data for category: ${category}`);
    console.log(`[DEBUG] Using URL: ${SHEET_URL}`);

    const response = await fetch(SHEET_URL, {
      cache: 'no-store' // Disable cache completely for debugging
    });

    if (!response.ok) {
      throw new SheetError(`Failed to fetch sheet data for ${category}: ${response.statusText}`);
    }

    const csvText = await response.text();
    
    // Log the entire CSV content for debugging
    console.log(`[DEBUG] Full CSV content for ${category}:`, csvText);

    if (!csvText.trim()) {
      return [];
    }

    const lines = csvText.split('\n');
    console.log(`[DEBUG] Total lines in CSV for ${category}:`, lines.length);
    console.log(`[DEBUG] Header:`, lines[0]);
    console.log(`[DEBUG] First data row:`, lines[1]);

    // Remove any empty lines
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    console.log(`[DEBUG] Non-empty lines for ${category}:`, nonEmptyLines.length);

    // Skip header row and parse data rows
    const dataRows = nonEmptyLines.slice(1);
    console.log(`[DEBUG] Data rows for ${category}:`, dataRows.length);

    const products = dataRows.map((row, index) => {
      // Split the CSV row properly handling quoted values
      const values = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      const cleanValues = values.map(val => val.replace(/^"|"$/g, '').trim());

      console.log(`[DEBUG] Processing row ${index + 1} for ${category}:`, cleanValues);

      const price = parseFloat(cleanValues[3]?.replace(/[$,]/g, '') || '0');

      const product = {
        title: cleanValues[0] || '',
        collection: cleanValues[1] || '',
        brand: cleanValues[2] || '',
        price: isNaN(price) ? 0 : price,
        link: cleanValues[4] || '',
        image1: cleanValues[5] || '',
        ...(cleanValues[6] && { image2: cleanValues[6] }),
        ...(cleanValues[7] && { image3: cleanValues[7] }),
        ...(cleanValues[8] && { image4: cleanValues[8] }),
        ...(cleanValues[9] && { image5: cleanValues[9] }),
        ...(cleanValues[10] && { image6: cleanValues[10] }),
        category: category,
      };

      console.log(`[DEBUG] Created product for ${category}:`, product);
      return product;
    });

    console.log(`[DEBUG] Final products count for ${category}:`, products.length);
    return products;

  } catch (error) {
    console.error(`[ERROR] Failed to process ${category}:`, error);
    throw error;
  }
}

// Function to fetch featured or hot products
export async function getHotProducts(limit: number = 12): Promise<Product[]> {
  try {
    const allProducts = await Promise.all(
      CATEGORIES.map(async (category: Category) => {
        const products = await getSheetData(category);
        console.log(`[DEBUG] Got ${products.length} products from ${category}`);
        return products.map(product => ({ ...product, category }));
      })
    );

    const flattenedProducts = allProducts.flat();
    console.log(`[DEBUG] Total products before shuffle:`, flattenedProducts.length);

    const shuffledProducts = flattenedProducts.sort(() => Math.random() - 0.5);
    const selectedProducts = shuffledProducts.slice(0, limit);
    
    console.log(`[DEBUG] Final products count:`, selectedProducts.length);
    return selectedProducts;
  } catch (error) {
    console.error('[ERROR] Failed to fetch hot products:', error);
    return [];
  }
}

// Function to fetch latest products
export async function getLatestProducts(limit: number = 6): Promise<Product[]> {
  try {
    const allProducts = await Promise.all(
      CATEGORIES.map(async (category: Category) => {
        const products = await getSheetData(category);
        return products.map(product => ({ ...product, category }));
      })
    );

    return allProducts
      .flat()
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
} 