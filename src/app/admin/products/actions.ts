'use server';

import { revalidatePath } from 'next/cache';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function deleteProductAction(productId: string): Promise<{ success: boolean; message: string }> {
  if (!productId) {
    return { success: false, message: 'Product ID is required.' };
  }

  try {
    const productDocRef = doc(db, 'products', productId);
    await deleteDoc(productDocRef);

    // Revalidate paths to refresh data on the admin and public product pages
    revalidatePath('/admin/products');
    revalidatePath('/products');
    // We should also revalidate the homepage in case the deleted product was featured
    revalidatePath('/');

    return { success: true, message: 'Product has been successfully deleted.' };
  } catch (error) {
    console.error('Failed to delete product:', error);
    return { success: false, message: 'Failed to delete product. Please check server logs.' };
  }
}
