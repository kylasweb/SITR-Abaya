'use client';
import { notFound } from 'next/navigation';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getProducts } from '@/lib/data';
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
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { Product } from '@/lib/types';


export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isItemInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const products = await getProducts();
      const foundProduct = products.find((p) => p.slug === params.slug) || null;
      
      if (!foundProduct) {
        // If product not found, it could be a slug issue or data issue.
        // We will not call notFound() immediately to prevent build errors
        // if the data isn't available at build time. The component will
        // render the "not found" state below.
        setProduct(null);
      } else {
        setProduct(foundProduct);
        if (foundProduct.variants.size[0]) {
          setSelectedSize(foundProduct.variants.size[0]);
        }
      }
      setLoading(false);
    }

    fetchProduct();
  }, [params.slug]);
  
  if (loading) {
    // You can return a loading skeleton here
    return (
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted animate-pulse"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square w-full bg-muted animate-pulse rounded-md"></div>
              ))}
            </div>
          </div>
          <div className="md:py-8">
            <div className="h-10 w-3/4 bg-muted animate-pulse rounded-md"></div>
            <div className="h-8 w-1/4 bg-muted animate-pulse rounded-md mt-4"></div>
            <div className="space-y-2 mt-6">
              <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
              <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded-md"></div>
            </div>
            <Separator className="my-6" />
             <div className="h-6 w-16 bg-muted animate-pulse rounded-md mb-2"></div>
             <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-14 h-12 bg-muted animate-pulse rounded-md"></div>
                ))}
             </div>
             <div className="mt-8 flex items-center gap-4">
                <div className="w-28 h-12 bg-muted animate-pulse rounded-md"></div>
                <div className="flex-1 h-12 bg-muted animate-pulse rounded-md"></div>
                <div className="w-12 h-12 bg-muted animate-pulse rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    // This will render if the product is not found after loading.
    // In a production app, you might want to call notFound() here,
    // but this prevents build errors if data is not yet available.
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p className="text-muted-foreground mt-2">Sorry, we couldn't find the product you're looking for.</p>
        </div>
    )
  }
  
  const isInWishlist = isItemInWishlist(product.id);

  const handleAddToCart = () => {
    // Since color is always black, we pass it directly.
    addToCart(product, selectedSize, 'Black', quantity);
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
                        "w-14 h-12 flex items-center justify-center rounded-md border cursor-pointer transition-colors hover:bg-accent",
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
