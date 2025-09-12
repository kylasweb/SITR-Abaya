'use client';
import { getProducts } from "@/lib/data"
import ProductCard from "./product-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { suggestRelatedProducts } from "@/ai/flows/suggest-related-products";
import { Product } from "@/lib/types";

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const { relatedProductIds } = await suggestRelatedProducts({ productId: currentProductId });
        const relatedProducts = allProducts.filter(p => relatedProductIds.includes(p.id));
        
        // If AI returns no products, or less than a few, fill with random ones
        if (relatedProducts.length < 5) {
          const fallback = allProducts.filter(p => p.id !== currentProductId && !relatedProductIds.includes(p.id))
                                   .slice(0, 5 - relatedProducts.length);
          setRelated([...relatedProducts, ...fallback]);
        } else {
          setRelated(relatedProducts);
        }

      } catch (error) {
        console.error("Failed to fetch related products:", error);
        // Fallback to random products on error
        const allProducts = await getProducts();
        const fallback = allProducts.filter(p => p.id !== currentProductId).slice(0, 5);
        setRelated(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, [currentProductId]);


  if (loading) {
     return (
       <section>
        <h2 className="font-headline text-3xl md:text-4xl font-semibold text-center">You Might Also Like</h2>
        <p className="text-muted-foreground mt-2 text-center">AI-powered recommendations just for you</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* You can use a skeleton loader here */}
            {[...Array(5)].map((_, i) => (
                <div key={i} className="p-1">
                    <div className="w-full aspect-[2/3] bg-muted animate-pulse rounded-lg"></div>
                    <div className="mt-2 h-4 w-3/4 bg-muted animate-pulse rounded"></div>
                    <div className="mt-2 h-4 w-1/4 bg-muted animate-pulse rounded"></div>
                </div>
            ))}
        </div>
      </section>
     )
  }
  
  if (related.length === 0) return null;


  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl font-semibold text-center">You Might Also Like</h2>
      <p className="text-muted-foreground mt-2 text-center">AI-powered recommendations just for you</p>
      
      <div className="mt-8">
        <Carousel
          opts={{
            align: "start",
            loop: related.length > 3,
          }}
          className="w-full"
        >
          <CarouselContent>
            {related.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  )
}
