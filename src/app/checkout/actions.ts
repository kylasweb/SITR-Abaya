"use server";

import { revalidatePath } from "next/cache";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CartItem, NewOrder, ShippingAddress } from "@/lib/types";
import { redirect } from "next/navigation";

export type FormState = {
  message: string;
  success: boolean;
  timestamp: number;
};

// This is the server action that will be called when the checkout form is submitted.
export async function placeOrderAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // --- Data Extraction ---
    const userId = formData.get("userId") as string;
    const currency = formData.get("currency") as string;
    const cartItemsJSON = formData.get("cartItems") as string;
    
    const subtotal = Number(formData.get("subtotal"));
    const shipping = Number(formData.get("shipping"));
    const total = Number(formData.get("total"));

    const shippingAddress: ShippingAddress = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zip: formData.get("zip") as string,
        country: formData.get("country") as string,
    };

    // --- Basic Validation ---
    if (!userId) {
      return {
        message: "You must be logged in to place an order.",
        success: false,
        timestamp: Date.now(),
      };
    }

    if (!cartItemsJSON) {
        return {
          message: "Your cart is empty.",
          success: false,
          timestamp: Date.now(),
        };
    }

    const cartItems: CartItem[] = JSON.parse(cartItemsJSON);

    if (cartItems.length === 0) {
        return {
          message: "Your cart is empty.",
          success: false,
          timestamp: Date.now(),
        };
    }
    
    // --- Order Creation ---
    const newOrder: NewOrder = {
      userId,
      items: cartItems,
      shippingAddress,
      subtotal,
      shipping,
      total,
      currency,
      status: "pending", // Default status
    };
    
    // Add the new order to the 'orders' collection in Firestore
    const ordersCollection = collection(db, "orders");
    const orderDocRef = await addDoc(ordersCollection, {
        ...newOrder,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    // --- Post-Order Actions ---

    // Revalidate paths that show order data.
    revalidatePath("/account/profile");
    revalidatePath("/admin/orders");

  } catch (error) {
    console.error("Failed to create order:", error);
    return {
      message: "Failed to create order due to a server error. Please try again.",
      success: false,
      timestamp: Date.now(),
    };
  }

  // Redirect to a success page.
  // The cart clearing will be handled on the client side after the redirect.
  redirect("/account/profile?order_success=true");
}
