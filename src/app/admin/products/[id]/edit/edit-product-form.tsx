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
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateProductAction } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import type { EditableProduct } from "@/lib/types";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.string().min(1, "Category is required."),
  tags: z.array(z.object({ value: z.string().min(1, 'Tag cannot be empty') })).min(1, "At least one tag is required."),
  sizes: z.array(z.object({ value: z.string().min(1, 'Size cannot be empty') })).min(1, "At least one size is required."),
  materials: z.array(z.object({ value: z.string().min(1, 'Material cannot be empty') })).min(1, "At least one material is required."),
  imageIds: z.string().min(1, "At least one image ID is required."),
});

type ProductFormValues = z.infer<typeof productSchema>;

const initialState = {
  message: '',
  success: false,
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
       {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving Changes...
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
}

interface EditProductFormProps {
    product: EditableProduct;
}

export function EditProductForm({ product }: EditProductFormProps) {
  const { toast } = useToast();
  // We need to bind the productId to the server action
  const updateProductActionWithId = updateProductAction.bind(null, product.id);
  const [state, formAction] = useFormState(updateProductActionWithId, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        tags: product.tags.map(v => ({ value: v })),
        sizes: product.sizes.map(v => ({ value: v })),
        materials: product.materials.map(v => ({ value: v })),
        imageIds: product.imageIds,
    },
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({ control: form.control, name: "tags" });
  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({ control: form.control, name: "sizes" });
  const { fields: materialFields, append: appendMaterial, remove: removeMaterial } = useFieldArray({ control: form.control, name: "materials" });

  useEffect(() => {
    if (state.timestamp && state.message) {
      if (state.success) {
        toast({
          title: "Product Updated",
          description: state.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
      }
    }
  }, [state, toast, form]);


  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formAction(new FormData(formRef.current!)))}
        className="space-y-8"
      >
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
        
        <FormField
          control={form.control}
          name="imageIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Placeholder IDs</FormLabel>
              <FormControl>
                <Input placeholder="e.g., abaya-9-front,abaya-9-side" {...field} />
              </FormControl>
              <FormDescription>
                Comma-separated list of image placeholder IDs from placeholder-images.json.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


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
            <FormMessage>{form.formState.errors.sizes?.message}</FormMessage>
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
             <FormMessage>{form.formState.errors.materials?.message}</FormMessage>
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
             <FormMessage>{form.formState.errors.tags?.message}</FormMessage>
        </div>
        
        <SubmitButton />
      </form>
    </Form>
  );
}
