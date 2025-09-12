'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { useState } from 'react';

export default function CheckoutPage() {
    const { cart: cartItems, clearCart, selectedCurrency } = useStore();
    const router = useRouter();
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: selectedCurrency.code,
        }).format(price * selectedCurrency.rate);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 10 : 0; // Assuming shipping is a flat $10 USD
    const total = subtotal + shipping;

    const handlePlaceOrder = () => {
        // In a real app, this would process the payment.
        // For now, we'll just show a success message and clear the cart.
        setShowSuccessDialog(true);
    };

    const handleDialogClose = () => {
        setShowSuccessDialog(false);
        clearCart();
        router.push('/products');
    }

  return (
    <>
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Checkout</h1>
      </header>
      
      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <main className="lg:col-span-2">
            <Tabs defaultValue="shipping" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shipping">Shipping & Payment</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>
                <TabsContent value="shipping" className="mt-6">
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                        <CardTitle className="font-headline">Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input id="address" placeholder="123 Luxury Lane" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Dubai" />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="state">State / Province</Label>
                            <Input id="state" placeholder="Dubai" />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="zip">Zip / Postal Code</Label>
                            <Input id="zip" placeholder="00000" />
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                        <CardTitle className="font-headline">Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="card-name">Name on Card</Label>
                                <Input id="card-name" placeholder="Jane Doe" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                               <div className="space-y-2 col-span-2">
                                    <Label htmlFor="expiry">Expiration</Label>
                                    <Input id="expiry" placeholder="MM / YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                </TabsContent>
                <TabsContent value="review" className="mt-6">
                <Card>
                    <CardHeader>
                    <CardTitle className="font-headline">Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Please check your items and shipping details before placing the order.</p>
                        {/* Order summary is on the right, this is just for confirmation */}
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full h-12" onClick={handlePlaceOrder}>Place Order</Button>
                    </CardFooter>
                </Card>
                </TabsContent>
            </Tabs>
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
                </Card>
            </aside>
        </div>
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

    <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Order Placed Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
                Thank you for your purchase. A confirmation email has been sent. You will now be redirected to continue shopping.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
