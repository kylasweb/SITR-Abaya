import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import IslamicQuote from '@/components/islamic-quote';
import { Diamond, ShieldCheck, Truck } from 'lucide-react';

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
      
      <section className="bg-secondary/30">
        <IslamicQuote />
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold">Why Choose SITR?</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              We are dedicated to providing you with an unparalleled experience in luxury and modest fashion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Diamond className="h-10 w-10 text-primary mb-4"/>
              <h3 className="font-headline text-xl font-semibold">Exquisite Quality</h3>
              <p className="text-muted-foreground mt-2">
                Our abayas are crafted from the finest materials, ensuring a luxurious feel and a lasting impression.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-10 w-10 text-primary mb-4"/>
              <h3 className="font-headline text-xl font-semibold">Authentic Designs</h3>
              <p className="text-muted-foreground mt-2">
                Each piece is thoughtfully designed, blending traditional modesty with contemporary elegance.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-10 w-10 text-primary mb-4"/>
              <h3 className="font-headline text-xl font-semibold">Reliable Service</h3>
              <p className="text-muted-foreground mt-2">
                Enjoy seamless shopping with fast, worldwide shipping and dedicated customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
