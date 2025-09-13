"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { getAllExpenses } from "@/lib/data";
import { ExpenseForm } from "./expense-form";
import ExpenseTable from "./expense-table";
import type { Expense } from "@/lib/types";
import { useRouter } from 'next/navigation';
import { useAsync } from '@/hooks/use-async';

// This is a new component that wraps the form and manages its selection state.
function ExpenseFormWrapper({ onSaveSuccess }: { onSaveSuccess: () => void }) {
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

    const handleEdit = (expense: Expense) => {
        setSelectedExpense(expense);
    };

    const handleSuccess = () => {
        setSelectedExpense(null); // Clear selection after successful save/update
        onSaveSuccess();
    };

    return <ExpenseForm expense={selectedExpense} onSuccess={handleSuccess} setSelectedExpense={setSelectedExpense} />;
}


export default function AccountingPage() {
    const router = useRouter();
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

    // Use a hook to fetch data so it can be re-fetched easily
    const { data: expenses, loading, error, refresh } = useAsync(getAllExpenses, true, []);

    const handleSuccess = () => {
        setSelectedExpense(null); // Clear selection after successful save/update
        refresh(); // Re-fetch the expenses
    };

    const totalExpenses = (expenses || []).reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Landmark className="h-7 w-7" />
                    Accounting
                </h1>
                <p className="mt-1 text-muted-foreground">
                    Track your business expenses and manage your finances.
                </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                         <CardHeader>
                            <CardTitle>All Expenses</CardTitle>
                            <CardDescription>
                                A complete log of all your business expenses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading && <p>Loading expenses...</p>}
                            {error && <p className="text-destructive">Failed to load expenses.</p>}
                            {!loading && !error && expenses && expenses.length > 0 ? (
                                <ExpenseTable expenses={expenses} onEdit={setSelectedExpense} />
                            ) : (
                                !loading && (
                                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                    <h3 className="text-lg font-semibold">No Expenses Logged</h3>
                                    <p className="mt-1 text-muted-foreground">Add your first expense using the form.</p>
                                </div>
                                )
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader>
                             <CardTitle>Total Expenses</CardTitle>
                             <CardDescription>The sum of all recorded expenses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="text-3xl font-bold">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalExpenses)}
                             </p>
                        </CardContent>
                    </Card>
                    <ExpenseForm expense={selectedExpense} onSuccess={handleSuccess} setSelectedExpense={setSelectedExpense} />
                </div>
            </div>
        </div>
    );
}