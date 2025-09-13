'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormStatus } from 'react-dom';
import { placeOrderAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { CartItem } from '@/lib/types';


const shippingAddressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State or province is required'),
  zip: z.string().min(3, 'ZIP or postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

type ShippingAddressFormValues = z.infer<typeof shippingAddressSchema>;

const initialState = {
  message: '',
  success: false,
  timestamp: Date.now(),
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full h-12" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order...
                </>
            ) : (
                'Place Order'
            )}
        </Button>
    )
}

export default function CheckoutPage() {
    const { cart: cartItems, clearCart, selectedCurrency } = useStore();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const [state, formAction] = React.useActionState(placeOrderAction, initialState);

    const form = useForm<ShippingAddressFormValues>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: {
            name: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: 'United Arab Emirates', // Default country
        },
    });

    // Pre-fill user data when available
    useEffect(() => {
        if (user) {
            form.setValue('name', user.displayName || '');
            form.setValue('email', user.email || '');
        }
    }, [user, form]);
    
    // Handle redirecting if user is not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [authLoading, user, router]);

    // Handle form submission result
    useEffect(() => {
        if (state.timestamp > initialState.timestamp) { // Check if state has been updated
            if (state.success) {
                // Success is handled by the redirect in the action
            } else if (state.message) {
                toast({
                    variant: 'destructive',
                    title: 'Order Failed',
                    description: state.message,
                });
            }
        }
    }, [state, toast]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: selectedCurrency.code,
        }).format(price * selectedCurrency.rate);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 10 : 0; // Assuming shipping is a flat $10 USD
    const total = subtotal + shipping;

    if (authLoading || !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
  return (
    <>
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Checkout</h1>
      </header>
      
      {cartItems.length > 0 ? (
        <Form {...form}>
            <form action={formAction} onSubmit={form.handleSubmit(() => {
                const formData = new FormData();
                const formValues = form.getValues();
                
                // Append form values
                Object.entries(formValues).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                // Append other necessary data
                const simpleCartItems: CartItem[] = cartItems.map(item => ({
                  productId: item.product.id,
                  name: item.product.name,
                  price: item.product.price,
                  quantity: item.quantity,
                  size: item.size,
                  color: item.color,
                  image: item.product.images[0]?.url || '',
                }));

                formData.append('cartItems', JSON.stringify(simpleCartItems));
                formData.append('userId', user.uid);
                formData.append('subtotal', String(subtotal));
                formData.append('shipping', String(shipping));
                formData.append('total', String(total));
                formData.append('currency', selectedCurrency.code);

                formAction(formData);
            })} className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                <main className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                        <CardTitle className="font-headline">Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl><Input type="email" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                            <FormField control={form.control} name="address" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>City</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="state" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State/Province</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="zip" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ZIP Code</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                             <FormField control={form.control} name="country" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center py-10 border-2 border-dashed rounded-lg">
                            <h3 className="text-lg font-semibold">Payment Simulation</h3>
                            <p className="mt-1 text-muted-foreground">This is a demo store. No real payment will be processed.</p>
                        </CardContent>
                    </Card>
                </main>
                
                <aside className="lg:sticky top-24 h-fit">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {cartItems.map(item => (
                                <li key={item.product.id} className="flex items-center gap-4">
                                    <div className="relative w-16 h-20 rounded overflow-hidden">
                                        <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" />
                                        <div className="absolute top-0 right-0 bg-primary/80 text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <p className="font-semibold">{item.product.name}</p>
                                        <p className="text-muted-foreground">Size: {item.size}</p>
                                    </div>
                                    <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                                </li>
                            ))}
                        </ul>
                        <Separator className="my-4"/>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{formatPrice(shipping)}</span>
                            </div>
                            <Separator className="my-2"/>
                            <div className="flex justify-between font-bold text-base">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                    </Card>
                </aside>
            </form>
        </Form>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">You can't checkout without any items.</p>
            <Button asChild className="mt-6">
                <Link href="/products">Go Shopping</Link>
            </Button>
        </div>
      )}
    </div>
    </>
  );
}
