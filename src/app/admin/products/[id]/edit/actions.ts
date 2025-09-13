"use server";

import { revalidatePath } from "next/cache";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type FormState = {
  message: string;
  success: boolean;
  timestamp: number;
};

// Helper to generate a URL-friendly slug from a string
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

// This is the server action that will be called when the form is submitted.
export async function updateProductAction(
  productId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!productId) {
    return {
      message: "Product ID is missing. Cannot update.",
      success: false,
      timestamp: Date.now(),
    };
  }

  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    
    // For array fields from the form
    const tags = formData.getAll("tags").map(tag => (tag as string)).filter(Boolean);
    const sizes = formData.getAll("sizes").map(size => (size as string)).filter(Boolean);
    const materials = formData.getAll("materials").map(material => (material as string)).filter(Boolean);
    const imageIds = (formData.get("imageIds") as string).split(',').map(id => id.trim());

    // Basic validation
    if (!name || !description || !price || !category || tags.length === 0 || sizes.length === 0 || materials.length === 0 || imageIds.length === 0) {
      return {
        message: "All fields are required and cannot be empty.",
        success: false,
        timestamp: Date.now(),
      };
    }
    
    const slug = createSlug(name);

    const updatedProductData = {
      name,
      slug,
      description,
      price,
      category,
      tags,
      images: imageIds.map(id => ({ id })), // Storing only IDs
      variants: {
        size: sizes,
        color: ['Black'], // Assuming black is the only color for now
        material: materials,
      },
      updatedAt: serverTimestamp(),
    };
    
    // Update the product in Firestore
    const productDocRef = doc(db, "products", productId);
    await updateDoc(productDocRef, updatedProductData);

    // Revalidate paths to show the updated product
    revalidatePath("/admin/products");
    revalidatePath(`/products/${slug}`);
    revalidatePath("/products");

    return {
      message: `Product "${name}" has been successfully updated.`,
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      message: "Failed to update product. Please check server logs.",
      success: false,
      timestamp: Date.now(),
    };
  }
}
