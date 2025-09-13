"use client";

import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateHomepageFeaturesAction } from "./actions";
import { useFormStatus } from "react-dom";
import React, { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { FeatureItem } from "@/lib/types";

// Get a list of all available icon names from lucide-react
const availableIcons = Object.keys(LucideIcons).filter(key => typeof (LucideIcons as any)[key] === 'object' && key !== 'createLucideIcon');

const featureItemSchema = z.object({
  icon: z.string().min(1, "Icon is required."),
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

const formSchema = z.object({
  items: z.array(featureItemSchema),
});

type FeatureFormValues = z.infer<typeof formSchema>;

const initialState = {
  message: "",
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
          Saving...
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
}

interface HomepageFeaturesFormProps {
  initialItems: FeatureItem[];
}

export function HomepageFeaturesForm({ initialItems }: HomepageFeaturesFormProps) {
  const { toast } = useToast();
  const [state, formAction] = React.useActionState(updateHomepageFeaturesAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: initialItems,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    if (state.timestamp > initialState.timestamp && state.message) {
      if (state.success) {
        toast({ title: "Success", description: state.message });
      } else {
        toast({ variant: "destructive", title: "Error", description: state.message });
      }
    }
  }, [state, toast]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => {
            const formData = new FormData();
            formData.append('items', JSON.stringify(form.getValues().items));
            formAction(formData);
        })}
        className="space-y-8"
      >
        <div className="space-y-6">
          {fields.map((field, index) => {
            const IconComponent = (LucideIcons as any)[form.watch(`items.${index}.icon`)];
            return (
              <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                 <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-destructive"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="grid md:grid-cols-3 gap-4 items-start">
                    <FormField
                        control={form.control}
                        name={`items.${index}.icon`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Icon</FormLabel>
                             <div className="flex items-center gap-2">
                                {IconComponent && <IconComponent className="h-5 w-5 text-muted-foreground" />}
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an icon" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {availableIcons.map(iconName => (
                                            <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                    control={form.control}
                    name={`items.${index}.title`}
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <FormField
                  control={form.control}
                  name={`items.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center">
             <Button
                type="button"
                variant="outline"
                onClick={() => append({ icon: "Gem", title: "", description: "" })}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Feature
            </Button>
            <SubmitButton />
        </div>
      </form>
    </Form>
  );
}
