const CLOUDFLARE_R2_DOMAIN = 'https://pub-e2e5ced9a5c24c6ab16bc0192dbf1c7c.r2.dev';

export function getImageUrl(path: string): string {
  if (!path) return '';
  
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combine with R2 domain
  return `${CLOUDFLARE_R2_DOMAIN}/${cleanPath}`;
} 