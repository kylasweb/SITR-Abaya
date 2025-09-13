import { Product, Order, EditableProduct, UserData } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';

// This function is no longer used to fetch product images, but is kept for local fallback.
const getPlaceholderImage = (id: string) => {
  const img = PlaceHolderImages.find((i) => i.id === id);
  if (!img) {
    return { id, url: 'https://picsum.photos/seed/error/800/1200', alt: 'Placeholder', aiHint: 'placeholder' };
  }
  return { id: id, url: img.imageUrl, alt: img.description, aiHint: img.imageHint };
};

// This local data is now primarily for seeding the database.
export const localProducts: Omit<Product, 'images'>[] = [
  // This data is stripped of the `images` property because it now relies on URLs from storage,
  // which can't be known ahead of time. Seeding will need to be adjusted or disabled
  // if it was dependent on this static data structure with placeholder images.
  {
    id: 'prod_001',
    slug: 'midnight-silk-abaya',
    name: 'Midnight Silk Abaya',
    description: 'An embodiment of grace, this black silk abaya flows with every step. Adorned with subtle silver embroidery on the cuffs, it is a timeless piece for any elegant evening.',
    price: 250.0,
    variants: {
      size: ['50', '52', '54', '56', '58', '60'],
      color: ['Black'],
      material: ['Silk'],
    },
    category: 'Evening Wear',
    tags: ['classic', 'elegant', 'silk'],
  },
  // ... other products would be here, similarly stripped of the `images` property.
];


// Fetches all products from Firestore.
export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    
    if (productSnapshot.empty) {
      console.warn("Firestore 'products' collection is empty. Please add products via the admin panel.");
      return [];
    }

    const productList = productSnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id,
        slug: data.slug,
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
        variants: data.variants,
        category: data.category,
        tags: data.tags,
      } as Product;
    });

    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
}

// Fetches a single product by its ID from Firestore for the edit form.
export async function getProductById(productId: string): Promise<EditableProduct | null> {
  if (!productId) return null;
  try {
    const productDocRef = doc(db, 'products', productId);
    const docSnap = await getDoc(productDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Ensure that `data.images` is an array and map over it.
      const imageUrls = Array.isArray(data.images) ? data.images.map((img: { url: string }) => img.url) : [];
      
      return {
        id: docSnap.id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        tags: data.tags || [],
        sizes: data.variants?.size || [],
        materials: data.variants?.material || [],
        imageUrls: imageUrls,
      };
    } else {
      console.warn(`Product with ID ${productId} not found.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
}


// Fetches all orders for a given user ID from Firestore.
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  if (!userId) return [];

  try {
    const ordersCollection = collection(db, 'orders');
    const q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const orderSnapshot = await getDocs(q);

    if (orderSnapshot.empty) {
      return [];
    }

    const orderList = orderSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Order;
    });

    return orderList;
  } catch (error) {
    console.error("Error fetching orders from Firestore:", error);
    return []; // Return empty array on error
  }
}

// Fetches all orders from Firestore for the admin panel.
export async function getAllOrders(): Promise<Order[]> {
    try {
        const ordersCollection = collection(db, 'orders');
        const q = query(ordersCollection, orderBy('createdAt', 'desc'));
        const orderSnapshot = await getDocs(q);

        if (orderSnapshot.empty) {
            return [];
        }

        const orderList = orderSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
            } as Order;
        });

        return orderList;
    } catch (error) {
        console.error("Error fetching all orders from Firestore:", error);
        return [];
    }
}

// Fetches all registered users from the 'users' collection.
export async function getAllUsers(): Promise<UserData[]> {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, orderBy('createdAt', 'desc'));
        const userSnapshot = await getDocs(q);

        if (userSnapshot.empty) {
            return [];
        }

        const userList = userSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt.toDate(),
            } as UserData;
        });

        return userList;
    } catch (error) {
        console.error("Error fetching all users from Firestore:", error);
        return [];
    }
}
