"use server";

import { revalidatePath } from "next/cache";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export type FormState = {
  message: string;
  success: boolean;
  timestamp: number;
};

const createSlug = (name: string) => name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

async function uploadImage(image: File, productId: string): Promise<string> {
  const storageRef = ref(storage, `products/${productId}/${Date.now()}-${image.name}`);
  await uploadBytes(storageRef, image);
  return getDownloadURL(storageRef);
}

async function deleteImage(imageUrl: string) {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error: any) {
    // It's okay if the file doesn't exist (e.g., already deleted).
    // We log other errors for debugging but don't throw, as it shouldn't block the update.
    if (error.code !== 'storage/object-not-found') {
      console.error("Failed to delete image from storage:", error);
    }
  }
}

export async function updateProductAction(
  productId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!productId) {
    return { message: "Product ID is missing.", success: false, timestamp: Date.now() };
  }

  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    
    const tags = (formData.get("tags") as string).split(',').map(t => t.trim()).filter(Boolean);
    const sizes = (formData.get("sizes") as string).split(',').map(s => s.trim()).filter(Boolean);
    const materials = (formData.get("materials") as string).split(',').map(m => m.trim()).filter(Boolean);
    
    const existingImageUrls = (formData.get("existingImageUrls") as string).split(',').filter(Boolean);
    const imagesToRemove = (formData.get("imagesToRemove") as string).split(',').filter(Boolean);
    const newImages = formData.getAll("newImages") as File[];

    if (!name || !description || !price || !category || tags.length === 0 || sizes.length === 0 || materials.length === 0) {
      return { message: "Please fill out all required fields.", success: false, timestamp: Date.now() };
    }

    // --- Image Processing ---
    // 1. Delete images marked for removal from Firebase Storage.
    await Promise.all(imagesToRemove.map(url => deleteImage(url)));

    // 2. Upload new images to Firebase Storage.
    const newImageUrls = await Promise.all(newImages.map(image => uploadImage(image, productId)));
    
    // 3. Combine final list of image URLs.
    const finalImageUrls = [...existingImageUrls, ...newImageUrls];

    if (finalImageUrls.length === 0) {
      return { message: "Product must have at least one image.", success: false, timestamp: Date.now() };
    }

    const slug = createSlug(name);
    const updatedProductData = {
      name,
      slug,
      description,
      price,
      category,
      tags,
      images: finalImageUrls.map(url => ({
          url,
          alt: name,
          aiHint: `${category} abaya`,
          id: ''
      })),
      variants: {
        size: sizes,
        color: ['Black'],
        material: materials,
      },
      updatedAt: serverTimestamp(),
    };
    
    const productDocRef = doc(db, "products", productId);
    await updateDoc(productDocRef, updatedProductData);

    revalidatePath("/admin/products");
    revalidatePath(`/products/${slug}`);
    revalidatePath("/products");
    revalidatePath("/");

    return {
      message: `Product "${name}" updated successfully.`,
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
      timestamp: Date.now(),
    };
  }
}
