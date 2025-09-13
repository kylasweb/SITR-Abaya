"use server";

import { revalidatePath } from "next/cache";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { FeatureItem } from "@/lib/types";

export type FormState = {
  message: string;
  success: boolean;
  timestamp: number;
};

export async function updateHomepageFeaturesAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const itemsData = formData.get("items") as string;
    if (!itemsData) {
      return { message: "No items data received.", success: false, timestamp: Date.now() };
    }

    const items: FeatureItem[] = JSON.parse(itemsData);

    const settingsDocRef = doc(db, "settings", "siteConfig");
    await updateDoc(settingsDocRef, { "homepage.featureItems": items });

    revalidatePath("/");
    revalidatePath("/admin/settings/homepage");

    return {
      message: "Homepage features updated successfully.",
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Failed to update homepage features:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      message: `Failed to update features: ${errorMessage}`,
      success: false,
      timestamp: Date.now(),
    };
  }
}
