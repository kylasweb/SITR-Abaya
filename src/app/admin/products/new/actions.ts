"use server";

import { revalidatePath } from "next/cache";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { NewProduct } from "@/lib/types";

export type FormState = {
  message: string;
  success: boolean;
  timestamp: number;
};

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

async function uploadImage(image: File, productId: string): Promise<string> {
  const storageRef = ref(storage, `products/${productId}/${image.name}`);
  const snapshot = await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

export async function addProductAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    
    const tags = (formData.get("tags") as string).split(',').map(t => t.trim()).filter(Boolean);
    const sizes = (formData.get("sizes") as string).split(',').map(s => s.trim()).filter(Boolean);
    const materials = (formData.get("materials") as string).split(',').map(m => m.trim()).filter(Boolean);
    const images = formData.getAll("images") as File[];

    if (!name || !description || !price || !category || tags.length === 0 || sizes.length === 0 || materials.length === 0 || images.length === 0) {
      return {
        message: "All fields including at least one image are required.",
        success: false,
        timestamp: Date.now(),
      };
    }
    
    const newProductId = `prod_${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    const slug = createSlug(name);

    // Upload images to Firebase Storage
    const imageUrls = await Promise.all(images.map(image => uploadImage(image, newProductId)));

    const newProduct: NewProduct = {
      name,
      description,
      price,
      category,
      tags,
      images: imageUrls.map(url => ({
        url,
        alt: name, // Use product name as a default alt text
        aiHint: `${category} abaya`,
        id: '' // ID is not from placeholders anymore
      })),
      variants: {
        size: sizes,
        color: ['Black'],
        material: materials,
      },
    };
    
    const productsCollection = collection(db, "products");
    await setDoc(doc(productsCollection, newProductId), { ...newProduct, slug });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");

    return {
      message: `Product "${name}" has been successfully created.`,
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      message: "Failed to create product. Please check server logs.",
      success: false,
      timestamp: Date.now(),
    };
  }
}
