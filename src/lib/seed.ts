// This script is used to seed the Firestore database with initial product data.
// It is intended to be run once, via the /api/seed route.

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { localProducts } from './data';
import type { Product } from './types';

// We need to transform the product data slightly before sending it to Firestore.
// Specifically, we'll store a lightweight version of the image data, not the full URL.
const transformForFirestore = (product: Product) => {
  const firestoreProduct = { ...product };

  // Convert full image objects to just their IDs
  // @ts-ignore
  firestoreProduct.images = product.images.map(image => ({ id: image.id }));
  
  return firestoreProduct;
};


export async function seedDatabase() {
  const productsCollection = collection(db, 'products');
  let count = 0;

  console.log('Starting database seed...');

  for (const product of localProducts) {
    try {
      // Use the product's existing ID as the document ID in Firestore
      const productDocRef = doc(productsCollection, product.id);
      const firestoreData = transformForFirestore(product);
      await setDoc(productDocRef, firestoreData);
      count++;
    } catch (error) {
      console.error(`Error seeding product ${product.id}:`, error);
    }
  }

  console.log(`Seeding complete. ${count} products added to the database.`);
  return count;
}
