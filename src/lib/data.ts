import { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const img = PlaceHolderImages.find((i) => i.id === id);
  if (!img) {
    // Fallback for safety, though this shouldn't happen if JSON is correct
    return { id, url: 'https://picsum.photos/seed/error/800/1200', alt: 'Placeholder', aiHint: 'placeholder' };
  }
  return { id, url: img.imageUrl, alt: img.description, aiHint: img.imageHint };
};

export const products: Product[] = [
  {
    id: 'prod_001',
    slug: 'midnight-silk-abaya',
    name: 'Midnight Silk Abaya',
    description: 'An embodiment of grace, this black silk abaya flows with every step. Adorned with subtle silver embroidery on the cuffs, it is a timeless piece for any elegant evening.',
    price: 250.0,
    images: [getImage('abaya-1')],
    variants: {
      size: ['50', '52', '54', '56', '58', '60'],
      color: ['Black'],
      material: ['Silk'],
    },
    category: 'Evening Wear',
    tags: ['classic', 'elegant', 'silk'],
  },
  {
    id: 'prod_002',
    slug: 'sahara-linen-abaya',
    name: 'Sahara Linen Abaya',
    description: 'Stay cool and chic in our Sahara Linen Abaya. Its breathable fabric and earthy beige tone make it the perfect companion for warm days, offering comfort without compromising on style.',
    price: 180.0,
    images: [getImage('abaya-2')],
    variants: {
      size: ['50', '52', '54', '56'],
      color: ['Black'],
      material: ['Linen'],
    },
    category: 'Daywear',
    tags: ['casual', 'linen', 'summer'],
  },
  {
    id: 'prod_003',
    slug: 'emerald-velvet-abaya',
    name: 'Emerald Velvet Abaya',
    description: 'Make a statement in this luxurious emerald green velvet abaya. Rich in color and texture, it\'s designed for moments that matter. Features a simple, clean cut to let the fabric shine.',
    price: 350.0,
    images: [getImage('abaya-3')],
    variants: {
      size: ['52', '54', '56', '58'],
      color: ['Black'],
      material: ['Velvet'],
    },
    category: 'Formal Wear',
    tags: ['velvet', 'luxury', 'occasion'],
  },
  {
    id: 'prod_004',
    slug: 'modern-navy-abaya',
    name: 'Modern Navy Abaya',
    description: 'A contemporary take on a classic silhouette. This navy blue abaya features a structured fit and discreet pockets, blending functionality with modern minimalism.',
    price: 220.0,
    images: [getImage('abaya-4')],
    variants: {
      size: ['54', '56', '58', '60'],
      color: ['Black'],
      material: ['Crepe'],
    },
    category: 'Workwear',
    tags: ['modern', 'minimalist', 'crepe'],
  },
  {
    id: 'prod_005',
    slug: 'pristine-cotton-abaya',
    name: 'Pristine Cotton Abaya',
    description: 'Simplicity at its best. Our white cotton abaya is a wardrobe essential, perfect for daily errands or casual gatherings. Lightweight, comfortable, and effortlessly stylish.',
    price: 150.0,
    images: [getImage('abaya-5')],
    variants: {
      size: ['50', '52', '54', '56', '58', '60'],
      color: ['Black'],
      material: ['Cotton'],
    },
    category: 'Daywear',
    tags: ['cotton', 'everyday', 'simple'],
  },
  {
    id: 'prod_006',
    slug: 'charcoal-pearl-abaya',
    name: 'Charcoal Pearl Abaya',
    description: 'Exuding sophistication, this charcoal grey abaya is detailed with delicate pearls along the sleeves. A perfect blend of understated glamour and elegance.',
    price: 280.0,
    images: [getImage('abaya-6')],
    variants: {
      size: ['50', '52', '54', '56'],
      color: ['Black'],
      material: ['Nida'],
    },
    category: 'Evening Wear',
    tags: ['pearls', 'glamour', 'nida'],
  },
  {
    id: 'prod_007',
    slug: 'burgundy-bliss-abaya',
    name: 'Burgundy Bliss Abaya',
    description: 'A rich burgundy abaya that commands attention. Made from a soft, flowing fabric, this piece comes with a matching sheila for a complete, coordinated look.',
    price: 235.0,
    images: [getImage('abaya-7')],
    variants: {
      size: ['54', '56', '58', '60'],
      color: ['Black'],
      material: ['Crepe'],
    },
    category: 'Formal Wear',
    tags: ['matching set', 'crepe', 'bold'],
  },
  {
    id: 'prod_008',
    slug: 'dusty-rose-lace-abaya',
    name: 'Dusty Rose Lace Abaya',
    description: 'Feminine and delicate, this dusty rose abaya is trimmed with intricate lace. It\'s a beautiful choice for weddings, afternoon teas, or any romantic occasion.',
    price: 265.0,
    images: [getImage('abaya-8')],
    variants: {
      size: ['50', '52', '54', '56'],
      color: ['Black'],
      material: ['Georgette'],
    },
    category: 'Occasion Wear',
    tags: ['lace', 'feminine', 'romantic'],
  },
];
