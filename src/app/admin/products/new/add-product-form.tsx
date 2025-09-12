"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.string().min(1, "Category is required."),
  tags: z.array(z.object({ value: z.string() })).min(1, "At least one tag is required."),
  sizes: z.array(z.object({ value: z.string() })).min(1, "At least one size is required."),
  materials: z.array(z.object({ value: z.string() })).min(1, "At least one material is required."),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductForm() {
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      tags: [{ value: "" }],
      sizes: [{ value: "" }],
      materials: [{ value: "" }],
    },
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({ control: form.control, name: "tags" });
  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({ control: form.control, name: "sizes" });
  const { fields: materialFields, append: appendMaterial, remove: removeMaterial } = useFieldArray({ control: form.control, name: "materials" });

  async function onSubmit(data: ProductFormValues) {
    // In a real app, this would be a server action to save the data to a database.
    console.log({
        ...data,
        tags: data.tags.map(t => t.value),
        sizes: data.sizes.map(s => s.value),
        materials: data.materials.map(m => m.value)
    });
    toast({
      title: "Product Created",
      description: `The product "${data.name}" has been successfully created.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Midnight Silk Abaya" {...field} />
              </FormControl>
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
                <Textarea rows={5} placeholder="Describe the product..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price (in USD)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 250.00" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
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
                        <SelectItem value="Daywear">Daywear</SelectItem>
                        <SelectItem value="Evening Wear">Evening Wear</SelectItem>
                        <SelectItem value="Formal Wear">Formal Wear</SelectItem>
                        <SelectItem value="Workwear">Workwear</SelectItem>
                        <SelectItem value="Occasion Wear">Occasion Wear</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="space-y-4">
            <div>
                <FormLabel>Sizes</FormLabel>
                <FormDescription>The available sizes for this product.</FormDescription>
            </div>
             {sizeFields.map((field, index) => (
                <FormField
                key={field.id}
                control={form.control}
                name={`sizes.${index}.value`}
                render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                         <FormControl>
                            <Input placeholder="e.g., 52" {...field} />
                        </FormControl>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSize(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </FormItem>
                )}
                />
            ))}
             <Button type="button" variant="outline" size="sm" onClick={() => appendSize({ value: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Size
            </Button>
        </div>

         <div className="space-y-4">
            <div>
                <FormLabel>Materials</FormLabel>
                <FormDescription>The materials used in this product.</FormDescription>
            </div>
             {materialFields.map((field, index) => (
                <FormField
                key={field.id}
                control={form.control}
                name={`materials.${index}.value`}
                render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                         <FormControl>
                            <Input placeholder="e.g., Silk" {...field} />
                        </FormControl>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeMaterial(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </FormItem>
                )}
                />
            ))}
             <Button type="button" variant="outline" size="sm" onClick={() => appendMaterial({ value: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Material
            </Button>
        </div>

         <div className="space-y-4">
            <div>
                <FormLabel>Tags</FormLabel>
                <FormDescription>Keywords for searching and filtering.</FormDescription>
            </div>
             {tagFields.map((field, index) => (
                <FormField
                key={field.id}
                control={form.control}
                name={`tags.${index}.value`}
                render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                         <FormControl>
                            <Input placeholder="e.g., elegant" {...field} />
                        </FormControl>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeTag(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </FormItem>
                )}
                />
            ))}
             <Button type="button" variant="outline" size="sm" onClick={() => appendTag({ value: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Tag
            </Button>
        </div>
        
        <Button type="submit">Create Product</Button>
      </form>
    </Form>
  );
}
