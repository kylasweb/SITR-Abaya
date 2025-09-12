import { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const getImage = (id: string) => {
  const img = PlaceHolderImages.find((i) => i.id === id);
  if (!img) {
    // Fallback for safety, though this shouldn't happen if JSON is correct
    return { id, url: 'https://picsum.photos/seed/error/800/1200', alt: 'Placeholder', aiHint: 'placeholder' };
  }
  return { id: id, url: img.imageUrl, alt: img.description, aiHint: img.imageHint };
};

// This local data is now primarily for seeding the database.
export const localProducts: Product[] = [
  {
    id: 'prod_001',
    slug: 'midnight-silk-abaya',
    name: 'Midnight Silk Abaya',
    description: 'An embodiment of grace, this black silk abaya flows with every step. Adorned with subtle silver embroidery on the cuffs, it is a timeless piece for any elegant evening.',
    price: 250.0,
    images: [getImage('abaya-1-front'), getImage('abaya-1-side'), getImage('abaya-1-back'), getImage('abaya-1-detail')],
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
    images: [getImage('abaya-2-front'), getImage('abaya-2-side'), getImage('abaya-2-back'), getImage('abaya-2-detail')],
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
    images: [getImage('abaya-3-front'), getImage('abaya-3-side'), getImage('abaya-3-back'), getImage('abaya-3-detail')],
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
    images: [getImage('abaya-4-front'), getImage('abaya-4-side'), getImage('abaya-4-back'), getImage('abaya-4-detail')],
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
    images: [getImage('abaya-5-front'), getImage('abaya-5-side'), getImage('abaya-5-back'), getImage('abaya-5-detail')],
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
    images: [getImage('abaya-6-front'), getImage('abaya-6-side'), getImage('abaya-6-back'), getImage('abaya-6-detail')],
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
    images: [getImage('abaya-7-front'), getImage('abaya-7-side'), getImage('abaya-7-back'), getImage('abaya-7-detail')],
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
    images: [getImage('abaya-8-front'), getImage('abaya-8-side'), getImage('abaya-8-back'), getImage('abaya-8-detail')],
    variants: {
      size: ['50', '52', '54', '56'],
      color: ['Black'],
      material: ['Georgette'],
    },
    category: 'Occasion Wear',
    tags: ['lace', 'feminine', 'romantic'],
  },
];


// Fetches all products from Firestore.
// Caching and error handling would be added in a production scenario.
export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => {
      const data = doc.data();
      // Firestore stores image data as an array of objects, but we need to re-hydrate the full URL
      const hydratedImages = data.images.map((img: { id: string; }) => getImage(img.id));
      return { id: doc.id, ...data, images: hydratedImages } as Product;
    });

    if (productList.length === 0) {
      // If Firestore is empty, it's likely not seeded yet.
      console.warn("Firestore 'products' collection is empty. You may need to seed the database.");
      return [];
    }

    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    // On error (e.g. API not enabled), return an empty array to avoid crashing the app.
    return [];
  }
}
