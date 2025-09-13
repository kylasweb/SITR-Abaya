"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from 'next/image';
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
import { Loader2, Trash2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateProductAction } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { EditableProduct } from "@/lib/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.string().min(1, "Category is required."),
  tags: z.string().min(1, "At least one tag is required."),
  sizes: z.string().min(1, "At least one size is required."),
  materials: z.string().min(1, "At least one material is required."),
  newImages: z.array(z.instanceof(File))
    .max(5, "You can upload a maximum of 5 images.")
    .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(files => files.every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)), "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .optional(),
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
  const updateProductActionWithId = updateProductAction.bind(null, product.id);
  const [state, formAction] = useFormState(updateProductActionWithId, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [existingImages, setExistingImages] = useState<string[]>(product.imageUrls);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        tags: product.tags.join(', '),
        sizes: product.sizes.join(', '),
        materials: product.materials.join(', '),
        newImages: [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    form.setValue("newImages", files, { shouldValidate: true });

    const previews = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews(previews);
  };

  const removeNewImage = (index: number) => {
    const newPreviews = [...newImagePreviews];
    newPreviews.splice(index, 1);
    setNewImagePreviews(newPreviews);
    
    const newImages = [...(form.getValues('newImages') || [])];
    newImages.splice(index, 1);
    form.setValue('newImages', newImages, { shouldValidate: true });
  };
  
  const removeExistingImage = (imageUrl: string) => {
    setExistingImages(prev => prev.filter(url => url !== imageUrl));
    setImagesToRemove(prev => [...prev, imageUrl]);
  }

  useEffect(() => {
    if (state.timestamp > initialState.timestamp && state.message) {
      if (state.success) {
        toast({
          title: "Product Updated",
          description: state.message,
        });
        // On successful update, clear the "to remove" and "new images" state
        setImagesToRemove([]);
        setNewImagePreviews([]);
        form.reset({
          ...form.getValues(),
          newImages: [],
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
         // If the server fails, restore the "removed" image to the display
        setExistingImages(prev => [...prev, ...imagesToRemove]);
        setImagesToRemove([]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, toast, form]);


  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => {
            const formData = new FormData(formRef.current!);
            formData.append('existingImageUrls', existingImages.join(','));
            formData.append('imagesToRemove', imagesToRemove.join(','));
            
            const newImages = form.getValues('newImages') || [];
            newImages.forEach(file => formData.append('newImages', file));

            formAction(formData);
        })}
        className="space-y-8"
      >
        {/* --- Image Management --- */}
        <div className="space-y-4">
            <FormLabel>Product Images</FormLabel>
            <FormDescription>Manage the images for this product.</FormDescription>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {existingImages.map((url, index) => (
                    <div key={url} className="relative aspect-square">
                        <Image src={url} alt={`Existing image ${index + 1}`} fill className="object-cover rounded-md" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={() => removeExistingImage(url)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    ))}
                </div>
            )}
             {existingImages.length === 0 && newImagePreviews.length === 0 && (
                <p className="text-sm text-destructive">You must have at least one image.</p>
            )}

            {/* New Image Upload */}
            <FormField
            control={form.control}
            name="newImages"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <div className="flex flex-col items-center justify-center w-full mt-4">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Add more images</span></p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                        </label> 
                    </div> 
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* New Image Previews */}
            {newImagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {newImagePreviews.map((src, index) => (
                <div key={index} className="relative aspect-square">
                    <Image src={src} alt={`Preview ${index + 1}`} fill className="object-cover rounded-md" />
                    <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removeNewImage(index)}
                    >
                    <X className="h-4 w-4" />
                    </Button>
                </div>
                ))}
            </div>
            )}
        </div>


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
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sizes</FormLabel>
              <FormControl>
                <Input placeholder="52, 54, 56, 58" {...field} />
              </FormControl>
              <FormDescription>Comma-separated list of available sizes.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="materials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Materials</FormLabel>
              <FormControl>
                <Input placeholder="Silk, Crepe, Nida" {...field} />
              </FormControl>
               <FormDescription>Comma-separated list of materials.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="elegant, modern, classic" {...field} />
              </FormControl>
               <FormDescription>Comma-separated list of tags for searching.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <SubmitButton />
      </form>
    </Form>
  );
}
