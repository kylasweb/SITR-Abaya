import { products } from "@/lib/data"
import ProductCard from "./product-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // In a real app, this would call the `suggestRelatedProducts` GenAI flow
  // with the current product ID and user history.
  // For this demo, we'll just show some other products.
  const related = products.filter(p => p.id !== currentProductId).slice(0, 5);

  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl font-semibold text-center">You Might Also Like</h2>
      <p className="text-muted-foreground mt-2 text-center">AI-powered recommendations just for you</p>
      
      <div className="mt-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
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
