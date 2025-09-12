import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import IslamicQuote from '@/components/islamic-quote';
import { Gem, HandHeart, Leaf, Palette, Ruler, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      
      <section className="bg-primary">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <Card className="bg-secondary/30 p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Gem className="h-8 w-8 text-primary mb-3" strokeWidth={1.5}/>
              <CardTitle className="font-headline text-lg font-semibold mb-1">Exquisite Quality</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">
                  Our abayas are crafted from the finest materials, ensuring a luxurious feel and a lasting impression.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30 p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Palette className="h-8 w-8 text-primary mb-3" strokeWidth={1.5}/>
              <CardTitle className="font-headline text-lg font-semibold mb-1">Timeless Designs</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">
                  Each piece is thoughtfully designed, blending traditional modesty with contemporary elegance.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30 p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Leaf className="h-8 w-8 text-primary mb-3" strokeWidth={1.5}/>
              <CardTitle className="font-headline text-lg font-semibold mb-1">Ethically Made</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">
                  We are committed to ethical practices, ensuring our garments are made with integrity and care.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30 p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <HandHeart className="h-8 w-8 text-primary mb-3" strokeWidth={1.5}/>
              <CardTitle className="font-headline text-lg font-semibold mb-1">Customer-Centric</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">
                  Your satisfaction is our priority. We offer a shopping experience that is as seamless as it is personal.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30 p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Ruler className="h-8 w-8 text-primary mb-3" strokeWidth={1.5}/>
              <CardTitle className="font-headline text-lg font-semibold mb-1">Inclusive Sizing</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">
                  We celebrate all body types, offering special collections for petite women and a range of inclusive sizes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30 p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Truck className="h-8 w-8 text-primary mb-3" strokeWidth={1.5}/>
              <CardTitle className="font-headline text-lg font-semibold mb-1">Reliable Service</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">
                  Enjoy seamless shopping with fast, worldwide shipping and dedicated customer support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
