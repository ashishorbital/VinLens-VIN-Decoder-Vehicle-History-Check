export const MOTOMARKS_CONFIG = {
  publicKey: 'pk_f721cbd694858fc150541abfc316cf4d',
  secretKey: 'sk_bb599a3832a692cde43b2aec52949e7a',
  baseUrl: 'https://motomarks.io/img'
};

export const MAKE_SLUGS: Record<string, string> = {
  'Toyota': 'toyota',
  'Honda': 'honda',
  'Ford': 'ford',
  'BMW': 'bmw',
  'Mercedes-Benz': 'mercedes-benz',
  'Audi': 'audi',
  'Volkswagen': 'volkswagen',
  'Hyundai': 'hyundai',
  'Kia': 'kia',
  'Nissan': 'nissan',
  'Mazda': 'mazda',
  'Subaru': 'subaru',
  'Lexus': 'lexus',
  'Chevrolet': 'chevrolet',
  'Tesla': 'tesla',
  'Volvo': 'volvo',
  'Porsche': 'porsche',
  'Jeep': 'jeep',
  'Dodge': 'dodge',
  'GMC': 'gmc',
  'Ram': 'ram',
  'Land Rover': 'land-rover',
  'Acura': 'acura',
  'Infiniti': 'infiniti',
  'Cadillac': 'cadillac',
  'Lincoln': 'lincoln',
  'Buick': 'buick',
  'Chrysler': 'chrysler',
  'Genesis': 'genesis',
  'Jaguar': 'jaguar',
  'Mini': 'mini',
  'Mitsubishi': 'mitsubishi'
};

export function getMotoMarksLogoUrl(makeName: string): string {
  const slug = MAKE_SLUGS[makeName] || makeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${MOTOMARKS_CONFIG.baseUrl}/${slug}?token=${MOTOMARKS_CONFIG.publicKey}&type=badge&size=sm`;
}

export function getFallbackLogoUrl(makeName: string): string {
  const slug = MAKE_SLUGS[makeName] || makeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${slug}.png`;
}
