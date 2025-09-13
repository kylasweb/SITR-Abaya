import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getProducts, getSiteSettings } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import IslamicQuote from '@/components/islamic-quote';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

// Dynamically select an icon component
const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // Return a default icon or null if the icon name is invalid
    return <LucideIcons.HelpCircle className="h-7 w-7 text-primary mb-2" strokeWidth={1.5} />;
  }

  return <IconComponent className="h-7 w-7 text-primary mb-2" strokeWidth={1.5} />;
};


export default async function Home() {
  const products = await getProducts();
  const settings = await getSiteSettings();
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[80vh] md:h-screen text-primary-foreground">
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
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">{settings.general.siteTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            {settings.general.tagline}
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
            {settings.homepage.featureItems.map((item, index) => (
               <Card key={index} className="bg-transparent p-2 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                 <DynamicIcon name={item.icon} />
                <CardTitle className="font-headline text-base font-semibold mb-1">{item.title}</CardTitle>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
