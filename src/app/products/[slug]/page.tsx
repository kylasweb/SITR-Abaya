'use client';
import { notFound } from 'next/navigation';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { products } from '@/lib/data';
import ProductGallery from '@/components/product-gallery';
import RelatedProducts from '@/components/related-products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useStore } from '@/lib/store';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// We are fetching all products and then finding the one with the matching slug.
// This is not optimal for a large number of products.
// In a real-world application, you would fetch only the required product by its slug.
// However, since this page is dynamically rendered, we need to provide `generateStaticParams`
// to pre-build all product pages at build time for better performance.
// The `dynamic` export is not required here because `generateStaticParams` is used.

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  const { addToCart, toggleWishlist, isItemInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.variants.size[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.variants.color[0] || '');
  
  if (!product) {
    notFound();
  }
  
  const isInWishlist = isItemInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductGallery images={product.images} />

        <div className="md:py-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl mt-2 text-muted-foreground">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-base text-foreground/80 leading-relaxed">{product.description}</p>
          
          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold mb-2">Size</p>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {product.variants.size.map(size => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                    <Label htmlFor={`size-${size}`}>
                      <div className={cn(
                        "w-14 h-12 flex items-center justify-center rounded-md border cursor-pointer",
                        selectedSize === size ? "border-primary ring-2 ring-primary ring-offset-2" : "border-input"
                      )}>
                        {size}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-12" onClick={decrementQuantity}><Minus className="w-4 h-4" /></Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-12" onClick={incrementQuantity}><Plus className="w-4 h-4" /></Button>
            </div>
            <Button size="lg" className="flex-1 h-12" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12" onClick={() => toggleWishlist(product)}>
              <Heart className={cn("h-5 w-5", isInWishlist && "fill-destructive text-destructive")} />
            </Button>
          </div>
          
           <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                - Material: {product.variants.material.join(', ')} <br/>
                - Fit: Regular <br/>
                - Care: Dry clean only
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free standard shipping on all orders. Returns are accepted within 30 days of purchase.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
      
      <div className="mt-16 md:mt-24">
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}
