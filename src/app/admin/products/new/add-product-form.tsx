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
import { Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addProductAction } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";

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
  images: z.array(z.instanceof(File))
    .min(1, "At least one image is required.")
    .max(5, "You can upload a maximum of 5 images.")
    .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(files => files.every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)), "Only .jpg, .jpeg, .png and .webp formats are supported."),
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
          Creating Product...
        </>
      ) : (
        "Create Product"
      )}
    </Button>
  );
}


export function AddProductForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(addProductAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      tags: "elegant, modern",
      sizes: "52, 54, 56, 58",
      materials: "Nida",
      images: [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    form.setValue("images", files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  
  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    
    const newImages = [...form.getValues('images')];
    newImages.splice(index, 1);
    form.setValue('images', newImages);
  };


  useEffect(() => {
    if (state.timestamp && state.message) {
      if (state.success) {
        toast({
          title: "Product Created",
          description: state.message,
        });
        form.reset();
        setImagePreviews([]);
        formRef.current?.reset();
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
        onSubmit={form.handleSubmit(() => {
          const formData = new FormData();
          const values = form.getValues();
          Object.entries(values).forEach(([key, value]) => {
            if (key === 'images') {
              (value as File[]).forEach(file => formData.append('images', file));
            } else {
              formData.append(key, String(value));
            }
          });
          formAction(formData);
        })}
        className="space-y-8"
      >
        {/* Image Upload */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB each)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                    </label> 
                </div> 
              </FormControl>
              <FormDescription>
                Upload up to 5 images. The first image will be the main display image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative aspect-square">
                <Image src={src} alt={`Preview ${index + 1}`} fill className="object-cover rounded-md" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

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
