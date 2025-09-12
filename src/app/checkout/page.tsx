import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
    const cartItems = [
        { product: products[0], quantity: 1 },
        { product: products[3], quantity: 1 },
    ];
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 10;
    const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Checkout</h1>
      </header>
      
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <main className="lg:col-span-2">
          <Tabs defaultValue="shipping" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="shipping" className="mt-6">
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
                <CardFooter>
                  <p className="text-xs text-muted-foreground">Already have an account? <Link href="/login" className="underline">Login</Link> for faster checkout.</p>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="payment" className="mt-6">
              {/* Payment form content would go here */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Payment form will be here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="review" className="mt-6">
              {/* Review content would go here */}
               <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Review Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Order review details will be here.</p>
                </CardContent>
                 <CardFooter>
                    <Button size="lg" className="w-full h-12">Place Order</Button>
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
                                <p className="text-muted-foreground">Size: M</p>
                            </div>
                            <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
                <Separator className="my-4"/>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2"/>
                    <div className="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
              </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
