"use server";

import { revalidatePath } from "next/cache";
import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { NewExpense } from "@/lib/types";

export type FormState = {
  message: string;
  success: boolean;
  timestamp: number;
};

// --- ADD OR UPDATE EXPENSE ---
export async function saveExpenseAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = formData.get("id") as string | null;
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;
  const amount = Number(formData.get("amount"));
  const description = formData.get("description") as string;

  if (!date || !category || !amount || !description) {
    return { message: "All fields are required.", success: false, timestamp: Date.now() };
  }

  try {
    if (id) {
      // --- Update existing expense ---
      const expenseDocRef = doc(db, "expenses", id);
      await updateDoc(expenseDocRef, {
        date: new Date(date),
        category,
        amount,
        description,
      });
      revalidatePath("/admin/accounting");
      return { message: "Expense updated successfully.", success: true, timestamp: Date.now() };
    } else {
      // --- Add new expense ---
      const newExpense: NewExpense = {
        date,
        category,
        amount,
        description,
      };

      const expensesCollection = collection(db, "expenses");
      await addDoc(expensesCollection, {
        ...newExpense,
        date: new Date(date),
        createdAt: serverTimestamp(),
      });

      revalidatePath("/admin/accounting");
      return { message: "Expense added successfully.", success: true, timestamp: Date.now() };
    }
  } catch (error) {
    console.error("Failed to save expense:", error);
    return { message: "An unexpected error occurred.", success: false, timestamp: Date.now() };
  }
}

// --- DELETE EXPENSE ---
export async function deleteExpenseAction(expenseId: string): Promise<{ success: boolean, message: string }> {
  if (!expenseId) {
    return { success: false, message: "Expense ID is required." };
  }

  try {
    await deleteDoc(doc(db, "expenses", expenseId));
    revalidatePath("/admin/accounting");
    return { success: true, message: "Expense deleted successfully." };
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return { success: false, message: "Failed to delete expense." };
  }
}
