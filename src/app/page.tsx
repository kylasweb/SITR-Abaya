import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] text-primary-foreground">
        <div className="absolute inset-0 bg-primary/30 z-10" />
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">Elegance Redefined</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Discover our exclusive collection of luxury abayas, crafted with passion and precision.
          </p>
          <Button asChild className="mt-8" size="lg" variant="secondary">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold">Featured Collection</h2>
            <p className="text-muted-foreground mt-2">Handpicked for the modern, elegant woman.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
