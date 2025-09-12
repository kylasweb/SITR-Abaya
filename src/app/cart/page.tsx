'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const { cart: cartItems, updateQuantity, removeFromCart } = useStore();
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Shopping Cart</h1>
      </header>

      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="p-0">
                <ul className="space-y-6">
                  {cartItems.map(item => (
                    <li key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative w-24 h-32 md:w-32 md:h-44 overflow-hidden rounded">
                        <Image src={item.product.images[0].url} alt={item.product.images[0].alt} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">{item.product.name}</Link>
                          <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                           <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                           <div className="flex items-center border rounded-md">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="w-3 h-3" /></Button>
                              <span className="w-6 text-center text-sm">{item.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="w-3 h-3" /></Button>
                            </div>
                        </div>
                      </div>
                       <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:sticky top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="space-y-2 pt-2">
                  <Label htmlFor="promo-code">Promo Code</Label>
                  <div className="flex gap-2">
                    <Input id="promo-code" placeholder="Enter code" />
                    <Button variant="secondary">Apply</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full h-12">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Your Cart is Empty</h2>
          <p className="mt-2 text-muted-foreground">Fill it with beautiful things.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
