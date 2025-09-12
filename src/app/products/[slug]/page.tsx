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

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductGallery images={product.images} />

        <div className="md:py-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl mt-2 text-muted-foreground">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-base text-foreground/80 leading-relaxed">{product.description}</p>
          
          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2">Color: <span className="font-normal text-muted-foreground">{product.variants.color[0]}</span></p>
              {/* Color swatches could go here */}
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Size</p>
              <div className="flex gap-2">
                {product.variants.size.map(size => (
                  <Button key={size} variant="outline" className="w-12 h-12">{size}</Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-12"><Minus className="w-4 h-4" /></Button>
              <span className="w-8 text-center">1</span>
              <Button variant="ghost" size="icon" className="h-12"><Plus className="w-4 h-4" /></Button>
            </div>
            <Button size="lg" className="flex-1 h-12">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Heart className="h-5 w-5" />
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
