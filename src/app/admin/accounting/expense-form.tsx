"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { saveExpenseAction } from "./actions";
import { useFormStatus } from "react-dom";
import React, { useEffect, useRef } from "react";
import type { Expense } from "@/lib/types";

const expenseSchema = z.object({
  id: z.string().optional(),
  date: z.date({ required_error: "A date is required." }),
  category: z.string().min(1, "Category is required."),
  amount: z.coerce.number().positive("Amount must be a positive number."),
  description: z.string().min(3, "Description must be at least 3 characters."),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

const initialState = { message: '', success: false, timestamp: Date.now() };

function SubmitButton({ expense }: { expense: Expense | null }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : expense ? (
        "Save Changes"
      ) : (
        "Add Expense"
      )}
    </Button>
  );
}

interface ExpenseFormProps {
  expense?: Expense | null;
  onSuccess: () => void;
}

export function ExpenseForm({ expense = null, onSuccess }: ExpenseFormProps) {
  const { toast } = useToast();
  const [state, formAction] = React.useActionState(saveExpenseAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      id: expense?.id || undefined,
      date: expense?.date || new Date(),
      category: expense?.category || "",
      amount: expense?.amount || 0,
      description: expense?.description || "",
    },
  });

  useEffect(() => {
    if (state.timestamp > initialState.timestamp && state.message) {
      if (state.success) {
        toast({ title: "Success", description: state.message });
        form.reset({
          id: undefined,
          date: new Date(),
          category: "",
          amount: 0,
          description: ""
        });
        onSuccess();
      } else {
        toast({ variant: "destructive", title: "Error", description: state.message });
      }
    }
  }, [state, toast, form, onSuccess]);
  
  // Reset form when the selected expense changes
  useEffect(() => {
     form.reset({
      id: expense?.id || undefined,
      date: expense?.date ? new Date(expense.date) : new Date(),
      category: expense?.category || "",
      amount: expense?.amount || 0,
      description: expense?.description || "",
    });
  }, [expense, form]);

  return (
     <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            {expense ? 'Edit Expense' : <><PlusCircle className="h-5 w-5" /> Add New Expense</>}
        </CardTitle>
        <CardDescription>
            {expense ? 'Update the details for this expense.' : 'Log a new business expense to keep track of your finances.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            action={formAction}
            onSubmit={form.handleSubmit(() => {
              const formData = new FormData();
              const values = form.getValues();
              formData.append("id", values.id || "");
              formData.append("date", values.date.toISOString());
              formData.append("category", values.category);
              formData.append("amount", String(values.amount));
              formData.append("description", values.description);
              formAction(formData);
            })}
            className="space-y-6"
          >
            <FormField control={form.control} name="id" render={({ field }) => <input type="hidden" {...field} />} />

            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Amount (USD)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 50.00" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Cost of Goods">Cost of Goods</SelectItem>
                            <SelectItem value="Shipping">Shipping</SelectItem>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="e.g., Facebook ad campaign for summer collection" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
                {expense && (
                    <Button type="button" variant="ghost" onClick={() => {
                        form.reset({ date: new Date(), category: "", amount: 0, description: "", id: undefined });
                        onSuccess(); // To clear the selection in the parent
                    }}>
                        Cancel Edit
                    </Button>
                )}
                <SubmitButton expense={expense} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
