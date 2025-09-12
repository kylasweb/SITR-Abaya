"use server";

import { revalidatePath } from "next/cache";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewProduct } from "@/lib/types";

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
export async function addProductAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    
    // For array fields from the form
    const tags = formData.getAll("tags").map(tag => (tag as string).split('.value')[0]).filter(Boolean);
    const sizes = formData.getAll("sizes").map(size => (size as string).split('.value')[0]).filter(Boolean);
    const materials = formData.getAll("materials").map(material => (material as string).split('.value')[0]).filter(Boolean);
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
    const newProductId = `prod_${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;

    const newProduct: NewProduct = {
      name,
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
    };
    
    // Add the new product to Firestore
    const productsCollection = collection(db, "products");
    await setDoc(doc(productsCollection, newProductId), { ...newProduct, slug });


    // Revalidate the products page to show the new product
    revalidatePath("/admin/products");
    revalidatePath("/products");

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
